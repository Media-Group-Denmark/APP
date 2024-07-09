import { Article } from '@/app/models/article'
import Link from 'next/link'
import React from 'react'
import { timeSinceText } from '../../ArticleTools/TimeSinceTag'
import { urlFor } from '@/app/lib/sanityclient'

const FindArticle: React.FC<{data: Article[]; startIndex: number; endIndex: number}> = ({ data, startIndex, endIndex }) => {
  return (
    <div className="grid overflow-y-hidden grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-4 lg:mt-0 relative">
            {data.slice(startIndex, endIndex).map((article, index) => (
              <div
                key={article._id}
                className="bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
              >
                <Link href={`/artikel/${article.articleSlug}`}>
                  <div
                    className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${urlFor(article.image).format("webp")
      .width(400)
      .height(300)
      .fit("fill")
      .quality(85)
      .url()})`,
                    }}
                  ></div>
                </Link>
                <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mx-2 md:mx-4 mb-4 ">
                  <div className=" sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
                    <Link href={`/artikler/kategori/${article.categorySlug}`}>
                      <button className=" text-accent_color_light dark:text-accent_color_dark  mr-auto dark:hover:hover:bg-slate-700 hover:bg-slate-200 bg-opacity-20 py-1 md:p-1 text-[0.85rem] rounded-full ">
                        {article.category}
                      </button>
                    </Link>
                    <p className="rounded-lg sm:my-auto my-1 sm:ml-auto text-xs hidden md:inline-block ">
                        {timeSinceText({ date: article._createdAt })}
                      </p>
                  </div>
                  <Link href={`/artikel/${article.articleSlug}`}>
                    <span className="grid ">
                      <h1 className=" text-sm md:text-lg font-semibold py-0 rounded-lg ">{article.title}</h1>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
  )
}

export default FindArticle

{/* <div className="flex gap-2 mt-4">
  <Link
    href={`/artikler/journalist/${article.JournalistSlug}`}
  >
    <p className="text-xs text-gray-500">
      {article.JournalistName}
    </p>
  </Link>
  <p className="rounded-lg text-xs">
    {timeSinceText({ date: article._createdAt })}
  </p>
</div> */}