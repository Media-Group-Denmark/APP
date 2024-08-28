/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
import { Article } from "../models/article";
import { Reference } from "../models/reference";
import { Page } from "../models/subpage";
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
      reading,
      overview,
      "source": metaImage.asset->description,
      facebookTitle,
      facebookDescription,
      "facebookImage": facebookImage.asset,
      disclaimer
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
    },
    "subPage": *[_type == "subPage"]
    {
    _id,
    title,
    "slug": slug.current,
    _updatedAt,
    overview
  },
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



export function republishData(articles: Article[], slug: string) {
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

export function findTag(tags: Reference[], tag: string) {
  console.log("Tag", tag, tags);
  return tags.find(({ slug }) => slug === tag);
}


export function findArticle(articles: Article[], article: string) {
  return articles.find(({ articleSlug, newSlug }) => articleSlug === article || newSlug === article);
}

export const findSubPage = (subPage: Page[], page: string) => { 
  return subPage.find(({ slug }) => slug === page);
}

