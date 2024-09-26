import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import theme from "@/app/lib/theme.json";

const SubArticlesListWide: React.FC<{
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
<div className="mx-auto max-w-7xl px-6 lg:px-8 pb-1">
  <div className="mx-auto max-w-2xl lg:max-w-4xl">
    {slicedData.map((post: Article) => (
      <article
        key={post._id}
        className="relative flex flex-col lg:flex-row items-center gap-6 mb-10 rounded-xl overflow-hidden transform transition-transform hover:-translate-y-1"
      >
        <ArticleLink
          aria-label={`Læs mere om ${post.title}`}
          href={`/artikel/${
            post.republishArticle && post.newSlug
              ? post.newSlug
              : post.articleSlug
          }`}
          className="block lg:w-1/3"
        >
          <div className="relative h-40 w-full lg:h-full lg:w-full overflow-hidden">
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
        </ArticleLink>
        <div className="p-6 flex-1">
          <ArticleLink
            href={`/artikel/${
              post.republishArticle && post.newSlug
                ? post.newSlug
                : post.articleSlug
            }`}
          >
            <h2 className="font-sans text-xl font-semibold leading-snug tracking-normal text-main_color_dark dark:text-main_color_light mb-2">
              {post.title}
            </h2>
          </ArticleLink>
          {/* Tidsstempel */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
            <time dateTime={post.publishedAt}>
              {timeSinceText({ date: post.publishedAt })}
            </time>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {post.teaser}
          </p>
        </div>
      </article>
    ))}
  </div>
</div>

</section>

  );
};

export default SubArticlesListWide;
