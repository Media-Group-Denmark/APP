import { client } from "@/app/lib/sanityclient";

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