import Link from "next/link";
import React from "react";
import { timeSinceText } from "../../ArticleTools/TimeSinceTag";
import { urlFor, client } from "@/app/lib/sanityclient";
import { Article } from "@/app/models/article";
import ReadMoreAutomaticViews from "./ReadMoreAutomaticViews";

// Funktion til at hente relaterede artikler
async function fetchRelatedArticles(articleIds: string[]): Promise<Article[]> {
  const query = `
    *[_type == "article" && _id in $articleIds] {
      _id,
      _createdAt,
      publishedAt,
      _type,
      title,
      views,
      "articleSlug": slug.current,
      "image": metaImage.asset,
      "category": category->name,
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
    <aside className="my-8">
    <ul className="list-disc list-inside grid gap-2">
      {relatedArticles.map((post: any) => (
          <Link href={`/artikel/${post.articleSlug}`}>
        <article key={post._id} className='bg-second_color_light dark:bg-second_color_dark relative isolate flex flex-col sm:flex-row sm:gap-8 shadow-sm rounded-xl'>
        <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:shrink-0 h-[70px] sm:h-24 w-[70px] sm:w-24 ">
              <img
                src={urlFor(post.image)
                  .format("webp")
                  .width(300)
                  .height(200)
                  .fit("fill")
                  .quality(85)
                  .url()}
                alt={post.title}
                className="block rounded-2xl inset-0 bg-gray-300 max-h-44 h-[70px] sm:h-24 rounded-t-lg w-64 lg:w-44 object-cover"
              />
            </figure>
            <div className='p-2 sm:mt-2 sm:p-0'>
              <div className="flex items-center gap-x-4">
              <ReadMoreAutomaticViews views={post.views} />
              </div>
              <header className="group relative max-w-xl">
                <h4 className=" text-[0.95em] sm:text-[1em] md:text-[1.1em] font-semibold leading-6 mt-2 sm:mr-2 dark:group-hover:text-gray-300  group-hover:text-gray-600">
                    {post.title}
                </h4>
              </header>
            </div>
        </article>
            </Link>
      ))}
    </ul>
  </aside>
  );
}
