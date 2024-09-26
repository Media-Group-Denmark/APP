/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Script from "next/script";
import React from "react";
import "../stylesheets/articleText.css";

import { urlFor } from "@/app/lib/sanityclient";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";

import PageViewTracker from "../components/ArticleTools/PageViewTracker";
import { timeSinceText } from "../components/ArticleTools/TimeSinceTag";
import Disclaimer from "../components/ArticleTools/Disclaimer";
import SocialMediaShareButtons from "../components/ArticleTools/SocialMediaShareButtons";

import FacebookTextBlock from "../components/ArticleInTextBlocks/FacebookTextBlock";
import ImageTextBlock from "../components/ArticleInTextBlocks/ImageTextBlock";
import TikTokTextBlock from "../components/ArticleInTextBlocks/TikTokTextBlock";
import InstagramTextBlock from "../components/ArticleInTextBlocks/InstagramTextBlock";
import YouTubeTextBlock from "../components/ArticleInTextBlocks/YouTubeTextBlock";
import ReadMoreArticlesBlock from "../components/ArticleInTextBlocks/ReadMoreArticleBlocks/ReadMoreArticlesBlock";
import IframeTextBlock from "../components/ArticleInTextBlocks/IframeTextBlock";

import theme from "@/app/lib/theme.json";
import MobileSocialMediaShareButtons from "../components/ArticleTools/MobileSocialMediaShareButtons";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { getArticleSingleData } from "../api/getArticleSingle";
import { singleArticle } from "../models/singleArticle";
import LoadStrossle from "@/app/(home)/components/AdScripts/LoadStrossle";
import dynamic from "next/dynamic";
import ReadMoreArticlesSkeleton from "../components/ArticleInTextBlocks/ReadMoreArticleBlocks/ReadMoreArticlesSkeleton";
import { generateArticleMetadata } from "../meta/generateArticleMetadata";

async function fetchArticleData(slug: string) {
  const articleData: singleArticle = await getArticleSingleData(slug);
  return articleData;
}

export const revalidate = 6000;

/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }: { params: { artikel: string } }) {
  const article = await fetchArticleData(params.artikel);
  const metadata: Metadata = await generateArticleMetadata(article);
  return metadata;
}

const DynamicScriptLoader = dynamic(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => (
          <Script
            src="https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y"
            data-wid="auto"
            type="text/javascript"
          />
        ));
      }, 5000); // 5 sekunders forsinkelse
    }).then((mod) => mod as React.ComponentType),
  {
    ssr: false, // Sørger for, at det kun loader på client side
  }
);


const DynamicReadMore = dynamic(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("../components/ArticleInTextBlocks/ReadMoreArticleBlocks/ReadMoreAutomaticArticlesBlock"));
      }, 5000); // 3 sekunders forsinkelse
    }).then((mod) => mod.default),
  {
    loading: () => <ReadMoreArticlesSkeleton />,
  }
);

