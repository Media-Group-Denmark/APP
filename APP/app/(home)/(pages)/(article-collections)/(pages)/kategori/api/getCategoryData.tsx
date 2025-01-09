import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { client } from "@/app/lib/sanityclient";

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
