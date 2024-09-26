import { Article } from "../../../models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";

const FindArticle: React.FC<{
  data: Article[];
  startIndex: number;
  endIndex: number;
}> = ({ data, startIndex, endIndex }) => {
  return (
    <section className="grid overflow-y-clip grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-4 lg:mt-0 relative">
      {data.slice(startIndex, endIndex).map((article, index) => (
        <article
          key={article._id}
          className="bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
          <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg overflow-clip">
            <ArticleLink
              aria-label="Læs mere om artiklen"
              href={`/artikel/${article.articleSlug}`}
            >
              <img
                width={400}
                height={300}
                src={urlFor(article.image)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </ArticleLink>
          </figure>
          <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mx-2 md:mx-4 mb-4 ">
            <footer className=" sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
              <ArticleLink href={`/kategori/${article.categorySlug}`}>
                <button className=" text-accent_color_light dark:text-accent_color_dark  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.85rem] rounded-full ">
                  {article.category}
                </button>
              </ArticleLink>
              <time className="rounded-lg sm:my-auto my-1 sm:ml-auto text-xs hidden md:inline-block ">
                {timeSinceText({ date: article.publishedAt })}
              </time>
            </footer>
            <ArticleLink href={`/artikel/${article.articleSlug}`}>
              <header className="grid ">
                <h1 className=" text-sm md:text-lg font-semibold py-0 rounded-lg ">
                  {article.title}
                </h1>
              </header>
            </ArticleLink>
          </div>
        </article>
      ))}
    </section>
  );
};

export default FindArticle;

