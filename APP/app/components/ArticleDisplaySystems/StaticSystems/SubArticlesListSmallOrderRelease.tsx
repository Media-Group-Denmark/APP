import React from 'react'
import { timeSinceText } from '../../ArticleTools/TimeSinceTag';
import Image from 'next/image';
import { client, urlFor } from '@/app/lib/sanityclient';
import { Article } from '@/app/models/article';
import Link from 'next/link';


async function getData() {
  const query = `
  *[
    _type == "article"
  ] 
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    "articleSlug": slug.current,
    "image": metaImage.asset,
    "category": category->name,
    "categorySlug": category->slug.current,
    "tag": tag[]->name,
    "tagSlug": tag[]->slug.current,
    "JournalistName": journalist->name,
    "JournalistPhoto": journalist->image,
    "JournalistSlug": journalist->slug.current
  }`;
  const data = await client.fetch(query);
  return data;
}


export default async function SubArticlesListSmallOrderRelease() {
  const data: Article[] = await getData();
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-8 mt-6 pb-1 rounded-xl">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div >
            {data.slice(0, 10).map((post) => (
              <article key={post._id} className="relative isolate flex flex-col gap-8 lg:flex-row mb-10">
                <Link href={`/artikel/${post.articleSlug}`}>
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-44 lg:shrink-0">
                  <div className="block absolute rounded-2xl inset-0  rounded-t-lg bg-center bg-cover" style={{ backgroundImage: `url(${urlFor(post.image).format("webp")
        .width(200)
        .height(300)
        .fit("fill")
        .quality(85)
        .url()})` }}>
                  </div>
                  </div>
                </Link>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post._createdAt} className="text-gray-500">{timeSinceText({ date: post._createdAt })}</time>
                    <Link href={`/artikler/kategori/${post.categorySlug}`} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{post.category}</Link>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-text_main_color_dark dark:text-text_main_color_light text-lg font-semibold leading-6 dark:group-hover:text-gray-200  group-hover:text-gray-600">
                      <Link href={`/artikel/${post.articleSlug}`}>
                        <span className="absolute inset-0 " />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm h-[5em] overflow-hidden leading-6 text-text_second_color_dark dark:text-text_second_color_light">{post.teaser}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
  )
}

