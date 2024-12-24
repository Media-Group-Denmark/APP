{
  /* 
  <ArticleBlock_1_Square
  data={data} // get the data from page
  category={"nyheder"} // filter articles by category with a category-slug
  tag={"nyheder"} // filter articles by tag with a tag-slug
  journalist={"niclas-absalonsen"} // filter articles by journalist with a journalist-slug
  startIndex={0} // start index of the articles
  endIndex={6} // end index of the articles
  articleAmount={6} // amount of articles to display
  mediaSize={{ 
    Figure: { 
      figureDesktopHeight: "md:h-[8em]", // height of the figure on desktop
      figureMobileHeight: "h-[8em]", // height of the figure on mobile
    },
    Image: {
      imgWidth: 400, // width of the image
      imgHeight: 200, // height of the image
      quality: 85, // quality of the image
      lazyLoading: true/false, // lazy loading of the image (true by default)
      responsive: "(max-width: 768px) 600px, 900px", // responsive image with Next.js Image component
    },
  }}
  nameTag={{ name: "Nyheder", tag: true }}
  header={{ visible: true, time: true, journalist: false, category: true }}
  footer={{ visible: false, time: false, journalist: false, category: false }}
  fontStyles="text-md md:text-lg leading-5 md:leading-6 font-bold"
  gridSystem="md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 "
  contentHeight="min-h-[140px]"
/>; 
*/
}

import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import Image from "next/image";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
export const revalidate = 600;

