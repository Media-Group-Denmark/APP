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
import ReadMoreArticlesBlock from "@/app/components/ArticleInTextBlocks/ReadMoreArticleBlocks/ReadMoreArticlesBlock";
import ReadMoreAutomaticArticlesBlock from "@/app/components/ArticleInTextBlocks/ReadMoreArticleBlocks/ReadMoreAutomaticArticlesBlock";

import theme from "@/app/lib/theme.json";
import MobileSocialMediaShareButtons from "@/app/components/ArticleTools/MobileSocialMediaShareButtons";
import NotFound from "@/app/not-found";
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
              | order(coalesce(publishedAt, _createdAt) desc) {
                _id,
                _createdAt,
                _type,
                title,
                teaser,
                publishedAt,
                "articleSlug": slug.current,
                overview,
                views,
                "image": metaImage.asset,
                "source": metaImage.asset->description,
                "category": category->name,
                "categorySlug": category->slug.current,
                "tag": tag[]->name,
                "tagSlug": tag[]->slug.current,
                "JournalistName": journalist->name,
                "JournalistSlug": journalist->slug.current,
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
/*                                 CONTENT                                    */
/* -------------------------------------------------------------------------- */
export default async function artikelPreview({
  params,
}: {
  params: { artikel: string };
}) {
  const data: Article[] = await getData({ artikel: params.artikel });
  const mainArticle = data[0];
  
  const isClient = typeof window !== "undefined";
  
  await generateMetadata({ params });
  
  /* -------------------------------------------------------------------------- */
  /*                             LOAD COMPONENTS                                */
  /* -------------------------------------------------------------------------- */
  const components = {
    types: {
      imageWithMetadata: (props: any) => <ImageTextBlock {...props} />,
      youTube: YouTubeTextBlock,
      tikTok: TikTokTextBlock,
      faceBook: FacebookTextBlock,
      instagram: InstagramTextBlock,
      readMore: (props: any) => (
        <ReadMoreArticlesBlock mainArticle={mainArticle} />
      ),
      readMoreAutomatic: (props: any) => (
        <ReadMoreAutomaticArticlesBlock articleTitle={mainArticle.title} articleCategory={mainArticle.category} />
      ),
    },
  };

  return (
    <main className="bg-[#fff] dark:bg-main_color_dark border-y-2 border-gray-100 ">
        <p className="bg-red-200 font-mulish text-center py-8 text-3xl">Denne artikel er i <span className="font-extrabold">Preview mode</span> og er ikke udgivet endnu</p>
      <section className="m-auto">
        {data.length > 0 ? (
          <>
            <Script
              src="https://www.tiktok.com/embed.js"
              strategy="afterInteractive"
            />
            <div className="py-3 rounded-lg lg:py-8 articleSection ">
              <div className="containerr lg:px-6 grid-cols-1 pt-0 mx-auto articleContent grid gap-6 ">
                  {data.map((article) => (
                    <article key={article._id} className="w-full rounded-lg">
                      <meta name="article:section" content={article.category} />
                      <section>
                        <div className="grid ">
                          <ArticleLink
                            href={`/artikler/kategori/${article.categorySlug}`}
                          >
                            <button className="text-accent_color_light dark:text-accent_color_dark font-bold uppercase text-md lg:text-xl rounded-lg">
                              {article.category}
                            </button>
                          </Link>
                        </div>
                        <header>
                          <h1 className="text-xl lg:text-4xl font-extrabold my-1 lg:my-2">
                            {article.title}
                          </h1>
                        </header>
                        <footer className="py-1 lg:py-4">
                            <div className="items-center p-2 mt-1 md:mt-2 border-t-2 border-gray-200">
                                <time
                                  dateTime={article.publishedAt}
                                  className=" hidden md:block text-xs"
                                > Udgivelse sat til kl.
                                  {new Intl.DateTimeFormat('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date(article.publishedAt))}
                                </time>
                                
                               <div className="flex gap-x-2 lg:mt-2 align-middle">
                               <ArticleLink
                               rel="author"
                                 href={`/artikler/journalist/${article.JournalistSlug}`}
                               >
                                  <p className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs lg:text-md">
                                    Skrevet af:{" "}
                                    <b className="text-text_second_color_dark dark:text-text_second_color_dark text-xs lg:text-md">
                                      {article.JournalistName}
                                    </b>
                                  </p>
                                    </Link>
                                  <time className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs ">
                                    D. {new Date(
                                      article.publishedAt
                                    ).toLocaleDateString()}
                                  </time>
                              </div>
                            </div>
                        </footer>
                        <figure className="relative">
  <img
  width={700}
  height={400}
    src={urlFor(article.image)
      .format("webp")
      .width(700)
      .height(400)
      .fit("fill")
      .quality(85)
      .url()}
    alt={`Billede af ${article.source}`}
    className="block w-full h-[14em] md:h-[25em] bg-gray-300 rounded-t-lg object-cover"
  />
  <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
    Foto: {article.source}
  </figcaption>
</figure>

                        <div className="my-2 px-3">
                          <span className="text-xs lg:text-sm">
                            Artiklens Tags:{" "}
                          </span>
                          {article.tag.map((tag, index) => (
                            <React.Fragment key={index}>
                              {index > 0 ? " " : ""}{" "}
                              <ArticleLink
                                href={`/artikler/tag/${article.tagSlug[index]}`}
                              >
                                <button className="text-xs lg:text-sm text-fade_color_light dark:text-fade_color_dark relative rounded-full bg-gray-100 px-3 py-1.5 font-medium hover:bg-gray-100">
                                  {tag}
                                </button>
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                        <h2 className="text-md lg:text-2xl font-semibold my-2 mb-4 lg:my-4 px-3">
                          {article.teaser}
                        </h2>
                      </section>
                      
                      <aside className="md:hidden" id='div-Mobile_Article_1'></aside>

                      <aside className="hidden md:grid" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_2"></aside>

                      <section className="articleText leading-8 px-3 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                        <PortableText
                          value={article.overview}
                          components={components}
                        />
                      </section>
                      <aside className="hidden md:grid" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
                      <section>
                        <SocialMediaShareButtons
                        views={`${article.views}`}
                          articleUrl={`${theme.site_url}/artikel/${article.articleSlug}`}
                        />
                        <MobileSocialMediaShareButtons
                        views={`${article.views}`}
                          articleUrl={`${theme.site_url}/artikel/${article.articleSlug}`}
                        />
                      </section>
                      {article.disclaimer && <Disclaimer />}
                      <SubArticlesListSmallOrderRelease />
                    </article>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </section>
      {data.length > 0 && <PageViewTracker articleId={data[0]._id} />}
    </main>
  );
}

export const runtime = "edge";
