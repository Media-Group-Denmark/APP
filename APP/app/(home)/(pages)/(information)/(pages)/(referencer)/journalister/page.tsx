/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client, urlFor } from "@/app/lib/sanityclient";
import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import theme from "@/app/lib/theme.json";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { getAllJournalistsData } from "./api/getAllJournalistsData";
export const revalidate = 80000;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: `Vores Journalister | ${theme.site_name}`,
  description: `Mød teamet af eksperter og journalister bag ${theme.site_name}, der bringer dig de seneste indsigter inden for ${theme.metadata.keywords}.`,
  keywords: `${theme.subPage.referenceJournalist.keywords}`,
  openGraph: {
    title: `Vores journalister | ${theme.site_name}`,
    description: `Mød teamet af eksperter og journalister bag ${theme.site_name}, der bringer dig de seneste indsigter inden for ${theme.metadata.keywords}.`,
    url: `${theme.site_name}/journalister`,
    type: "website",
    siteName: `${theme.site_name}`,
    locale: "da_DK",
    images: [
      {
        url: `${theme.logo_public_url}`,
        width: 800,
        height: 600,
        alt: `Mød vores Journalister | ${theme.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `${theme.metadata.twitter.site}`,
    title: `Vores Journalister | ${theme.site_name}`,
    description: `Mød teamet af eksperter og journalister bag ${theme.site_name}, der bringer dig de seneste indsigter inden for ${theme.metadata.keywords}.`,
    images: `${theme.logo_public_url}`,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
};

export default async function journalister() {
  const data: Reference[] = await getAllJournalistsData();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 pt-0 py-12">
      <Breadcrumb navItem={"Journalister"} link="" navItemTwo="" />

      <div className="text-center pb-12">
        <h2 className="text-base font-bold text-accent_color_light dark:text-accent_color_dark">
          Se nærmere her og
        </h2>
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl font-heading ">
          Mød vores journalister
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          .filter(
            (journalist) =>
              journalist._id !== "860d3b16-1c80-4690-b62f-e885fb5fc093"
          )
          .map((journalist: Reference) => (
            <ArticleLink
              href={`/journalist/${journalist.slug}`}
              key={journalist._id}
            >
              <div className="w-full bg-second_color_light dark:bg-second_color_dark rounded-lg p-12 flex flex-col justify-center items-center cursor-pointer">
                <div className="mb-8">
                  <Image
                    className="object-center object-cover rounded-full h-24 w-24"
                    alt={journalist.name}
                    width={200}
                    height={200}
                    src={
                      journalist.image
                        ? urlFor(journalist.image)
                            .format("webp")
                            .width(400)
                            .height(300)
                            .fit("fill")
                            .quality(85)
                            .url()
                        : "/img/unisexAvatar.jpeg"
                    }
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl text-text_main_color_dark dark:text-text_main_color_light font-bold mb-2">
                    {journalist.name}
                  </p>
                  <p className="text-base text-text_main_color_dark dark:text-text_main_color_light font-normal">
                    Journalist
                  </p>
                </div>
              </div>
            </ArticleLink>
          ))}
      </div>
    </section>
  );
}
