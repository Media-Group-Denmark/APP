/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
import { Article } from "../../models/article";
import { Reference } from "../../models/reference";
import { Page } from "../../models/subpage";
import { client } from "../../lib/sanityclient";

export async function getData(slug: string | undefined) {
  const today = new Date().toISOString();
  const query = `
  {
    "singleArticle": *[_type == "article" && 
      (slug.current == "${slug}" || 
      newSlug.current == "${slug}" || 
      "${slug}" in oldSlugs)] | 
      order(coalesce(publishedAt, _createdAt) desc) {
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
        facebookTitle,
        facebookDescription,
        "facebookImage": facebookImage.asset,
        overview,
        views,
        disclaimer,
        reading,
        previewMode,
      },
    "articles": *[_type == "article" && publishedAt <= "${today}" && 
    previewMode == false ] | order(coalesce(publishedAt, _createdAt) desc) [0...150] {
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
    },
     "allArticles": *[_type == "article"] | order(coalesce(publishedAt, _createdAt) desc) {
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
    "subPage": *[_type == "subPage" && slug.current == "${slug}"] {
      _id,
      title,
      "slug": slug.current,
      _updatedAt,
      overview
    }
  }`;

  const data = await client.fetch(query);
  return data;
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


export const findSubPage = (subPage: Page[], page: string) => { 
  return subPage.find(({ slug }) => slug === page);
}

