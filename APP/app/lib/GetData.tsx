/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
import { Article } from "../models/article";
import { Reference } from "../models/reference";
import { client } from "./sanityclient";

export async function getData() {
  const query = `
  {
    "articles": *[
      _type == "article"
    ] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      _createdAt,
      _updatedAt,
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
      "JournalistPhoto": journalist->image,
      "JournalistSlug": journalist->slug.current,
      views,
      previewMode,
      reading
    },
    "categories": *[_type == "category"] {
      _id,
      name,
      "slug": slug.current,
      categoryDescription
    },
    "journalists": *[_type == "journalist"] {
      _id,
      name,
      "slug": slug.current
    },
    "tags": *[_type == "tag"] {
      _id,
      name,
      "slug": slug.current,
      tagDescription
    }
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

export function republishData(articles: Article[], slug: string): Article | undefined {
  return articles.find(article => 
    article.articleSlug === slug ||
    (article.oldSlugs && article.oldSlugs.includes(slug)) && 
    article.newSlug !== '' && 
    article.republishArticle === true
  );
}

export function findCategory(categories: Reference[], category: string) {
  return categories.find(({ slug }) => slug === category);
}
