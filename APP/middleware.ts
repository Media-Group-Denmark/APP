import { NextResponse, NextRequest } from 'next/server'; 
import { getMiddlewareData } from './api/getMiddlewareData';
import { singleArticle } from './app/(home)/(pages)/artikel/models/singleArticle';
import theme from './app/lib/theme.json';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug: string | undefined = url.pathname.split('/').pop();
    const fullPath: string = url.pathname;

    const today = new Date();
    const formattedDate = ('0' + (today.getMonth() + 1)).slice(-2) + '/' +
                          ('0' + today.getDate()).slice(-2) + '/' +
                          today.getFullYear().toString().slice(-2);

   
    const encodedDate = formattedDate.replace(/\//g, '%2F');

    if (url.searchParams.has('d')) {
        return NextResponse.next();
    }

    // Fetch the relevant articles
    const data = await getMiddlewareData(slug) as singleArticle[];

    if (data) {
        // Redirect til den nye slug med dato som søgeparameter
        const redirectUrl = new URL(`${theme.site_url}/artikel/${data.newSlug}`, req.url);
        redirectUrl.searchParams.set('d', `${encodedDate}`);
        return NextResponse.redirect(redirectUrl, 301);
    } 
    const redirectUrl = new URL(`${theme.site_url}${fullPath}`, req.url);
    redirectUrl.searchParams.set('d', `${encodedDate}`);  
    return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
    matcher: '/:path*',
};
