/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleModel } from "../../../models/article";
import { Metadata } from "next";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { getCategoryData } from "../api/getCategoryData";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { generateCategoryMetadata } from "../meta/generateCategoryMetadata";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import categorySchema from "../meta/categorySchema";
import AdContainer from "@/app/(home)/components/AdContainer/AdContainer";
import { EmblaCarousel } from "../../../components/SliderTest";
import TrendingArticlesList_2 from "@/app/(home)/(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList_2";
import { articleHero, articleSixGrid } from "../../../components/ArticleContainers/ArticleContainers";
import ArticleBlock_1_Square from "../../../components/PengehjoernetDK/blocks/ArticleBlock_1_Square";
import TrendingArticlesList from "../../../components/PengehjoernetDK/components/TrendingArticlesList";

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

export async function generateMetadata({ params }: { params: { kategori: string } }) {
  const { currentCategory } = await fetchData(params.kategori);
  const metadata: Metadata = await generateCategoryMetadata(currentCategory);
  return metadata  ;
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

  const jsonLd = categorySchema({data, params: params.kategori})


  return (
    <section>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdContainer desktop={true} name={"Leaderboard_1"} />
      <Breadcrumb
        navItem={"Kategorier"}
        link={"/kategorier"}
        navItemTwo={currentCategory.name}
      />
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">

          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            <EmblaCarousel
              data={data}
              startIndex={0}
              endIndex={30}
              articleAmount={15}
              category={params.kategori}
              {...articleHero}
            />
            <AdContainer mobile={true} name={"Mobile_Square_1"} />
            <TrendingArticlesList_2
              data={data}
              dayInterval={14}
              views={0}
              startIndex={0}
              endIndex={50}
              category={params.kategori}
              articleAmount={5}
            />
            <AdContainer mobile={true} name={"Mobile_Square_2"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: currentCategory.name, tag: true }}
              category={params.kategori}
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
                  category={params.kategori}
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
                  category={params.kategori}
                  articleAmount={8}
                />
              </aside>
            </div>
            <AdContainer desktop={true} name={"Leaderboard_2"} />
            <ArticleBlock_1_Square
              data={data}
              category={params.kategori}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: currentCategory.name, tag: true }}
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
