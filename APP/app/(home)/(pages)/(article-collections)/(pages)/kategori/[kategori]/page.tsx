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
import TrendingArticlesListAltOmKendte from "@/app/(home)/(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList_2";
import SubArticlesListWide from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { getCategoryData } from "../api/getCategoryData";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { generateCategoryMetadata } from "../meta/generateCategoryMetadata";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import categorySchema from "../meta/categorySchema";
import ArticleHeroTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/ArticleHeroTwo";
import TrendingArticlesListTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/TrendingArticlesListTwo";
import SubArticlesGridTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/SubArticlesGridTwo";

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
      {/* <Breadcrumb
        navItem={"Kategorier"}
        link={"/kategorier"}
        navItemTwo={currentCategory.name}
      /> */}
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              <ArticleHeroTwo
                data={data}
                category={params.kategori}
                startIndex={0}
                endIndex={1}
              />
              {/* <aside className="hidden lg:inline-block">
                <SubArticlesListWide
                  data={data}
                  category={params.kategori}
                  name={currentCategory.name}
                  startIndex={1}
                  endIndex={3}
                />
              </aside> */}
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesListTwo
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={50}
                data={data}
                category={params.kategori}
                articleAmount={5}
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
          <section className="grid gap-4 md:hidden">
            <TrendingArticlesListTwo
              views={0}
              dayInterval={30}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              data={data}
              category={params.kategori}
            />
            <div
            className="mobile md:hidden"
            id="div-Box_Mobile_2"
          ></div>
            {/* <SubArticlesGrid
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={1}
              endIndex={3}
            /> */}
            <div className="mt-6 block">
              <ArticleHeroTwo data={data} startIndex={1} endIndex={2} />
            </div>
            <div
            className="mobile md:hidden"
            id="div-Box_Mobile_3"
          ></div>
            <SubArticlesGridTwo
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={4}
              endIndex={20}
            />
            {/* <div className="mt-4 block">
              <ArticleHero
                data={data}
                category={params.kategori}
                startIndex={6}
                endIndex={7}
              />
            </div> */}
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGridTwo
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={3}
              endIndex={9}
            />
            <div
            className="desktop hidden md:block"
            id="div-Board_3"
          ></div>
            <SubArticlesGridTwo
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={9}
              endIndex={50}
              articleAmount={20}
            />
          </section>
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
