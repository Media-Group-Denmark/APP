import { client } from "@/app/lib/sanityclient";
import { MSNFeedModel } from "../models/MSNFeedModel";
export const revalidate = 600;

export async function getMSNFeedData() {
  const query = `*[_type == "msnScrollFeed"] | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
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
    "feedSlug": slug.current,
    "JournalistName": journalist->name,
    articles[] {
      title,
      description,
      _key,
      "source": coalesce(metaImage.asset->description, 'Shutterstock.com'),
      subImage {
        asset->{
          url,
          extension,
          size,
          metadata {dimensions}
        }
      },
      imageSrc
    }
  }`;

  try {
    const data = await client.fetch<MSNFeedModel[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}