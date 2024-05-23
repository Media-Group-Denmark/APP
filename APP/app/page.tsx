import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "./lib/sanityclient";
import { Article } from "./models/article";
import { timeSinceText } from "./components/ArticleTools/TimeSinceTag";
import type { Metadata } from "next";
import logo from "@/public/logo.png";
import SidebarSticky from "./components/ArticleDisplaySystems/StaticSystems/SidebarSticky";
import SubArticlesListLarge from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListLarge";
import SubArticlesListSmall from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesListSmall";
import SubArticlesGrid from "./components/ArticleDisplaySystems/DynamicSystems/SubArticlesGrid";
import ArticleHero from "./components/ArticleDisplaySystems/DynamicSystems/ArticleHero";
import TrendingArticlesList from "./components/ArticleDisplaySystems/DynamicSystems/TrendingArticlesList";
import SearchFetch from "./components/SearchBar/SearchFetch";
import TopNewsSlider from "./components/ArticleDisplaySystems/DynamicSystems/TopNewsSlider";
export const revalidate = 600; // revalidate at most every 30s

export const metadata: Metadata = {
  title: "Pengehjørnet | Din Guide til Økonomi, Aktier, Investering og Skat",
  description:
    "Pengehjørnet er din portal til de seneste nyheder inden for økonomi, aktier, investering, skat og meget mere, målrettet unge i Danmark.",
  keywords:
    "økonomi, aktier, investering, skat, unge, aktiemarked, kryptovaluta, sparetips",
  openGraph: {
    title: "Pengehjørnet | Din Guide til Økonomi, Aktier, Investering og Skat",
    description:
      "Pengehjørnet er din portal til de seneste nyheder inden for økonomi, aktier, investering, skat og meget mere, målrettet unge i Danmark.",
    url: "https://xn--pengehjrnet-mgb.dk/",
    type: "website",
    siteName: "Pengehjørnet",
    locale: "da_DK",
    images: [
      {
        url: "default_billede_url",
        width: 800,
        height: 600,
        alt: "Pengehjørnet - Din Guide til Økonomi, Aktier, Investering og Skat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Pengehjørnet",
    title: "Pengehjørnet | Din Guide til Økonomi, Aktier, Investering og Skat",
    description:
      "Pengehjørnet er din portal til de seneste nyheder inden for økonomi, aktier, investering, skat og meget mere, målrettet unge i Danmark.",
    images: "default_billede_url",
  },
  // Yderligere meta tags for SEO
  robots: "index, follow",
  publisher: "Pengehjørnet",
};

async function getData() {
  const query = `
  *[
    _type == "article"
  ] 
  | order(_createdAt desc) {
    _id,
    _createdAt,
    _type,
    title,
    teaser,
    "articleSlug": slug.current,
    "image": metaImage.asset,
    "category": details.category->name,
    "categorySlug": details.category->slug.current,
    "tag": tag[]->name,
    "tagSlug": tag[]->slug.current,
    "JournalistName": details.journalist->name,
    "JournalistPhoto": details.journalist->image,
    "JournalistSlug": details.journalist->slug.current,
    views
  }`;
  const data = await client.fetch(query);
  //console.log(data);
  return data;
}

export default async function Home() {
  const data: Article[] = await getData();

  return (
    <>
          <TopNewsSlider className="hidden" data={data} dayInterval={14} startIndex={0} endIndex={12}  />
      <section className=" grid md:grid-cols-[auto_1fr] mx-auto ">
        <div className="container px-2 md:px-6 py-10 pt-0  max-w-[1000px]">
          <div>
            {/* Both */}
            <ArticleHero data={data} startIndex={0} endIndex={1} />
            
            {/* Phone */}
            <div className="inline-block md:hidden">
            <TrendingArticlesList dayInterval={14} startIndex={0} endIndex={5} />
            <SubArticlesGrid data={data} startIndex={1} endIndex={3} />
            <span className="mt-6 block"><ArticleHero data={data} startIndex={3} endIndex={4} /></span>
            <SubArticlesGrid data={data} startIndex={4} endIndex={6} />
            <span className="mt-4 block"><ArticleHero data={data} startIndex={6} endIndex={7} /></span>
            </div>

            {/* Desktop */}
            <div className="md:inline-block hidden">
            <SubArticlesGrid data={data} startIndex={1} endIndex={7} />
            </div>

            <SubArticlesListSmall data={data} startIndex={7} endIndex={21} />
          </div>
        </div>
        <div className="hidden xl:inline-block"><TrendingArticlesList dayInterval={14} startIndex={0} endIndex={5} /></div>
      </section>
    </>
  );
}