import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import Image from "next/image";

const ArticleBlock_2_Wide: React.FC<{
  data: ArticleModel[];
  category?: string | undefined;
  name?: string;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
  fontStyles?: string | undefined;
  mediaSize?: {
    Figure: {
      figureDesktopHeight: string;
      figureMobileHeight: string;
    };
    Image: {
      imgWidth: number;
      imgHeight: number;
      quality: number;
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
  name,
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
    <section>
      {nameTag?.tag && (
        <p className="lineHeader text-center text-[0.95rem] font-bold md:mb-4">
          <span className="bg-accent-color-gradient text-white px-4 py-1 uppercase">
            {nameTag.name ? nameTag.name : "Alle Nyheder"}
          </span>
        </p>
      )}
      <div className="mx-auto px-6 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-8 mt-6 pb-1 rounded-xl">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {slicedData.map((post: Article) => (
            <article
              key={post._id}
              className="relative isolate flex flex-col gap-8 lg:flex-row mb-10"
            >
              <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-44 lg:shrink-0">
                <ArticleLink
                  aria-label="Læs mere om artiklen"
                  href={`/artikel/${
                    post.republishArticle && post.newSlug
                      ? post.newSlug
                      : post.articleSlug
                  }`}
                >
                  <Image
                  className="block absolute rounded-2xl inset-0 w-full h-full object-cover"
                  src={urlFor(post.image)
                    .format("webp")
                    .width(mediaSize?.Image.imgWidth || 200)
                    .height(mediaSize?.Image.imgHeight || 300)
                    .fit("fill")
                    .quality(mediaSize?.Image.quality || 85)
                    .url()}
                  alt={post.title}
                  width={mediaSize?.Image.imgWidth || 200}
                  height={mediaSize?.Image.imgHeight || 300}
                  sizes={mediaSize?.Image.responsive}
                  {...(mediaSize?.Image.lazyLoading === false
                    ? { priority: true }
                    : { loading: "lazy" })}
                />
                </ArticleLink>
              </figure>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-gray-500">
                    {timeSinceText({ date: post.publishedAt })}
                  </time>
                  <ArticleLink
                    href={`/kategori/${post.categorySlug}`}
                    className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category}
                  </ArticleLink>
                </div>

                <header className="group relative max-w-xl">
                  <h2 className="mt-3 text-text_main_color_dark dark:text-text_main_color_light text-lg font-semibold leading-6 dark:group-hover:text-gray-200 group-hover:text-gray-600">
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
                  </h2>
                  <h3 className="mt-5 text-sm h-[5em] overflow-clip leading-6 text-text_second_color_dark dark:text-text_second_color_light">
                    {post.teaser}
                  </h3>
                </header>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleBlock_2_Wide;
