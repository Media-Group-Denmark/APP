import { MetadataRoute } from 'next'
import { client } from '../lib/sanityclient';
import { Article } from '../models/article';

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
      ...articles,
  ]
}