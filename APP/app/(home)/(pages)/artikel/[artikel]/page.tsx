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
import LoadReadPeak from "@/app/(home)/components/AdScripts/LoadReadPeak";
import LoadShowHeroes from "@/app/(home)/components/AdScripts/LoadShowHeroes";
import articleSchema from "../meta/articleSchema";
export const revalidate = 6000;



async function fetchArticleData(slug: string) {
  const articleData: singleArticle = await getArticleSingleData(slug);
  return articleData;
}


/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }: { params: { artikel: string } }) {
  const article = await fetchArticleData(params.artikel);
  const metadata: Metadata = await generateArticleMetadata(article);
  return metadata;
}

/* -------------------------------------------------------------------------- */
/*                                 CONTENT                                    */
/* -------------------------------------------------------------------------- */
export default async function artikel({
  params,
}: {
  params: { artikel: string };
}) {
  const mainArticle = await fetchArticleData(params.artikel);

  const jsonLd = articleSchema({ mainArticle, params: params.artikel });
  
  const isClient = typeof window !== "undefined";
  
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

  return (
    <section className="bg-[#fff] dark:bg-main_color_dark border-y-2 border-gray-100 md:pt-4 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

                    <aside>
                      <LoadShowHeroes />
                   {/*    <figure className="relative h-[10em] md:h-[25em]  aspect-w-16 aspect-h-9 overflow-clip">
  <picture>
    <source
      srcSet={`${urlFor(mainArticle.image).width(800).height(450).format('webp').quality(50).url()} 800w,
               ${urlFor(mainArticle.image).width(480).height(270).format('webp').quality(50).url()} 480w`}
      sizes="(max-width: 800px) 100vw, 800px"
      type="image/webp"
    />
    <img
      src={urlFor(mainArticle.image)
        .width(800)
        .height(450)
        .format("webp")
        .quality(50)
        .url()}
      sizes="(max-width: 800px) 100vw, 800px"
      width="800"
      height="450"
      alt={`Billede af ${mainArticle.source}`}
      className="w-full h-full rounded-t-lg object-cover"
      loading="lazy"
    />
  </picture>
  <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
    Foto: {mainArticle?.source || 'Shutterstock.com'}
  </figcaption>
</figure> */}
<figure className="relative h-[10em] md:h-[25em] overflow-clip">
  <picture>
    <source
      srcSet={`${urlFor(mainArticle.image)
        .width(800)
        .height(450)
        .format('webp')
        .quality(50)
        .url()} 800w,
        ${urlFor(mainArticle.image)
        .width(480)
        .height(270)
        .format('webp')
        .quality(50)
        .url()} 480w`}
      sizes="(max-width: 800px) 100vw, 800px"
      type="image/webp"
    />
    <source
      srcSet={`${urlFor(mainArticle.image)
        .width(800)
        .height(450)
        .format('webp')
        .quality(60)
        .url()} 800w,
        ${urlFor(mainArticle.image)
        .width(480)
        .height(270)
        .format('webp')
        .quality(60)
        .url()} 480w`}
      sizes="(max-width: 800px) 100vw, 800px"
      type="image/jpeg"
    />
    <img
      src={urlFor(mainArticle.image)
        .width(800)
        .height(450)
        .format("webp")
        .quality(60)
        .url()}
      sizes="(max-width: 800px) 100vw, 800px"
      width="800"
      height="450"
      alt={`Billede af ${mainArticle.source}`}
      className="w-full h-auto rounded-t-lg object-cover"
    />
  </picture>
  <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
    Foto: {mainArticle?.source || 'Shutterstock.com'}
  </figcaption>
</figure>


                    </aside>

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
                  <div className="my-2 px-3 mt-12">
                      <span className="text-xs lg:text-sm">
                        Artiklens Tags:{" "}
                      </span>
                      {mainArticle.tag?.map((tag, index) => (
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
                  <div className="disclaimer">{mainArticle.disclaimer && <Disclaimer />}</div>
                </article>
              </div>
            </div>
            <LoadReadPeak />
            <LoadStrossle />
          </>
        ) : null}
      </section>
      {mainArticle && <PageViewTracker articleId={mainArticle._id} />}
    </section>
  );
}

export const runtime = "edge";
