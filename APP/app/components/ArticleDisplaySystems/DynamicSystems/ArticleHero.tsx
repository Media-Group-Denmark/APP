import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import Link from "next/link";
import { SanityDocument } from "next-sanity";

interface ExtendedArticle extends SanityDocument {
  articleSlug: string;
  image: any;
  categorySlug: string;
  category: string;
  JournalistSlug: string;
  JournalistName: string;
  _createdAt: string;
  publishedAt: string;
}

const ArticleHero: React.FC<{
  data: ExtendedArticle[];
  startIndex: number;
  endIndex: number;
}> = ({ data, startIndex, endIndex }) => {
  return (
    <>
      {data.slice(startIndex, endIndex).map((article, index) => (
        <article
          key={article._id}
          className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
          <figure className="block w-full h-[12em] md:h-[20em] rounded-t-lg overflow-hidden">
            <Link href={`/artikel/${article.articleSlug}`}>
              <img
                src={urlFor(article.image)
                  .format("webp")
                  .width(900)
                  .height(600)
                  .fit("fill")
                  .quality(85)
                  .url()}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </Link>
          </figure>

          <div className="px-4 pb-4">
            <header className="grid grid-rows-[auto_1fr_auto] h-[150px] md:h-[170px]">
              <Link href={`/artikler/kategori/${article.categorySlug}`}>
                <button className="text-accent_color_light dark:text-accent_color_dark bg-opacity-90 py-2 text-md rounded-tl-lg rounded-br-lg">
                  {article.category}
                </button>
              </Link>
              <Link href={`/artikel/${article.articleSlug}`}>
                <h1 className="text-2xl md:text-4xl font-semibold rounded-lg">
                  {article.title}
                </h1>
              </Link>
            </header>
            <footer className="flex gap-2 mt-2">
              <address>
                <Link
                  className="text-sm text-fade_color_light dark:text-fade_color_dark"
                  rel="author"
                  href={`/artikler/journalist/${article.JournalistSlug}`}
                >
                  {article.JournalistName}
                </Link>
              </address>
              <time className="rounded-lg">
                {timeSinceText({ date: article.publishedAt })}
              </time>
            </footer>
          </div>
        </article>
      ))}
    </>
  );
};

export default ArticleHero;