/* -------------------------------------------------------------------------- */
/*                                 CONTENT                                    */
/* -------------------------------------------------------------------------- */
export default async function artikel({
  params,
}: {
  params: { artikel: string };
}) {
  const mainArticle = await fetchArticleData(params.artikel);

  const isClient = typeof window !== "undefined";


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
      iFrame: IframeTextBlock,
      readMore: (props: any) => (
        <ReadMoreArticlesBlock mainArticle={mainArticle} />
      ),
      readMoreAutomatic: (props: any) => (
        <DynamicReadMore
          articleTitle={mainArticle.title}
          articleCategory={mainArticle.category}
          currentArticleId={mainArticle._id}
        />
      ),
    },
  };

  {
    /* <ReadMoreAutomaticArticlesBlock articleTitle={cookies().get('name')} articleCategory={cookies().get('category')} currentArticleId={cookies().get('articleId')} /> */
  }
  return (
    <section className="bg-[#fff] dark:bg-main_color_dark border-y-2 border-gray-100 md:pt-4 ">
      <section className="m-auto">
        {mainArticle ? (
          <>
            <Script
              src="https://www.tiktok.com/embed.js"
              strategy="afterInteractive"
            />
            <div className="py-3 rounded-lg lg:py-8 articleSection ">
              <div className="containerr lg:px-6 grid-cols-1 pt-0 mx-auto articleContent grid gap-6 ">
                <article key={mainArticle._id} className="w-full rounded-lg">
                  <meta name="article:section" content={mainArticle.category} />
                  <section>
                    <div className="grid ">
                      <ArticleLink
                        href={`/kategori/${mainArticle.categorySlug}`}
                      >
                        <button className="text-accent_color_light dark:text-accent_color_dark font-bold uppercase text-md lg:text-xl rounded-lg">
                          {mainArticle.category}
                        </button>
                      </ArticleLink>
                    </div>
                    <header>
                      <h1 className="text-xl lg:text-4xl font-extrabold my-1 lg:my-2">
                        {mainArticle.title}
                      </h1>
                    </header>
                    <footer className="py-1 lg:py-4">
                      <div className="items-center p-2 mt-1 md:mt-2 border-t-2 border-gray-200">
                        <time
                          dateTime={mainArticle.publishedAt}
                          className=" hidden md:block text-xs"
                        >
                          {timeSinceText({ date: mainArticle.publishedAt })}
                        </time>

                        <div className="flex gap-x-2 lg:mt-2 align-middle">
                          <ArticleLink
                            rel="author"
                            href={`/journalist/${mainArticle.JournalistSlug}`}
                          >
                            <p className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs lg:text-md">
                              Skrevet af:{" "}
                              <b className="text-text_second_color_dark dark:text-text_second_color_dark text-xs lg:text-md">
                                {mainArticle.JournalistName}
                              </b>
                            </p>
                          </ArticleLink>
                          <time className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs ">
                            D.{" "}
                            {new Date(
                              mainArticle.publishedAt
                            ).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </footer>
                    <Script
                      src="https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y"
                      data-wid="auto"
                      type="text/javascript"
                      strategy="lazyOnload"
                    />
                    <DynamicScriptLoader />
                    <figure className="relative h-[14em] md:h-[25em] overflow-clip">
                      <Image
                        src={urlFor(mainArticle.image)
                          .format("webp")
                          .width(700)
                          .height(400)
                          .quality(100)
                          .url()}
                        alt={`Billede af ${mainArticle.source}`}
                        className="block w-full  bg-gray-300 rounded-t-lg object-cover"
                        loading="eager"
                        layout="fill"
                        priority={true}
                        sizes="(max-width: 800px) 100vw, 700px"
                      />
                      <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
                        Foto: {mainArticle.source}
                      </figcaption>
                    </figure>

                    <div className="my-2 px-3">
                      <span className="text-xs lg:text-sm">
                        Artiklens Tags:{" "}
                      </span>
                      {mainArticle.tag.map((tag, index) => (
                        <React.Fragment key={index}>
                          {index > 0 ? " " : ""}{" "}
                          <ArticleLink
                            href={`/tag/${mainArticle.tagSlug[index]}`}
                          >
                            <button className="text-xs lg:text-sm text-fade_color_light dark:text-fade_color_dark relative rounded-full bg-gray-100 px-3 py-1.5 font-medium hover:bg-gray-100">
                              {tag}
                            </button>
                          </ArticleLink>
                        </React.Fragment>
                      ))}
                    </div>
                    <h2 className="text-md lg:text-2xl font-semibold my-2 mb-4 lg:my-4 px-3">
                      {mainArticle.teaser}
                    </h2>
                  </section>

                  <aside
                    className="mobile md:hidden"
                    data-ad-unit-id={`/49662453/${theme.site_ad_name}/mobile_square_article_1`}
                  ></aside>

                  <aside
                    className="desktop hidden md:grid"
                    data-ad-unit-id={`/49662453/${theme.site_ad_name}/square_article_1`}
                  ></aside>

                  <section className="articleText leading-8 px-3 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                    <PortableText
                      value={mainArticle.overview}
                      components={components}
                    />
                  </section>
                  <section>
                    <SocialMediaShareButtons
                      views={`${mainArticle.views}`}
                      articleUrl={`${theme.site_url}/artikel/${mainArticle.articleSlug}`}
                    />
                    <MobileSocialMediaShareButtons
                      views={`${mainArticle.views}`}
                      articleUrl={`${theme.site_url}/artikel/${mainArticle.articleSlug}`}
                    />
                  </section>
                  {mainArticle.disclaimer && <Disclaimer />}
                </article>
              </div>
            </div>
            <LoadStrossle />
          </>
        ) : null}
      </section>
      {mainArticle && <PageViewTracker articleId={mainArticle._id} />}
    </section>
  );
}

export const runtime = "edge";
