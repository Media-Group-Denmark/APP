import { client } from "@/app/lib/sanityclient";
import { Reference } from "../../models/reference";

export async function getAllCategoriesData() {
    const query = `*[_type == "category"] {
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