
import React from 'react';
import { client } from '../../lib/sanityclient';
import Link from 'next/link';
import { FooterData } from '../../models/footer';
import theme from '../../lib/theme.json';
export const revalidate = 80000;


async function getData(): Promise<FooterData[] | undefined> {
  
const query = `*[_type == "footer"] {
  footerTitle,
  _id,
  footerItems[] {
    title,
    _key,
    links[] {
      _key,
      "name": @->name,
      "title": @->title,
      "type": @->_type,
        "slug": @->slug.current
      }
    }
  } `;
  try {
    const data = await client.fetch(query);
    return data;
  }
  catch (error) {
    console.error(error);
  }
  return undefined; 
}


export default async function Footer() { 
  const data: FooterData[] | undefined = await getData();
  const footer = data ? data[0] : undefined;
  return (
  <footer className="bg-second_color_light dark:bg-second_color_dark  shadow" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">Footer</h2>
    <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      {footer && (
  <div className="grid grid-cols-4 gap-8 xl:col-span-2">
    {footer.footerItems.map((item) => (
      <div key={item._key} className="md:grid md:gap-8">
        <div>
          <h1 className="text-sm font-semibold leading-6">{item.title}</h1>
          <ul className="mt-4 space-y-4 grid text-fade_color_light dark:text-fade_color_dark">
            {item.links.map((link) => (
              <li>
              {
                link.type === 'category' ? (
                  <Link href={`/artikler/kategori/${link.slug}`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                  {link.name} {link.title}
                </Link>
                ) : link.type === 'tag' ? (
                  <Link href={`/artikler/tag/${link.slug}`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                  {link.name} {link.title}
                </Link>
                ) : link.type === 'aboutUs' ? ( 
                  <Link href={`/sider/omos`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                  {link.name} {link.title}
                </Link>
                ) : link.type === 'contactUs' ? ( 
                  <Link href={`/sider/kontakt`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                  {link.name} {link.title}
                </Link>
                 ) : link.type === 'privacyPolicy' ? ( 
                  <Link href={`/sider/privatliv`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                  {link.name} {link.title}
                </Link>
                  ) : link.type === 'cookiePolicy' ? ( 
                    <Link href={`/sider/cookies`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                    {link.name} {link.title}
                  </Link>
                   ) : link.type === 'subPage' ? ( 
                    <Link href={`/undersider/${link.slug}`}  key={link._key} className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark">
                    {link.name} {link.title}
                  </Link>
                    ) : null
                }
                </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
)}
        <div className="mt-10 xl:mt-0">
          <h2 className="text-sm font-semibold leading-6 ">Tilmeld dig vores Nyhedsbrev {'(Kommer snart)'} </h2>
          <p className="mt-2 text-sm leading-6 text-fade_color_light dark:text-fade_color_dark ">De seneste nyheder, artikler og ressourcer, sendt til din indbakke ugentligt.</p>
          <form className="mt-6 sm:flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input type="email" name="email-address" id="email-address" autoComplete="email" required className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full" placeholder="Skriv din email" />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button type="submit" className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tilmeld</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
        <div className="flex space-x-6 md:order-2">
        
        </div>
        <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">{`Copyright 2024 ${theme.site_name} .`}</p>
      </div>
    </div>
  </footer>
  )
};



 