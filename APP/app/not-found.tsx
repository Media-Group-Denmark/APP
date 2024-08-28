import React from "react";
import SubArticlesListSmallOrderRelease from "./components/ArticleDisplaySystems/StaticSystems/SubArticlesListSmallOrderRelease";
import { ArticleLink } from "./components/utils/ArticleLink";
import { freshData, getData } from "./lib/GetData";
import { Article } from "./models/article";
import { SubArticlesInfiniteScroll } from "./components/ArticleDisplaySystems/DynamicSystems/Altomkendte/SubArticlesInfiniteScroll";
import TrendingArticlesList from "./components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";

export default async function NotFound() {
  const { articles: allData } = await getData() as { articles: Article[] };
  // Anvend dit filter på dataen
  const data = freshData(allData);
  return (
    <main>
      <div className="items-center p-16 ">
        <div className="containerr flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-8xl text-gray-600 dark:text-gray-100">
              <span className="sr-only">Fejl</span>404
            </h2>
            <p className="text-xl md:text-2xl dark:text-gray-300">
              Beklager, denne side kunne ikke findes.
            </p>
            <ArticleLink
              href="#"
              className="px-8 py-4 text-xl font-semibold rounded bg-accent_color_dark dark:bg-bg-accent_color_light text-white hover:text-gray-200"
            >
              Tilbage til Forsiden
            </ArticleLink>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-[1fr_auto] md:gap-8 rounded-xl  bg-second_color_light dark:bg-second_color_dark ">
        <SubArticlesInfiniteScroll data={data} startIndex={1} endIndex={200} />
        <div className="!sticky top-20 mt-2 h-[80vh] hidden max-w-[320px] lg:inline-block">
          <aside
            className="desktop hidden md:block"
            data-ad-unit-id="/49662453/PengehjoernetDK/Square_2"
          ></aside>
          <TrendingArticlesList
            data={data}
            dayInterval={14}
            startIndex={0}
            endIndex={100}
            articleAmount={6}
          />
        </div>
      </section>
    </main>
  );
}
