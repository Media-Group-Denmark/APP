import React from "react";
import { ArticleLink } from "../../utils/ArticleLink";
import { FooterItem } from "./models/footer";
import theme from "../../../../lib/theme.json";
import MailChimpForm from "./components/MailChimpForm";
import { getFooterItems } from "./api/getFooterItems";

export default async function Footer() {
  const data: FooterItem[] | undefined = await getFooterItems();
  const footer = data ? data[0] : undefined;
  return (
    <footer
      className="bg-second_color_light dark:bg-second_color_dark relative z-50  shadow"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {footer && (
            <div className="grid grid-cols-4 gap-8 xl:col-span-2">
              {footer.footerItems.map((item) => (
                <div key={item._key} className="md:grid md:gap-8">
                  <div>
                    <h1 className="text-sm font-semibold leading-6">
                      {item.title}
                    </h1>
                    <ul className="mt-4 space-y-4 grid text-fade_color_light dark:text-fade_color_dark">
                      {item.links.map((link) => (
                        <li>
                          {link.type === "category" ? (
                            <ArticleLink
                              href={`/kategori/${link.slug}`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : link.type === "tag" ? (
                            <ArticleLink
                              href={`/tag/${link.slug}`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : link.type === "aboutUs" ? (
                            <ArticleLink
                              href={`/omos`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : link.type === "contactUs" ? (
                            <ArticleLink
                              href={`/kontakt`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : link.type === "privacyPolicy" ? (
                            <ArticleLink
                              href={`/privatliv`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : link.type === "cookiePolicy" ? (
                            <ArticleLink
                              href={`/cookies`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : link.type === "subPage" ? (
                            <ArticleLink
                              href={`/undersider/${link.slug}`}
                              key={link._key}
                              className="text-sm leading-6  text-fade_color_light hover:text-slate-400 dark:text-fade_color_dark"
                            >
                              {link.name} {link.title}
                            </ArticleLink>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        {/*   <MailChimpForm /> */}
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2"></div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">{`Copyright 2024 ${theme.site_name} .`}</p>
        </div>
      </div>
    </footer>
  );
}
