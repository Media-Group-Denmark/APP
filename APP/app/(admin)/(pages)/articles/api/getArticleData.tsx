import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";
import { client } from "@/app/lib/sanityclient";

const today = new Date().toISOString();
export async function getArticleData(
    categoryDefined: string | undefined = undefined,
    tagDefined: string | undefined = undefined,
    journalistDefined: string | undefined = undefined
  ) {
    let filters = `*[_type == "article" && publishedAt <= "${today}" && previewMode == false]`;
  
    if (categoryDefined) {
      filters += ` && category->slug.current == "${categoryDefined}"`;
    }
  
    if (tagDefined) {
      filters += ` && "${tagDefined}" in tag[]->slug.current`;
    }
  
    if (journalistDefined) {
      filters += ` && journalist->slug.current == "${journalistDefined}"`;
    }
  
    const query = `${filters} | order(coalesce(publishedAt, _createdAt) desc) [0...20] {
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
      "source": metaImage.asset->description,
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