import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";

export const SubArticlesInfiniteScrollTwo: React.FC<{
  data: ArticleModel[];
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
    <section className="mx-auto rounded-xl  md:max-w-7xl px-3 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-2 md:mt-6 pb-1">

      <h3 className="font-bold text-xl">
            <span className="mr-2 animate-pulse">🔴</span>Seneste nyheder
          </h3>
      <div className="mx-auto py-4 grid gap-4">
        {slicedData.map((post: Article, index: number) => {
          // Bestem om det er den første artikel i en sektion
          const isMainArticle = index % 4 === 0;
          return (
            <>
              <article
                key={post._id}
                className={` grid gap-4 md:gap-8 mb-10 border-b-slate-100 dark:border-b-slate-600 border-b-[1px] pb-2 ${
                  isMainArticle ? "grid-cols-[auto]" : "grid-cols-[auto_auto]"
                }`}
              >
                <figure
                  className={`relative ${
                    isMainArticle ? "max-w-none" : "max-w-[100px] md:max-w-none"
                  }`}
                >
                  <ArticleLink
                    aria-label="Læs mere om artiklen"
                    href={`/artikel/${
                      post.republishArticle && post.newSlug
                        ? post.newSlug
                        : post.articleSlug
                    }`}
                  >
                    <img
                      width={400}
                      height={400}
                      src={urlFor(post.image)
                        .format("webp")
                        .width(400)
                        .height(400)
                        .fit("fill")
                        .quality(85)
                        .url()}
                      alt={post.title}
                      loading="lazy"
                      className={`block rounded-2xl inset-0 bg-gray-300 ${
                        isMainArticle
                          ? "max-h-64 w-[36em] rounded-t-2xl rounded-b-lg"
                          : "max-h-44 w-32 lg:w-64"
                      } object-cover`}
                    />
                  </ArticleLink>
                </figure>
                <div>
                  <aside className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-y-0 gap-x-4 text-xs">
                    <ArticleLink
                      href={`/kategori/${post.categorySlug}`}
                    >
                      <p className="relative text-xs w-fit rounded-full py-1 my-1 font-medium text-gray-600">
                  <span className="animate-pulse">🟢</span> {post.category}
                </p>
                    </ArticleLink>
                    <time
                      dateTime={post.publishedAt}
                      className="text-gray-500 hidden md:inline-block"
                    >
                      {timeSinceText({ date: post.publishedAt })}
                    </time>
                  </aside>
                  <header
                    className={`group max-w-xl ${
                      isMainArticle ? "h-[12em]" : "h-[7em] lg:h-[12em]"
                    } overflow-clip`}
                  >
                    <h1
                      className={`mt-2 ${
                        isMainArticle
                          ? "text-lg md:text-2xl"
                          : "text-md md:text-md"
                      } font-bold leading-6 dark:group-hover:text-gray-300 group-hover:text-gray-600`}
                    >
                      <ArticleLink
                        href={`/artikel/${
                          post.republishArticle && post.newSlug
                            ? post.newSlug
                            : post.articleSlug
                        }`}
                      >
                        <span className="" />
                        {post.title}
                      </ArticleLink>
                    </h1>
                    <h2
                      className={`mt-2 ${
                        isMainArticle
                          ? "text-sm md:text-md"
                          : "text-xs md:text-sm"
                      } leading-6 text-text_second_color_dark dark:text-text_second_color_light`}
                    >
                      {post.teaser}
                    </h2>
                  </header>
                  <aside
                    className={
                      isMainArticle ? "desktop hidden md:grid" : "hidden"
                    }
                    data-ad-unit-id={
                      isMainArticle ? "/${theme.site_ad_id}/PengehjoernetDK/Square_1" : ""
                    }
                  ></aside>
                  <aside
                    className={isMainArticle ? "mobile md:hidden" : "hidden"}
                    data-ad-unit-id={
                      isMainArticle
                        ? "/${theme.site_ad_id}/PengehjoernetDK/Mobile_Square_3"
                        : ""
                    }
                  ></aside>
                </div>
              </article>
            </>
          );
        })}
      </div>
    </section>
  );
};
