/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleModel } from "../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import TrendingArticlesList from "@/app/(home)/(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { getTagData } from "../api/getTagData";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { generateTagMetadata } from "../meta/generateTagMetaData";
import tagSchema from "../meta/tagSchema";
import { EmblaCarousel } from "../../../components/SliderTest";
import {
  articleHero,
  articleSixGrid,
} from "../../../components/ArticleContainers/ArticleContainers";
import AdContainer from "@/app/(home)/components/AdContainer/AdContainer";
import TrendingArticlesList_2 from "../../../components/PengehjoernetDK/components/TrendingArticlesList_2";
import ArticleBlock_1_Square from "../../../components/PengehjoernetDK/blocks/ArticleBlock_1_Square";
import MainArticlePageLayout from "@/app/(home)/components/layouts/MainArticlePageLayout";

export const revalidate = 600;

async function fetchData(slug: string | undefined = undefined) {
  const data: ArticleModel[] = await getFreshArticleData();
  const currentTag: Reference = await getTagData(slug);

  return {
    data,
    currentTag,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}) {
  const { currentTag } = await fetchData(params.tag);
  const metadata: Metadata = await generateTagMetadata(currentTag);
  return metadata;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function tag({ params }: { params: { tag: string } }) {
  const { data } = await fetchData(params.tag);
  const { currentTag } = await fetchData(params.tag);

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
