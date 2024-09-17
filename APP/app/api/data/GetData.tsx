/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
import { Article } from "../../(home)/models/article";
import { Reference } from "../../(home)/models/reference";
import { Page } from "../../(home)/models/subpage";
import { client } from "../../lib/sanityclient";
import { singleArticle } from "@/app/(home)/models/singleArticle";

const today = new Date().toISOString();

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

export async function getArticleSingleData(slug: string | undefined, dato: string | undefined) {
  let query = `*[_type == "article"`;

  // Tilføj dato-filter først, hvis defineret
  if (dato) {
    const formattedDate = new Date(dato).toISOString().split('T')[0]; 
    query += ` && publishedAt >= "${formattedDate}"`;
  }
  
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

export async function getFreshArticleData(
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

  const query = `${filters} | order(coalesce(publishedAt, _createdAt) desc) [0...250] {
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
    const data = await client.fetch<Article[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCategoryData(slug: string | undefined) {
  const query = `*[_type == "category" && slug.current == "${slug}"][0] {
      _id,
      name,
      "slug": slug.current,
      categoryDescription
    }`;
    try {
      const data = await client.fetch<Reference>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function getAllCategoriesData() {
  const query = `*[_type == "category"] {
      _id,
      name,
      "slug": slug.current,
    }`;
    try {
      const data = await client.fetch<Reference>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}

export async function getTagData(slug: string | undefined) { 
  const query = `*[_type == "tag" && slug.current == "${slug}"][0] {
      _id,
      name,
      "slug": slug.current,
      tagDescription
    }`;
    try {
      const data = await client.fetch<Reference>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}
export async function getAllTagsData() {
  const query = `*[_type == "tag"] {
      _id,
      name,
      "slug": slug.current,
    }`;
    try {
      const data = await client.fetch<Reference>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}

export async function getJournalistData(slug: string | undefined) {
  const query = `*[_type == "journalist" && slug.current == "${slug}"][0] {
      _id,
      name,
      description,
      "image": image.asset,
      "slug": slug.current
    }`;
  const data = await client.fetch(query);
  return data;
}

export async function getAllJournalistsData() {
  const query = `*[_type == "journalist"] {
      _id,
      name,
      "slug": slug.current
    }`;
    try {
      const data = await client.fetch<Reference>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}

export async function getData(slug: string | undefined) {
  const today = new Date().toISOString();
  const query = `
  {
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
     "allArticles": *[_type == "article" && publishedAt <= "${today}" && 
    previewMode == false] | order(coalesce(publishedAt, _createdAt) desc) {
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
  return articles.find(
    (article) =>
      article.articleSlug === slug ||
      (article.oldSlugs &&
        article.oldSlugs.includes(slug) &&
        article.newSlug !== "" &&
        article.republishArticle === true)
  );
}

export function findCategory(categories: Reference[], category: string) {
  return categories.find(({ slug }) => slug === category);
}

export function findTag(tags: Reference[], tag: string) {
  return tags.find(({ slug }) => slug === tag);
}

export const findSubPage = (subPage: Page[], page: string) => {
  return subPage.find(({ slug }) => slug === page);
};

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
    const data = await client.fetch<Article[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}