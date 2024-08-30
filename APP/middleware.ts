import { NextResponse, NextRequest } from 'next/server';
import { getData, republishData } from './app/lib/GetData';
import theme from './app/lib/theme.json';
import { Article } from './app/models/article';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug = url.pathname.split('/').pop();

    // Check for the 'redirected' query parameter to prevent redirect loop
    if (url.searchParams.has('redirected')) {
        return NextResponse.next();
    }

    const { articles: data } = await getData() as { articles: Article[] };

    const article = republishData(data, slug as string) as Article;

    if (article && article.newSlug) {
        console.log(`Redirecting to new slug: ${article.newSlug}`);

        const redirectUrl = new URL(`/artikel/${article.newSlug}`, req.url);
        redirectUrl.searchParams.set('redirected', 'true');  // Add query parameter to indicate redirect

        return NextResponse.redirect(redirectUrl, 301);
    } else {
        console.log(`No redirect needed for slug: ${slug}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/artikel/:path*',
};


