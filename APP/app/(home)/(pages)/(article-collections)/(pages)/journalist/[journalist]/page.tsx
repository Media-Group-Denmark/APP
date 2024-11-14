/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityclient";
import { ArticleModel } from "../../../models/article";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import SubArticlesListLarge from "@/app/(home)/(pages)/(article-collections)/components/ArticleDisplaySystems/DynamicSystems/SubArticlesListLarge";
import theme from "@/app/lib/theme.json";
 import { getFreshArticleData } from "@/app/api/getFreshArticleData";
import { getJournalistData } from "../api/getJournalistData";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { generateJournalistMetadata } from "../meta/generateJournalistMetaData";
import journalistSchema from "../meta/journalistSchema";

export const revalidate = 10000;

async function fetchData(slug: string | undefined = undefined) {
  const data: ArticleModel[] = await getFreshArticleData();
  const currentJournalist: Reference = await getJournalistData(slug);
  
  return {
    data,
    currentJournalist,
  };
}

export async function generateMetadata({ params }: { params: { journalist: string } }) {
  const { currentJournalist } = await fetchData(params.journalist);
  const metadata: Metadata = await generateJournalistMetadata(currentJournalist);
  return metadata;
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function journalist({
  params,
}: {
  params: { journalist: string };
}) {
  const { data, currentJournalist } = await fetchData(params.journalist);

  const jsonLd = journalistSchema({data, journalist: currentJournalist, params: params.journalist})

  return (
    <section>
      <script
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* {data ? (
        <Breadcrumb
          navItem={"Journalist"}
          link={"/journalister"}
          navItemTwo={currentJournalist.name}
        />
      ) : null} */}

      <section className=" grid mx-auto mt-4 ">
        <div className="containerr px-6 py-10 pt-0 max-w-[1000px] bg-second_color_light dark:bg-second_color_dark pb-12 rounded-2xl">
          {data ? (
            <address className="grid shadow-xl gap-4 md:gap-0 max-w-[1000px] m-auto p-6  rounded-lg">
              <div className="w-full  grid sm:grid-cols-[auto_1fr] sm:place-content-center">
                <figure>
                  <Image
                    className="object-center object-cover rounded-full h-24 w-24"
                    alt={currentJournalist.name}
                    width={200}
                    height={200}
                    src={
                      currentJournalist.image
                        ? urlFor(currentJournalist.image)
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
                    {currentJournalist.name}
                  </h1>
                  <h2 className="text-base text-fade_color_light dark:text-fade_color_dark font-normal">
                    Journalist
                  </h2>
                </header>
              </div>

              <h3 className="my-auto mt-6">
                <PortableText value={currentJournalist.description} />
              </h3>
            </address>
          ) : null}

        <div
            className="mobile md:hidden"
            id="div-Box_Mobile_1"
          ></div>
         <div
            className="desktop hidden md:block"
            id="div-Board_2"
          ></div>
          <SubArticlesListLarge
            data={data}
            journalist={params.journalist}
            startIndex={0}
            endIndex={10}
          />
        </div>
      </section>
    </section>
  );
}
export const runtime = "edge";
