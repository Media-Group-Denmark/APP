/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter, Mulish } from "next/font/google";
import "@/app/(home)/stylesheets/globals.css";
import Header from "./components/Navigation/Header/Header";
import Footer from "./components/Navigation/Footer/Footer";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
import LoadAds from "./components/AdScripts/LoadAds";
import GoogleAnalyticsScripts from "./components/AdScripts/GoogleAnalyticsScripts";
import SubArticlesListSmall from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import TrendingArticlesList from "./(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList";
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import dynamic from "next/dynamic";
import { SubArticlesInfiniteScroll } from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import { defaultSchema } from "./meta/defaultSchema";
import NewsletterPopup from "./components/MailChimp/NewsletterPopUp";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SubArticlesInfiniteScrollTwo } from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/SubArticlesInfiniteScrollTwo";
import TrendingArticlesListTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/TrendingArticlesListTwo";


export const revalidate = 600;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-mulish",
  display: "swap",
});

const InfiniteScroll = ({ data }: { data: ArticleModel[] }) => {
  return (
    <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl bg-second_color_light dark:bg-second_color_dark">
      <SubArticlesInfiniteScrollTwo data={data} startIndex={7} endIndex={30} />
      <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
        <aside
          className="desktop hidden md:block"
          data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Square_2`}
        ></aside>
        <TrendingArticlesListTwo
          data={data}
          dayInterval={14}
          startIndex={0}
          views={0}
          endIndex={30}
          articleAmount={15}
        />
      </div>
    </section>
  );
};

// Dynamisk komponent
const DynamicArticles = dynamic<React.ComponentType<{ data: ArticleModel[] }>>(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(InfiniteScroll), 2000);
    });
  },
  {
    loading: () => null,
  }
);

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data: ArticleModel[] = await getFreshArticleData();
  const jsonLd = defaultSchema;
  return (
    <html lang={theme.site_language}>
      <link
        rel="preload"
        href="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        as="script"
      />
      <link rel="dns-prefetch" href="//adx.adform.net" crossOrigin="" />
      <link rel="dns-prefetch" href="//ads.pubmatic.com" crossOrigin="" />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${theme.feed_url}`}
      />
      <body className={`${inter.variable} ${mulish.variable} ${GeistSans.variable}`}>
        <script
          async
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/*  <AdBlockDetect /> */}
        {/* <NewsletterPopup /> */}
        <Header />
        <main className="bg-second_color_light dark:bg-main_color_dark">
          {children}

          <DynamicArticles data={data} />
        </main>
        <GoogleAnalyticsScripts />
        <Footer />

        {/* <Script
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
      /> */}
        <LoadAds />
      </body>
    </html>
  );
}
