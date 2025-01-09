import { ArticleModel } from "../../(pages)/(article-collections)/models/article";
import TrendingArticlesList_2 from "../../(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList_2";
import ArticleBlock_1_Square from "../../(pages)/(article-collections)/components/PengehjoernetDK/blocks/ArticleBlock_1_Square";
import LatestNewsSlider from "../../(pages)/(article-collections)/components/PengehjoernetDK/components/LatestNewsSlider";
import { EmblaCarousel } from "../../(pages)/(article-collections)/components/EmblaCarousel";
import AdContainer from "../AdContainer/AdContainer";
import TrendingArticlesList from "../../(pages)/(article-collections)/components/PengehjoernetDK/components/TrendingArticlesList";
import Breadcrumb from "../Navigation/Breadcrumb";
import { SubArticlesInfiniteScroll } from "../../(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import dynamic from "next/dynamic";
export const revalidate = 600;

export default async function MainArticlePageLayout({
  data,
  latestNewsTopSlider,
  topNewsOverview,
  category,
  tag,
  nameTag,
  breadCrumb,
}: {
  data: ArticleModel[];
  latestNewsTopSlider?: boolean;
  topNewsOverview?: number;
  category?: string;
  tag?: string;
  nameTag?: { name: string; tag: boolean };
  breadCrumb?: { navItem: string; navItemTwo: string; link: string };
}) {
  const articleHero = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: "md:h-[20em]",
        figureMobileHeight: "h-[12em]",
      },
      Image: {
        imgWidth: 700,
        imgHeight: 400,
        quality: 85,
        lazyLoading: false,
        responsive: "(max-width: 768px) 100vw, 700px",
      },
    },
    EmblaCarousel: "flex-[0_0_90%]",
    header: { visible: true, category: true },
    footer: { visible: false, journalist: false, time: false },
    fontStyles:
      "text-xl md:text-[2.3em] md:leading-10 font-extrabold rounded-lg line-clamp-3 overflow-hidden text-ellipsis",
    contentHeight: "md:min-h-[180px]",
  };

  const articleSixGrid = {
    mediaSize: {
      Figure: {
        figureDesktopHeight: "md:h-[8em]",
        figureMobileHeight: "h-[8em]",
      },
      Image: {
        imgWidth: 350,
        imgHeight: 250,
        lazyLoading: true,
        responsive: "(max-width: 768px) 100vw, 700px",
      },
    },
    EmblaCarousel: "flex-[0_0_300px]",
    header: { visible: true, time: true, journalist: false, category: true },
    fontStyles: "text-md md:text-lg leading-5 md:leading-6 font-bold",
    gridSystem: "md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ",
  };

  const InfiniteScroll = ({ data }: { data: ArticleModel[] }) => {
    return (
      <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl bg-second_color_light dark:bg-second_color_dark">
        <SubArticlesInfiniteScroll data={data} startIndex={7} endIndex={30} />
        <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
          <AdContainer desktop={true} name={"Square_1"} />
          <TrendingArticlesList
            data={data}
            dayInterval={14}
            startIndex={0}
            endIndex={30}
            articleAmount={6}
          />
        </div>
      </section>
    );
  };

  // Dynamisk komponent
  const DynamicArticles = dynamic<
    React.ComponentType<{ data: ArticleModel[] }>
  >(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(InfiniteScroll), 2000);
      });
    },
    {
      loading: () => null,
    }
  );

  return (
    <section>
      <AdContainer desktop={true} name={"Leaderboard_1"} />
      {latestNewsTopSlider && (
        <LatestNewsSlider
          data={data}
          dayInterval={2}
          startIndex={0}
          endIndex={12}
        />
      )}
      {breadCrumb && (
        <Breadcrumb
          navItem={breadCrumb.navItem}
          navItemTwo={breadCrumb.navItemTwo}
          link={breadCrumb.link}
        />
      )}
      <section className=" grid lg:grid-cols-[auto_1fr] mx-auto">
        <div className="containerr md:px-6 py-10 pt-0 m-auto">
          {/* Phone */}
          <section className="grid gap-4 md:hidden">
            <EmblaCarousel
              data={data}
              startIndex={0}
              endIndex={30}
              articleAmount={15}
              category={category}
              tag={tag}
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
              category={category}
              tag={tag}
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
              nameTag={{ name: "Spare-hacks", tag: true }}
              category={"spare-hacks"}
              endIndex={30}
              articleAmount={15}
              {...articleSixGrid}
            />
          </section>

          {/* Desktop */}
          <section className="md:inline-block hidden max-w-[1000px]">
            <div className="grid relative lg:grid-cols-[1fr_1fr] gap-3 max-w-[1000px]">
              <div className=" lg:w-[700px]">
                <EmblaCarousel
                  data={data}
                  startIndex={0}
                  endIndex={30}
                  articleAmount={15}
                  category={category}
                  tag={tag}
                  {...articleHero}
                  EmblaCarousel={"flex-[0_0_100%]"}
                />
              </div>
              <aside className="w-[280px] inline-block">
                {topNewsOverview === 1 ? (
                  <TrendingArticlesList
                    data={data}
                    dayInterval={14}
                    views={0}
                    startIndex={0}
                    endIndex={50}
                    articleAmount={5}
                    category={category}
                    tag={tag}
                  />
                ) : topNewsOverview === 2 ? (
                  <TrendingArticlesList_2
                    data={data}
                    dayInterval={14}
                    views={0}
                    startIndex={0}
                    endIndex={50}
                    articleAmount={5}
                    category={category}
                    tag={tag}
                  />
                ) : null}
              </aside>
            </div>
            <AdContainer desktop={true} name={"Leaderboard_2"} />
            <ArticleBlock_1_Square
              data={data}
              {...(category
                ? { category }
                : tag
                ? { tag }
                : { category: "nyheder" })}
              startIndex={0}
              endIndex={50}
              articleAmount={6}
              nameTag={{ name: nameTag?.name, tag: true }}
              {...articleSixGrid}
            />
            <AdContainer desktop={true} name={"Leaderboard_3"} />
            <EmblaCarousel
              data={data}
              startIndex={0}
              nameTag={{ name: "Spare-hacks", tag: true }}
              category={"spare-hacks"}
              endIndex={30}
              articleAmount={15}
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
      <DynamicArticles data={data} />
    </section>
  );
}
