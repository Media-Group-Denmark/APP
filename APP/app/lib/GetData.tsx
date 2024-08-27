/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
import { Article } from "../models/article";
import { client } from "./sanityclient";

export async function getData() {

  const query = `
  *[
    _type == "article" 
  ] 
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    publishedAt,
    "articleSlug": slug.current,
    republishArticle,
    "newSlug": newSlug.current,
    "image": metaImage.asset,
    "category": category->name,
    "categorySlug": category->slug.current,
    "tag": tag[]->name,
    "tagSlug": tag[]->slug.current,
    "JournalistName": journalist->name,
    "JournalistPhoto": journalist->image,
    "JournalistSlug": journalist->slug.current,
    views,
    previewMode,
    reading
  }`;

  const data = await client.fetch(query);
  return data;
}


export function freshData(articles: Article[]): Article[] {
  const today = new Date().toISOString();
  
  return articles.filter(article => 
    article.publishedAt <= today && 
    article.previewMode === false
  );
}