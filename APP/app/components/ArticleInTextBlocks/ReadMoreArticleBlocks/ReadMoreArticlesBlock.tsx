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
    <div className="my-8">
    <ul className="list-disc list-inside grid gap-2">
      {relatedArticles.map((post: any) => (
        <div className='bg-second_color_light dark:bg-second_color_dark shadow-sm rounded-xl'>
         
          <article
          key={post._id}
          className="relative isolate flex flex-col sm:flex-row sm:gap-8"
          >
            <Link href={`/artikel/${post.articleSlug}`}>
              <div className="relative sm:aspect-[2/1] aspect-square h-32 sm:h-24 w-full sm:w-24 shrink-0">
                <div
                  className="block absolute rounded-2xl inset-0 bg-second_color_light dark:bg-second_color_dark rounded-t-lg bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${urlFor(post.image)
                      .format("webp")
                      .width(300)
                      .height(200)
                      .fit("fill")
                      .quality(85)
                      .url()})`,
                  }}
                ></div>
              </div>
            </Link>
            <div className='p-2 sm:mt-2 sm:p-0'>
              <div className="flex items-center gap-x-4">
              <div><ReadMoreAutomaticViews views={post.views} /></div>
              </div>
              <div className="group relative max-w-xl">
                  <Link href={`/artikel/${post.articleSlug}`}>
                <h4 className=" text-[0.95em] sm:text-[1em] md:text-[1.1em] font-semibold leading-6 mt-2 sm:mr-2 dark:group-hover:text-gray-300  group-hover:text-gray-600">
                    
                    {post.title}
                </h4>
                  </Link>
              </div>
            </div>
          </article>
        </div>
      ))}
    </ul>
  </div>
  );
}
