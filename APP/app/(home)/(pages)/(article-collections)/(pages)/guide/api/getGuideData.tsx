// api/getGuideData.js

import { client } from "@/app/lib/sanityclient";
import { GuideModel } from "../meta/GuideModel";

const today = new Date().toISOString();

export async function getGuideData(feed: string | undefined) {
  if (!feed) {
    throw new Error("Feed parameter er påkrævet");
  }

  const query = `*[_type == "msnScrollFeed" && slug.current == $feed] | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
    _id,
    _createdAt,
    _updatedAt,
    publishedAt,
    _type,
    title,
    description,
    "image": metaImage.asset,
    "source": metaImage.asset->description,
    "category": category->name,
    "categorySlug": category->slug.current,
    "tag": tag[]->name,
    "tagSlug": tag[]->slug.current,
    "feedSlug": slug.current,
    "JournalistName": journalist->name,
    "JournalistSlug": journalist->slug.current,
    "JournalistPhoto": journalist->image,
    articles[] {
      title,
      description,
      _key,
      subImage {
        asset->{
          url,
          extension,
          size,
          metadata { dimensions }
        },
        description
      },
      "source": coalesce(subImage.description, 'Shutterstock.com'),
      msnFeedDescription,
      msnDescription,
      previewMode
    }
  }`;

  try {
    const data = await client.fetch<GuideModel[]>(query, { feed });
    //console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
