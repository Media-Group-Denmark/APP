import { MetadataRoute } from 'next'
import { client } from '../../lib/sanityclient';
import theme from '../../lib/theme.json';
import { ArticleModel } from '../(pages)/(article-collections)/models/article';
export const revalidate = 600;

export async function getArticleData(): Promise<ArticleModel[]> {
  const today = new Date().toISOString();
  const query = `
              *[_type in ["article", "msnScrollFeed"] && publishedAt <= "${today}" && previewMode == false]
              | order(coalesce(publishedAt, _createdAt) desc) {
                _id,
                _type,
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
        url: article._type === 'msnScrollFeed' ? `${theme.site_url}/guide/${article.articleSlug}` : `${theme.site_url}/artikel/${article.articleSlug}`,
        lastModified: new Date(article._updatedAt),
        priority: 1,
      }
    });

  return [
      ...articles,
  ]
}