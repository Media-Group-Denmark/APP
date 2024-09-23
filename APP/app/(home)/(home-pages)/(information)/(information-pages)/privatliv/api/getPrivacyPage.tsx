import { client } from "@/app/lib/sanityclient";
import { Reference } from "../../../models/reference";

export default async function getPrivacyPage() {
  const query = `*[_type == "privacyPolicy"] {
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
