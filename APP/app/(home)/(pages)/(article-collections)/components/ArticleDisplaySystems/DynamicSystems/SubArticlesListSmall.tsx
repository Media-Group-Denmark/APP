import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";

const SubArticlesListSmall: React.FC<{
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
    <section className="mx-auto md:max-w-7xl px-3 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-2 md:mt-6 pb-1 rounded-xl">
      <div className="mx-auto max-w-2xl lg:max-w-4xl py-4 grid grid-cols-2 gap-4">
        {slicedData
          .map((post: Article) => (
            <article
              key={post._id}
              className="relative isolate flex flex-col gap-4 md:gap-8 lg:flex-row mb-10 border-b-slate-100 dark:border-b-slate-600 border-b-[1px] pb-2"
            >
              <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:shrink-0">
                <ArticleLink
                  aria-label="Læs mere om artiklen"
                  href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
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
                    className="block rounded-2xl inset-0 bg-gray-300 max-h-44 rounded-t-lg w-64 lg:w-44 object-cover"
                  />
                </ArticleLink>
              </figure>
              <div>
                <aside className="flex flex-col md:flex-row items-start md:items-center gap-y-2 md:gap-y-0 gap-x-4 text-xs">
                  <time
                    dateTime={post.publishedAt}
                    className="text-gray-500 hidden md:inline-block"
                  >
                    {timeSinceText({ date: post.publishedAt })}
                  </time>
                  <ArticleLink
                    href={`/kategori/${post.categorySlug}`}
                    className="relative w-fit rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category}
                  </ArticleLink>
                </aside>
                <header className="group relative max-w-xl h-[10em] md:h-[12em] overflow-clip">
                  <h1 className="mt-2 text-md md:text-md font-bold leading-6 dark:group-hover:text-gray-300 group-hover:text-gray-600">
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
                  <h2 className="mt-2 text-xs md:text-sm leading-6 text-text_second_color_dark dark:text-text_second_color_light">
                    {post.teaser}
                  </h2>
                </header>
              </div>
            </article>
          ))
          .slice(0, 14)}
      </div>
    </section>
  );
};

export default SubArticlesListSmall;
