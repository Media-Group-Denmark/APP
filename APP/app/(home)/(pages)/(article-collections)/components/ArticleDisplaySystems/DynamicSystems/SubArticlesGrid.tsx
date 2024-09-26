import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import theme from "@/app/lib/theme.json";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "../../../../../components/utils/ArticleLink";

const SubArticlesSixGrid: React.FC<{
  data: Article[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
  articleAmount?: number;
}> = async ({
  data,
  category,
  tag,
  journalist,
  dayInterval,
  startIndex,
  endIndex,
  articleAmount,
}) => {
  const slicedData = filterAndSliceArticles(
    data,
    category,
    tag,
    journalist,
    dayInterval,
    startIndex,
    endIndex,
    articleAmount
  );
  return (
    <section className="pb-12">
 {/*  <ArticleLink href={`${theme.site_url}/kategori/${category}`}>
  <div className="relative text-center mb-8">
    <h1 className="inline-block text-lg md:text-2xl font-extrabold text-main_color_dark dark:text-main_color_light uppercase tracking-wide">
      {category
        ? category
        : tag
        ? tag
        : journalist
        ? journalist
        : "Alle Nyheder"}
    </h1>
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-accent_color_dark to-accent_color_light rounded-full"></div>
  </div>
</ArticleLink> */}

<article className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {slicedData
    .slice(0, articleAmount)
    .map((post: Article) => (
      <div
        key={post._id}
        className="flex justify-center items-center"
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
          <div className="relative flex flex-col mt-6 text-gray-700 bg-white dark:bg-gray-800 shadow-md bg-clip-border rounded-xl w-72">
            <div className="relative h-40 mx-4 -mt-6 overflow-hidden shadow-lg rounded-xl">
              <img
                src={urlFor(post.image)
                  .format("webp")
                  .width(400)
                  .height(300)
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
              <h2 className="block mb-2 font-sans text-lg font-semibold leading-snug tracking-normal text-main_color_dark dark:text-main_color_light">
                {post.title}
              </h2>
              {/* Tidsstempel */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <time dateTime={post.publishedAt}>
                  {timeSinceText({ date: post.publishedAt })}
                </time>
              </div>
            </div>
          </div>
        </ArticleLink>
      </div>
    ))}
</article>

</section>

  );
};

export default SubArticlesSixGrid;
