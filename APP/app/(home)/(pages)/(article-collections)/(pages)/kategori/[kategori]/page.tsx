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
      <Breadcrumb
        navItem={"Kategorier"}
        link={"/kategorier"}
        navItemTwo={currentCategory.name}
      />
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              <ArticleHero
                data={data}
                category={params.kategori}
                startIndex={0}
                endIndex={1}
              />
              <aside className="hidden lg:inline-block">
                <SubArticlesListWide
                  data={data}
                  category={params.kategori}
                  name={currentCategory.name}
                  startIndex={1}
                  endIndex={3}
                />
              </aside>
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesListAltOmKendte
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

          <aside
            className="mobile md:hidden"
            data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Box_Mobile_1`}
          ></aside>
          <aside
            className="desktop hidden md:block"
            data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Board_2`}
          ></aside>

          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            <TrendingArticlesListAltOmKendte
              views={0}
              dayInterval={30}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              data={data}
              category={params.kategori}
            />
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Box_Mobile_2`}
            ></aside>
            <SubArticlesGrid
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={1}
              endIndex={3}
            />
            <div className="mt-6 block">
              <ArticleHero data={data} startIndex={3} endIndex={4} />
            </div>
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Box_Mobile_3`}
            ></aside>
            <SubArticlesGrid
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={4}
              endIndex={6}
            />
            <div className="mt-4 block">
              <ArticleHero
                data={data}
                category={params.kategori}
                startIndex={6}
                endIndex={7}
              />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGrid
              data={data}
              category={params.kategori}
              name={currentCategory.name}
              startIndex={3}
              endIndex={9}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Board_3`}
            ></aside>
            <SubArticlesGrid
              data={data}
              category={"spare-hacks"}
              name={"Spare Hacks"}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Board_3`}
            ></aside>
            <SubArticlesGrid
              data={data}
              category={"privatkonomi"}
              name={"Privatøkonomi"}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            />
          </section>
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
