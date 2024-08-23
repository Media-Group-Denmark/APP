/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { ArticleLink } from '@/app/components/utils/ArticleLink';
import { client, urlFor } from "../../../lib/sanityclient";
import { Article } from "../../../models/article";
import { Metadata } from "next";
import ArticleHero from "@/app/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import SubArticlesGrid from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import SubArticlesListSmall from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import TrendingArticlesList from "@/app/components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import theme from "@/app/lib/theme.json";
import TopNewsSlider from "@/app/components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import TrendingArticlesListAltOmKendte from "@/app/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
import { getData } from "@/app/lib/GetData";
import Breadcrumb from "@/app/components/Navigation/Breadcrumb";
import { SubArticlesInfiniteScroll } from "@/app/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";

export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { kategori: string };
}): Promise<Metadata> {
  // Fetch data within the function
  const data: Article[] = await getData();
  if (data.length > 0) {
    const article = data[0];
    //console.log("Article", article.title);
    return {
      title: `${article.category} - Artikler og Indsigter | ${theme.site_name}`,
      description: Array.isArray(article.teaser)
        ? article.teaser.join(",")
        : article.teaser,
      keywords: `Kategori ${article.category} - Artikler og Indsigter, ${theme.site_name}`,
      openGraph: {
        title: `${article.category} | ${theme.site_name}`,
        description: `${article.teaser},`,
        url: `${theme.site_name}/artikler/kategori/${article.categorySlug}`,
        type: "website",
        siteName: `${theme.site_name}`,
        locale: "da_DK",
        images: [
          {
            url: article.image
              ? urlFor(article.image)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()
              : `${theme.logo_public_url}`,
            width: 800,
            height: 600,
            alt: `Billede for kategori ${article.category}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: `${theme.metadata.twitter.site}`,
        title: `${article.category} - Artikler og Indsigter | ${theme.site_name}`,
        description: `${article.teaser}`,
        images: article.image
          ? urlFor(article.image)
              .format("webp")
              .width(400)
              .height(300)
              .fit("fill")
              .quality(85)
              .url()
          : `${theme.logo_public_url}`,
      },
      robots: "index, follow",
      publisher: `${theme.site_name}`,
    };
  } else {
    console.log("Article data is undefined.");
    return {
      title: "Default Title",
      robots: "noindex, nofollow", // Added robots meta tag
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function kategori({
  params,
}: {
  params: { kategori: string };
}) {
  const data: Article[] = await getData();
  console.log('params', params.kategori)
  return (
    <main>

      <Breadcrumb navItem={'Kategorier'} link={"/sider/referencer/kategorier"} navItemTwo={params.kategori}/>

      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto ">
        <div className="containerr px-2 md:px-6 py-10 pt-0 m-auto ">

            {/* Both */}
            <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <ArticleHero data={data} category={params.kategori} startIndex={0} endIndex={1} />
                <aside className="hidden lg:inline-block">
                  <SubArticlesListWide data={data} category={params.kategori} startIndex={1} endIndex={3} />
                </aside>
              </div>
              <aside className="hidden w-[280px] lg:inline-block">
                <TrendingArticlesListAltOmKendte
                dayInterval={14}
                startIndex={0}
                endIndex={100}
                data={data} category={params.kategori}
                articleAmount={5} 
                 />
              </aside>
            </section>

            <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_1"></aside>
            <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_2"></aside>
            
            {/* Phone */}
            <section className="grid gap-4 md:hidden">
              <TrendingArticlesListAltOmKendte
                dayInterval={30}
                startIndex={0}
                endIndex={100}
                data={data} category={params.kategori}
              />
              <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_2"></aside>
              <SubArticlesGrid data={data} category={params.kategori} startIndex={1} endIndex={3} />
              <div className="mt-6 block">
                <ArticleHero data={data} startIndex={3} endIndex={4} />
              </div>
              <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_3"></aside>
              <SubArticlesGrid data={data} category={params.kategori} startIndex={4} endIndex={6} />
              <div className="mt-4 block">
                <ArticleHero data={data} category={params.kategori} startIndex={6} endIndex={7} />
              </div>
            </section>




            {/* Desktop */}
            <section className="md:inline-block hidden">
              <SubArticlesGrid data={data} category={params.kategori}  startIndex={3} endIndex={9} />
              <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
              <SubArticlesGrid data={data} category={'spare-hacks'} startIndex={0} endIndex={6} />
              <aside className="desktop hidden md:block" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_3"></aside>
              <SubArticlesGrid data={data} category={'privatokonomi'} startIndex={0} endIndex={6} />
            </section>
            <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl  bg-second_color_light dark:bg-second_color_dark ">
              <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={200} />
              <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
              <aside className='desktop hidden md:block' data-ad-unit-id="/49662453/PengehjoernetDK/Square_2"></aside>
              <TrendingArticlesList data={data} dayInterval={14} endIndex={100} articleAmount={6}  />
              </div>
            </section>
        </div>
      </section>
    </main>
  );
}
export const runtime = "edge";
