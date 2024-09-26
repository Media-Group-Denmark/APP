import { client } from "@/app/lib/sanityclient";

export async function getSubPage({ params 
}: {
  params: { undersider: string; };
}) {
  const query = `*[_type == "subPage" && slug.current == "${params.undersider}"] [0]
  {
    _id,
    title,
    _updatedAt,
    overview
  }`;
  try {
    const data = await client.fetch(query);
    return data;
  }
  catch (error) {
    console.error(error);
  }
}