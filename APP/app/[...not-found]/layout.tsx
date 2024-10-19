/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Inter, Mulish } from "next/font/google";
import "@/app/(home)/stylesheets/globals.css";
import Script from "next/script";
import theme from "@/app/lib/theme.json";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { ArticleModel } from "../(home)/(pages)/(article-collections)/models/article";
import Header from "../(home)/components/Navigation/Header/Header";
import { SubArticlesInfiniteScroll } from "../(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import TrendingArticlesList from "../(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import GoogleAnalyticsScripts from "../(home)/components/AdScripts/GoogleAnalyticsScripts";
import Footer from "../(home)/components/Navigation/Footer/Footer";
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
  const data: ArticleModel[] = await getFreshArticleData();
  return (
    <html lang={theme.site_language}>
      
      <body className={`${inter.variable} ${mulish.variable}`}>
       
       {/*  <AdBlockDetect /> */}
        <Header />
        <main className="bg-second_color_light dark:bg-main_color_dark">
          {children} 

        <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl  bg-second_color_light dark:bg-second_color_dark ">
              <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={50} />
              <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
              <TrendingArticlesList data={data} dayInterval={14} startIndex={0} endIndex={50} articleAmount={6}  />
              </div>
        </section>
        
        </main>
        
        <Footer />

      {/* <LoadAds /> */}

      </body>
    </html>
  );
}
