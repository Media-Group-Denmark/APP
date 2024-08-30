import { NextResponse, NextRequest } from 'next/server';
import { getData } from './app/api/data/GetData';
import { singleArticle } from './app/models/singleArticle';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug = url.pathname.split('/').pop();

    // Check for the 'redirected' query parameter to prevent redirect loop
    if (url.searchParams.has('redirected')) {
        return NextResponse.next();
    }

  const { singleArticle: data } = await getData(slug) as { singleArticle: singleArticle[]};
  const article = data[0] as singleArticle;

  //console.log(article, 'data MIDDLE', data[0], 'sent to article page MIDDLE', slug);

    if (article && article.newSlug) {
        //console.log(`Redirecting to new slug: ${article.newSlug}`);

        const redirectUrl = new URL(`/artikel/${article.newSlug}`, req.url);
        redirectUrl.searchParams.set('redirected', 'true');  // Add query parameter to indicate redirect

        return NextResponse.redirect(redirectUrl, 301);
    } else {
        //console.log(`No redirect needed for slug: ${slug}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/artikel/:path*',
};


