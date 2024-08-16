/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter, Mulish } from "next/font/google";
import "./stylesheets/globals.css";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
import LoadAds from "./components/AdScripts/LoadAds";
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID as string;

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const mulish = Mulish({ subsets: ["latin"], weight: ["600", "700", "900"], variable: '--font-mulish' });

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={theme.site_language}>
      <link
        rel="preload"
        href="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        as="script"
      />
      <link rel="dns-prefetch" href="//adx.adform.net" crossOrigin="" />
      <link rel="dns-prefetch" href="//ads.pubmatic.com" crossOrigin="" />
      <body className={`${inter.variable} ${mulish.variable}`}>
       {/*  <AdBlockDetect /> */}
        <Header />
        <>{children}</>
        <GoogleAnalytics gaId={googleAnalyticsId} />
        <Footer />

        <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "n4my1o7l85");
          `,
        }}
      />
      <LoadAds />
      </body>
    </html>
  );
}
