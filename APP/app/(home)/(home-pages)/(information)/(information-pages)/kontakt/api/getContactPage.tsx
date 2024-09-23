import { client } from "@/app/lib/sanityclient";
import { Reference } from "../../../models/reference";

export default async function getContactPage() {
  const query = `*[_type == "contactUs"] {
    title,
    overview,
}`;
  try {
    const data = await client.fetch<Reference[]>(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
