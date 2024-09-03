import { NextResponse, NextRequest } from 'next/server';
import { getMiddlewareData } from './app/api/data/GetData';
import { singleArticle } from './app/models/singleArticle';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug: string | undefined = url.pathname.split('/').pop();

    // Check for the 'redirected' query parameter to prevent redirect loop
    if (url.searchParams.has('redirected')) {
        return NextResponse.next();
    }

    console.log(`Checking for redirect for slug: ${slug}`);

    // Fetch the relevant articles
    const data = await getMiddlewareData() as singleArticle[];

    console.log(`Data: ${JSON.stringify(data)}`);

    // Find the article by newSlug, articleSlug, or oldSlugs
    const article = 
    data.find(({ articleSlug }) => articleSlug === slug) ||
    data.find(({ newSlug }) => newSlug === slug) ||
    data.find(({ oldSlugs }) => oldSlugs && oldSlugs.includes(slug));

    if (article && article.newSlug) {
        // Redirect to the new slug
        const redirectUrl = new URL(`/artikel/${article.newSlug}`, req.url);
        redirectUrl.searchParams.set('redirected', 'true');  // Add query parameter to prevent loop
        return NextResponse.redirect(redirectUrl, 301);
    } else {
        console.log(`No redirect needed for slug: ${slug}`);
        NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/artikel/:path*',
};