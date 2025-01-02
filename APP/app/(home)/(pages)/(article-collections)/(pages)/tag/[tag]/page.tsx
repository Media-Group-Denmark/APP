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
import { articleHero, articleSixGrid } from "../../../components/ArticleContainers/ArticleContainers";
import AdContainer from "@/app/(home)/components/AdContainer/AdContainer";
import TrendingArticlesList_2 from "../../../components/PengehjoernetDK/components/TrendingArticlesList_2";
import ArticleBlock_1_Square from "../../../components/PengehjoernetDK/blocks/ArticleBlock_1_Square";


export const revalidate = 600;

async function fetchData(slug: string | undefined = undefined) {
  const data: ArticleModel[] = await getFreshArticleData();
  const currentTag: Reference = await getTagData(slug);
  
  return {
    data,
    currentTag,
  };
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
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

  const jsonLd = tagSchema({data, params: params.tag})

 /*  tag={params.tag}
  name={currentTag.name} */
  return (
    <section>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {data ? (
        <Breadcrumb
          navItem={"Tags"}
          link={"/tags"}
          navItemTwo={currentTag.name}
        />
      ) : null}

<section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">

          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            <EmblaCarousel
              data={data}
              startIndex={0}
              endIndex={30}
              articleAmount={15}
              tag={params.tag}
              {...articleHero}
            />
            <AdContainer mobile={true} name={"Mobile_Square_1"} />
            <TrendingArticlesList_2
              data={data}
              dayInterval={14}
              views={0}
              startIndex={0}
              endIndex={50}
              tag={params.tag}
              articleAmount={5}
            />
            <AdContainer mobile={true} name={"Mobile_Square_2"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: currentTag.name, tag: true }}
              tag={params.tag}
              endIndex={30}
              articleAmount={15}
              {...articleSixGrid}
            />
            <AdContainer mobile={true} name={"Mobile_Square_3"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: "Nyheder", tag: true }}
              category={"nyheder"}
              endIndex={30}
              articleAmount={15}
              {...articleSixGrid}
            />
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden max-w-[1000px]">
            <div className="grid relative lg:grid-cols-[1fr_1fr] gap-3  max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <EmblaCarousel
                  data={data}
                  startIndex={0}
                  endIndex={30}
                  articleAmount={15}
                  tag={params.tag}
                  {...articleHero}
                  EmblaCarousel={"flex-[0_0_100%]"}
                />
              </div>
              <aside className="hidden w-[280px] lg:inline-block">
                <TrendingArticlesList
                  data={data}
                  dayInterval={14}
                  views={0}
                  startIndex={0}
                  endIndex={50}
                  tag={params.tag}
                  articleAmount={5}
                />
              </aside>
            </div>
            <AdContainer desktop={true} name={"Leaderboard_2"} />
            <ArticleBlock_1_Square
              data={data}
              tag={params.tag}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: currentTag.name, tag: true }}
              {...articleSixGrid}
            />
            <AdContainer desktop={true} name={"Leaderboard_3"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: "Nyheder", tag: true }}
              category={"nyheder"}
              endIndex={30}
              articleAmount={15}
              {...articleSixGrid}
            />
            <AdContainer desktop={true} name={"Leaderboard_3"} />
            <ArticleBlock_1_Square
              data={data}
              category={"privatkonomi"}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: "Privatøkonomi", tag: true }}
              {...articleSixGrid}
            />
          </section>
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
