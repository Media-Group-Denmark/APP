import { client } from "@/app/lib/sanityclient";
const revalidate = 600;

const today = new Date().toISOString();

export async function getFindArticleData(slug: string | undefined) {
    const query = `
    {
      "articles": *[_type in ["article", "msnScrollFeed"] && publishedAt <= "${today}" && 
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
       "allArticles": *[_type in ["article", "msnScrollFeed"] && publishedAt <= "${today}" && 
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