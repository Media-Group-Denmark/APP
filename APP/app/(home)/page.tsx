/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { Metadata } from "next";
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import { defaultMeta } from "./meta/defaultMeta";
import MainArticlePageLayout from "./components/layouts/MainArticlePageLayout";
import theme from "@/app/lib/theme.json";

export const revalidate = 600;
export const metadata: Metadata = defaultMeta;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const baseUrl = theme.local_url || theme.site_url; // Dynamisk base-URL
  const apiUrl = `${baseUrl}/api/articles`; // Samlet URL

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Brug caching i Next.js
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    // Parse JSON
    const data: ArticleModel[] = await res.json();

    // Returnér layout med data
    return (
      <MainArticlePageLayout
        latestNewsTopSlider={true}
        topNewsOverview={2}
        data={data}
      />
    );
  } catch (error) {
    console.error("Error fetching articles:", error);

    return (
      <div>
        <h1>Failed to load articles</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}
