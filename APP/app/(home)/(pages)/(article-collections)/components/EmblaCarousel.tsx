"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArticleModel } from "../models/article";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { timeSinceText } from "../../artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "./FilterArticles";
import Image from "next/image";
import NameTag from "@/app/(home)/components/NameTag/NameTag";

export function EmblaCarousel({
  data,
  startIndex,
  endIndex,
  articleAmount,
  nameTag,
  category,
  tag,
  journalist,
  dayInterval,
  EmblaCarousel,
  fontStyles,
  mediaSize,
  contentHeight,
}: {
  data: ArticleModel[];
  startIndex: number;
  endIndex: number;
  articleAmount: number;
  nameTag?: { name: string; tag: boolean };
  category?: string;
  tag?: string;
  journalist?: string;
  dayInterval?: number;
  EmblaCarousel?: string;
  fontStyles: string;
  mediaSize?: {
    Figure?: {
      figureDesktopHeight?: string | undefined;
      figureMobileHeight?: string | undefined;
    };
    Image?: {
      imgWidth?: number;
      imgHeight?: number;
      quality?: number;
      lazyLoading?: boolean;
      responsive: string;
    };
  };
  contentHeight?: string;
}) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const slicedData = filterAndSliceArticles(
    data,
    category,
    tag,
    journalist,
    dayInterval,
    startIndex,
    endIndex
  );

  return (
    <section>
      {nameTag?.tag && (
        <NameTag
          name={nameTag.name}
          category={category}
          tag={tag}
          journalist={journalist}
        />
      )}
      <div className="embla mt-4 pb-4" ref={emblaRef}>
        <div className="embla__container">
          {slicedData
            .map((post, index) => (
              <article
                key={post._id}
                className={`embla__slide ${EmblaCarousel} shadow-sm bg-second_color_light dark:bg-second_color_dark mr-4 rounded-lg relative`}
              >
                <figure
                  className={`block rounded-t-lg overflow-clip 
                              ${
                                mediaSize?.Figure.figureDesktopHeight ||
                                "md:h-[10em]"
                              } 
                              ${
                                mediaSize?.Figure.figureMobileHeight ||
                                "md:h-[8em]"
                              }`}
                >
                  <ArticleLink
                    aria-label="Læs mere om artiklen"
                    href={
                      post._type === "msnScrollFeed"
                        ? `/guide/${post.articleSlug}`
                        : `/artikel/${
                            post.republishArticle && post.newSlug
                              ? post.newSlug
                              : post.articleSlug
                          }`
                    }
                  >
                    <Image
                      className="group-hover:scale-[1.01] transition-transform duration-[15s] ease-linear"
                      src={urlFor(post.image)
                        .format("webp")
                        .width(mediaSize?.Image?.imgWidth || 400)
                        .height(mediaSize?.Image?.imgHeight || 300)
                        .fit("fill")
                        .quality(mediaSize?.Image?.quality || 85)
                        .url()}
                      alt={post.title}
                      width={mediaSize?.Image?.imgWidth || 400}
                      height={mediaSize?.Image?.imgHeight || 300}
                      sizes={mediaSize?.Image?.responsive}
                      {...(mediaSize?.Image?.lazyLoading === false
                        ? index === 0
                          ? { priority: true }
                          : { loading: "lazy" }
                        : { loading: "lazy" })}
                    />
                  </ArticleLink>
                </figure>
                <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] mx-2 md:mx-4 mb-4">
                  <aside className="sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
                    <ArticleLink href={`/kategori/${post.categorySlug}`}>
                      <p className="relative text-sm w-fit rounded-full py-1 my-1 font-medium text-accent_color_light dark:text-accent_color_dark hover:text-black dark:hover:text-gray-300">
                        {post.category}
                      </p>
                    </ArticleLink>
                    <time
                      className="rounded-lg sm:my-auto my-1 sm:ml-auto text-xs hidden md:inline-block"
                      dateTime={post.publishedAt}
                    >
                      {timeSinceText({ date: post.publishedAt })}
                    </time>
                  </aside>
                  <header className={contentHeight ? contentHeight : "pb-4"}>
                    <ArticleLink
                      href={`/artikel/${
                        post.republishArticle && post.newSlug
                          ? post.newSlug
                          : post.articleSlug
                      }`}
                    >
                      <h1
                        className={
                          fontStyles
                            ? fontStyles
                            : "text-md md:text-lg leading-4 md:leading-6 font-bold"
                        }
                      >
                        {post.title}
                      </h1>
                    </ArticleLink>
                  </header>
                </div>
              </article>
            ))
            .slice(0, articleAmount)}
        </div>
      </div>
    </section>
  );
}
