import { NextResponse, NextRequest } from 'next/server';
import { getMiddlewareData } from './app/api/data/GetData';
import { singleArticle } from './app/(home)/models/singleArticle';
import theme from './app/lib/theme.json';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug: string | undefined = url.pathname.split('/').pop();
    const fullPath: string = url.pathname;

    if (url.searchParams.has('redirected')) {
        return NextResponse.next();
    }


    // Fetch the relevant articles
    const data = await getMiddlewareData(slug) as singleArticle[];
    
    

    if (data) {
        // Redirect to the new slug
        const redirectUrl = new URL(`${theme.site_url}/artikel/${data.newSlug}`, req.url);
        redirectUrl.searchParams.set('redirected', 'true');
        return NextResponse.redirect(redirectUrl, 301);
    } 
    const redirectUrl = new URL(`${theme.site_url}${fullPath}`, req.url);
    redirectUrl.searchParams.set('redirected', 'true');  
    return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
    matcher: '/:path*',
};