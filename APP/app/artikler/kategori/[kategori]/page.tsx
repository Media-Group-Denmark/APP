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
  const query = `
        *[
          _type == "article" && details.category->slug.current == "${params.kategori}"
        ]
        | order(_createdAt desc) [0...20]
          {
          _id,
          _createdAt,
          _type,
          title,
          teaser,
          "articleSlug": slug.current,
          "image": metaImage.asset,
          "category": details.category->name,
          "categorySlug": details.category->slug.current,
          "tag": tag[]->name,
          "JournalistName": details.journalist->name,
          "JournalistPhoto": details.journalist->image,
          "JournalistSlug": details.journalist->slug.current
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
    <>
      <nav
        className="flex px-3 md:px-8 max-w-[1280px] m-auto text-fade_color_light dark:text-fade_color_dark py-6 pt-6 rounded-lg "
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

      <section className=" grid md:grid-cols-[auto_1fr] mx-auto ">
        <div className="container px-3 md:px-6 py-10 pt-0 max-w-[1000px]">
          <div>
            {/* Both */}
            <ArticleHero data={data} startIndex={0} endIndex={1} />
            <div id='div-Mobile_Article_1'></div>
            
            {/* Phone */}
            <div className="inline-block md:hidden">
              <TrendingArticlesList
                dayInterval={30}
                startIndex={0}
                endIndex={5}
                category={data[0].categorySlug}
              />
              <SubArticlesGrid data={data} startIndex={1} endIndex={3} />
              <div id='div-Mobile_Article_2'></div>
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
          <TrendingArticlesList
            dayInterval={30}
            startIndex={0}
            endIndex={5}
            category={data[0].categorySlug}
          />
        </div>
      </section>
    </>
  );
}
export const runtime = "edge";
