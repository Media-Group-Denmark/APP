import { urlFor } from '@/app/lib/sanityclient'
import { Article } from '@/app/models/article'
import React from 'react'
import { timeSinceText } from '../../ArticleTools/TimeSinceTag'
import Link from 'next/link'
import { SanityDocument } from "next-sanity";


interface ExtendedArticle extends SanityDocument {
  articleSlug: string;
  image: any; // Specify the correct type for images from your Sanity schema
  categorySlug: string;
  category: string;
  JournalistSlug: string;
  JournalistName: string;
  _createdAt: string;
}

const ArticleHero: React.FC<{data: ExtendedArticle[]; startIndex: number; endIndex: number}> = ({ data, startIndex, endIndex }) =>  {
  return (
    <div >
            {data.slice(startIndex, endIndex).map((article, index) => (
              <div
                key={article._id}
                className="col-span-2 mb-4 lg:mb-8 bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
              >
                <Link href={`/artikel/${article.articleSlug}`}>
                  <div
                    className="block w-full h-[12em] md:h-[20em] rounded-t-lg bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${urlFor(article.image).format("webp")
        .width(900)
        .height(600)
        .fit("fill")
        .quality(85)
        .url()})`,
                    }}
                  ></div>
                </Link>
  
                <div className="px-4 pb-4">
                  
                  <div className="grid grid-rows-[auto_1fr_auto] h-[190px] md:h-[200px] ">
                    <Link href={`/artikler/kategori/${article.categorySlug}`}>
                      <button className=" text-accent_color_light dark:text-accent_color_dark bg-opacity-90 py-2 text-md rounded-tl-lg rounded-br-lg ">
                        {article.category}
                      </button>
                    </Link>
                    <Link href={`/artikel/${article.articleSlug}`}>
                    <span className="grid">
                      <h1 className=" text-2xl md:text-4xl font-semibold rounded-lg ">
                        {article.title}
                      </h1>
                    </span>
                    </Link>
                    <div className="flex gap-2">
                      <Link
                        href={`/artikler/journalist/${article.JournalistSlug}`}
                      >
                        <p className="text-sm text-fade_color_light dark:text-fade_color_dark">
                          {article.JournalistName}
                        </p>
                      </Link>
                      <p className="rounded-lg ">
                        {timeSinceText({ date: article._createdAt })}
                      </p>
                    </div>
                  </div>
  
                
                </div>
              </div>
            ))}
          </div>
  )
}

export default ArticleHero