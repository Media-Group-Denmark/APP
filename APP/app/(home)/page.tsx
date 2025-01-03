/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import type { Metadata } from "next";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { defaultMeta } from "./meta/defaultMeta";
import MainArticlePageLayout from "./components/layouts/MainArticlePageLayout";
export const revalidate = 600;

export const metadata: Metadata = defaultMeta;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const data: ArticleModel[] = await getFreshArticleData();

  return (
      <MainArticlePageLayout latestNewsTopSlider={true} topNewsOverview={2} data={data} />
  );
}
