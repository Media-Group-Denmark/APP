import { MetadataRoute } from 'next'
import theme from '../../../lib/theme.json';
import { getAllJournalistsData } from '@/app/(home)/(pages)/(information)/(pages)/(referencer)/journalister/api/getAllJournalistsData';
import { getAllCategoriesData } from '@/app/(home)/(pages)/(information)/(pages)/(referencer)/kategorier/api/getAllCategoriesData';
import { getAllTagsData } from '@/app/(home)/(pages)/(information)/(pages)/(referencer)/tags/api/getAllTagsData';
import { Reference } from '../../(pages)/(information)/(pages)/(referencer)/models/reference';
export const revalidate = 600;


 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const journalistData: Reference[] | Reference = await getAllJournalistsData();
    const categoryData: Reference[] | Reference = await getAllCategoriesData();
    const tagData: Reference[] | Reference = await getAllTagsData();

    const journalists = Array.isArray(journalistData) ? journalistData.map((journalist: Reference) => {
      return {
          url: `${theme.site_url}/journalist/${journalist.slug}`,
          lastModified: new Date(journalist._updatedAt),
          priority: 1,
        }
    }) : [];
    
    const categories = Array.isArray(categoryData) ? categoryData.map((category: Reference) => {
      return {
          url: `${theme.site_url}/kategori/${category.slug}`,
          lastModified: new Date(category._updatedAt),
          priority: 1,
        }
    }) : [];
    
    const tags = Array.isArray(tagData) ? tagData.map((tag: Reference) => {
      return {
          url: `${theme.site_url}/tag/${tag.slug}`,
          lastModified: new Date(tag._updatedAt),
          priority: 1,
        }
    }) : [];

      return [
        ...journalists, ...categories, ...tags
      ]
      
}

