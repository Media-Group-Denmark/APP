/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client, urlFor } from "@/app/lib/sanityclient";
import React from "react";
import { Journalist } from "@/app/models/journalist";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import theme from "@/app/lib/theme.json";
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
    url: `${theme.site_name}/sider/referencer/journalister`,
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
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
export default async function journalister() {
  async function getData() {
    const query = `*[ _type == "journalist" ] {
             _id,
             name,
             "slug": slug.current,
             "image": image.asset
        }`;
    try {
      const data = await client.fetch<Journalist[]>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
  const data: Journalist[] = await getData();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 pt-0 py-12">
      <>
        <nav
          className="flex px-3 md:px-8 max-w-[1000px] m-auto text-fade_color_light dark:text-fade_color_dark py-6 pt-6 rounded-lg "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-sm text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 inline-flex items-center "
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Forside
              </Link>
            </li>
            <li className=" cursor-default " aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-accent_color_light dark:text-accent_color_dark ml-1 md:ml-2 text-sm font-medium capitalize ">
                  Journalister
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </>

      <div className="text-center pb-12">
        <h2 className="text-base font-bold text-accent_color_light dark:text-accent_color_dark">
          Se nærmere her og
        </h2>
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl font-heading ">
          Mød vores journalister
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((journalist) => (
          <Link href={`/artikler/journalist/${journalist.slug}`}>
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
          </Link>
        ))}
      </div>
    </section>
  );
}
