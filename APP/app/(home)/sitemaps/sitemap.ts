import { MetadataRoute } from 'next'
import { client } from '../../lib/sanityclient';
import theme from '../../lib/theme.json';
import { ArticleModel } from '../(pages)/(article-collections)/models/article';

export async function getArticleData(): Promise<ArticleModel[]> {
  const query = `
              *[
                _type == "article" 
              ] 
              | order(coalesce(publishedAt, _createdAt) desc) {
                _id,
                title,
                _createdAt,
                _updatedAt,
                publishedAt,
                "articleSlug": slug.current,
                republishArticle,
                "newSlug": newSlug.current,
                "category": category->name,
                "categorySlug": category->slug.current,
                "tagSlug": tag[]->slug.current,
              }`;
  const data = await client.fetch(query);

  return data;
}


 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const articleData: ArticleModel[] = await getArticleData();

    
    const articles = articleData.map((article) => {
      let slug = article.articleSlug;
      if (article.republishArticle && article.newSlug) {
        slug = article.newSlug;
      }
      return {
        url: `${theme.site_url}/artikel/${slug}`,
        lastModified: new Date(article._updatedAt),
        priority: 1,
      }
    });

  return [
      ...articles,
  ]
}