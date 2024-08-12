import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import Link from "next/link";
import Image from "next/image";
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
            <Link aria-label="Læs mere om artiklen" href={`/artikel/${article.articleSlug}`}>
              <Image
               src={urlFor(article.image).url()} 
               alt={article.title}
               layout="responsive"
               width={900}
               height={600}
               sizes="(max-width: 768px) 100vw, 900px"
               quality={85}
             />
            </Link>
          </figure>

          <div className="px-4 pb-4">
            <header className="grid grid-rows-[auto_1fr_auto] h-[150px] md:h-[170px]">
              <Link href={`/artikler/kategori/${article.categorySlug}`}>
                <p className="relative text-sm z-10 w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                  {article.category}
                </p>
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
                  className="text-sm py-2 text-fade_color_light dark:text-fade_color_dark"
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
