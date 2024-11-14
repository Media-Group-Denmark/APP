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
import ArticleHeroTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/ArticleHeroTwo";
import TrendingArticlesListTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/TrendingArticlesListTwo";
import SubArticlesGridTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/SubArticlesGridTwo";


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


  console.log(data[0].tagSlug)
  return (
    <section>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
     {/*  {data ? (
        <Breadcrumb
          navItem={"Tags"}
          link={"/tags"}
          navItemTwo={currentTag.name}
        />
      ) : null} */}

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              <ArticleHeroTwo
                data={data}
                tag={params.tag}
                startIndex={0}
                endIndex={1}
              />
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesListTwo
                dayInterval={14}
                startIndex={0}
                endIndex={50}
                views={0}
                data={data}
                tag={params.tag}
              />
            </aside>
          </section>
          <div
            className="mobile md:hidden"
            id="div-Box_Mobile_1"
          ></div>
          <div
            className="desktop hidden md:block"
            id="div-Board_2"
          ></div>

          {/* Phone */}
          <section className="inline-block md:hidden">
            <TrendingArticlesListTwo
              dayInterval={30}
              startIndex={0}
              endIndex={50}
              data={data}
              views={0}
              tag={params.tag}
              articleAmount={5}
            />
            <div
            className="mobile md:hidden"
            id="div-Box_Mobile_2"
          ></div>
            {/* <SubArticlesGridTwo
              data={data}
              tag={"nyheder"}
              name="Nyheder"
              startIndex={1}
              endIndex={3}
            /> */}
            <div className="mt-6 block">
              <ArticleHeroTwo data={data} tag={params.tag}
                startIndex={1}
                endIndex={2} />
            </div>
            <div
            className="mobile md:hidden"
            id="div-Box_Mobile_3"
          ></div>
            <SubArticlesGridTwo
              data={data}
              tag={params.tag}
              name={currentTag.name}
              startIndex={4}
              endIndex={20}
            />
            {/* <div className="mt-4 block">
              <ArticleHeroTwo
                data={data}
                tag={params.tag}
                startIndex={6}
                endIndex={7}
              />
            </div> */}
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGridTwo
              data={data}
              tag={params.tag}
              name={currentTag.name}
              startIndex={0}
              endIndex={16}
            />
            <div
            className="desktop hidden md:block"
            id="div-Board_3"
          ></div>
          </section>
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
