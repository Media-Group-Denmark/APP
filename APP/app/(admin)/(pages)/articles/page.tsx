import { client, urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "@/app/(home)/(pages)/(article-collections)/models/article";

import React from "react";
import Link from "next/link";
import theme from "@/app/lib/theme.json";
import Navigation from "@/app/(admin)/components/Navigation/Navigation";
import ArticleSidebar from "./components/ArticleSidebar";
import { getArticleData } from "./api/getArticleData";
import ArticleView from "./components/ArticleView/ArticleView";
export const revalidate = 600;

export default async function articles() {

  const articles: ArticleModel[] = await getArticleData();

  console.log(articles, 'articles')

  return (
    <section className="grid grid-cols-[auto_1fr]">
      <ArticleSidebar articles={articles} />
      <section className="grid w-full">
        <ArticleView articles={articles} />
      </section>
    </section>
  );
}
