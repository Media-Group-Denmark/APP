import React from "react";
import { urlFor, client } from "@/app/lib/sanityclient";
import { Article } from "@/app/(home)/(pages)/(article-collections)/models/article";
import ReadMoreAutomaticViews from "./ReadMoreAutomaticViews";
import { ArticleLink } from '@/app/(home)/components/utils/ArticleLink';

// Funktion til at hente relaterede artikler
async function fetchRelatedArticles(articleIds: string[]): Promise<Article[]> {
  const query = `
    *[_type == "article" && _id in $articleIds] {
      _id,
      publishedAt,
      _type,
      title,
      views,
      "articleSlug": slug.current,
    }[0]
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
    <section className="my-2 sm:my-6">
    <ul className="list-disc list-inside grid gap-2 !mx-0">
      {relatedArticles.map((post) => (
        <li className='elementList' key={post._id}>
          <ArticleLink href={`/artikel/${post.republishArticle && post.newSlug ? post.newSlug : post.articleSlug}`}>
            <article className='bg-second_color_light dark:bg-second_color_dark relative isolate flex sm:flex-row sm:gap-8 drop-shadow-lg rounded-xl'>
              <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:shrink-0 h-[100px] sm:h-24 w-[85px] sm:w-24 ">
                <img
                  width={200}
                  height={100}
                  src={urlFor(post.image)
                    .format("webp")
                    .width(200)
                    .height(100)
                    .fit("fill")
                    .quality(85)
                    .url()}
                  alt={post.title}
                  className="block rounded-2xl inset-0 bg-gray-300 max-h-44 h-[100px] sm:h-24 rounded-t-lg w-[85px] lg:w-44 object-cover"
                />
              </figure>

              <div className='p-2 sm:mt-2'>
                <aside className="flex h-[1em] items-center gap-x-4">
                  <ReadMoreAutomaticViews views={post.views} />
                </aside>
                <header className="group relative max-w-xl">
                  <h1 className="!text-[0.9em] sm:!text-[1em] !font-normal !leading-5 sm:!leading-6 max-w-[30ch] sm:max-w-[80ch] mt-1 sm:mt-2 sm:mr-2 !mb-0 dark:group-hover:text-gray-300 group-hover:text-gray-600">
                    {post.title}
                  </h1>
                </header>
              </div>
            </article>
          </ArticleLink>
        </li>
      ))}
    </ul>
  </section>
  );
}
