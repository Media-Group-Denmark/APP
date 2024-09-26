import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";

export const SubArticlesInfiniteScroll: React.FC<{
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
    <section className="mx-auto md:max-w-7xl px-3 lg:px-8 pt-2 md:mt-6 pb-1">
  {/* Header Start */}
 
  {/* Header End */}

  <div className="mx-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {slicedData.map((post: Article, index: number) => {
      // Bestem om det er den første artikel i en sektion
      const isMainArticle = index % 5 === 0;
      return (
        <article
          key={post._id}
          className={`flex justify-center items-center mb-10 ${
            isMainArticle ? 'md:col-span-2' : 'md:col-span-1'
          }`}
        >
          <ArticleLink
            href={`/artikel/${
              post.republishArticle && post.newSlug
                ? post.newSlug
                : post.articleSlug
            }`}
            aria-label={`Læs mere om ${post.title}`}
            className="block w-full"
          >
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white dark:bg-gray-800 shadow-md bg-clip-border rounded-xl overflow-hidden transform transition-transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img
                  src={urlFor(post.image)
                    .format('webp')
                    .width(isMainArticle ? 600 : 400)
                    .height(isMainArticle ? 400 : 300)
                    .fit('fill')
                    .quality(85)
                    .url()}
                  alt={post.title}
                  className={`w-full ${
                    isMainArticle ? 'h-64' : 'h-40'
                  } object-cover`}
                  loading="lazy"
                />
                {/* Kategori Badge */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h2
                  className={`mb-2 font-sans ${
                    isMainArticle ? 'text-2xl' : 'text-lg'
                  } font-semibold leading-snug tracking-normal text-main_color_dark dark:text-main_color_light`}
                >
                  {post.title}
                </h2>
                {/* Tidsstempel */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <time dateTime={post.publishedAt}>
                    {timeSinceText({ date: post.publishedAt })}
                  </time>
                </div>
                {/* Teaser */}
                <p
                  className={`text-gray-600 dark:text-gray-300 text-sm ${
                    isMainArticle ? 'line-clamp-3' : 'line-clamp-2'
                  }`}
                >
                  {post.teaser}
                </p>
              </div>
            </div>
          </ArticleLink>
        </article>
      );
    })}
  </div>
</section>

  );
};
