import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { client } from "@/app/lib/sanityclient";
const today = new Date().toISOString();

export async function getChartArticleData() {
    const query = `*[_type == "article" && publishedAt <= "${today}" && previewMode == false] | order(coalesce(publishedAt, _createdAt) desc) [0...1000] {
      _id,
      publishedAt,
      _type,
      title,
      teaser,
      republishArticle,
      "articleSlug": slug.current,
      "newSlug": newSlug.current,
      "oldSlugs": oldSlugs[], 
      "image": metaImage.asset,
      "category": category->name,
      "categorySlug": category->slug.current,
      "tag": tag[]->name,
      "tagSlug": tag[]->slug.current,
      "JournalistName": journalist->name,
      "JournalistSlug": journalist->slug.current,
      views,
      previewMode,
      reading,
    }`;
  
    try {
      const data = await client.fetch<ArticleModel[]>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }