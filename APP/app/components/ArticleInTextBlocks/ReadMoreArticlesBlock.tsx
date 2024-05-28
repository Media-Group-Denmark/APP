import Link from "next/link";
import React from "react";
import { timeSinceText } from "../ArticleTools/TimeSinceTag";
import { urlFor, client } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";

// Funktion til at hente relaterede artikler
async function fetchRelatedArticles(articleIds: string[]): Promise<Article[]> {
  const query = `
    *[_type == "article" && _id in $articleIds] {
      _id,
      _createdAt,
      _type,
      title,
      "articleSlug": slug.current,
      "image": metaImage.asset,
      "category": details.category->name,
    }
  `;
  try {
    if (!articleIds || articleIds.length === 0) {
      return [];
    }
    const data = await client.fetch<Article[]>(query, { articleIds });
    return data;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    throw error;
  }
}

export default async function ReadMoreArticlesBlock({
  mainArticle,
}: {
  mainArticle: any;
}) {
  const readMoreBlock = mainArticle.overview.find(
    (block: any) => block._type === "readMore"
  );

  let relatedArticles: any[] = [];
  if (readMoreBlock) {
    const articleIds = readMoreBlock.articles.map(
      (article: any) => article._ref
    );

    if (articleIds.length > 0) {
      relatedArticles = await fetchRelatedArticles(articleIds);
    }
  }

  if (relatedArticles.length === 0) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold">Læs også:</h2>
      <ul className="list-disc list-inside grid">
        {relatedArticles.map((post: any) => (
          <article
            key={post._id}
            className="relative isolate flex flex-col xs:flex-row gap-8 mb-8"
          >
            <Link href={`/artikel/${post.articleSlug}`}>
              <div className="relative xs:aspect-[2/1] aspect-square h-32 xs:h-16 w-full xs:w-16 shrink-0">
                <div
                  className="block absolute rounded-2xl inset-0 bg-second_color_light dark:bg-second_color_dark rounded-t-lg bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${urlFor(post.image)
                      .format("webp")
                      .width(100)
                      .height(200)
                      .fit("fill")
                      .quality(85)
                      .url()})`,
                  }}
                ></div>
              </div>
            </Link>
            <div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post._createdAt} className="text-gray-500">
                  {timeSinceText({ date: post._createdAt })}
                </time>
                <Link
                  href={`/artikler/kategori/${post.categorySlug}`}
                  className="relative z-10 w-fit rounded-full bg-gray-50 px-3 py-1.5 font-medium !text-gray-600 hover:bg-gray-100"
                >
                  {post.category}
                </Link>
              </div>
              <div className="group relative max-w-xl">
                <h3 className="mt-2 text-sm md:text-md font-semibold leading-6 dark:group-hover:text-gray-300  group-hover:text-gray-600">
                  <Link href={`/artikel/${post.articleSlug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
              </div>
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
}
