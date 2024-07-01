/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client } from "./lib/sanityclient";
import { Article } from "./models/article";
import type { Metadata } from "next";
import SubArticlesListSmall from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import SubArticlesGrid from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import ArticleHero from "./components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import TrendingArticlesList from "./components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import TopNewsSlider from "./components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import theme from "@/app/lib/theme.json";
import TrendingArticlesListAltOmKendte from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
import SubArticlesListSmallOrderRelease from "./components/ArticleDisplaySystems/StaticSystems/SubArticlesListSmallOrderRelease";
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
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
async function getData() {
  const query = `
  *[
    _type == "article"
  ] 
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    "articleSlug": slug.current,
    "image": metaImage.asset,
    "category": category->name,
    "categorySlug": category->slug.current,
    "tag": tag[]->name,
    "tagSlug": tag[]->slug.current,
    "JournalistName": journalist->name,
    "JournalistPhoto": journalist->image,
    "JournalistSlug": journalist->slug.current,
    views
  }`;
  const data = await client.fetch(query);
  //console.log(data);
  return data;
}
/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const data: Article[] = await getData();

  return (
    <>
      <TopNewsSlider
        data={data}
        dayInterval={14}
        startIndex={0}
        endIndex={12}
        category=""
        tag=""
        journalist=""
        articles={data}
      />
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="container md:px-6 py-10 pt-0 m-auto ">
          <div>

            {/* Both */}
            <div className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <ArticleHero data={data} startIndex={0} endIndex={1} />
                <span className="hidden lg:inline-block">
                  <SubArticlesListWide category={'nyheder'} startIndex={1} endIndex={3} />
                </span>
              </div>
              <div className="hidden w-[280px] lg:inline-block">
                <TrendingArticlesListAltOmKendte
                dayInterval={14}
                startIndex={0}
                endIndex={5}
                 />
              </div>
            </div>

            <div className=" block md:hidden" id="div-Mobile_InFeed_1"></div>
            <div className="hidden md:block" id="div-InText_1"></div>

            {/* Phone */}
            <div className="grid gap-4 md:hidden">
            <TrendingArticlesListAltOmKendte
                dayInterval={14}
                startIndex={0}
                endIndex={5}
                 />
              <SubArticlesGrid category={'nyheder'}  startIndex={1} endIndex={3} />
              <div id="div-Mobile_InFeed_2"></div>
              <span className="mt-6 block">
                <ArticleHero data={data} startIndex={3} endIndex={4} />
              </span>
              <SubArticlesGrid category={'aktier'} startIndex={4} endIndex={6} />
              <span className="mt-4 block">
                <ArticleHero data={data} startIndex={6} endIndex={7} />
              </span>
            </div>


            {/* Desktop */}
            <div className="md:inline-block hidden">
              <SubArticlesGrid category={'aktier'} startIndex={1} endIndex={7} />
              <div id="div-InText_1"></div>
              <SubArticlesGrid category={'spare-hacks'} startIndex={1} endIndex={7} />
              <SubArticlesGrid category={'privatokonomi'} startIndex={1} endIndex={7} />
            </div>

            <SubArticlesListSmall data={data} startIndex={7} endIndex={21} />
          </div>
        </div>
      </section>
    </>
  );
}
