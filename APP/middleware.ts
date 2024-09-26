import { NextResponse, NextRequest } from "next/server";
import { getMiddlewareData } from "./api/getMiddlewareData";
import { singleArticle } from "./app/(home)/(pages)/artikel/models/singleArticle";
import theme from "./app/lib/theme.json";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host');
  
  const oldDomain = 'xn--pengehjrnet-mgb.dk'; 
  const newDomain = 'pengehjoernet.dk';

  if (hostname === oldDomain) {
      url.hostname = newDomain;
      return NextResponse.redirect(url, 301);
    }
    
  const slug: string | undefined = url.pathname.split("/").pop();

  const data = await getMiddlewareData(slug) as singleArticle;

  if (data?.newSlug && data.newSlug !== slug) {
    // Redirect to the new slug
    console.log("Red needed");
    const redirectUrl = new URL(
      `${theme.site_url}/artikel/${data.newSlug}`,
      req.url
    );
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

