import { client } from '@/app/lib/sanityclient';
import { MetadataRoute } from 'next';
import theme from '@/app/lib/theme.json';

async function getCategories(): Promise<string[]> {
  const query = `*[_type == "category"][].slug.current`;
  const categories = await client.fetch(query);
  console.log('this runs')
  return categories;
}

export async function generateSitemaps() {
  const categories = await getCategories();
  console.log('this runs')
  return categories.map((category, index) => ({ id: category }));
}

export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  const articles: any[] = await client.fetch(`
    *[_type == "article" && category->slug.current == $category][_createdAt desc]{
      _id,
      _createdAt,
      "slug": slug.current
    }`, { category: id });
    console.log(articles);
  const siteArticle = articles.map(article => ({
    url: `${theme.site_url}/artikler/kategori/${id}/${article.slug}`,
    lastModified: new Date(article._createdAt),
  }));
  console.log('this never runs')
  return [
    {
      url: `${theme.site_url}/artikler/kategori/test`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...siteArticle,
  ]
}
export const runtime = 'edge';