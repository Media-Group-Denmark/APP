/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleModel } from "../../../models/article";
import { Metadata } from "next";
import theme from "@/app/lib/theme.json";
import { getTagData } from "../api/getTagData";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { generateTagMetadata } from "../meta/generateTagMetaData";
import tagSchema from "../meta/tagSchema";
import MainArticlePageLayout from "@/app/(home)/components/layouts/MainArticlePageLayout";

/* -------------------------------------------------------------------------- */
/*                             SERVER CACHING                                 */
/* -------------------------------------------------------------------------- */
export const revalidate = 600;

async function fetchTagArticles(tag: string): Promise<ArticleModel[]> {
  const url = `${site_url}/api/articles?tagSlug=${tag}`;
  const res = await fetch(url, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

async function fetchTagData(tag: string): Promise<Reference> {
  return getTagData(tag);
}

/* -------------------------------------------------------------------------- */
/*                              METADATA-GENERATOR                            */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}) {
  const currentTag = await fetchTagData(params.tag);
  const metadata: Metadata = await generateTagMetadata(currentTag);
  return metadata;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function tag({ params }: { params: { tag: string } }) {
  const data = await fetchTagArticles(params.tag);
  const currentTag = await fetchTagData(params.tag);

  const jsonLd = tagSchema({ data, params: params.tag });

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
        tag={params.tag}
        nameTag={{ name: currentTag.name, tag: true }}
        breadCrumb={{
          navItem: "Tags",
          navItemTwo: currentTag.name,
          link: "/tags",
        }}
      />
    </section>
  );
}
export const runtime = "edge";
