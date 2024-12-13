import { client } from "@/app/lib/sanityclient";
import { MSNFeedModel } from "../models/MSNFeedModel";

const today = new Date().toISOString();
export async function getMSNFeedData() {
  const query = `*[_type == "msnScrollFeed"] | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
    _id,
    _createdAt,
    _updatedAt,
    publishedAt,
    _type,
    title,
    description,
    category,
    "feedSlug": slug.current,
    "JournalistName": journalist->name,
    articles[]-> { title, "image": metaImage.asset, "imageTags": metaImage.asset->{url, extension, size, metadata {dimensions}}, "source": coalesce(metaImage.asset->description, 'Shutterstock.com'), msnFeedDescription, msnDescription, previewMode }
    }`;
    
    try {
      const data = await client.fetch<MSNFeedModel[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}