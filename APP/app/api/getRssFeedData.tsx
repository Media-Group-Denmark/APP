import { client } from "@/app/lib/sanityclient";
import { ArticleModel } from "../(home)/(pages)/(article-collections)/models/article";
export const revalidate = 600;
const today = new Date().toISOString();
export async function getRssFeedData() {
    
    const query = `*[_type in ["article", "msnScrollFeed"] && publishedAt <= "${today}" && previewMode == false] | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
      _id,
      _createdAt,
      _updatedAt,
      publishedAt,
      _type,
      title,
      teaser,
      description,
      republishArticle,
      "articleSlug": slug.current,
      "newSlug": newSlug.current,
      "oldSlugs": oldSlugs[], 
      "image": metaImage.asset,
      "source": coalesce(metaImage.asset->description, 'Shutterstock.com'),
      "imageTags": metaImage.asset->{url, extension, size, metadata {dimensions}},
      "category": category->name,
      "categorySlug": category->slug.current,
      "tag": tag[]->name,
      "tagSlug": tag[]->slug.current,
      "JournalistName": journalist->name,
      "JournalistSlug": journalist->slug.current,
      views,
      previewMode,
      reading,
      overview
    }`;
  
    try {
      const data = await client.fetch<ArticleModel[]>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }