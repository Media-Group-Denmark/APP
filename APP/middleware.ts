import { NextResponse, NextRequest } from "next/server";
import { getMiddlewareData } from "./api/getMiddlewareData";
import { singleArticle } from "./app/(home)/(pages)/artikel/models/singleArticle";
import theme from "./app/lib/theme.json";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host");

  const oldDomain = "xn--pengehjrnet-mgb.dk";
  const newDomain = "pengehjoernet.dk";

  // Redirect fra gammelt domæne
  if (hostname === oldDomain) {
    url.hostname = newDomain;
    return NextResponse.redirect(url, 301);
  }

  let modified = false;

  url.searchParams.forEach((_, key) => {
    if (["p", "redirected"].includes(key)) {
      url.searchParams.delete(key);
      modified = true;
    }
  });
  
  // Special case for _rsc – den skjules i nogle setups
  if (url.search.includes("_rsc")) {
    url.searchParams.delete("_rsc");
    modified = true;
  }
  
  if (modified) {
    return NextResponse.redirect(url, 301);
  }

  // Slug-redirect
  const slug: string | undefined = url.pathname.split("/").pop();
  const data = await getMiddlewareData(slug) as singleArticle;

  if (data?.newSlug && data.newSlug !== slug) {
    const redirectUrl = new URL(`${theme.site_url}/artikel/${data.newSlug}`, req.url);
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
