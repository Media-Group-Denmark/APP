import React from "react";
import { getGuideData } from "../api/getGuideData";
import MobileSocialMediaShareButtons from "@/app/(home)/(pages)/artikel/components/ArticleTools/MobileSocialMediaShareButtons";
import SocialMediaShareButtons from "@/app/(home)/(pages)/artikel/components/ArticleTools/SocialMediaShareButtons";
import { ArticleLink } from "@/app/(home)/components/utils/ArticleLink";
import { urlFor } from "@/app/lib/sanityclient";
import { timeSinceText } from "@/app/(home)/(pages)/artikel/components/ArticleTools/TimeSinceTag";
import theme from "@/app/lib/theme.json";
import "@/app/(home)/(pages)/artikel/stylesheets/articleText.css";
import LoadReadPeak from "@/app/(home)/components/AdScripts/LoadReadPeak";
import LoadStrossle from "@/app/(home)/components/AdScripts/LoadStrossle";
import LoadShowHeroes from "@/app/(home)/components/AdScripts/LoadShowHeroes";

export default async function guide({ params }: { params: { guide: string } }) {
  const guideData = await getGuideData(params.guide);

  return (
    <section>
      {guideData.map((guide) => (
        <div key={guide._id}>
          <div>
            <span className="text-accent_color_light dark:text-accent_color_dark font-bold uppercase text-md lg:text-xl rounded-lg">
              {guide.category}
            </span>
          </div>
          <h1 className="text-xl lg:text-4xl font-extrabold my-1 lg:my-2">
            {guide.title}
          </h1>
          <aside className="py-1">
            <div className="items-center p-2 mt-1 md:mt-2 border-t-2 border-gray-200"></div>
          </aside>
          <div className="grid gap-x-2 align-middle">
            <time
              dateTime={guide._updatedAt}
              className=" hidden md:block text-xs"
            >
              {timeSinceText({ date: guide._updatedAt })}
            </time>
            <div className="flex gap-x-2 lg:my-2 align-middle">
                <ArticleLink
                  rel="author"
                  href={`/journalist/${guide.JournalistSlug}`}
                >
                  <p className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs lg:text-md">
                    Skrevet af:{" "}
                    <b className="text-text_second_color_dark dark:text-text_second_color_dark text-xs lg:text-md">
                      {guide.JournalistName}
                    </b>
                  </p>
                </ArticleLink>
                <time className="text-fade_color_light  dark:text-fade_color_dark font-semibold text-xs ">
                  D. {new Date(guide._updatedAt).toLocaleDateString()}
                </time>
            </div>
          </div>
           <aside className="relative min-h-[10em] md:min-h-[25em]">
                                <LoadShowHeroes />
                                <figure className="absolute top-0 left-0 right-0 h-[10em] md:h-[25em] overflow-clip">
                                  <picture>
                                    <source
                                      srcSet={`${urlFor(guide.image)
                                        .width(800)
                                        .height(450)
                                        .format("webp")
                                        .quality(50)
                                        .url()} 800w,
                  ${urlFor(guide.image)
                    .width(480)
                    .height(270)
                    .format("webp")
                    .quality(90)
                    .url()} 480w`}
                                      sizes="(max-width: 800px) 100vw, 800px"
                                      type="image/webp"
                                    />
                                    <source
                                      srcSet={`${urlFor(guide.image)
                                        .width(800)
                                        .height(450)
                                        .format("webp")
                                        .quality(60)
                                        .url()} 800w,
                  ${urlFor(guide.image)
                    .width(480)
                    .height(270)
                    .format("webp")
                    .quality(90)
                    .url()} 480w`}
                                      sizes="(max-width: 800px) 100vw, 800px"
                                      type="image/jpeg"
                                    />
                                    <img
                                      src={urlFor(guide.image)
                                        .width(800)
                                        .height(450)
                                        .format("webp")
                                        .quality(90)
                                        .url()}
                                      sizes="(max-width: 800px) 100vw, 800px"
                                      width="800"
                                      height="450"
                                      alt={`Billede af ${guide.source}`}
                                      className="w-full h-auto rounded-t-lg object-cover"
                                    />
                                  </picture>
                                  <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
                                    Foto: {guide?.source || "Shutterstock.com"}
                                  </figcaption>
                                </figure>
                              </aside>
                                
                                <aside className="articleText leading-8 px-3 my-2 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                                <p>{guide.description}</p>
                </aside>
                              <aside
                  className="mobile md:hidden mt-4"
                  data-ad-unit-id={`/${theme.site_ad_id}/${
                    theme.site_ad_name
                  }/mobile_square_article_1`}
                ></aside>
                <aside
                  className="desktop hidden md:grid mt-4"
                  data-ad-unit-id={`/${theme.site_ad_id}/${
                    theme.site_ad_name
                  }/square_article_1`}
                ></aside>
                              <article key={guide._id} className="w-full rounded-lg mb-12">
          {guide.articles.map((article, index) => (
            <section key={article._key}>
              <meta name="article:section" content={guide.category} />
                <header>
                  <h2 className="text-xl lg:text-4xl font-extrabold my-1 lg:my-2">
                    {article.title}
                  </h2>
                </header>
                <aside className="relative min-h-[10em] md:min-h-[25em]">
                  <figure className="absolute top-0 left-0 right-0 h-[10em] md:h-[25em] overflow-clip">
                    <picture>
                      <source
                        srcSet={`${urlFor(article.subImage)
                          .width(800)
                          .height(450)
                          .format("webp")
                          .quality(50)
                          .url()} 800w,
                            ${urlFor(article.subImage)
                              .width(480)
                              .height(270)
                              .format("webp")
                              .quality(90)
                              .url()} 480w`}
                        sizes="(max-width: 800px) 100vw, 800px"
                        type="image/webp"
                      />
                      <source
                        srcSet={`${urlFor(article.subImage)
                          .width(800)
                          .height(450)
                          .format("webp")
                          .quality(60)
                          .url()} 800w,
                            ${urlFor(article.subImage)
                              .width(480)
                              .height(270)
                              .format("webp")
                              .quality(90)
                              .url()} 480w`}
                        sizes="(max-width: 800px) 100vw, 800px"
                        type="image/jpeg"
                      />
                      <img
                        src={urlFor(article.subImage)
                          .width(800)
                          .height(450)
                          .format("webp")
                          .quality(90)
                          .url()}
                        sizes="(max-width: 800px) 100vw, 800px"
                        width="800"
                        height="450"
                        alt={`Billede af ${article.source}`}
                        className="w-full h-auto rounded-t-lg object-cover"
                      />
                    </picture>
                    <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
                      Foto: {article?.source || "Shutterstock.com"}
                    </figcaption>
                  </figure>
                </aside>
                <aside className="articleText leading-8 px-3 my-2 text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
                  <p>{article.description}</p>
                </aside>

                <aside
                  className="mobile md:hidden"
                  data-ad-unit-id={`/${theme.site_ad_id}/${
                    theme.site_ad_name
                  }/mobile_square_article_${index === 3 ? 3 : index + 2}`}
                ></aside>
                <aside
                  className="desktop hidden md:grid"
                  data-ad-unit-id={`/${theme.site_ad_id}/${
                    theme.site_ad_name
                  }/square_article_${index === 3 ? 3 : index + 2}`}
                ></aside>
              </section>
          ))}
            </article>
          <SocialMediaShareButtons
            views={Math.floor(Math.random() * 100 + 10).toString()}
            articleUrl={`${theme.site_url}/guide/${guide.feedSlug}`}
          />
          <MobileSocialMediaShareButtons
            views={Math.floor(Math.random() * 100 + 10).toString()}
            articleUrl={`${theme.site_url}/guide/${guide.feedSlug}`}
          />
        </div>
      ))}
      <LoadReadPeak />
      <LoadStrossle />
    </section>
  );
}
export const runtime = "edge";