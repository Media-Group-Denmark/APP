/* import { MetadataRoute } from 'next'
import { client } from './lib/sanityclient';
import { Article } from './models/article';


export async function getArticleData(): Promise<Article[]> {
  const query = `
              *[
                _type == "article"
              ] 
              | order(_createdAt desc) {
                _id,
                title,
                _createdAt,
                _updatedAt,
                "articleSlug": slug.current,
                "category": details.category->name,
                "categorySlug": details.category->slug.current,
                "tagSlug": tag[]->slug.current,
              }`;
  const data = await client.fetch(query);

  return data;
}


 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const articleData: Article[] = await getArticleData();


    const articles = articleData.map((article) => {
      return {
        url: `https://xn--pengehjrnet-mgb.dk/artikel/${article.articleSlug}`,
        lastModified: new Date(article._updatedAt),
        priority: 1,
      }
    });

  return [
    {
      url: 'https://xn--pengehjrnet-mgb.dk',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
        url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/kategorier',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
    },
      {
        url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/tag',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      {
        url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/journalister',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      },
      {
        url: 'https://xn--pengehjrnet-mgb.dk/sider/cookies',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: 'https://xn--pengehjrnet-mgb.dk/sider/omos',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: 'https://xn--pengehjrnet-mgb.dk/sider/kontakt',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      ...articles,
  ]
} */

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://xn--pengehjrnet-mgb.dk',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/kategorier',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/tag',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/journalister',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sider/cookies',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sider/omos',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sider/kontakt',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://xn--pengehjrnet-mgb.dk/sitemaps/sitemap.xml',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
