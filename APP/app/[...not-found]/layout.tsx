/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter, Mulish } from "next/font/google";
import "@/app/stylesheets/globals.css";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
import { getFreshArticleData } from "../api/data/GetData";
import { Article } from "../(home)/models/article";
import MailChimpPopUp from "../(home)/components/MailChimp/MailChimpPopUp";
import Header from "../(home)/components/Navigation/Header";
import { SubArticlesInfiniteScroll } from "../(home)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import TrendingArticlesList from "../(home)/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import GoogleAnalyticsScripts from "../(home)/components/AdScripts/GoogleAnalyticsScripts";
import Footer from "../(home)/components/Navigation/Footer";
import LoadAds from "../(home)/components/AdScripts/LoadAds";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const mulish = Mulish({ subsets: ["latin"], weight: ["600", "700", "900"], variable: '--font-mulish' });

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data: Article[] = await getFreshArticleData();
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
        <MailChimpPopUp />
        <Header />
        <main className="bg-second_color_light dark:bg-main_color_dark">
          {children} 

        <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl  bg-second_color_light dark:bg-second_color_dark ">
              <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={100} />
              <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
              <aside className='desktop hidden md:block' data-ad-unit-id="/49662453/PengehjoernetDK/Square_2"></aside>
              <TrendingArticlesList data={data} dayInterval={14} startIndex={0} endIndex={100} articleAmount={6}  />
              </div>
        </section>
        
        </main>
        <GoogleAnalyticsScripts />
        <Footer />

      <LoadAds />

      <Script
        id="voiceflow-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (d, t) {
              var v = d.createElement(t),
                s = d.getElementsByTagName(t)[0];
             
              v.onload = function () {
                window.voiceflow.chat.load({
                  verify: { projectID: '669e54017b692bbe8484f2bc' },
                  url: 'https://general-runtime.voiceflow.com/',
                  versionID: 'production',
                  assistant: {
                    stylesheet: 'data:text/css;base64,LnZmcmMtY2hhdC0tc2Vzc2lvbi10aW1lLA0KLnZmcmMtY2hhdC0tc3RhdHVzIHsNCmRpc3BsYXk6IG5vbmU7DQp9DQoNCi52ZnJjLXRpbWVzdGFtcCB7DQpjb2xvcjogdHJhbnNwYXJlbnQ7DQp9DQoNCi52ZnJjLWNoYXQtaW5wdXQgdGV4dGFyZWEgew0KYmFja2dyb3VuZC1pbWFnZTogbm9uZTsNCn0NCi52ZnJjLWNoYXQtaW5wdXQgdGV4dGFyZWE6Oi1tb3otcGxhY2Vob2xkZXIgew0KY29sb3I6IHRyYW5zcGFyZW50Ow0KfQ==', 
                  },
                }).then(() => {
                  window.voiceflow.chat.proactive.clear();
                  window.voiceflow.chat.proactive.push({
                    type: 'text',
                    payload: { message: 'Hjælp os med at skabe bedre indhold – del din mening med os!' },
                  });
                });
              };

              v.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
              v.type = 'text/javascript';
              s.parentNode.insertBefore(v, s);
            })(document, 'script');
          `,
        }}
      />
      </body>
    </html>
  );
}
