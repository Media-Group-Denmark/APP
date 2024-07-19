import { client, urlFor } from '@/app/lib/sanityclient';
import { Article } from '@/app/models/article';
import Link from 'next/link';
import React from 'react';
import { timeSinceText } from '../../ArticleTools/TimeSinceTag';
import ReadMoreAutomaticViews from './ReadMoreAutomaticViews';

function extractNames(title) {
  return title.split(' ').filter(word => word && word[0] === word[0].toUpperCase());
}


function extractKeywords(title) {
  return title.toLowerCase().split(' ')
    .map(word => word.replace(/[^a-zæøå0-9]/gi, ''))
    .filter(word => word.length > 1 && !["til", "at", "er", "og", "på", "i", "en", "du", "for", "med", "af"].includes(word));
}

async function fetchArticlesByCriteria(title, names, keywords, category) { 
  const timeFilter = new Date();
  const threeMonthsAgo = timeFilter.setMonth(timeFilter.getMonth() - 3).toString();

  const query = `
    *[_type == "article" && title != '${title}' && publishedAt > '${threeMonthsAgo}'] | order(views desc) [0...100] {
      _id,
      title,
      views,
      publishedAt,
      "category": category->name,
      "articleSlug": slug.current,
      "image": metaImage.asset,
    }
  `;
  const articles = await client.fetch(query);

  // Først forsøger vi at finde artikler baseret på navne
  /* const byNames = articles.filter(article => names.some(name => article.title.includes(name)));
  if (byNames.length >= 2) return byNames.slice(0, 2); */
  
  // Dernæst forsøger vi at finde artikler baseret på nøgleord
  const byKeywords = articles.filter(article => {
    const articleKeywords = extractKeywords(article.title);
    return articleKeywords.filter(keyword => keywords.includes(keyword)).length >= 2;
  });
  if (byKeywords.length >= 2) return byKeywords.slice(0, 2);
  if (byKeywords.length > 0) return byKeywords;

  // Hvis ovenstående ikke opfylder, finder vi artikler fra samme kategori og sorterer efter visninger
  const byCategory = articles.filter(article => article.category === category)
    .sort((a, b) => b.views - a.views);
  
  // Hvis der stadig ikke er 2 artikler, tager vi de højeste views generelt
  if (byCategory.length >= 2) return byCategory.slice(0, 2);
  if (byCategory.length === 1) {
    const highestViewArticle = articles.sort((a, b) => b.views - a.views)[0];
    return byCategory.concat(highestViewArticle).slice(0, 2);
  }

  // Hvis ingen artikler matchede, returnerer vi de to artikler med højeste visninger
  return articles.sort((a, b) => b.views - a.views).slice(0, 2);
}

export default async function ReadMoreAutomaticArticlesBlock({ articleTitle, articleCategory }) {
  const names = extractNames(articleTitle);
  const keywords = extractKeywords(articleTitle);
  const relatedAutomaticArticles = await fetchArticlesByCriteria(articleTitle, names, keywords, articleCategory);

  return (
    <div className="my-2 sm:my-6">
      <ul className="list-disc list-inside grid gap-2 !m-0">
        {relatedAutomaticArticles.map((post: any) => (
            <Link href={`/artikel/${post.articleSlug}`}>
          <div className='bg-second_color_light dark:bg-second_color_dark shadow-sm rounded-xl'>
           
            <article
            key={post._id}
            className="relative isolate flex sm:flex-row sm:gap-8"
            >
                <div className="relative sm:aspect-[2/1] aspect-square h-[70px] sm:h-24 w-[70px] sm:w-24 shrink-0">
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
              <div className=' p-1 px-2 sm:p-2 sm:mt-2'>
                <div className="flex h-[1em] items-center gap-x-4">
                <div><ReadMoreAutomaticViews views={post.views} /></div>
                </div>
                <div className="group relative max-w-xl">
                  <h4 className=" !text-[0.8em] sm:!text-[0.95em] font-semibold !leading-5 sm:!leading-6 max-w-[30ch] sm:max-w-[80ch] mt-1 sm:mt-2 sm:mr-2 !mb-0 dark:group-hover:text-gray-300  group-hover:text-gray-600">
                      
                      {post.title}
                  </h4>
                </div>
              </div>
            </article>
          </div>
              </Link>
        ))}
      </ul>
    </div>
  );
}


