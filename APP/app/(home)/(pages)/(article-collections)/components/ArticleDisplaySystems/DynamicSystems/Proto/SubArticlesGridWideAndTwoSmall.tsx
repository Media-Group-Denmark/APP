import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import theme from "@/app/lib/theme.json";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";

const SubArticlesGridWideAndTwoSmall: React.FC<{
  data: ArticleModel[];
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
        <h1 className="mb-4 text-xl">
        <span className="animate-pulse">🟣</span>
          <span className="capitalize">
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
      
      <article className="flex overflow-y-clip gap-4  md:gap-8 mt-4 lg:mt-0 relative pb-4">
      <div className="md:w-2/3 ">
          {slicedData
              .map((post: Article) => (
                <div
                  key={post._id}
                  className="bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
                >
                  <figure className="block w-full h-[7em] md:h-[20em] bg-gray-300  rounded-t-2xl rounded-b-lg  overflow-clip">
                    <ArticleLink
                      aria-label="Læs mere om artiklen"
                      href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
                        post.republishArticle && post.newSlug
                          ? post.newSlug
                          : post.articleSlug
                      }`}
                    >
                      <img
                        width={700}
                        height={500}
                        src={urlFor(post.image)
                          .format("webp")
                          .width(700)
                          .height(500)
                          .fit("fill")
                          .quality(85)
                          .url()}
                        loading="lazy"
                        alt={post.title}
                        className="w-full h-full object-cover  rounded-t-2xl rounded-b-lg "
                      />
                    </ArticleLink>
                  </figure>
                  <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mb-4">
                    <aside className="sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
                      <ArticleLink href={`/kategori/${post.categorySlug}`}>
                      <p className="relative text-xs w-fit rounded-full py-1 my-1 font-medium text-gray-600">
                      <span className="animate-pulse">🟣</span> {post.category}
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
                        <h1 className="text-2xl md:text-[2.3em] leading-10 font-extrabold rounded-lg">
                        {post.title}
                        </h1>
                      </ArticleLink>
                    </header>
                  </div>
                </div>
              ))
              .slice(0, 1)}
      </div>
        <div className="grid md:w-1/3">
            {slicedData.slice(1, 3)
              .map((post: Article) => (
                <div
                  key={post._id}
                  className="bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
                >
                  <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300  rounded-t-2xl rounded-b-lg  overflow-clip">
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
                        className="w-full h-full object-cover  rounded-t-2xl rounded-b-lg "
                      />
                    </ArticleLink>
                  </figure>
                  <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mb-4">
                    <aside className="sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
                      <ArticleLink href={`/kategori/${post.categorySlug}`}>
                      <p className="relative text-xs w-fit rounded-full py-1 my-1 font-medium text-gray-600">
                      <span className="animate-pulse">🟣</span> {post.category}
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
                        <h1 className="text-sm md:text-lg font-semibold py-0 rounded-lg max-w-full overflow-hidden line-clamp-3">
                        {post.title}
                        </h1>
                      </ArticleLink>
                    </header>
                  </div>
                </div>
              ))
              }
        </div>
      </article>
    </section>
  );
};

export default SubArticlesGridWideAndTwoSmall;
