import { NextResponse, NextRequest } from 'next/server'
import { client } from './app/lib/sanityclient';
import theme from './app/lib/theme.json';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const slug = url.pathname.split('/').pop();
  
    const query = `
    *[
   _type == "article" && republishArticle == true && newSlug != ''
    ]  
   {
    _id,
    _type,
    "articleSlug": slug.current,
    republishArticle,
    "newSlug": newSlug.current,
    }[0]
    `;


    const article = await client.fetch(query, { slug });
  
    if (article?.newSlug) {
      return NextResponse.redirect(`${theme.site_url}/artikel/${article.newSlug}`, 301);
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: '/artikel/:path*',
  };