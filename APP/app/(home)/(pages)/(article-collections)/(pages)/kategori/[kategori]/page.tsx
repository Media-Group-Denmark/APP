/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleModel } from "../../../models/article";
import { Metadata } from "next";
import { generateCategoryMetadata } from "../meta/generateCategoryMetadata";
import categorySchema from "../meta/categorySchema";
import MainArticlePageLayout from "@/app/(home)/components/layouts/MainArticlePageLayout";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { getCategoryData } from "../api/getCategoryData";
import theme from "@/app/lib/theme.json";

/* -------------------------------------------------------------------------- */
/*                             SERVER CACHING                                 */
/* -------------------------------------------------------------------------- */
export const revalidate = 600;

async function fetchCategoryArticles(
  kategori: string
): Promise<ArticleModel[]> {
  const url = `${site_url}/api/articles?categorySlug=${kategori}`;
  const res = await fetch(url, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

/* Henter selv kategori-data (her bruger vi bare din eksisterende getCategoryData) */
async function fetchCategoryData(kategori: string): Promise<Reference> {
  return getCategoryData(kategori);
}

/* -------------------------------------------------------------------------- */
/*                              METADATA-GENERATOR                            */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { kategori: string };
}): Promise<Metadata> {
  const currentCategory = await fetchCategoryData(params.kategori);
  return generateCategoryMetadata(currentCategory);
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function KategoriPage({
  params,
}: {
  params: { kategori: string };
}) {
  const data = await fetchCategoryArticles(params.kategori);
  const currentCategory = await fetchCategoryData(params.kategori);

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
