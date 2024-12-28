/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { ArticleModel } from "./(pages)/(article-collections)/models/article";
import type { Metadata } from "next";
import theme from "@/app/lib/theme.json";
import TrendingArticlesList_2 from "./(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList_2";
import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { defaultMeta } from "./meta/defaultMeta";
import ArticleBlock_1_Square from "./(pages)/(article-collections)/components/PengehjoernetDK/blocks/ArticleBlock_1_Square";
import ArticleBlock_2_Wide from "./(pages)/(article-collections)/components/PengehjoernetDK/blocks/ArticleBlock_2_Wide";
import LatestNewsSlider from "./(pages)/(article-collections)/components/PengehjoernetDK/components/LatestNewsSlider";
import { EmblaCarousel } from "./(pages)/(article-collections)/components/SliderTest";
import AdContainer from "./components/AdContainer/AdContainer";
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
        figureDesktopHeight: "md:h-[20em]",
        figureMobileHeight: "h-[12em]",
      },
      Image: {
        imgWidth: 800,
        imgHeight: 400,
        quality: 85,
        lazyLoading: false,
        responsive: "(max-width: 768px) 600px, 900px",
      },
    },
    EmblaCarousel: "flex-[0_0_90%]",
    header: { visible: true, category: true },
    footer: { visible: false, journalist: false, time: false },
    fontStyles:
      "text-xl md:text-[2.3em] md:leading-10 font-extrabold rounded-lg line-clamp-3 overflow-hidden text-ellipsis",
    contentHeight: "min-h-[120px] md:min-h-[170px]",
  };

  const articleSixGrid = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: "md:h-[8em]",
        figureMobileHeight: "h-[8em]",
      },
      Image: {
        lazyLoading: true,
        responsive: "(max-width: 768px) 600px, 900px",
      },
    },
    EmblaCarousel: "flex-[0_0_300px]",
    header: { visible: true, time: true, journalist: false, category: true },
    fontStyles: "text-md md:text-lg leading-5 md:leading-6 font-bold",
    gridSystem: "md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ",
  };

  return (
    <section>
      <LatestNewsSlider
        data={data}
        dayInterval={2}
        startIndex={0}
        endIndex={12}
      />
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">
          
          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            <EmblaCarousel
              data={data}
              startIndex={0}
              endIndex={30}
              articleAmount={15}
              {...articleHero}
            />
            <AdContainer mobile={true} name={"Mobile_Square_1"} />
            <TrendingArticlesList_2
              data={data}
              dayInterval={14}
              views={0}
              startIndex={0}
              endIndex={50}
              articleAmount={5}
            />
            <AdContainer mobile={true} name={"Mobile_Square_2"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: "Nyheder", tag: true }}
              category={"nyheder"}
              endIndex={30}
              articleAmount={15}
              {...articleSixGrid}
            />
            <AdContainer mobile={true} name={"Mobile_Square_3"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: "Spare-Hacks", tag: true }}
              category={"spare-hacks"}
              endIndex={30}
              articleAmount={15}
              {...articleSixGrid}
            />
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden">
            <div className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <ArticleBlock_1_Square
                  data={data}
                  startIndex={0}
                  endIndex={1}
                  articleAmount={1}
                  {...articleHero}
                />

                <aside className="hidden lg:inline-block">
                  <ArticleBlock_2_Wide
                    data={data}
                    startIndex={1}
                    endIndex={3}
                  />
                </aside>
              </div>
              <aside className="hidden w-[280px] lg:inline-block">
                <TrendingArticlesList_2
                  data={data}
                  dayInterval={14}
                  views={0}
                  startIndex={0}
                  endIndex={50}
                  articleAmount={5}
                />
              </aside>
            </div>
            <AdContainer desktop={true} name={"Leaderboard_2"} />
            <ArticleBlock_1_Square
              data={data}
              category={"nyheder"}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: "Nyheder", tag: true }}
              {...articleSixGrid}
            />
            <AdContainer desktop={true} name={"Leaderboard_3"} />
            <ArticleBlock_1_Square
              data={data}
              category={"spare-hacks"}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: "Spare-Hacks", tag: true }}
              {...articleSixGrid}
            />
            <AdContainer desktop={true} name={"Leaderboard_3"} />
            <ArticleBlock_1_Square
              data={data}
              category={"privatkonomi"}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: "Privatøkonomi", tag: true }}
              {...articleSixGrid}
            />
          </section>
          
        </div>
      </section>
    </section>
  );
}
