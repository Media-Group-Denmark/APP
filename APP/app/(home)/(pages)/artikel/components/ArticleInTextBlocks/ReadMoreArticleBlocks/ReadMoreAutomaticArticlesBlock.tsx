import { urlFor } from "@/app/lib/sanityclient";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import React from "react";
import ReadMoreAutomaticViews from "./ReadMoreAutomaticViews";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";

// Global liste over uønskede nøgleord
const EXCLUDED_WORDS = [
  "til",
  "at",
  "er",
  "og",
  "på",
  "i",
  "en",
  "du",
  "for",
  "med",
  "af",
];

function extractNames(title: string) {
  return title
    .split(" ")
    .filter(
      (word) =>
        word &&
        word[0] === word[0].toUpperCase() &&
        !EXCLUDED_WORDS.includes(word.toLowerCase())
    );
}

function extractKeywords(title: string) {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(/[^a-zæøå0-9]/gi, ""))
    .filter((word) => word.length > 1 && !EXCLUDED_WORDS.includes(word));
}

function filterArticlesByCriteria(
  articles: any,
  names: any,
  category: any,
  currentArticleId: any
) {
  // Ekskluder den aktuelle artikel baseret på _id
  const filteredArticles = articles.filter(
    (article: any) => article._id !== currentArticleId
  );

  // Filtrering på navne (prioriterede)
  const byNames = filteredArticles
    .filter((article: any) => {
      const articleNames = extractNames(article.title);
      return names.some((name: any) => articleNames.includes(name));
    })
    .sort((a: number, b: number) => ((b.views as number) - a.views) as number); // Sorter efter views

  // Hvis der er mindst 2 artikler, der matcher på navne, returner dem
  if (byNames.length >= 2) return byNames.slice(0, 2);

  // Hvis der ikke findes nok artikler baseret på navne, søg efter kategori og sorter efter views
  const byCategory = filteredArticles
    .filter((article) => article.category === category)
    .sort((a, b) => b.views - a.views);

  // Returner de bedste matchende artikler fra både navn og kategori
  return byNames.concat(byCategory).slice(0, 2);
}

// Find main artikel

export default async function ReadMoreAutomaticArticlesBlock({
  articleTitle,
  articleCategory,
  currentArticleId,
}) {
  // Hent alle artikler
  const allArticles: ArticleModel[] = await getFreshArticleData();

  // Ekstraher navne og nøgleord fra den aktuelle artikeltitel
  const names = extractNames(articleTitle);

  // Filtrér de hentede artikler baseret på navne, kategori og ekskluder den aktuelle artikel
  const relatedAutomaticArticles = filterArticlesByCriteria(
    allArticles,
    names,
    articleCategory,
    currentArticleId
  );

  return (
    <section className="my-2 sm:my-6">
      <ul className="list-disc list-inside grid gap-2 !mx-0">
        {relatedAutomaticArticles.map((post) => (
          <li className="elementList" key={post._id}>
            <ArticleLink
              href={`/artikel/${
                post.republishArticle && post.newSlug
                  ? post.newSlug
                  : post.articleSlug
              }`}
            >
              <article className="bg-second_color_light dark:bg-second_color_dark relative isolate flex sm:flex-row sm:gap-8  rounded-xl">
                {/*  <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:shrink-0 h-[100px] sm:h-24 w-[85px] sm:w-24 ">
                  <img
                    width={300}
                    height={200}
                    src={urlFor(post.image)
                      .format("webp")
                      .width(300)
                      .height(200)
                      .fit("fill")
                      .quality(85)
                      .url()}
                    alt={post.title}
                    className="block rounded-2xl inset-0 bg-gray-300 max-h-44 h-[100px] sm:h-24 rounded-t-lg w-[85px] lg:w-44 object-cover"
                  />
                </figure> */}

                <div className="p-2 sm:mt-2">
                  <aside className="flex h-[1em] items-center gap-x-4">
                    <ReadMoreAutomaticViews views={post.views} />
                  </aside>
                  <header className="group relative max-w-xl">
                    <h1 className="!text-[0.9em] sm:!text-[1em] !font-normal !leading-5 sm:!leading-6 mt-1 sm:mt-2 sm:mr-2 !mb-0 dark:group-hover:text-gray-300 group-hover:text-gray-600">
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
