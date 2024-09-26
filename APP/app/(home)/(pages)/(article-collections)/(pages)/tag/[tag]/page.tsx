/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Article } from "../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import TrendingArticlesList from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import { getFreshArticleData } from "@/app/(home)/(pages)/(article-collections)/api/getFreshArticleData";
import { getTagData } from "../api/getTagData";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { generateTagMetadata } from "../meta/generateTagMetaData";


export const revalidate = 600;

async function fetchData(slug: string | undefined = undefined) {
  const data: Article[] = await getFreshArticleData();
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

  return (
    <section>
      {data ? (
        <Breadcrumb
          navItem={"Tags"}
          link={"/tag"}
          navItemTwo={params.tag}
        />
      ) : null}

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              <ArticleHero
                data={data}
                tag={params.tag}
                startIndex={0}
                endIndex={1}
              />
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesList
                dayInterval={60}
                startIndex={0}
                endIndex={100}
                data={data}
                tag={params.tag}
                articleAmount={5}
              />
            </aside>
          </section>
          <aside
            className="mobile md:hidden"
            data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_1`}
          ></aside>
          <aside
            className="desktop hidden md:block"
            data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_2`}
          ></aside>

          {/* Phone */}
          <section className="inline-block md:hidden">
            <TrendingArticlesList
              dayInterval={30}
              startIndex={0}
              endIndex={100}
              data={data}
              tag={params.tag}
            />
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_2`}
            ></aside>
            <SubArticlesGrid
              data={data}
              tag={"nyheder"}
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
            <SubArticlesGrid
              data={data}
              tag={params.tag}
              startIndex={4}
              endIndex={6}
            />
            <div className="mt-4 block">
              <ArticleHero
                data={data}
                tag={params.tag}
                startIndex={6}
                endIndex={7}
              />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGrid
              data={data}
              tag={"nyheder"}
              startIndex={0}
              endIndex={6}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_3`}
            ></aside>
          </section>
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
