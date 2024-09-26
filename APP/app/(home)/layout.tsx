/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter, Mulish, Merriweather, Playfair_Display  } from "next/font/google";
import "@/app/(home)/stylesheets/globals.css";
import Header from "./components/Navigation/Header/Header";
import Footer from "./components/Navigation/Footer/Footer";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
import MailChimpPopUp from "./components/MailChimp/MailChimpPopUp";
import GoogleAnalyticsScripts from "./components/AdScripts/GoogleAnalyticsScripts";
import SubArticlesListSmall from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import TrendingArticlesList from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import { Article } from "./(pages)/(article-collections)/models/article";
import { getFreshArticleData } from "@/app/(home)/(pages)/(article-collections)/api/getFreshArticleData";
import dynamic from "next/dynamic";
import { SubArticlesInfiniteScroll } from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import TrendingArticlesListAltOmKendte from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";

const inter = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});
const mulish = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-playfair-display',
  display: 'swap',
});



const InfiniteScroll = ({ data } : {data : Article[]}) => {
  return (
    <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl bg-second_color_light dark:bg-second_color_dark">
      <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={30} />
      <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
        <aside className="desktop hidden md:block" unit-id-id={`/49662233/${theme.site_ad_name}/Square_2`}></aside>
        <TrendingArticlesListAltOmKendte data={data} dayInterval={14} startIndex={0} endIndex={30} articleAmount={4} />
      </div>
    </section>
  );
};

// Dynamisk komponent
const DynamicArticles = dynamic<React.ComponentType<{ data: Article[] }>>(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(InfiniteScroll), 5000); 
  });
}, {
  loading: () => null, 
});


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
      
      <body className={`${inter.variable} ${mulish.variable}`}>
       
       {/*  <AdBlockDetect /> */}
        <MailChimpPopUp />
        <Header />
        <main className="bg-second_color_light dark:bg-main_color_dark">
          {children} 


        <DynamicArticles data={data} />
        
        </main>
        <GoogleAnalyticsScripts />
        <Footer />


      
      </body>
    </html>
  );
}
