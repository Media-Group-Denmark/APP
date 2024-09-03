import { Article } from "@/app/models/article";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import { urlFor } from "@/app/lib/sanityclient";
import { filterAndSliceArticles } from "@/app/lib/FilterArticles";
import { ArticleLink } from '@/app/components/utils/ArticleLink';

const SubArticlesListWide: React.FC<{
  data: Article[];
  category?: string | undefined;
  tag?: string | string[];
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> =  async ({ data, category, tag, journalist, dayInterval, startIndex, endIndex }) => {

  const slicedData = filterAndSliceArticles(data, category, tag, journalist, dayInterval, startIndex, endIndex);

  
  return (
    <section>
      <h1 className="lineHeader text-center text-[0.95rem] font-bold mb-4">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-8 mt-6 pb-1 rounded-xl">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
        {slicedData.map((post: Article) => (
              <article
                key={post._id}
                className="relative isolate flex flex-col gap-8 lg:flex-row mb-10"
              >
                <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-44 lg:shrink-0">
                  <ArticleLink aria-label="Læs mere om artiklen" href={`/artikel/${post.republishArticle && post.newSlug ? post.newSlug : post.articleSlug}`}>
                    <img
                      width={200}
                      height={300}
                      src={urlFor(post.image)
                        .format("webp")
                        .width(200)
                        .height(300)
                        .fit("fill")
                        .quality(85)
                        .url()}
                        loading='lazy'
                      alt={post.title} // Sørg for at inkludere en beskrivende alt-tekst
                      className="block absolute rounded-2xl inset-0 w-full h-full object-cover"
                    />
                  </ArticleLink>
                </figure>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.publishedAt} className="text-gray-500">
                      {timeSinceText({ date: post.publishedAt })}
                    </time>
                    <ArticleLink
                      href={`/artikler/kategori/${post.categorySlug}`}
                      className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category}
                    </ArticleLink>
                  </div>

                  <header className="group relative max-w-xl">
                    <h2 className="mt-3 text-text_main_color_dark dark:text-text_main_color_light text-lg font-semibold leading-6 dark:group-hover:text-gray-200 group-hover:text-gray-600">
                      <ArticleLink href={`/artikel/${post.republishArticle && post.newSlug ? post.newSlug : post.articleSlug}`}>
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

export default SubArticlesListWide;
