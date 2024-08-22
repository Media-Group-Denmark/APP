import { urlFor } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import Image from "next/image";
import { filterAndSliceArticles } from "@/app/lib/FilterArticles";
import { ArticleLink } from "../../utils/ArticleLink";

const ArticleHero: React.FC<{
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
    <>
      {slicedData.map((post: Article) => (
        <article
          key={post._id}
          className="col-span-2 mb-4 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
        >
          <figure className="block w-full h-[12em] md:h-[20em] rounded-t-lg overflow-clip">
            <ArticleLink
              aria-label="Læs mere om artiklen"
              href={`/artikel/${post.articleSlug}`}
            >
              <Image
                src={urlFor(post.image).url()}
                alt={post.title}
                layout="responsive"
                width={600}
                height={400} // Justér højden for at bevare aspect ratio
                sizes="(max-width: 768px) 600px, 900px"
                quality={`(max-width: 768px) 50, 85`}
                priority={true} // Tilføj dette for billeder i det indledende viewport
              />
            </ArticleLink>
          </figure>

          <div className="px-4 pb-4">
            <header className="grid grid-rows-[auto_1fr_auto] min-h-[170px]">
              <ArticleLink href={`/artikler/kategori/${post.categorySlug}`}>
                <p className="relative text-sm w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category}
                </p>
              </ArticleLink>
              <ArticleLink href={`/artikel/${post.articleSlug}`}>
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
                  href={`/artikler/journalist/${post.JournalistSlug}`}
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
