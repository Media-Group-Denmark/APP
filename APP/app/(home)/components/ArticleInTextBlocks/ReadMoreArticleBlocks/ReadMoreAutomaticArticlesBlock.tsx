import { urlFor } from '@/app/lib/sanityclient';
import { getData } from '@/app/api/data/GetData';
import { ArticleLink } from '@/app/(home)/components/utils/ArticleLink';
import React from 'react';
import ReadMoreAutomaticViews from './ReadMoreAutomaticViews';
import { Article } from '@/app/(home)/models/article';

// Global liste over uønskede nøgleord
const EXCLUDED_WORDS = ["til", "at", "er", "og", "på", "i", "en", "du", "for", "med", "af"];

/**
 * Ekstraherer navne fra titlen. Navne defineres som ord, der starter med stort bogstav,
 * og som ikke er inkluderet i nøgleordene.
 * @param {string} title - Artikeltitel.
 * @returns {string[]} - Liste af navne med stort bogstav.
 */
function extractNames(title) {
  return title
    .split(' ')
    .filter(word => word && word[0] === word[0].toUpperCase() && !EXCLUDED_WORDS.includes(word.toLowerCase()));
}

/**
 * Ekstraherer nøgleord fra titlen, som ikke er små almindelige ord.
 * @param {string} title - Artikeltitel.
 * @returns {string[]} - Liste af relevante nøgleord i små bogstaver.
 */
function extractKeywords(title) {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(/[^a-zæøå0-9]/gi, ''))
    .filter(word => word.length > 1 && !EXCLUDED_WORDS.includes(word));
}

/**
 * Filtrerer artikler baseret på navne og kategori, og prioriterer de artikler
 * med højest antal views.
 * @param {Object[]} articles - Liste af artikler.
 * @param {string[]} names - Navne ekstraheret fra den aktuelle artikeltitel.
 * @param {string} category - Kategori af den aktuelle artikel.
 * @param {string} currentArticleId - ID på den aktuelle artikel for at ekskludere den.
 * @returns {Object[]} - Liste af de to bedst matchende artikler.
 */
function filterArticlesByCriteria(articles, names, category, currentArticleId) {
  // Ekskluder den aktuelle artikel baseret på _id
  const filteredArticles = articles.filter(article => article._id !== currentArticleId);

  // Filtrering på navne (prioriterede)
  const byNames = filteredArticles.filter(article => {
    const articleNames = extractNames(article.title);
    return names.some(name => articleNames.includes(name));
  }).sort((a, b) => b.views - a.views); // Sorter efter views

  // Hvis der er mindst 2 artikler, der matcher på navne, returner dem
  if (byNames.length >= 2) return byNames.slice(0, 2);

  // Hvis der ikke findes nok artikler baseret på navne, søg efter kategori og sorter efter views
  const byCategory = filteredArticles.filter(article => article.category === category)
    .sort((a, b) => b.views - a.views);

  // Returner de bedste matchende artikler fra både navn og kategori
  return byNames.concat(byCategory).slice(0, 2);
}

export default async function ReadMoreAutomaticArticlesBlock({ articleTitle, articleCategory, currentArticleId }) {
  // Hent alle artikler
  const { articles: allArticles} = await getData() as { articles: Article[] };

  // Ekstraher navne og nøgleord fra den aktuelle artikeltitel
  const names = extractNames(articleTitle);

  

  // Filtrér de hentede artikler baseret på navne, kategori og ekskluder den aktuelle artikel
  const relatedAutomaticArticles = filterArticlesByCriteria(allArticles, names, articleCategory, currentArticleId);

  return (
    <section className="my-2 sm:my-6">
      <ul className="list-disc list-inside grid gap-2 !mx-0">
        {relatedAutomaticArticles.map((post) => (
          <li className='elementList' key={post._id}>
            <ArticleLink href={`/artikel/${post.republishArticle && post.newSlug ? post.newSlug : post.articleSlug}?p=${new Date(post.publishedAt).toLocaleDateString()}`}>
              <article className='bg-second_color_light dark:bg-second_color_dark relative isolate flex sm:flex-row sm:gap-8 drop-shadow-lg rounded-xl'>
                <figure className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:shrink-0 h-[100px] sm:h-24 w-[85px] sm:w-24 ">
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
