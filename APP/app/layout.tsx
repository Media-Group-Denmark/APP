/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter } from "next/font/google";
import "./stylesheets/globals.css";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
import AdBlockDetect from "./components/AdBlockDetect/AdBlockDetect";
const inter = Inter({ subsets: ["latin"] });
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID as string;

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
      <body className={`${inter.className}`}>
       {/*  <AdBlockDetect /> */}
        <Header />
        <main className="mt-[60px]">{children}</main>
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

        {/* Google Publisher Tag - Definerer og anmoder om reklamer */}
        <Script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />

        {/* OneTag scriptet bruges til at optimere og forenkle indlæsning af reklamer fra forskellige netværk, 
        hvilket hjælper med at øge indtægterne fra reklamevisninger. */}
        <Script
          async
          src="//get.s-onetag.com/fe24cb85-40ce-4663-902a-d4273cadd44f/tag.min.js"
        />

        {/* Prebid.js er en open source teknologi, der tillader ad tech firmaer at foretage real-tidsbudgivning 
        på reklamepladser, før reklamen bliver vist. */}
        <Script src="/lib/prebid8.46.0-1.js" strategy="afterInteractive" />

        {/* Et tilpasset script, der specifikt håndterer opsætning eller konfiguration af dine reklameenheder 
        baseret på dine egne præferencer og indstillinger.  */}
      <Script
        src="/lib/ad-script.min.js"
        strategy="afterInteractive"
      />
      </body>
    </html>
  );
}
