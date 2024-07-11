import React from 'react'
import { timeSinceText } from '../../ArticleTools/TimeSinceTag';
import Image from 'next/image';
import { client, urlFor } from '@/app/lib/sanityclient';
import { Article } from '@/app/models/article';
import Link from 'next/link';


const SubArticlesListLarge: React.FC<{data: Article[]; startIndex: number; endIndex: number}> = ({ data, startIndex, endIndex }) =>  {
  return (
    <div className="mx-auto max-w-7xl px-3 lg:px-8  py-2 mt-6 rounded-xl">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div >
            {data.slice(startIndex, endIndex).map((post) => (
              <article key={post._id} className="relative isolate flex flex-col gap-8 lg:flex-row mb-10">
                <Link href={`/artikel/${post.articleSlug}`}>
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <div className="block absolute rounded-2xl inset-0  rounded-t-lg bg-center bg-cover" style={{ backgroundImage: `url(${urlFor(post.image).format("webp")
        .width(400)
        .height(300)
        .fit("fill")
        .quality(85)
        .url()})` }}>
                  </div>
                  </div>
                </Link>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.publishedAt} >{timeSinceText({ date: post.publishedAt })}</time>
                    <Link href={`/artikler/kategori/${post.categorySlug}`} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{post.category}</Link>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 dark:group-hover:text-gray-200 group-hover:text-gray-600">
                      <Link href={`/artikel/${post.articleSlug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-text_second_color_dark dark:text-text_second_color_light">{post.teaser}</p>
                  </div>
                  <div className="mt-6 hidden lg:flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                    <Image className="w-10 h-10 object-cover object-center rounded-full" alt={post.JournalistName} width={200} height={200} src={
                              post.JournalistPhoto
                                ? urlFor(post.JournalistPhoto).format("webp")
      .width(400)
      .height(300)
      .fit("fill")
      .quality(85)
      .url()
                                : "/img/unisexAvatar.jpeg"
                            } />
                      <div className="text-sm leading-6">
                        <p className="font-semibold ">
                          <Link href={`/artikler/journalist/${post.JournalistSlug}`}>
                            <span className="absolute inset-0" />
                            {post.JournalistName}
                          </Link>
                        </p>
                        <p className="text-fade_color_light dark:text-fade_color_dark">Journalist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
  )
}

export default SubArticlesListLarge