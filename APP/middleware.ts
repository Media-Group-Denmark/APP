import { NextResponse, NextRequest } from 'next/server'; 
import { getMiddlewareData } from './api/getMiddlewareData';
import { singleArticle } from './app/(home)/(pages)/artikel/models/singleArticle';
import theme from './app/lib/theme.json';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const slug: string | undefined = url.pathname.split('/').pop();
    const fullPath: string = url.pathname;
    const hostname = req.nextUrl.hostname;

    // Definer gamle og nye domæner
    const oldDomain = 'pengehjørnet.dk';
    const newDomain = 'pengehjoernet.dk';

    // Tjek om anmodningen kommer fra det gamle domæne
    if (hostname === oldDomain) {
        // Redirect til det nye domæne med samme sti
        const redirectUrl = new URL(req.url);
        redirectUrl.hostname = newDomain;
        return NextResponse.redirect(redirectUrl, 301);
    }

    // Hent de relevante artikler
    const data = await getMiddlewareData(slug) as singleArticle[];

    // Tjek om vi har data, og om slugs er forskellige
    if (data && slug !== data.newSlug) {
        // Redirect til den nye slug
        const redirectUrl = new URL(`${theme.site_url}/artikel/${data.newSlug}`, req.url);
        return NextResponse.redirect(redirectUrl, 301);
    } 

    // Fortsæt uden redirect
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
