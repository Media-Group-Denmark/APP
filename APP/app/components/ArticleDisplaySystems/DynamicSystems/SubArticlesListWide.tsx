import { Article } from "@/app/models/article";
import Link from "next/link";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import { client, urlFor } from "@/app/lib/sanityclient";

async function getData(
  category = "",
  tag = "",
  journalist = "",
  dayInterval = 0,
  endIndex = 0
) {
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
        ${
          tag
            ? '&& tag[]->slug.current match "' + encodeURIComponent(tag) + '*"'
            : ""
        }
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
  console.log(
    formattedToday,
    formattedQueryStart,
    category,
    tag,
    journalist,
    dayInterval
  );
  return data;
}

const SubArticlesListWide: React.FC<{
  category?: string | undefined;
  tag?: string[] | undefined;
  journalist?: string | undefined;
  dayInterval?: number | undefined;
  startIndex: number;
  endIndex: number;
}> = async ({
  category,
  tag,
  journalist,
  dayInterval,
  startIndex,
  endIndex,
}) => {
  const data = await getData(category, tag, journalist, dayInterval);
  return (
    <section>
      <h1 className="lineHeader text-center text-[0.95rem] font-bold mb-4">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-second_color_light dark:bg-second_color_dark pt-8 mt-6 pb-1 rounded-xl">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          {data
            .slice(startIndex, endIndex)
            .map((post: Article, index: number) => (
              <article
                key={post._id}
                className="relative isolate flex flex-col gap-8 lg:flex-row mb-10"
              >
                <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-44 lg:shrink-0">
                  <Link aria-label="Læs mere om artiklen" href={`/artikel/${post.articleSlug}`}>
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
                  </Link>
                </figure>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.publishedAt} className="text-gray-500">
                      {timeSinceText({ date: post.publishedAt })}
                    </time>
                    <Link
                      href={`/artikler/kategori/${post.categorySlug}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category}
                    </Link>
                  </div>

                  <header className="group relative max-w-xl">
                    <h2 className="mt-3 text-text_main_color_dark dark:text-text_main_color_light text-lg font-semibold leading-6 dark:group-hover:text-gray-200 group-hover:text-gray-600">
                      <Link href={`/artikel/${post.articleSlug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h2>
                    <h3 className="mt-5 text-sm h-[5em] overflow-hidden leading-6 text-text_second_color_dark dark:text-text_second_color_light">
                      {post.teaser}
                    </h3>
                  </header>

                  {/* <footer className="flex items-center gap-x-4 text-xs mt-4">
                       <Link
                         href={`/artikler/journalist/${post.JournalistSlug}`}
                         className="text-sm text-fade_color_light dark:text-fade_color_dark"
                       >
                         {post.JournalistName}
                       </Link>
                     </footer> */}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SubArticlesListWide;
