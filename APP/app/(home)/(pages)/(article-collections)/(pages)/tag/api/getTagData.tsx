import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { client } from "@/app/lib/sanityclient";

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