/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter, Mulish } from "next/font/google";
import "./stylesheets/globals.css";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
import LoadAds from "./components/AdScripts/LoadAds";
import MailChimpPopUp from "./components/MailChimp/MailChimpPopUp";
import GoogleAnalyticsScripts from "./components/AdScripts/GoogleAnalyticsScripts";
import { SubArticlesInfiniteScroll } from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import TrendingArticlesList from "./components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import { Article } from "./models/article";
import { getFreshArticleData } from "./api/data/GetData";
import TrendingArticlesListAltOmKendte from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
import ArticleHero from "./components/ArticleDisplaySystems/DynamicSystems/ArticleHero";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const mulish = Mulish({ subsets: ["latin"], weight: ["600", "700", "900"], variable: '--font-mulish' });

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function RootLayout({
  children, params,
}: Readonly<{
  children: React.ReactNode;
  params: { kategori: string },
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

      <Script
        id="voiceflow-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (d, t) {
              var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
              v.onload = function () {
                window.voiceflow.chat.load({
                  verify: { projectID: '669e54017b692bbe8484f2bc' },
                  url: 'https://general-runtime.voiceflow.com/',
                  versionID: 'production',
                  assistant: {
                    stylesheet: 'data:text/css;base64,LnZmcmMtY2hhdC0tc2Vzc2lvbi10aW1lLA0KLnZmcmMtY2hhdC0tc3RhdHVzIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCg0KLnZmcmMtdGltZXN0YW1wIHsNCiAgY29sb3I6IHRyYW5zcGFyZW50Ow0KfQ0KDQoudmZyYy1jaGF0LWlucHV0IHRleHRhcmVhIHsNCiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTsNCn0NCi52ZnJjLWNoYXQtaW5wdXQgdGV4dGFyZWE6Oi1tb3otcGxhY2Vob2xkZXIgew0KICBjb2xvcjogdHJhbnNwYXJlbnQ7DQp9DQoudmZyYy1jaGF0LWlucHV0IHRleHRhcmVhOjpwbGFjZWhvbGRlciB7DQogIGNvbG9yOiB0cmFuc3BhcmVudDsNCn0NCg0KLnZmcmMtcHJvbXB0IGJ1dHRvbi52ZnJjLWJ1dHRvbi0tcHJpbWFyeSwNCmZvb3RlciBidXR0b24udmZyYy1idXR0b24tLXByaW1hcnkgew0KICBwb3NpdGlvbjogcmVsYXRpdmU7DQogIGNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50Ow0KfQ0KLnZmcmMtcHJvbXB0IGJ1dHRvbi52ZnJjLWJ1dHRvbi0tcHJpbWFyeTo6YWZ0ZXIsDQpmb290ZXIgYnV0dG9uLnZmcmMtYnV0dG9uLS1wcmltYXJ5OjphZnRlciB7DQogIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgZGlzcGxheTogZmxleDsNCiAgYWxpZ24taXRlbXM6IGNlbnRlcjsNCiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7DQogIGluc2V0OiAwOw0KICBjb2xvcjogI2ZmZmZmZjsNCn0NCi52ZnJjLXByb21wdCBidXR0b24udmZyYy1idXR0b24tLXByaW1hcnlbbGFiZWw9Q2FuY2VsXTo6YWZ0ZXIsDQpmb290ZXIgYnV0dG9uLnZmcmMtYnV0dG9uLS1wcmltYXJ5W2xhYmVsPUNhbmNlbF06OmFmdGVyIHsNCiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC45KTsNCn0NCg0KLnZmcmMtY2hhdC1pbnB1dCB0ZXh0YXJlYTotbW96LXBsYWNlaG9sZGVyLXNob3duIHsNCiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgdmVyc2lvbj0nMS4xJyBoZWlnaHQ9JzUwcHgnIHdpZHRoPScyNTBweCc+PHRleHQgeD0nMTUnIHk9JzI1JyBmaWxsPSdzaWx2ZXInIGZvbnQtZmFtaWx5PSd2ZXJkYW5hJyBmb250LXNpemU9JzE1Jz5CZXNrZWQuLi48L3RleHQ+PC9zdmc+Iik7DQogIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7DQp9DQoNCi52ZnJjLWNoYXQtaW5wdXQgdGV4dGFyZWE6cGxhY2Vob2xkZXItc2hvd24gew0KICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2ZXJzaW9uPScxLjEnIGhlaWdodD0nNTBweCcgd2lkdGg9JzI1MHB4Jz48dGV4dCB4PScxNScgeT0nMjUnIGZpbGw9J3NpbHZlcicgZm9udC1mYW1pbHk9J3ZlcmRhbmEnIGZvbnQtc2l6ZT0nMTUnPkJlc2tlZC4uLjwvdGV4dD48L3N2Zz4iKTsNCiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsNCn0NCg0KLnZmcmMtcHJvbXB0IGJ1dHRvbi52ZnJjLWJ1dHRvbi0tcHJpbWFyeTo6YWZ0ZXIsDQpmb290ZXIgYnV0dG9uLnZmcmMtYnV0dG9uLS1wcmltYXJ5OjphZnRlciB7DQogIGNvbnRlbnQ6ICJTdGFydCBueSBzYW10YWxlIjsNCn0NCi52ZnJjLXByb21wdCBidXR0b24udmZyYy1idXR0b24tLXByaW1hcnlbbGFiZWw9IkVuZCBDaGF0Il06OmFmdGVyLA0KZm9vdGVyIGJ1dHRvbi52ZnJjLWJ1dHRvbi0tcHJpbWFyeVtsYWJlbD0iRW5kIENoYXQiXTo6YWZ0ZXIgew0KICBjb250ZW50OiAiU2x1dCBzYW10YWxlIjsNCn0NCi52ZnJjLXByb21wdCBidXR0b24udmZyYy1idXR0b24tLXByaW1hcnlbbGFiZWw9Q2FuY2VsXTo6YWZ0ZXIsDQpmb290ZXIgYnV0dG9uLnZmcmMtYnV0dG9uLS1wcmltYXJ5W2xhYmVsPUNhbmNlbF06OmFmdGVyIHsNCiAgY29udGVudDogIkFmYnJ5ZCI7DQogIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7DQp9DQo=',
                  },
                });
              }
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
