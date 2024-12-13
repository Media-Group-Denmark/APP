import { client } from "@/app/lib/sanityclient";
import { GuideModel } from "../meta/GuideModel";

const today = new Date().toISOString();
export async function getGuideData(feed: string | undefined) {
  //console.log(feed)
  const query = `*[_type == "msnScrollFeed" && slug.current == "${feed}"] | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
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
      "JournalistSlug": journalist->slug.current,
      "JournalistPhoto": journalist->image,
      articles[]-> { title, "image": metaImage.asset, "imageTags": metaImage.asset->{url, extension, size, metadata {dimensions}}, "source": coalesce(metaImage.asset->description, 'Shutterstock.com'), msnFeedDescription, msnDescription, previewMode }
    }`;

  try {
    const data = await client.fetch<GuideModel[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}