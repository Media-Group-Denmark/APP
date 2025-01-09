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
  const res = await fetch(`${site_url}/api/articles`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  // Parse JSON
  const data: ArticleModel[] = await res.json();

  // Returnér layout, nu med data fra route
  return (
    <MainArticlePageLayout
      latestNewsTopSlider={true}
      topNewsOverview={2}
      data={data}
    />
  );
}
