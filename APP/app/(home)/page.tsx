/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import type { Metadata } from "next";

import ArticleHero from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import TopNewsSlider from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import theme from "@/app/lib/theme.json";
import TrendingArticlesListAltOmKendte from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { defaultMeta } from "./meta/defaultMeta";
import ArticleHeroTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/ArticleHeroTwo";
import TopNewsSliderTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/TopNewsSliderTwo";
import TrendingArticlesListTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/TrendingArticlesListTwo";
import SubArticlesGridTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/SubArticlesGridTwo";
export const revalidate = 600;

export const metadata: Metadata = defaultMeta;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const data: ArticleModel[] = await getFreshArticleData();

  return (
    <section>
      {/* <TopNewsSlider data={data} dayInterval={2} startIndex={0} endIndex={12} /> */}
      
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] px-4 mt-4 md:mt-0 mb-4 gap-3 max-w-[1000px]">
            <div className=" lg:w-[600px]">
              {/* <ArticleHero data={data} startIndex={0} endIndex={1} /> */}
              <ArticleHeroTwo data={data} startIndex={0} endIndex={1} />
              {/* <aside className="hidden lg:inline-block">
                <SubArticlesListWide data={data} startIndex={1} endIndex={3} />
              </aside> */}
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              {/* <TrendingArticlesListAltOmKendte
                data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={50}
                articleAmount={5}
              /> */}
              <TrendingArticlesListTwo
                data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={50}
                articleAmount={10}
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
              data={data}
              dayInterval={14}
              views={0}
              startIndex={0}
              endIndex={50}
              articleAmount={5}
            />
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_2`}
            ></aside>
            <TopNewsSliderTwo data={data} dayInterval={2} startIndex={1} endIndex={12} />
            <SubArticlesGridTwo
              data={data}
              startIndex={1}
              endIndex={3}
              articleAmount={2}
            />
            <div className="mt-6 block">
              <ArticleHeroTwo data={data} startIndex={3} endIndex={4} />
            </div>
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/49662453/${theme.site_ad_name}/Mobile_Square_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={"nyheder"}
              startIndex={4}
              endIndex={6}
              articleAmount={2}
            />
            <div className="mt-4 block">
              <ArticleHeroTwo data={data} startIndex={6} endIndex={7} />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <SubArticlesGridTwo
              data={data}
              category={"nyheder"}
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
              category={"spare-hacks"}
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
              category={"privatkonomi"}
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
