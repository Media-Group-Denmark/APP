/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { urlFor } from "../../../lib/sanityclient";
import { Article } from "../../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/(home)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/(home)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import TrendingArticlesList from "@/app/(home)/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import { getFreshArticleData, getTagData } from "@/app/api/data/GetData";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { SubArticlesInfiniteScroll } from "@/app/(home)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";


export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  
  const currentTag = await getTagData(params.tag);

  if (currentTag) {

    return {
      title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
      description: currentTag.tagDescription,
      keywords: `Tag ${currentTag.name} - Artikler og Indsigter, ${theme.site_name}`,
      openGraph: {
        title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
        description: currentTag.tagDescription,
        url: `${theme.site_name}/artikler/tag/${currentTag.slug}`,
        type: "website",
        siteName: `${theme.site_name}`,
        locale: "da_DK",
        images: [
          {
            url: `${theme.logo_public_url}`,
            width: 800,
            height: 600,
            alt: `Billede for tag ${currentTag.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: `${theme.metadata.twitter.site}`,
        title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
        description: currentTag.tagDescription,
        images: `${theme.logo_public_url}`,
      },
      robots: "index, follow",
      publisher: `${theme.site_name}`,
    };
  } else {
    return {
      title: "Default Title",
      robots: "noindex, nofollow",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function tag({ params }: { params: { tag: string } }) {
  const data: Article[] = await getFreshArticleData();
  return (
    <section>
      {data ? (
        <Breadcrumb navItem={'Tags'} link={"/sider/referencer/tag"} navItemTwo={params.tag}/>
      ) : null}

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto "> 
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              <ArticleHero data={data} tag={params.tag} startIndex={0} endIndex={1} />
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesList
                dayInterval={60}
                startIndex={0}
                endIndex={100}
                data={data} tag={params.tag}
                articleAmount={5} 
              />
            </aside>
          </section>
          <aside className="mobile md:hidden" data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_1`}></aside>
          <aside className="desktop hidden md:block" data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_2`}></aside>

          {/* Phone */}
          <section className="inline-block md:hidden">
            <TrendingArticlesList
              dayInterval={30}
              startIndex={0}
              endIndex={100}
              data={data} tag={params.tag}
            />
            <aside className="mobile md:hidden" data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_2`}></aside>
            <SubArticlesGrid
              data={data} tag={'nyheder'}
              startIndex={1}
              endIndex={3}
            />
            <div className="mt-6 block">
              <ArticleHero data={data} startIndex={3} endIndex={4} />
            </div>
            <aside className="mobile md:hidden" data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_3`}></aside>
            <SubArticlesGrid
              data={data} tag={params.tag}
              startIndex={4}
              endIndex={6}
            />
            <div className="mt-4 block">
              <ArticleHero data={data} tag={params.tag} startIndex={6} endIndex={7} />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGrid
              data={data} tag={'nyheder'}
              startIndex={0}
              endIndex={6}
            />
            <aside className="desktop hidden md:block" data-ad-unit-id={`/49662453/${theme.site_ad_name}/Leaderboard_3`}></aside>
          </section>
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
