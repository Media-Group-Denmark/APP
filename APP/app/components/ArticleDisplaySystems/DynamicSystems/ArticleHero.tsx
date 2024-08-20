import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import Link from "next/link";
import Image from "next/image";
import { filterAndSliceArticles } from "@/app/lib/FilterArticles";

const ArticleHero: React.FC<{
  data: Article[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> =  async ({ data, category, tag, journalist, dayInterval, startIndex, endIndex }) => {

  const slicedData = filterAndSliceArticles(data, category, tag, journalist, dayInterval, startIndex, endIndex);
  return (
    <>
      {slicedData.map((post: Article) => (
        <article
          key={post._id}
          className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
          <figure className="block w-full h-[12em] md:h-[20em] rounded-t-lg overflow-hidden">
            <Link aria-label="Læs mere om artiklen" href={`/artikel/${post.articleSlug}`}>
              <Image
               src={urlFor(post.image).url()} 
               alt={post.title}
               layout="responsive"
               width={900}
               height={600}
               sizes="(max-width: 768px) 100vw, 900px"
               quality={85}
             />
            </Link>
          </figure>

          <div className="px-4 pb-4">
            <header className="grid grid-rows-[auto_1fr_auto] min-h-[170px]">
              <Link href={`/artikler/kategori/${post.categorySlug}`}>
                <p className="relative text-sm w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category}
                </p>
              </Link>
              <Link href={`/artikel/${post.articleSlug}`}>
                <h1 className="text-2xl md:text-[2.3em] leading-10 font-extrabold rounded-lg">
                  {post.title}
                </h1>
              </Link>
            </header>
            <footer className="flex gap-2 mt-2">
              <address>
                <Link
                  className="text-sm py-2 text-fade_color_light dark:text-fade_color_dark"
                  rel="author"
                  href={`/artikler/journalist/${post.JournalistSlug}`}
                >
                  {post.JournalistName}
                </Link>
              </address>
              <time className="rounded-lg">
                {timeSinceText({ date: post.publishedAt })}
              </time>
            </footer>
          </div>
        </article>
      ))}
    </>
  );
};

export default ArticleHero;
