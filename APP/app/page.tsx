/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "./lib/sanityclient";
import { Article } from "./models/article";
import type { Metadata } from "next";
import SubArticlesGrid from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import ArticleHero from "./components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import TopNewsSlider from "./components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import theme from "@/app/lib/theme.json";
import TrendingArticlesListAltOmKendte from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
import { getFreshArticleData } from "./api/data/GetData";
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
  const data: Article[] = await getFreshArticleData();
  
  return (
    <section>
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
              <SubArticlesGrid data={data} startIndex={1} endIndex={3} articleAmount={2} />
              <div className="mt-6 block">
                <ArticleHero data={data} startIndex={3} endIndex={4} />
              </div>
              <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_3"></aside>
              <SubArticlesGrid data={data} category={'nyheder'} startIndex={4} endIndex={6} articleAmount={2} />
              <div className="mt-4 block">
                <ArticleHero data={data} startIndex={6} endIndex={7} />
              </div>
            </section>


            {/* Desktop */}
            <section className="md:inline-block hidden">
              <SubArticlesGrid data={data} category={'nyheder'} startIndex={0} endIndex={100} articleAmount={6}  />
              <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
              <SubArticlesGrid data={data} category={'spare-hacks'} startIndex={0} endIndex={100} articleAmount={6}  />
              <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
              <SubArticlesGrid data={data} category={'privatkonomi'} startIndex={0} endIndex={100} articleAmount={6}  />
            </section>

            
          </div>
      </section>
    </section>
  );
}
