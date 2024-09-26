/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import type { Metadata } from "next";
import theme from "@/app/lib/theme.json";
import Breadcrumb from "@/app/(home)/components/Navigation/Breadcrumb";
import { getAllTagsData } from "./api/getAllTagsData";
import { tagPageMeta } from "./meta/tagPageMeta";
export const revalidate = 80000;

export const metadata: Metadata = tagPageMeta;

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function tag() {
  const data: Reference[] = await getAllTagsData();

  return (
    <section className="bg-main_color_light dark:bg-main_color_dark py-24 pt-0">
      <>
        <Breadcrumb navItem={"Tags"} link="" navItemTwo="" />
      </>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 ">
          {`Tags hos ${theme.site_name}`}
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl md:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          <>
            {data.map((tag: Reference) => (
              <ArticleLink href={`/tag/${tag.slug}`}>
                <p className="col-span-2 bg-second_color_light dark:bg-second_color_dark dark:hover:bg-slate-600 hover:bg-slate-100  text-center text-lg font-semibold py-2 rounded-md max-h-12 w-full object-contain lg:col-span-1 cursor-pointer">
                  {tag.name}
                </p>
              </ArticleLink>
            ))}
          </>
        </div>
      </div>
    </section>
  );
}
