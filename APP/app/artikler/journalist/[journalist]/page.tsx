/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import Image from "next/image";
import { urlFor } from "../../../lib/sanityclient";
import { Article } from "../../../models/article";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import SubArticlesListLarge from "@/app/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListLarge";
import theme from "@/app/lib/theme.json";
import { freshData, getData } from "@/app/lib/GetData";
import Breadcrumb from "@/app/components/Navigation/Breadcrumb";

export const revalidate = 600;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { journalist: string };
}): Promise<Metadata> {
  const allData: Article[] = await getData();
  // Anvend dit filter på dataen
  const data = freshData(allData);
  if (data.length > 0) {
    const article = data[0];
    return {
      title: `${article.JournalistName} - Artikler og Indsigter | ${theme.site_name}`,
      description: Array.isArray(article.JournalistDetails)
        ? article.JournalistDetails.join(",")
        : article.JournalistDetails,
      keywords: `Journalist ${article.JournalistName} - Artikler og Indsigter, ${theme.site_name}`,
      openGraph: {
        title: `${article.JournalistName} | ${theme.site_name}`,
        description: `${article.JournalistDetails},`,
        url: `${theme.site_name}/artikler/journalist/${article.articleSlug}`,
        type: "profile",
        siteName: `${theme.site_name}`,
        locale: "da_DK",
        images: [
          {
            url: article.JournalistPhoto
              ? urlFor(article.JournalistPhoto)
                  .format("webp")
                  .width(400)
                  .height(300)
                  .fit("fill")
                  .quality(85)
                  .url()
              : `${theme.logo_public_url}`,
            width: 800,
            height: 600,
            alt: `Foto af ${article.JournalistName}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: `${theme.metadata.twitter.site}`,
        title: `${article.JournalistName} - Artikler og Indsigter | ${theme.site_name}`,
        description: `${article.JournalistDetails}`,
        images: article.JournalistPhoto
          ? urlFor(article.JournalistPhoto)
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
export default async function journalist({
  params,
}: {
  params: { journalist: string };
}) {
  const allData: Article[] = await getData();
  // Anvend dit filter på dataen
  const data = freshData(allData);
  return (
    <main>
      {data ? (
        <Breadcrumb navItem={'Journalist'} link={"/sider/referencer/journalister"} navItemTwo={params.journalist}/>
      ) : null}

      <section className=" grid mx-auto mt-4 ">
        <div className="containerr px-6 py-10 pt-0 max-w-[1000px] bg-second_color_light dark:bg-second_color_dark pb-12 rounded-2xl">
          {data ? (
            <address className="grid md:grid-cols-2 gap-4 md:gap-0 max-w-[1000px] m-auto p-6 pb-0  rounded-lg">
              <div className="w-full  grid sm:grid-cols-[auto_1fr] sm:place-content-center">
                <figure>
                  <Image
                    className="object-center object-cover rounded-full h-24 w-24"
                    alt={data[0].JournalistName}
                    width={200}
                    height={200}
                    src={
                      data[0].JournalistPhoto
                        ? urlFor(data[0].JournalistPhoto)
                            .format("webp")
                            .width(400)
                            .height(300)
                            .fit("fill")
                            .quality(85)
                            .url()
                        : "/img/unisexAvatar.jpeg"
                    }
                  />
                </figure>
                <header className="my-auto sm:ml-4">
                  <h1 className="text-xl  font-bold mb-2">
                    {data[0].JournalistName}
                  </h1>
                  <h2 className="text-base text-fade_color_light dark:text-fade_color_dark font-normal">
                    Journalist
                  </h2>
                </header>
              </div>

              <h3 className="my-auto">
                <PortableText value={data[0].JournalistDetails} />
              </h3>
            </address>
          ) : null}

          <aside className="mobile md:hidden" data-ad-unit-id="/49662453/PengehjoernetDK/Mobile_Square_1"></aside>
          <aside className="hidden md:grid" data-ad-unit-id="/49662453/PengehjoernetDK/Leaderboard_2"></aside>
          <SubArticlesListLarge data={data} journalist={params.journalist} startIndex={0} endIndex={10} />
        </div>
        
      </section>
    </main>
  );
}
export const runtime = "edge";
