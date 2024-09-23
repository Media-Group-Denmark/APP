import { client } from "@/app/lib/sanityclient";
import { Reference } from "../../models/reference";

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
  