/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import type { Metadata } from "next";
import SubArticlesGrid from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import ArticleHero from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import TopNewsSlider from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
import theme from "@/app/lib/theme.json";
import TrendingArticlesListAltOmKendte from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/TrendingArticlesListAltOmKendte";
import SubArticlesListWide from "./(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListWide";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { defaultMeta } from "./meta/defaultMeta";
import ArticleHeroTest from "./(pages)/(article-collections)/components/ArticleBlocks/block";
export const revalidate = 600;

export const metadata: Metadata = defaultMeta;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const data: ArticleModel[] = await getFreshArticleData();

  return (
    <section>
      <TopNewsSlider data={data} dayInterval={2} startIndex={0} endIndex={12} />
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">
          {/* Both */}
          <section className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
            <div className=" lg:w-[700px]">
              {/* <ArticleHero data={data} startIndex={0} endIndex={1} /> */}
              <ArticleHeroTest 
                data={data}
                startIndex={0} 
                endIndex={1}
                articleAmount={1} 
                mediaSize={{
                  Figure: {
                    figureDesktopHeight: 'md:h-[20em]',
                    figureMobileHeight: 'h-[12em]'
                  },
                  Image: {
                    imgWidth: 800,
                    imgHeight: 400,
                    quality: 85,
                    lazyLoading: false,
                    responsive: '(max-width: 768px) 600px, 900px'
                  }
                }}
                header={{ visible: true, time: true, address: false, category: true }}
                fontStyles= 'text-2xl md:text-[2.3em] leading-10 font-extrabold rounded-lg'
                contentHeight="min-h-[170px]"
                />
              
              <aside className="hidden lg:inline-block">
                <SubArticlesListWide data={data} startIndex={1} endIndex={3} />
              </aside>
            </div>
            <aside className="hidden w-[280px] lg:inline-block">
              <TrendingArticlesListAltOmKendte
                data={data}
                dayInterval={14}
                views={0}
                startIndex={0}
                endIndex={50}
                articleAmount={5}
              />
            </aside>
          </section>

          <aside
            className="mobile md:hidden"
            data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Mobile_Square_1`}
          ></aside>
          <aside
            className="desktop hidden md:block"
            data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Leaderboard_2`}
          ></aside>

          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            <TrendingArticlesListAltOmKendte
              data={data}
              dayInterval={14}
              views={0}
              startIndex={0}
              endIndex={50}
              articleAmount={5}
            />
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Mobile_Square_2`}
            ></aside>
            <SubArticlesGrid
              data={data}
              startIndex={1}
              endIndex={3}
              articleAmount={2}
            />
            <div className="mt-6 block">
              <ArticleHero data={data} startIndex={3} endIndex={4} />
            </div>
            <aside
              className="mobile md:hidden"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Mobile_Square_3`}
            ></aside>
            <SubArticlesGrid
              data={data}
              category={"nyheder"}
              name="Nyheder"
              startIndex={4}
              endIndex={6}
              articleAmount={2}
            />
            <div className="mt-4 block">
              <ArticleHero data={data} startIndex={6} endIndex={7} />
            </div>
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            {/* <SubArticlesGrid
              data={data}
              category={"nyheder"}
              name="Nyheder"
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            /> */}
            <ArticleHeroTest 
              data={data}
              category={"nyheder"}
              startIndex={0} 
              endIndex={50}
              articleAmount={6} 
              mediaSize={{
                Figure: {
                  figureDesktopHeight: 'md:h-[8em]',
                  figureMobileHeight: 'h-[8em]'
                },
                Image: {
                  imgWidth: 400,
                  imgHeight: 200,
                  quality: 85,
                  lazyLoading: true,
                  responsive: '(max-width: 768px) 600px, 900px'
                }
              }}
              header={{ visible: true, time: true, address: false, category: true }}
              nameTag={{ name: "Spare-Hacks", tag: true }}
              fontStyles= 'text-md md:text-lg leading-5 md:leading-6 font-bold'
              gridSystem="md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 "
              contentHeight="min-h-[140px]"
              />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Leaderboard_3`}
            ></aside>
            {/* <SubArticlesGrid
              data={data}
              category={"spare-hacks"}
              name="Spare-Hacks"
              startIndex={0}
              endIndex={50}
              articleAmount={6}
            /> */}
            <ArticleHeroTest 
              data={data}
              category={"spare-hacks"}
              startIndex={0} 
              endIndex={50}
              articleAmount={6} 
              mediaSize={{
                Figure: {
                  figureDesktopHeight: 'md:h-[8em]',
                  figureMobileHeight: 'h-[8em]'
                },
                Image: {
                  imgWidth: 400,
                  imgHeight: 200,
                  quality: 85,
                  lazyLoading: true,
                  responsive: '(max-width: 768px) 600px, 900px'
                }
              }}
              header={{ visible: true, time: true, address: false, category: true }}
              nameTag={{ name: "Spare-Hacks", tag: true }}
              fontStyles= 'text-md md:text-lg leading-5 md:leading-6 font-bold'
              gridSystem="md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 "
              contentHeight="min-h-[140px]"
              />
            <aside
              className="desktop hidden md:block"
              data-ad-unit-id={`/${theme.site_ad_id}/${theme.site_ad_name}/Leaderboard_3`}
            ></aside>
            <SubArticlesGrid
              data={data}
              category={"privatkonomi"}
              name="Privatøkonomi"
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
