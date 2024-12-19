import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import React from "react";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import Image from "next/image";
import { filterAndSliceArticles } from "@/app/(home)/(pages)/(article-collections)/components/FilterArticles";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
export const revalidate = 600;

const ArticleHero: React.FC<{
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
    <>
      {slicedData.map((post: Article) => (
        <article
          key={post._id}
          className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
          <figure className="block w-full h-[12em] md:h-[20em] rounded-t-lg overflow-clip">
            <ArticleLink
              aria-label="Læs mere om artiklen"
              href={ post._type === 'msnScrollFeed' ? `/guide/${post.articleSlug}` : `/artikel/${
                post.republishArticle && post.newSlug
                  ? post.newSlug
                  : post.articleSlug
              }`}
            >
              <Image
                src={urlFor(post.image)
                  .format("webp")
                  .width(800)
                  .height(400)
                  .fit("fill")
                  .quality(85)
                  .url()}
                alt={post.title}
                width={800}
                height={400} // Justér højden for at bevare aspect ratio
                sizes="(max-width: 768px) 600px, 900px"
                priority={true} // Tilføj dette for billeder i det indledende viewport
              />
            </ArticleLink>
          </figure>

          <div className="px-4 pb-4">
            <header className="grid grid-rows-[auto_1fr_auto] min-h-[170px]">
              <ArticleLink href={`/kategori/${post.categorySlug}`}>
                <p className="relative text-sm w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category}
                </p>
              </ArticleLink>
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
            <footer className="flex gap-2 mt-2">
              <address>
                <ArticleLink
                  className="text-sm py-2 text-fade_color_light dark:text-fade_color_dark"
                  rel="author"
                  href={`/journalist/${post.JournalistSlug}`}
                >
                  {post.JournalistName}
                </ArticleLink>
              </address>
              <time className="rounded-lg">
                {timeSinceText({ date: post.publishedAt })}
              </time>
            </footer>
          </div>
        </article>
      ))}
    </>
  );
};

export default ArticleHero;