const ArticleBlock_1_Square: React.FC<{
  data: ArticleModel[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
  fontStyles?: string | undefined;
  mediaSize?: {
    Figure?: {
      figureDesktopHeight?: string | undefined;
      figureMobileHeight?: string | undefined;
    };
    Image?: {
      imgWidth?: number;
      imgHeight?: number;
      quality?: number;
      lazyLoading?: boolean;
      responsive: string;
    };
  };
  articleAmount?: number;
  gridSystem?: string;
  header?:
    | {
        visible?: boolean;
        time?: boolean;
        journalist?: boolean;
        category?: boolean;
      }
    | undefined;
  footer?:
    | {
        visible?: boolean;
        time?: boolean;
        journalist?: boolean;
        category?: boolean;
      }
    | undefined;
  contentHeight?: string;
  nameTag?: { name: string; tag: boolean } | undefined;
}> = async ({
  data,
  category,
  tag,
  journalist,
  dayInterval,
  startIndex,
  endIndex,
  mediaSize,
  articleAmount,
  gridSystem,
  fontStyles,
  header,
  footer,
  contentHeight,
  nameTag,
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
    <>
      {nameTag?.tag && (
        <p className="lineHeader text-center text-[0.95rem] font-bold md:mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1 uppercase">
            {nameTag.name ? nameTag.name : "Alle Nyheder"}
          </span>
        </p>
      )}
      <article
        className={`col-span-2 mb-4 grid place-content-center ${
          gridSystem ? gridSystem : ""
        } bg-second_color_light dark:bg-second_color_dark rounded-lg relative`}
      >
        {slicedData.slice(0, articleAmount || 1).map((post: Article) => (
          <div
            className="shadow-md hover:shadow-lg transition-shadow rounded-lg group "
            style={{ maxWidth: `${mediaSize?.Image.imgWidth || 400}px` }}
            key={post._id}
          >
            <figure
              className={`block rounded-t-lg overflow-clip 
              ${
                mediaSize?.Figure.figureDesktopHeight || "md:h-[10em]"
              } 
              ${
                mediaSize?.Figure.figureMobileHeight || "md:h-[8em]"
              }`}
            >
              <ArticleLink
                aria-label="Læs mere om artiklen"
                href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
                  post.republishArticle && post.newSlug
                    ? post.newSlug
                    : post.articleSlug
                }`}
              >
                <Image
                  className="group-hover:scale-[1.01] transition-transform duration-[15s] ease-linear"
                  src={urlFor(post.image)
                    .format("webp")
                    .width(mediaSize?.Image.imgWidth || 400)
                    .height(mediaSize?.Image.imgHeight || 300)
                    .fit("fill")
                    .quality(mediaSize?.Image.quality || 85)
                    .url()}
                  alt={post.title}
                  width={mediaSize?.Image.imgWidth || 400}
                  height={mediaSize?.Image.imgHeight || 300}
                  sizes={mediaSize?.Image.responsive}
                  {...(mediaSize?.Image.lazyLoading === false
                    ? { priority: true }
                    : { loading: "lazy" })}
                />
              </ArticleLink>
            </figure>

            <div className="px-4 pb-4">
              <header
                className={`grid grid-rows-[auto_1fr_auto] ${
                  contentHeight ? contentHeight : "min-h-[140px]"
                }`}
              >
                {header && header.visible && (
                  <aside className="flex gap-2">
                    {header && header.category && (
                      <ArticleLink href={`/kategori/${post.categorySlug}`}>
                        {/* <p className="relative text-sm w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                          {post.category}
                        </p> */}
                        <p className="relative text-sm w-fit rounded-full py-1 my-1 font-medium text-accent_color_light dark:text-accent_color_dark hover:text-black dark:hover:text-gray-300">
                          {post.category}
                        </p>
                      </ArticleLink>
                    )}
                    {header && header.journalist && (
                      <address>
                        <ArticleLink
                          className={`${
                            articleAmount && articleAmount >= 2
                              ? "text-sm"
                              : "text-md"
                          } py-2 text-fade_color_light dark:text-fade_color_dark`}
                          rel="author"
                          href={`/journalist/${post.JournalistSlug}`}
                        >
                          {post.JournalistName}
                        </ArticleLink>
                      </address>
                    )}
                    {header && header.time && (
                      <time
                        className={`${
                          articleAmount && articleAmount >= 2
                            ? "text-xs"
                            : "text-md"
                        } rounded-lg sm:my-auto my-1 sm:ml-auto hidden md:inline-block`}
                        dateTime={post.publishedAt}
                      >
                        {timeSinceText({ date: post.publishedAt })}
                      </time>
                    )}
                  </aside>
                )}
                <ArticleLink
                  href={`/artikel/${
                    post.republishArticle && post.newSlug
                      ? post.newSlug
                      : post.articleSlug
                  }`}
                >
                  <h1
                    className={
                      fontStyles
                        ? fontStyles
                        : "text-md md:text-lg leading-4 md:leading-6 font-bold"
                    }
                  >
                    {post.title}
                  </h1>
                </ArticleLink>
              </header>

              {footer && footer.visible && (
                <footer className="flex gap-2 mt-2">
                  {footer && footer.journalist && (
                    <address>
                      <ArticleLink
                        className={`${
                          articleAmount && articleAmount >= 2
                            ? "text-xs"
                            : "text-md"
                        } py-2 text-fade_color_light dark:text-fade_color_dark`}
                        rel="author"
                        href={`/journalist/${post.JournalistSlug}`}
                      >
                        {post.JournalistName}
                      </ArticleLink>
                    </address>
                  )}
                  {footer && footer.time && (
                    <time
                      className={`rounded-lg sm:my-auto my-1 sm:ml-auto ${
                        articleAmount && articleAmount >= 2
                          ? "text-xs"
                          : "text-md"
                      } hidden md:inline-block`}
                      dateTime={post.publishedAt}
                    >
                      {timeSinceText({ date: post.publishedAt })}
                    </time>
                  )}
                  {footer && footer.category && (
                    <ArticleLink href={`/kategori/${post.categorySlug}`}>
                      <p className="relative text-sm w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                        {post.category}
                      </p>
                    </ArticleLink>
                  )}
                </footer>
              )}
            </div>
          </div>
        ))}
      </article>
    </>
  );
};

export default ArticleBlock_1_Square;
