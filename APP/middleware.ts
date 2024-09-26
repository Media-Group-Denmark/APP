import { NextResponse, NextRequest } from 'next/server'; 
import { getMiddlewareData } from './api/getMiddlewareData';
import { singleArticle } from './app/(home)/(pages)/artikel/models/singleArticle';
import theme from './app/lib/theme.json';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug: string | undefined = url.pathname.split('/').pop();
    const fullPath: string = url.pathname;

    const today = new Date();
    // Brug bindestreger i stedet for skråstreger for at undgå encoding problemer
    const formattedDate = ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                          ('0' + today.getDate()).slice(-2) + '-' +
                          today.getFullYear().toString().slice(-2);

    if (url.searchParams.has('d')) {
        return NextResponse.next();
    }

    // Fetch the relevant articles
    const data = await getMiddlewareData(slug) as singleArticle[];

    if (data) {
        // Redirect til den nye slug med dato som parameter
        const redirectUrl = new URL(`${theme.site_url}/artikel/${data.newSlug}`, req.url);
        redirectUrl.searchParams.set('d', formattedDate); // Ingen encoding her
        return NextResponse.redirect(redirectUrl, 301);
    } 

    // Redirect med dato som parameter, nu med bindestreger
    const redirectUrl = new URL(`${theme.site_url}${fullPath}`, req.url);
    redirectUrl.searchParams.set('d', formattedDate);  
    return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
    matcher: '/:path*',
};
