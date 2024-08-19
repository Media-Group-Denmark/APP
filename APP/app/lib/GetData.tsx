/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
import { client } from "./sanityclient";

export async function getData() {
  const today = new Date();
  const formattedToday = today.toISOString();

  const query = `
  *[
    _type == "article" && publishedAt <= "${formattedToday}" && previewMode == false
  ] 
  | order(coalesce(publishedAt, _createdAt) desc) [0...150] {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    publishedAt,
    "articleSlug": slug.current,
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

