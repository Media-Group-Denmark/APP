import { Article } from '@/app/models/article'
import Link from 'next/link'
import React from 'react'
import { timeSinceText } from '../../ArticleTools/TimeSinceTag'
import { client, urlFor } from '@/app/lib/sanityclient'
import theme from '@/app/lib/theme.json'

async function getData(category = "", tag = "", journalist = "", dayInterval = 0, endIndex = 0) {
  const today: Date = new Date();
  const queryStart = new Date();
  queryStart.setDate(queryStart.getDate() - (dayInterval || 0));

  const formattedToday = today.toISOString();
  const formattedQueryStart = queryStart.toISOString();

  const query = `
    *[
        _type == "article"
        ${
          category
            ? '&& category->slug.current == "' +
              encodeURIComponent(category) +
              '"'
            : ""
        }
        ${tag ? '&& tag[]->slug.current match "' + encodeURIComponent(tag) + '*"' : ""}
        ${
            journalist
              ? '&& journalist->slug.current == "' +
                encodeURIComponent(journalist) +
                '"'
              : ""
          }
        ${
          (dayInterval as number) > 0
            ? `&& publishedAt >= "${formattedQueryStart}" && publishedAt <= "${formattedToday}"`
            : ""
        }
      ]
      | order(publishedAt desc) [0...10] {
      _id,
      _createdAt,
      _type,
      title,
      teaser,
      publishedAt,
      "articleSlug": slug.current,
      "image": metaImage.asset,
      "category": category->name,
      "categorySlug": category->slug.current,
      "tag": tag[]->name,
      "tagSlug": tag[]->slug.current,
      "JournalistName": journalist->name,
      "JournalistPhoto": journalist->image,
      "JournalistSlug": journalist->slug.current,
      views
    }`;
  const data = await client.fetch(query);
  console.log(formattedToday, formattedQueryStart, category, tag, journalist, dayInterval);
  return data;
}

const SubArticlesSixGrid: React.FC<{
  category?: string | undefined;
  tag?: string[] | undefined;
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> =  async ({ category, tag, journalist, dayInterval, startIndex, endIndex }) => {
  const data = await getData(category, tag, journalist, dayInterval);
  return (
    <section>
      <Link href={`${theme.site_url}/artikler/kategori/${category}`}>
        <h1 className="lineHeader text-center text-[0.95rem] font-bold md:mb-4">
          <span className="bg-accent_color_light dark:bg-bg-accent_color_light text-white px-4 py-1 uppercase">
            {category
              ? category
              : tag
              ? tag
              : journalist
              ? journalist
              : "Alle Nyheder"}
          </span>
        </h1>
      </Link>
      <article className="grid overflow-y-hidden grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-4 lg:mt-0 relative">
        {data
          .slice(startIndex, endIndex)
          .map((post: Article, index: number) => (
            <div
              key={post._id}
              className="bg-second_color_light dark:bg-second_color_dark rounded-lg relative"
            >
              <figure className="block w-full h-[7em] md:h-[10em] bg-gray-300 rounded-t-lg overflow-hidden">
                <Link aria-label="Læs mere om artiklen" href={`/artikel/${post.articleSlug}`}>
                  <img
                    src={urlFor(post.image)
                      .format("webp")
                      .width(400)
                      .height(300)
                      .fit("fill")
                      .quality(85)
                      .url()}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </figure>
              <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] h-[120px] lg:h-[150px] mx-2 md:mx-4 mb-4">
                <aside className="sm:grid sm:grid-cols-2 align-middle mt-2 h-fit md:my-2">
                  <Link href={`/artikler/kategori/${post.categorySlug}`}>
                  <p className="relative text-sm z-10 w-fit rounded-full bg-gray-50 px-3 py-1 my-1 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category}
                </p>
                  </Link>
                  <time
                    className="rounded-lg sm:my-auto my-1 sm:ml-auto text-xs hidden md:inline-block"
                    dateTime={post.publishedAt}
                  >
                    {timeSinceText({ date: post.publishedAt })}
                  </time>
                </aside>
                <header>
                  <Link href={`/artikel/${post.articleSlug}`}>
                    <h2 className="text-sm md:text-lg font-semibold py-0 rounded-lg">
                      {post.title}
                    </h2>
                  </Link>
                </header>
              </div>
            </div>
          ))}
      </article>
    </section>
  );
}

export default SubArticlesSixGrid

{/* <div className="flex gap-2 mt-4">
  <Link
    href={`/artikler/journalist/${post.JournalistSlug}`}
  >
    <p className="text-xs text-gray-500">
      {post.JournalistName}
    </p>
  </Link>
  <p className="rounded-lg text-xs">
    {timeSinceText({ date: post})}
  </p>
</div> */}
