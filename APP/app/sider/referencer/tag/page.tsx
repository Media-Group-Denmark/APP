import React from 'react'
import { Reference } from '@/app/models/reference'
import { client, urlFor } from '@/app/lib/sanityclient';
import Link from 'next/link';
import type { Metadata } from 'next';
export const revalidate = 80000;

export const metadata: Metadata = {
  title: 'Alle Tags | Pengehjørnet',
  description: 'Opdag indhold skræddersyet til dine interesser. Udforsk Pengehjørnets tags for økonomi, investering, skat, og meget mere.',
  keywords: 'tags, emner, økonomi, investering, skat, Pengehjørnet',
  openGraph: {
    title: 'Alle Tags | Pengehjørnet',
    description: 'Opdag indhold skræddersyet til dine interesser. Udforsk Pengehjørnets tags for økonomi, investering, skat, og meget mere.',
    url: 'https://xn--pengehjrnet-mgb.dk/sider/referencer/tag',
    type: 'website',
    siteName: 'Pengehjørnet',
    locale: 'da_DK',
    images: [
      {
        url: 'https://pengehjørnet.dk/_next/image?url=%2Flogo.png&w=384&q=75',
        width: 800,
        height: 600,
        alt: 'Udforsk Tags - Pengehjørnet',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Pengehjørnet',
    title: 'Alle Tags | Pengehjørnet',
    description: 'Opdag indhold skræddersyet til dine interesser. Udforsk Pengehjørnets tags for økonomi, investering, skat, og meget mere.',
    images: 'https://pengehjørnet.dk/_next/image?url=%2Flogo.png&w=384&q=75',
  },
  robots: 'index, follow',
  publisher: 'Pengehjørnet',
}


export default async function tag() {

async function getData() {
  const query = `*[_type == "tag"] {
    name,
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
    <div className="bg-main_color_light dark:bg-main_color_dark py-24 pt-0">
       <>     
<nav className="flex px-3 md:px-8 max-w-[1280px] m-auto text-fade_color_light dark:text-fade_color_dark py-6 pt-6 rounded-lg " aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <Link href="/" className="text-sm text-fade_color_light dark:text-fade_color_dark hover:text-gray-900 dark:hover:text-gray-400 inline-flex items-center ">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
        Forside
      </Link>
    </li>
    <li className=" cursor-default " aria-current="page">
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        <span className="text-accent_color_light dark:text-accent_color_dark ml-1 md:ml-2 text-sm font-medium capitalize ">Tags</span>
      </div>
    </li>
  </ol>
</nav>
          </>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-center text-lg font-semibold leading-8 ">
       Tags hos Pengehjørnet.dk
      </h2>
      <div
        className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl md:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6"
      >
      <>
        {
          data.map((tag) => (
            <Link href={`/artikler/tag/${tag.slug}`}><p className="col-span-2 bg-second_color_light dark:bg-second_color_dark dark:hover:bg-slate-600 hover:bg-slate-100  text-center text-lg font-semibold py-2 rounded-md max-h-12 w-full object-contain lg:col-span-1 cursor-pointer">{tag.name}</p></Link>
          ))
        }
      </>
      </div>
    </div>
  </div>
  )
}

