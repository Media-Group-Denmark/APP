/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "../../../lib/sanityclient";
import { Article } from "../../../models/article";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import SubArticlesListLarge from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListLarge";
import TrendingArticlesList from "@/app/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { journalist: string };
}): Promise<Metadata> {
  const data: Article[] = await getData({ journalist: params.journalist });
  if (data.length > 0) {
    const article = data[0];
    return {
      title: `${article.JournalistName} - Artikler og Indsigter | ${theme.site_name}`,
      description: Array.isArray(article.JournalistDetails)
        ? article.JournalistDetails.join(",")
        : article.JournalistDetails,
      keywords: `Journalist ${article.JournalistName} - Artikler og Indsigter, ${theme.site_name}`,
      openGraph: {
        title: `${article.JournalistName} | ${theme.site_name}`,
        description: `${article.JournalistDetails},`,
        url: `${theme.site_name}/artikler/journalist/${article.articleSlug}`,
        type: "profile",
        siteName: `${theme.site_name}`,
        locale: "da_DK",
        images: [
          {
            url: article.JournalistPhoto
              ? urlFor(article.JournalistPhoto)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()
              : `${theme.logo_public_url}`,
            width: 800,
            height: 600,
            alt: `Foto af ${article.JournalistName}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: `${theme.metadata.twitter.site}`,
        title: `${article.JournalistName} - Artikler og Indsigter | ${theme.site_name}`,
        description: `${article.JournalistDetails}`,
        images: article.JournalistPhoto
          ? urlFor(article.JournalistPhoto)
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
  journalist: string;
}): Promise<Article[]> {
  const query = `
        *[
          _type == "article" && details.journalist->slug.current == "${params.journalist}"
        ] 
        | order(_createdAt desc) [0...20] {
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
          "JournalistSlug": details.journalist->slug.current,
          "JournalistDetails": details.journalist->description
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
export default async function journalist({
  params,
}: {
  params: { journalist: string };
}) {
  const data: Article[] = await getData({ journalist: params.journalist });
  return (
    <>
      <>
        {data ? (
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
                      href="/sider/referencer/journalister"
                      className="text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 ml-1 md:ml-2 text-sm font-medium "
                    >
                      Journalister
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
                      {data[0].JournalistName}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </>
        ) : null}
      </>
      <section className=" grid md:grid-cols-[auto_1fr] mx-auto mt-4 ">
        <div className="container px-6 py-10 pt-0 max-w-[1000px]">
          <div>
            <div className="bg-second_color_light dark:bg-second_color_dark pb-12 rounded-2xl">
              <>
                {data ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-0 max-w-[1280px] m-auto p-6 pb-0  rounded-lg">
                      <div className="w-full  grid sm:grid-cols-[auto_1fr] sm:place-content-center">
                        <div>
                          <Image
                            className="object-center object-cover rounded-full h-24 w-24"
                            alt={data[0].JournalistName}
                            width={200}
                            height={200}
                            src={
                              data[0].JournalistPhoto
                                ? urlFor(data[0].JournalistPhoto)
                                    .format("webp")
                                    .width(400)
                                    .height(300)
                                    .fit("fill")
                                    .quality(85)
                                    .url()
                                : "/img/unisexAvatar.jpeg"
                            }
                          />
                        </div>
                        <div className="my-auto sm:ml-4">
                          <p className="text-xl  font-bold mb-2">
                            {data[0].JournalistName}
                          </p>
                          <p className="text-base text-fade_color_light dark:text-fade_color_dark font-normal">
                            Journalist
                          </p>
                        </div>
                      </div>
                      <div className="my-auto">
                        <PortableText value={data[0].JournalistDetails} />
                      </div>
                      <div></div>
                    </div>
                  </>
                ) : null}
              </>
              <div id='div-Mobile_Article_1'></div>
              <div id="div-InText_1"></div>
              <SubArticlesListLarge data={data} startIndex={0} endIndex={10} />
            </div>
          </div>
        </div>

        <TrendingArticlesList
          dayInterval={30}
          startIndex={0}
          endIndex={5}
          journalist={data[0].JournalistSlug}
        />
      </section>
    </>
  );
}
export const runtime = "edge";
