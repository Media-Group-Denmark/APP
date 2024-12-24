"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArticleModel } from "../models/article";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { timeSinceText } from "../../artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "./FilterArticles";

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
  EmblaCarousel
}: {
  data: ArticleModel[];
  startIndex: number;
  endIndex: number;
  articleAmount: number;
  nameTag?: { name: string; tag: boolean };
  category?: string;
  tag?: string,
  journalist?: string,
  dayInterval?: number,
  EmblaCarousel?: string
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
  console.log(EmblaCarousel, 'asdfasdfsda')
  return (
    <section>
      {nameTag?.tag && (
        <p className="lineHeader text-center text-[0.95rem] font-bold md:mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1 uppercase">
            {nameTag.name ? nameTag.name : "Alle Nyheder"}
          </span>
        </p>
      )}
      <div className="embla mt-4 pb-4" ref={emblaRef}>
        <div className="embla__container">
          {slicedData
            .map((post, index) => (
              <article
                key={post._id}
                className={`embla__slide ${EmblaCarousel} shadow-sm bg-second_color_light dark:bg-second_color_dark mr-4 rounded-lg relative`}
              >
                <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg overflow-clip">
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
                    <img
                      width={400}
                      height={300}
                      src={urlFor(post.image)
                        .format("webp")
                        .width(400)
                        .height(300)
                        .fit("fill")
                        .quality(85)
                        .url()}
                      loading="lazy"
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </ArticleLink>
                </figure>
                <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mx-2 md:mx-4 mb-4">
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
                  <header>
                    <ArticleLink
                      href={`/artikel/${
                        post.republishArticle && post.newSlug
                          ? post.newSlug
                          : post.articleSlug
                      }`}
                    >
                      <h1 className="text-sm md:text-lg font-bold py-0 rounded-lg">
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
