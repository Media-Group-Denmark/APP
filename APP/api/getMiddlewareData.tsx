import { singleArticle } from "@/app/(home)/(pages)/artikel/models/singleArticle";
import { client } from "@/app/lib/sanityclient";

export async function getMiddlewareData(slug: string | undefined) {
    const query = `*[_type == "article" && (newSlug.current == "${slug}" || 
        "${slug}" in oldSlugs)][0] {
      _id,
      republishArticle,
      "articleSlug": slug.current,
      "oldSlug": oldSlugs[],
      "newSlug": newSlug.current
    }`;
  
    try {
      const data = await client.fetch<singleArticle[]>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  