import { client } from "@/app/lib/sanityclient";
import { singleArticle } from "../models/singleArticle";

export async function getArticleSingleData(slug: string | undefined) {
    let query = `*[_type == "article"`;
  
    // Tilføj slug-filtrering
    query += ` && (slug.current == "${slug}" || 
        newSlug.current == "${slug}" || 
        "${slug}" in oldSlugs)]`;
  
    // Tilføj ordren og resten af data, når filtrene er opsat
    query += ` | order(coalesce(publishedAt, _createdAt) desc)[0] {
          _id,
          _createdAt,
          publishedAt,
          _type,
          title,
          teaser,
          "articleSlug": slug.current,
          "newSlug": newSlug.current,
          "oldSlugs": oldSlugs[], 
          republishArticle,
          "image": metaImage.asset,
          "source": metaImage.asset->description,
          "category": category->name,
          "categorySlug": category->slug.current,
          "tag": tag[]->name,
          "tagSlug": tag[]->slug.current,
          "JournalistName": journalist->name,
          "JournalistSlug": journalist->slug.current,
          "JournalistPhoto": journalist->image,
          facebookTitle,
          facebookDescription,
          "facebookImage": facebookImage.asset,
          overview,
          views,
          disclaimer,
          reading,
          previewMode,
        }`;
  
    try {
      const data = await client.fetch<singleArticle[]>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }