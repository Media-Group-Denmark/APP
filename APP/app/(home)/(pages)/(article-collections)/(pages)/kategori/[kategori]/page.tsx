/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleModel } from "../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import TrendingArticlesList from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import TrendingArticlesListAltOmKendte from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { getCategoryData } from "../api/getCategoryData";
import CustomBreadcrumb from "@/app/(home)/components/Navigation/CustomBreadcrumb";
import { generateCategoryMetadata } from "../meta/generateCategoryMetadata";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import categorySchema from "../meta/categorySchema";
import ArticleHeroTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/ArticleHeroTwo";
import TrendingArticlesListTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/TrendingArticlesListTwo";
import TopNewsSliderTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/TopNewsSliderTwo";
import SubArticlesSixGridTwo from "../../../components/ArticleDisplaySystems/DynamicSystems/Proto/SubArticlesGridTwo";
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

  const jsonLd = categorySchema({data, params: params.kategori})

  return (
    <section>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <CustomBreadcrumb
        navItem={"Kategorier"}
        link={"/kategorier"}
        navItemTwo={params.kategori}
      /> */}
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] px-4 mt-4 md:mt-0 mb-4 gap-3 max-w-[1000px]">
            <div className=" lg:w-[600px]">
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
          
          <aside className="hidden gap-4 md:block"><TopNewsSliderTwo data={data} dayInterval={2} startIndex={1} endIndex={12} /></aside>
          <aside
            className="mobile md:hidden"
            data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_1`}
          ></aside>
          <aside
            className="desktop hidden md:block"
            data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_2`}
          ></aside>

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
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_2`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={params.kategori}
              startIndex={1}
              endIndex={3}
            />
            <div className="mt-6 block">
              <ArticleHero data={data} startIndex={3} endIndex={4} />
            </div>
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={params.kategori}
              startIndex={4}
              endIndex={6}
            />
            <div className="mt-4 block">
              <ArticleHeroTwo
                data={data}
                category={params.kategori}
                startIndex={6}
                endIndex={7}
              />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGridTwo
              data={data}
              category={params.kategori}
              startIndex={3}
              endIndex={9}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={theme.categoryOne}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={theme.categoryTwo}
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
