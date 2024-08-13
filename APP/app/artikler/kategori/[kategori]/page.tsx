/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import Link from "next/link";
import { client, urlFor } from "../../../lib/sanityclient";
import { Article } from "../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import SubArticlesListSmall from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import TrendingArticlesList from "@/app/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import TopNewsSlider from "@/app/components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import TrendingArticlesListAltOmKendte from "@/app/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { kategori: string };
}): Promise<Metadata> {
  // Fetch data within the function
  const data: Article[] = await getData({ kategori: params.kategori });
  if (data.length > 0) {
    const article = data[0];
    //console.log("Article", article.title);
    return {
      title: `${article.category} - Artikler og Indsigter | ${theme.site_name}`,
      description: Array.isArray(article.teaser)
        ? article.teaser.join(",")
        : article.teaser,
      keywords: `Kategori ${article.category} - Artikler og Indsigter, ${theme.site_name}`,
      openGraph: {
        title: `${article.category} | ${theme.site_name}`,
        description: `${article.teaser},`,
        url: `${theme.site_name}/artikler/kategori/${article.categorySlug}`,
        type: "website",
        siteName: `${theme.site_name}`,
        locale: "da_DK",
        images: [
          {
            url: article.image
              ? urlFor(article.image)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()
              : `${theme.logo_public_url}`,
            width: 800,
            height: 600,
            alt: `Billede for kategori ${article.category}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: `${theme.metadata.twitter.site}`,
        title: `${article.category} - Artikler og Indsigter | ${theme.site_name}`,
        description: `${article.teaser}`,
        images: article.image
          ? urlFor(article.image)
              .format("webp")
              .width(400)
              .height(300)
              .fit("fill")
              .quality(85)
              .url()
          : `${theme.logo_public_url}`,
      },
      robots: "index, follow",
      publisher: `${theme.site_name}`,
    };
  } else {
    console.log("Article data is undefined.");
    return {
      title: "Default Title",
      robots: "noindex, nofollow", // Added robots meta tag
    };
  }
}
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
export async function getData(params: {
  kategori: string;
}): Promise<Article[]> {
  const today = new Date().toISOString();
  const query = `
        *[
          _type == "article" && publishedAt <= "${today}" && category->slug.current == "${params.kategori}"
        ]
        | order(coalesce(publishedAt, _createdAt) desc) [0...20]
          {
          _id,
          _createdAt,
          publishedAt,
          _type,
          title,
          teaser,
          "articleSlug": slug.current,
          "image": metaImage.asset,
          "category": category->name,
          "categorySlug": category->slug.current,
          "tag": tag[]->name,
          "JournalistName": journalist->name,
          "JournalistPhoto": journalist->image,
          "JournalistSlug": journalist->slug.current
        }`;
  try {
    const data = await client.fetch<Article[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function kategori({
  params,
}: {
  params: { kategori: string };
}) {
  const data: Article[] = await getData({ kategori: params.kategori });
  return (
    <main>
      <nav
        className="flex px-3 md:px-8 max-w-[1000px] m-auto text-fade_color_light dark:text-fade_color_dark py-6 pt-6 rounded-lg "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="text-sm text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 inline-flex items-center "
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Forside
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                href="/sider/referencer/kategorier"
                className="text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 ml-1 md:ml-2 text-sm font-medium "
              >
                Kategorier
              </Link>
            </div>
          </li>
          <li className=" cursor-default " aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-accent_color_light dark:text-accent_color_dark ml-1 md:ml-2 text-sm font-medium capitalize ">
                {params.kategori}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">

            {/* Both */}
            <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <ArticleHero data={data} startIndex={0} endIndex={1} />
                <aside className="hidden lg:inline-block">
                  <SubArticlesListWide category={data[0].categorySlug} startIndex={1} endIndex={3} />
                </aside>
              </div>
              <aside className="hidden w-[280px] lg:inline-block">
                <TrendingArticlesListAltOmKendte
                dayInterval={14}
                startIndex={0}
                endIndex={5}
                category={data[0].categorySlug}
                 />
              </aside>
            </section>

            <aside className=" md:hidden" id="div-Mobile_Square_1"></aside>
            <aside className="hidden md:block" id="div-Leaderboard_2"></aside>
            
            {/* Phone */}
            <section className="grid gap-4 md:hidden">
              <TrendingArticlesListAltOmKendte
                dayInterval={30}
                startIndex={0}
                endIndex={5}
                category={data[0].categorySlug}
              />
              <aside id="div-Mobile_Square_2"></aside>
              <SubArticlesGrid category={data[0].categorySlug} startIndex={1} endIndex={3} />
              <div className="mt-6 block">
                <ArticleHero data={data} startIndex={3} endIndex={4} />
              </div>
              <aside id="div-Mobile_Square_3"></aside>
              <SubArticlesGrid category={data[0].categorySlug} startIndex={4} endIndex={6} />
              <div className="mt-4 block">
                <ArticleHero data={data} startIndex={6} endIndex={7} />
              </div>
            </section>




            {/* Desktop */}
            <section className="md:inline-block hidden">
              <SubArticlesGrid category={data[0].categorySlug}  startIndex={3} endIndex={9} />
              <aside className="hidden md:block" id="div-Leaderboard_3"></aside>
              <SubArticlesGrid category={'spare-hacks'} startIndex={1} endIndex={7} />
              <SubArticlesGrid category={'privatokonomi'} startIndex={1} endIndex={7} />
            </section>
            <SubArticlesListSmall data={data} startIndex={7} endIndex={21} />
        </div>
      </section>
    </main>
  );
}
export const runtime = "edge";
