/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Script from "next/script";
import React from "react";
import Link from "next/link";
import "@/app/stylesheets/articleText.css";

import { client, urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";

import SidebarSticky from "@/app/components/ArticleDisplaySystems/StaticSystems/SidebarSticky";
import SubArticlesListSmallOrderRelease from "@/app/components/ArticleDisplaySystems/StaticSystems/SubArticlesListSmallOrderRelease";
import PageViewTracker from "@/app/components/ArticleTools/PageViewTracker";
import { timeSinceText } from "@/app/components/ArticleTools/TimeSinceTag";
import Disclaimer from "@/app/components/ArticleTools/Disclaimer";
import SocialMediaShareButtons from "@/app/components/ArticleTools/SocialMediaShareButtons";

import FacebookTextBlock from "@/app/components/ArticleInTextBlocks/FacebookTextBlock";
import ImageTextBlock from "@/app/components/ArticleInTextBlocks/ImageTextBlock";
import TikTokTextBlock from "@/app/components/ArticleInTextBlocks/TikTokTextBlock";
import InstagramTextBlock from "@/app/components/ArticleInTextBlocks/InstagramTextBlock";
import YouTubeTextBlock from "@/app/components/ArticleInTextBlocks/YouTubeTextBlock";

import theme from "@/app/lib/theme.json";
export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { artikel: string };
}): Promise<Metadata> {
  const data: Article[] = await getData({ artikel: params.artikel });

  if (data.length > 0) {
    const article = data[0];
    return {
      title: article.title,
      description: article.teaser,
      keywords: article.tag.join(", "),
      openGraph: {
        title: article.title,
        description: article.teaser,
        url: `${theme.site_url}/artikel/${article.articleSlug}`,
        type: "article",
        siteName: theme.site_name,
        locale: "da_DK",
        images: [
          {
            url: urlFor(article.image)
              .format("webp")
              .width(400)
              .height(300)
              .fit("fill")
              .quality(85)
              .url(),
            width: 800,
            height: 600,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: theme.metadata.twitter.site,
        title: article.title,
        description: article.teaser,
        images: urlFor(article.image)
          .format("webp")
          .width(400)
          .height(300)
          .fit("fill")
          .quality(85)
          .url(),
      },
    };
  } else {
    console.log("Article data is undefined.");
    return {
      title: "Default Title",
    };
  }
}
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
export async function getData(params: { artikel: string }): Promise<Article[]> {
  const query = `
              *[
                _type == "article" && slug.current == "${params.artikel}"
              ] 
              | order(_createdAt desc) {
                _id,
                _createdAt,
                _type,
                title,
                teaser,
                "articleSlug": slug.current,
                overview,
                "image": metaImage.asset,
                "source": metaImage.asset->description,
                "category": details.category->name,
                "categorySlug": details.category->slug.current,
                "tag": tag[]->name,
                "tagSlug": tag[]->slug.current,
                "JournalistName": details.journalist->name,
                "JournalistSlug": details.journalist->slug.current,
                disclaimer,
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
/*                        RELATED ARTICLES COMPONENT                          */
/* -------------------------------------------------------------------------- */
async function fetchRelatedArticles(articleIds: string[]): Promise<Article[]> {
  const query = `
    *[_type == "article" && _id in $articleIds] {
      _id,
      _createdAt,
      _type,
      title,
      "articleSlug": slug.current,
      "image": metaImage.asset,
      "category": details.category->name,
    }
  `;
  console.log("articleIds", query);
  try {
    const data = await client.fetch<Article[]>(query, { articleIds });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    throw error;
  }
}

export default async function artikel({
  params,
}: {
  params: { artikel: string };
}) {
  const data: Article[] = await getData({ artikel: params.artikel });

  const isClient = typeof window !== "undefined";

  await generateMetadata({ params });

  const mainArticle = data[0];
  const readMoreBlock = mainArticle.overview.find(
    (block: any) => block._type === "readMore"
  );
  const articleIds = readMoreBlock?.articles.map(
    (article: any) => article._ref
  );

  const relatedArticles: any = articleIds
    ? await fetchRelatedArticles(articleIds)
    : [];

/* -------------------------------------------------------------------------- */
/*                           ARTICLE IMAGE COMPONENT                          */
/* -------------------------------------------------------------------------- */
  const SampleImageComponent = ({ value, isInline }: any) => {
    const imageAlt = value.alt || " ";
    return (
      <div className='w-full grid place-content-center'>
        <img
          src={urlFor(value)
            .image(value)
            .width(isInline ? 100 : 800)
            .fit("max")
            .auto("format")
            .format("webp")
            .width(400)
            .height(300)
            .fit("fill")
            .quality(85)
            .url()}
          alt={value.alt || " "}
          loading="lazy"
          style={{ display: isInline ? "inline-block" : "block" }}
        />
        {/* <p className="absolute text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
          Foto: {imageAlt}
        </p> */}
      </div>
    );
  };

 
  /* -------------------------------------------------------------------------- */
  /*                     READ MORE ARTICLES COMPONENTS                          */
  /* -------------------------------------------------------------------------- */
  const ReadMoreBlock = ({ value, relatedArticles }: any) => {
    const articlesToDisplay = relatedArticles.filter((article: any) =>
      value.articles.some((ref: any) => ref._ref === article._id)
    );
    return (
      <div className="my-8">
        <h2 className="text-2xl font-semibold">Læs også:</h2>
        <ul className="list-disc list-inside">
          {articlesToDisplay.map((post: any) => (
            <article
              key={post._id}
              className="relative isolate flex flex-col gap-8 lg:flex-row mb-8"
            >
              <Link href={`/artikel/${post.articleSlug}`}>
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-16 lg:shrink-0">
                  <div
                    className="block absolute rounded-2xl inset-0 bg-second_color_light dark:bg-second_color_dark rounded-t-lg bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${urlFor(post.image)
                        .format("webp")
                        .width(100)
                        .height(200)
                        .fit("fill")
                        .quality(85)
                        .url()})`,
                    }}
                  ></div>
                </div>
              </Link>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post._createdAt} className="text-gray-500">
                    {timeSinceText({ date: post._createdAt })}
                  </time>
                  <Link
                    href={`/artikler/kategori/${post.categorySlug}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category}
                  </Link>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/artikel/${post.articleSlug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </ul>
      </div>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                             LOAD COMPONENTS                                */
  /* -------------------------------------------------------------------------- */
  const components = {
    types: {
      imageWithMetadata: SampleImageComponent,
      youTube: YouTubeTextBlock,
      tikTok: TikTokTextBlock,
      faceBook: FacebookTextBlock,
      instagram: InstagramTextBlock,
      readMore: (props: any) => (
        <ReadMoreBlock {...props} relatedArticles={relatedArticles as any} />
      ),
    },
  };

  return (
    <>
      <div className="  m-auto ">
        {data.length > 0 ? (
          <>
            <Script
              src="https://www.tiktok.com/embed.js"
              strategy="afterInteractive"
            />
            <section className="bg-main_color_light dark:bg-main_color_dark pt-3 lg:pt-8 articleSection ">
              <div className="container px-3 lg:px-6  pt-0 mx-auto articleContent grid md:grid-cols-[auto_1fr] gap-6 ">
                {/* <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p> */}
                <div className="grid-cols-1">
                  {data.map((article) => (
                    <div key={article._id} className="w-full rounded-lg">
                      <meta name="article:section" content={article.category} />
                      <div className="grid px-3 ">
                        <Link
                          href={`/artikler/kategori/${article.categorySlug}`}
                        >
                          <button className="text-accent_color_light dark:text-accent_color_dark font-bold uppercase text-xs lg:text-lg rounded-lg">
                            {article.category}
                          </button>
                        </Link>
                      </div>
                      <h1 className="text-3xl lg:text-5xl font-bold my-1 px-3 lg:my-2">
                        {article.title}
                      </h1>
                      <div className="py-1 lg:py-4">
                        <Link
                          href={`/artikler/journalist/${article.JournalistSlug}`}
                        >
                          <div className="flex items-center space-x-2 p-2 mt-1 md:mt-2 border-t-2 border-gray-200">
                            <div>
                              <time
                                dateTime={article._createdAt}
                                className=" hidden md:block text-xs"
                              >
                                {timeSinceText({ date: article._createdAt })}
                              </time>
                              <p className="text-fade_color_light lg:mt-2 dark:text-fade_color_dark font-semibold text-xs lg:text-md">
                                Skrevet af:{" "}
                                <b className="text-text_second_color_dark dark:text-text_second_color_dark text-xs lg:text-md">
                                  {article.JournalistName}
                                </b>
                              </p>
                              <p className="text-gray-300 font-semibold text-xs">
                                {new Date(
                                  article._createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="relative px-3">
                        <div
                          className="block w-full h-[14em] md:h-[25em] bg-gray-300 rounded-t-lg bg-center bg-cover"
                          style={{
                            backgroundImage: `url(${urlFor(article.image)
                              .format("webp")
                              .width(700)
                              .height(400)
                              .fit("fill")
                              .quality(85)
                              .url()})`,
                          }}
                        ></div>
                        <p className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50 ">
                          Foto: {article.source}
                        </p>
                      </div>
                      <div className="my-0 lg:my-2 px-3">
                        <span className="text-xs lg:text-sm">
                          Artiklens Tags:{" "}
                        </span>
                        {article.tag.map((tag, index) => (
                          <React.Fragment key={index}>
                            {index > 0 ? ", " : ""}{" "}
                            <Link
                              href={`/artikler/tag/${article.tagSlug[index]}`}
                            >
                              <button className="text-xs lg:text-sm text-fade_color_light dark:text-fade_color_dark rounded-lg">
                                {tag}
                              </button>
                            </Link>
                          </React.Fragment>
                        ))}
                      </div>
                      <h2 className="text-md lg:text-3xl font-semibold my-2 mb-4 lg:my-4 px-3">
                        {article.teaser}
                      </h2>
                      <div id="div-InText_1"></div>

                      <div className="articleText leading-8 px-3 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                        <PortableText
                          value={article.overview}
                          components={components}
                          relatedArticles={relatedArticles as any}
                        />
                      </div>
                      <SocialMediaShareButtons
                        articleUrl={`https://pengehjørnet.dk/artikel/${article.articleSlug}`}
                      />
                      {article.disclaimer && <Disclaimer />}
                      <SubArticlesListSmallOrderRelease />
                    </div>
                  ))}
                </div>
                <SidebarSticky />
              </div>
            </section>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {console.log("isClient:", isClient)}
      {data.length > 0 && <PageViewTracker articleId={data[0]._id} />}
    </>
  );
}

export const runtime = "edge";
