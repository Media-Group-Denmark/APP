/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleModel } from "../../../models/article";
import { Metadata } from "next";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { getCategoryData } from "../api/getCategoryData";
import { generateCategoryMetadata } from "../meta/generateCategoryMetadata";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import categorySchema from "../meta/categorySchema";
import MainArticlePageLayout from "@/app/(home)/components/layouts/MainArticlePageLayout";

export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
async function fetchData(slug: string | undefined = undefined) {
  const data: ArticleModel[] = await getFreshArticleData();
  const currentCategory: Reference = await getCategoryData(slug);

  return {
    data,
    currentCategory,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { kategori: string };
}) {
  const { currentCategory } = await fetchData(params.kategori);
  const metadata: Metadata = await generateCategoryMetadata(currentCategory);
  return metadata;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function kategori({
  params,
}: {
  params: { kategori: string };
}) {
  const { data } = await fetchData(params.kategori);
  const { currentCategory } = await fetchData(params.kategori);

  const jsonLd = categorySchema({ data, params: params.kategori });

  return (
    <section>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainArticlePageLayout
        data={data}
        topNewsOverview={1}
        category={params.kategori}
        nameTag={{ name: currentCategory.name, tag: true }}
        breadCrumb={{
          navItem: "Kategorier",
          navItemTwo: currentCategory.name,
          link: "/kategorier",
        }}
      />
    </section>
  );
}
export const runtime = "edge";
