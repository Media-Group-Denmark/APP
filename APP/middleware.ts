import { NextResponse, NextRequest } from 'next/server'
import { getData, republishData } from './app/lib/GetData';
import theme from './app/lib/theme.json';
import { Article } from './app/models/article';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug = url.pathname.split('/').pop();

    console.log(`Checking if slug: ${slug} needs to be redirected...`);

    const data: Article[] = await getData();
    const article = republishData(data)
    console.log(article, 'succesfully collected');

    if (article?.newSlug) {
        console.log(`Redirecting to new slug: ${article.newSlug}`);
        return NextResponse.redirect(`${theme.site_url}/artikel/${article.newSlug}`, 301);
    } else {
      console.log(`No redirect needed for slug: ${slug}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/artikel/:path*',
};