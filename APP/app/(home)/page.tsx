/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import type { Metadata } from "next";
import SubArticlesGrid from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import ArticleHero from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import theme from "@/app/lib/theme.json";
import TrendingArticlesList_2 from "./(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList_2";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { defaultMeta } from "./meta/defaultMeta";
import ArticleBlock_1_Square from "./(pages)/(article-collections)/components/PengehjoernetDK/blocks/ArticleBlock_1_Square";
import ArticleBlock_2_Wide from "./(pages)/(article-collections)/components/PengehjoernetDK/blocks/ArticleBlock_2_Wide";
import LatestNewsSlider from "./(pages)/(article-collections)/components/PengehjoernetDK/components/LatestNewsSlider";
import ArticleHeroTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/ArticleHeroTwo";
import TrendingArticlesListTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/TrendingArticlesListTwo";
import TopNewsSliderTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/TopNewsSliderTwo";
import SubArticlesGridTwo from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Proto/SubArticlesGridTwo";
export const revalidate = 600;

export const metadata: Metadata = defaultMeta;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const data: ArticleModel[] = await getFreshArticleData();

  const articleHero = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: 'md:h-[20em]',
        figureMobileHeight: 'h-[12em]',
      },
      Image: {
        imgWidth: 800,
        imgHeight: 400,
        quality: 85,
        lazyLoading: false,
        responsive: '(max-width: 768px) 600px, 900px',
      },
    },
    header: { visible: true, category: true },
    footer: { visible: true, journalist: true, time: true },
    fontStyles: 'text-2xl md:text-[2.3em] leading-10 font-extrabold rounded-lg',
    contentHeight: 'min-h-[170px]',
  };

  const articleSixGrid = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: 'md:h-[8em]',
        figureMobileHeight: 'h-[8em]'
      },
      Image: {
        lazyLoading: true,
        responsive: '(max-width: 768px) 600px, 900px'
      }
    },
    header: { visible: true, time: true, journalist: false, category: true },
    fontStyles: 'text-md md:text-lg leading-5 md:leading-6 font-bold',
    gridSystem: "md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 "
  }


  return (
    <section>
      {/* <LatestNewsSlider data={data} dayInterval={2} startIndex={0} endIndex={12} /> */}
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">
          
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">

              {/* <ArticleBlock_1_Square
                data={data}
                startIndex={0} 
                endIndex={1}
                articleAmount={1} 
                {...articleHero}
                /> */}
                <ArticleHeroTwo data={data}
                startIndex={0} 
                endIndex={1} />

              {/* <aside className="hidden lg:inline-block">
                <ArticleBlock_2_Wide data={data} startIndex={1} endIndex={3} />
              </aside> */}
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              {/* <TrendingArticlesList_2
                data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={50}
                articleAmount={5}
              /> */}
              <TrendingArticlesListTwo data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={50}
                articleAmount={5} />
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


          <TopNewsSliderTwo data={data} dayInterval={14}
                startIndex={0}
                endIndex={12} />

          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            {/* <TrendingArticlesList_2
              data={data}
              dayInterval={14}
              views={0}
              startIndex={0}
              endIndex={50}
              articleAmount={5}
            /> */}
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Box_Mobile_2`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={theme.categoryOne}
              startIndex={0}
              endIndex={50}
              articleAmount={2}
            />
            <div className="mt-6 block">
              <ArticleHero data={data} startIndex={3} endIndex={4} />
            </div>
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Box_Mobile_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={theme.categoryTwo}
              startIndex={0}
              endIndex={50}
              articleAmount={2}
            />
            <div className="mt-4 block">
              <ArticleHero data={data} startIndex={6} endIndex={7} />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
          <SubArticlesGridTwo
              data={data}
              category={theme.categoryOne}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Board_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={theme.categoryTwo}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Board_3`}
            ></aside>
            <SubArticlesGridTwo
              data={data}
              category={theme.categoryThree}
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
