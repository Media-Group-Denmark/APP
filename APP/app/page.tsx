/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "./lib/sanityclient";
import { Article } from "./models/article";
import type { Metadata } from "next";
import SubArticlesListSmall from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import SubArticlesGrid from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import ArticleHero from "./components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import TopNewsSlider from "./components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import theme from "@/app/lib/theme.json";
import TrendingArticlesListAltOmKendte from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
import { getData, freshData } from "./lib/GetData";
import { SubArticlesInfiniteScroll } from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import TrendingArticlesList from "./components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: theme.metadata.title,
  description: theme.metadata.description,
  keywords: theme.metadata.keywords,
  openGraph: {
    title: theme.metadata.openGraph.title,
    description: theme.metadata.openGraph.description,
    url: theme.site_url,
    type: "website",
    siteName: theme.site_name,
    locale: theme.metadata.openGraph.locale,
    images: [
      {
        url: theme.logo_url,
        width: 800,
        height: 600,
        alt: theme.metadata.openGraph.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: theme.metadata.twitter.site,
    title: theme.metadata.twitter.title,
    description: theme.metadata.twitter.description,
    images: theme.logo_url,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
};

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const allData: Article[] = await getData();
  // Anvend dit filter på dataen
  const data = freshData(allData);
  
  return (
    <main>
      <TopNewsSlider
        data={data}
        dayInterval={2}
        startIndex={0}
        endIndex={12}
      />
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">
          
            {/* Both */}
            <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <ArticleHero data={data} startIndex={0} endIndex={1} />
                <aside className="hidden lg:inline-block">
                  <SubArticlesListWide data={data} startIndex={1} endIndex={3} />
                </aside>
              </div>
              <aside className="hidden w-[280px] lg:inline-block">
                <TrendingArticlesListAltOmKendte
                data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={100}
                articleAmount={5} 
                 />
              </aside>
            </section>

            
            <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_1"></aside>
            <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_2"></aside>
            {/* Phone */}
            <section className="grid gap-4 md:hidden">
            <TrendingArticlesListAltOmKendte
            data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={100}
                articleAmount={5} 
              />
              <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_2"></aside>
              <SubArticlesGrid data={data} startIndex={1} endIndex={3} />
              <div className="mt-6 block">
                <ArticleHero data={data} startIndex={3} endIndex={4} />
              </div>
              <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_3"></aside>
              <SubArticlesGrid data={data} category={'aktier'} startIndex={4} endIndex={6} />
              <div className="mt-4 block">
                <ArticleHero data={data} startIndex={6} endIndex={7} />
              </div>
            </section>


            {/* Desktop */}
            <section className="md:inline-block hidden">
              <SubArticlesGrid data={data} category={'aktier'} startIndex={0} endIndex={6} />
              <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
              <SubArticlesGrid data={data} category={'spare-hacks'} startIndex={0} endIndex={6} />
              <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
              <SubArticlesGrid data={data} category={'privatokonomi'} startIndex={0} endIndex={6} />
            </section>

            <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl  bg-second_color_light dark:bg-second_color_dark ">
              <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={200} />
              <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
              <aside className='desktop hidden md:block' data-ad-unit-id="/49662453/PengehjoernetDK/Square_2"></aside>
              <TrendingArticlesList data={data} dayInterval={14} startIndex={0} endIndex={100} articleAmount={6}  />
              </div>
            </section>
          </div>
      </section>
    </main>
  );
}
