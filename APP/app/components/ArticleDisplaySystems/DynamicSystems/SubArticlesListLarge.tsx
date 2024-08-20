import React from 'react'
import { timeSinceText } from '../../ArticleTools/TimeSinceTag';
import Image from 'next/image';
import { client, urlFor } from '@/app/lib/sanityclient';
import { Article } from '@/app/models/article';
import Link from 'next/link';
import { filterAndSliceArticles } from '@/app/lib/FilterArticles';


const SubArticlesListLarge: React.FC<{
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
    <section className="mx-auto max-w-7xl px-3 lg:px-8 py-2 mt-6 rounded-xl">
  <div className="mx-auto max-w-2xl lg:max-w-4xl">
    <div>
    {slicedData.map((post: Article) => (
        <article
          key={post._id}
          className="relative isolate flex flex-col gap-8 lg:flex-row mb-10"
        >
          <Link aria-label="Læs mere om artiklen" href={`/artikel/${post.articleSlug}`}>
            <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
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
                  loading='lazy'
                alt={post.title}
                className="block absolute rounded-2xl inset-0 bg-center bg-cover"
              />
            </figure>
          </Link>
          <div>
            <header className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.publishedAt}>
                {timeSinceText({ date: post.publishedAt })}
              </time>
              <Link
                href={`/artikler/kategori/${post.categorySlug}`}
                className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {post.category}
              </Link>
            </header>
            <div className="group relative max-w-xl">
              <h1 className="mt-3 text-lg font-bold leading-6 dark:group-hover:text-gray-200 group-hover:text-gray-600">
                <Link href={`/artikel/${post.articleSlug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h1>
              <h2 className="mt-5 text-sm leading-6 text-text_second_color_dark dark:text-text_second_color_light">
                {post.teaser}
              </h2>
            </div>
            <footer className="mt-6 hidden lg:flex border-t border-gray-900/5 pt-6">
              <div className="relative flex items-center gap-x-4">
                <img
                width={400}
                height={300}
                  className="w-10 h-10 object-cover object-center rounded-full"
                  alt={post.JournalistName}
                  src={
                    post.JournalistPhoto
                      ? urlFor(post.JournalistPhoto)
                          .format("webp")
                          .width(400)
                          .height(300)
                          .fit("fill")
                          .quality(85)
                          .url()
                      : "/img/unisexAvatar.jpeg"
                  }
                  loading='lazy'
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold">
                    <Link rel='author' href={`/artikler/journalist/${post.JournalistSlug}`}>
                      <span className="absolute inset-0" />
                      {post.JournalistName}
                    </Link>
                  </p>
                  <p className="text-fade_color_light dark:text-fade_color_dark">
                    Journalist
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

  )
}

export default SubArticlesListLarge