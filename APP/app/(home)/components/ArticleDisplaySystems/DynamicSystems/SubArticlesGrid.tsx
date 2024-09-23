import { Article } from "@/app/(home)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(home-pages)/(article-collections)/artikel/components/ArticleTools/TimeSinceTag";
import theme from "@/app/lib/theme.json";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "@/app/lib/FilterArticles";
import { ArticleLink } from "../../utils/ArticleLink";

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
      <ArticleLink href={`${theme.site_url}/kategori/${category}`}>
        <h1 className="lineHeader text-center text-[0.95rem] font-bold md:mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1 uppercase">
            {category
              ? category
              : tag
              ? tag
              : journalist
              ? journalist
              : "Alle Nyheder"}
          </span>
        </h1>
      </ArticleLink>
      <article className="grid overflow-y-clip grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-4 lg:mt-0 relative">
        {slicedData
          .map((post: Article) => (
            <div
              key={post._id}
              className="bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
            >
              <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg overflow-clip">
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
                    height={300}
                    src={urlFor(post.image)
                      .format("webp")
                      .width(400)
                      .height(300)
                      .fit("fill")
                      .quality(85)
                      .url()}
                    loading="lazy"
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </ArticleLink>
              </figure>
              <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mx-2 md:mx-4 mb-4">
                <aside className="sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
                  <ArticleLink href={`/kategori/${post.categorySlug}`}>
                    <p className="relative text-sm w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                      {post.category}
                    </p>
                  </ArticleLink>
                  <time
                    className="rounded-lg sm:my-auto my-1 sm:ml-auto text-xs hidden md:inline-block"
                    dateTime={post.publishedAt}
                  >
                    {timeSinceText({ date: post.publishedAt })}
                  </time>
                </aside>
                <header>
                  <ArticleLink
                    href={`/artikel/${
                      post.republishArticle && post.newSlug
                        ? post.newSlug
                        : post.articleSlug
                    }`}
                  >
                    <h1 className="text-sm md:text-lg font-bold py-0 rounded-lg">
                      {post.title}
                    </h1>
                  </ArticleLink>
                </header>
              </div>
            </div>
          ))
          .slice(0, articleAmount)}
      </article>
    </section>
  );
};

export default SubArticlesSixGrid;
