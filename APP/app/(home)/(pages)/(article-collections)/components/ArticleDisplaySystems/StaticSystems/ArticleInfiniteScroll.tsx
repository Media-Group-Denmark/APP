/* "use client"; */
import React from "react";
import { getData } from "@/app/lib/GetData";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleLink } from "../../utils/ArticleLink";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { PortableText } from "next-sanity";
import { SquareChevronRight } from "lucide-react";

export default async function ArticleInfiniteScroll() {
  const data: Article[] = await getData();
  return (
    <section>
      <ul>
        {data.map((article: Article, index: number) => {
          const articleLayout = index % 2 === 0;
          return (
            <li key={article._id}>
              <article
                className={`bg-main_color_light dark:bg-second_color_dark shadow-md rounded-lg p-12 my-12 grid relative ${
                  articleLayout ? "grid-cols-[auto_1fr]" : "grid-cols-1"
                }`}
              >
                <header>
                  <aside className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-y-0 gap-x-4 text-xs">
                    <ArticleLink
                      href={`/kategori/${article.categorySlug}`}
                      className="relative w-fit rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {article.category}
                    </ArticleLink>
                    <time
                      dateTime={article.publishedAt}
                      className="text-gray-500 hidden md:inline-block"
                    >
                      {timeSinceText({ date: article.publishedAt })}
                    </time>
                  </aside>
                  <h1 className="text-3xl my-4">{article.title}</h1>
                  <p>{article.teaser}</p>
                </header>
                {articleLayout ? (
                  <figure className="relative  w-64">
                    <img
                      width={700}
                      height={400}
                      src={urlFor(article.image)
                        .format("webp")
                        .width(300)
                        .height(200)
                        .fit("fill")
                        .quality(85)
                        .url()}
                      alt={`Billede af ${article.source}`}
                      className="block h-[14em] md:h-[10em] bg-gray-300 rounded-lg object-cover"
                    />
                  </figure>
                ) : (
                  <section className="articleText InfiniteArticleText leading-8 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                    <div className="max-h-[20em] overflow-clip">
                      <PortableText value={article.overview} />
                    </div>
                    <span>.....</span>
                  </section>
                )}
                <p className="absolute right-12 bottom-4 flex items-center :hover:underline">
                  Læs hele artiklen{" "}
                  <span className="ml-2">
                    <SquareChevronRight color="#007f6c" />
                  </span>
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
