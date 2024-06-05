import { client } from "@/app/lib/sanityclient";
import { SearchBar } from "./SearchBar";

export async function getData(queryParam) {
    const query = `
      *[_type == "article" && title match $queryParam] | order(coalesce(publishedAt, _createdAt) desc) [0...5] {
        _id,
        title,
        body
      }`
    const data = await client.fetch(query, { queryParam: `${queryParam}*` });
      
      console.log(`Query: ${queryParam}`);
    return data;
  }

export default async function SearchFetch({ searchParams }: { searchParams: { q?: string } }) {
    const items = await getData(searchParams.q || "");
    console.log('Props received by SearchFetch:', { searchParams });
    console.log(items, "items");
    console.log(searchParams.q, "searchParams");

  return (
    <div>
      <SearchBar />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <a href={`/articles/${item.title}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}