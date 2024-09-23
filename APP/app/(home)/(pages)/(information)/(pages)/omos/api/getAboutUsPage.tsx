import { client } from "@/app/lib/sanityclient";
import { Reference } from "../../(referencer)/models/reference";

export default async function getAboutUsPage() {
  const query = `*[_type == "aboutUs"] {
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
