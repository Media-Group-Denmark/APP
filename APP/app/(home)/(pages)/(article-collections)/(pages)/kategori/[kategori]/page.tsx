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
  const baseUrl = theme.local_url || theme.site_url; // Dynamisk base-URL
  const apiUrl = `${baseUrl}/api/articles?categorySlug=${kategori}`; // Byg URL med kategoriSlug

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 600 }, // Caching i Next.js
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch articles for category: ${kategori}`);
    }

    return await res.json(); // Returnér dataen
  } catch (error) {
    console.error("Error fetching category articles:", error);
    throw error; // Propager fejlen opad
  }
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
