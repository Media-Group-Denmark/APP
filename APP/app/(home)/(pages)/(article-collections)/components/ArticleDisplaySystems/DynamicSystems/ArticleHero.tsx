import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import Image from "next/image";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";

const ArticleHero: React.FC<{
  data: Article[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> = async ({
  data,
  category,
  tag,
  journalist,
  dayInterval,
  startIndex,
  endIndex,
}) => {
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
    <>
    {slicedData.map((post: Article) => (
      <article
      key={post._id}
      className="flex justify-center items-center col-span-2 my-6"
    >
      <ArticleLink
        href={`/artikel/${
          post.republishArticle && post.newSlug
            ? post.newSlug
            : post.articleSlug
        }`}
        aria-label={`Læs mere om ${post.title}`}
        className="mb-4"
      >
        <div className="max-w-[720px] mx-auto">
          <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md bg-clip-border rounded-xl w-full">
            <div className="relative h-[20em] mx-4 -mt-6 overflow-hidden shadow-lg rounded-xl">
              <img
                src={urlFor(post.image)
                  .format("webp")
                  .width(600)
                  .height(400)
                  .fit("fill")
                  .quality(85)
                  .url()}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Kategori Badge */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            <div className="p-6">
              <h1 className="block mb-4 font-sans text-2xl md:text-3xl font-extrabold leading-snug tracking-normal text-main_color_dark dark:text-main_color_light">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <ArticleLink
                  href={`/journalist/${post.JournalistSlug}`}
                  rel="author"
                  className="flex items-center"
                >
                  <span className="mr-2">Af</span>
                  <span className="font-medium">{post.JournalistName}</span>
                </ArticleLink>
                <span className="mx-2">•</span>
                <time>{timeSinceText({ date: post.publishedAt })}</time>
              </div>
            </div>
          </div>
        </div>
      </ArticleLink>
    </article>
    
    ))}
  </>
  
  );
};

export default ArticleHero;


{/* <article
        key={post._id}
        className="col-span-2 my-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-1"
      >
        <ArticleLink
          href={`/artikel/${
            post.republishArticle && post.newSlug
              ? post.newSlug
              : post.articleSlug
          }`}
          aria-label={`Læs mere om ${post.title}`}
          className="block"
        >
          <figure className="relative">
            <img
              src={urlFor(post.image)
                .format("webp")
                .width(600)
                .height(400)
                .fit("fill")
                .quality(85)
                .url()}
              alt={post.title}
              className="w-full max-h-[20em] object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full">
              {post.category}
            </div>
          </figure>
          <div className="p-6">
            <h1 className="text-2xl md:text-[2em] leading-snug font-extrabold text-main_color_dark dark:text-main_color_light mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <ArticleLink
                href={`/journalist/${post.JournalistSlug}`}
                rel="author"
                className="flex items-center"
              >
                <span className="mr-2">Af</span>
                <span className="font-medium">{post.JournalistName}</span>
              </ArticleLink>
              <span className="mx-2">•</span>
              <time>{timeSinceText({ date: post.publishedAt })}</time>
            </div>
          </div>
        </ArticleLink>
      </article> */}