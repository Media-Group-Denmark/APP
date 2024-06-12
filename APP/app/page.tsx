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
      <section className=" grid md:grid-cols-[auto_1fr] mx-auto ">
        <div className="container px-2 md:px-6 py-10 pt-0  max-w-[1000px]">
          <div>
            {/* Both */}
            <ArticleHero data={data} startIndex={0} endIndex={1} />
            <div id='div-Mobile_InFeed_1'></div>

            {/* Phone */}
            <div className="inline-block md:hidden">
              <TrendingArticlesList
                dayInterval={14}
                startIndex={0}
                endIndex={5}
              />
              <SubArticlesGrid data={data} startIndex={1} endIndex={3} />
              <div id='div-Mobile_InFeed_2'></div>
              <span className="mt-6 block">
                <ArticleHero data={data} startIndex={3} endIndex={4} />
              </span>
              <SubArticlesGrid data={data} startIndex={4} endIndex={6} />
              <span className="mt-4 block">
                <ArticleHero data={data} startIndex={6} endIndex={7} />
              </span>
            </div>

            {/* Desktop */}
            <div className="md:inline-block hidden">
              <SubArticlesGrid data={data} startIndex={1} endIndex={7} />
              <div id="div-InText_1"></div>
            </div>

            <SubArticlesListSmall data={data} startIndex={7} endIndex={21} />
          </div>
        </div>
        <div className="hidden xl:inline-block">
          <TrendingArticlesList dayInterval={14} startIndex={0} endIndex={5} />
        </div>
      </section>
    </>
  );
}
