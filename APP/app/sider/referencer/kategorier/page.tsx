/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React from 'react'
import { Reference } from '@/app/models/reference'
import { client} from '@/app/lib/sanityclient';
import Link from 'next/link';
import type { Metadata } from 'next';
import theme from "@/app/lib/theme.json";
import Breadcrumb from '@/app/components/Navigation/Breadcrumb';
export const revalidate = 80000;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: `Alle Kategorier | ${theme.site_name}`,
  description: `Udforsk et bredt udvalg af kategorier på ${theme.site_name}, fra ${theme.metadata.keywords}. Find dybdegående artikler, der matcher dine interesser.`,
  keywords: `Kategorier ${theme.metadata.keywords} | ${theme.site_name}`,
  openGraph: {
    title: `Alle Kategorier | ${theme.site_name}`,
    description: `Udforsk et bredt udvalg af kategorier på ${theme.site_name}, fra ${theme.metadata.keywords}. Find dybdegående artikler, der matcher dine interesser.`,
    url: `${theme.site_name}/sider/referencer/kategorier`,
    type: 'website',
    siteName: `${theme.site_name}`,
    locale: 'da_DK',
    images: [
      {
        url: `${theme.logo_public_url}`,
        width: 800,
        height: 600,
        alt: `Udforsk Kategorier - ${theme.site_name}`,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: `${theme.metadata.twitter.site}`,
    title: `Alle Kategorier | ${theme.site_name}`,
    description: `Udforsk et bredt udvalg af kategorier på ${theme.site_name}, fra ${theme.metadata.keywords}. Find dybdegående artikler, der matcher dine interesser.`,
    images: `${theme.logo_public_url}`,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
}
/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */
export default async function kategorier() {
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
async function getData() {
  const query = `*[_type == "category"] {
    name,
    _id,
    "slug": slug.current
  }`

  try {
    const data = await client.fetch<Reference[]>(query);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

}

const data: Reference[] = await getData();

  return (
    <main className="bg-main_color_light dark:bg-main_color_dark py-24 pt-0">
      <>     
      <Breadcrumb navItem={'Kategorier'} link="" navItemTwo="" />
          </>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-center text-lg font-semibold leading-8 ">
       {`Kategorier hos ${theme.site_name}`}
      </h2>
      <div
        className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl md:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6"
      >
      <>
        {
          data.map((kategori) => (
            <Link key={kategori._id} href={`/artikler/kategori/${kategori.slug}`}><p className="col-span-2 bg-second_color_light dark:bg-second_color_dark dark:hover:bg-slate-600 hover:bg-slate-100  text-center text-lg font-semibold py-2 rounded-md max-h-12 w-full object-contain lg:col-span-1 cursor-pointer">{kategori.name}</p></Link>
          ))
        }
      </>
      </div>
    </div>
  </main>
  )
}