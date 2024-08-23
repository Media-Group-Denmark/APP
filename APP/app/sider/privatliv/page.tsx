/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { client, urlFor } from "@/app/lib/sanityclient";
import { Page } from "@/app/models/subpage";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import React from "react";
import theme from "@/app/lib/theme.json";
import Breadcrumb from "@/app/components/Navigation/Breadcrumb";
export const revalidate = 80000;
/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: `Privatlivspolitik | ${theme.site_name}`,
  description: `Opdag, hvordan ${theme.site_name} beskytter og håndterer dine personlige oplysninger. Læs vores forpligtelse til privatlivets fred.`,
  keywords: `privatlivspolitik, personlige oplysninger, databeskyttelse, ${theme.site_name}`,
  openGraph: {
    title: `Privatlivspolitik | ${theme.site_name}`,
    description: `Opdag, hvordan ${theme.site_name} beskytter og håndterer dine personlige oplysninger. Læs vores forpligtelse til privatlivets fred.`,
    url: `${theme.site_name}/sider/privatliv`,
    type: "article",
    siteName: `${theme.site_name}`,
    locale: "da_DK",
    images: [
      {
        url: `${theme.logo_public_url}`,
        width: 800,
        height: 600,
        alt: `Privatlivspolitik - ${theme.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `${theme.metadata.twitter.site}`,
    title: `Privatlivspolitik | ${theme.site_name}`,
    description: `Opdag, hvordan ${theme.site_name} beskytter og håndterer dine personlige oplysninger. Læs vores forpligtelse til privatlivets fred.`,
    images: `${theme.logo_public_url}`,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
};
/* -------------------------------------------------------------------------- */
/*                            GET DATA FROM BACKEND                           */
/* -------------------------------------------------------------------------- */
export default async function privatliv() {
  async function getData() {
    const query = `*[_type == "privacyPolicy"] {
            title,
            overview,
        }`;
    try {
      const data = await client.fetch<Page[]>(query);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                           ARTICLE IMAGE COMPONENT                          */
  /* -------------------------------------------------------------------------- */
  const SampleImageComponent = ({ value, isInline }: any) => {
    const imageAlt = value.alt || " ";
    return (
      <div>
        <img
          className="mb-6"
          src={urlFor(value)
            .image(value)
            .width(isInline ? 100 : 800)
            .fit("max")
            .auto("format")
            .format("webp")
            .width(500)
            .height(300)
            .fit("fill")
            .quality(85)
            .url()}
          alt={value.alt || " "}
          loading="lazy"
          style={{ display: isInline ? "inline-block" : "block" }}
        />
        <p className="absolute text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
          Foto: {imageAlt}
        </p>
      </div>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                         ARTICLE YOUTUBE COMPONENT                          */
  /* -------------------------------------------------------------------------- */
  const SampleYoutubeComponent = ({ value }: any) => {
    let videoId: any = "";
    const url = new URL(value.url);
    const pathname = url.pathname;
    const searchParams = url.searchParams;
    if (pathname.includes("/shorts/")) {
      videoId = pathname.split("/shorts/")[1];
    } else if (searchParams.has("v")) {
      videoId = searchParams.get("v");
    } else {
      console.error("YouTube URL format ikke genkendt:", value.url);
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                          ARTICLE TIKTOK COMPONENT                          */
  /* -------------------------------------------------------------------------- */
  const SampleTikTokComponent = ({ value }: any) => {
    const tikTokUrl = value.url;

    return (
      <blockquote
        className="tiktok-embed"
        cite={tikTokUrl}
        data-video-id={tikTokUrl.split("/").pop()}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section></section>
      </blockquote>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                        ARTICLE FACEBOOK COMPONENT                          */
  /* -------------------------------------------------------------------------- */
  const SampleFacebookComponent = ({ value }: any) => {
    // Erstat 'YOUR_URL' med din Facebook embed URL
    const embedUrl = value.url.replace("fb.watch", "www.facebook.com/watch");

    return (
      <iframe
        src={embedUrl}
        width="560"
        height="315"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen={true}
      ></iframe>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                       ARTICLE INSTAGRAM COMPONENT                          */
  /* -------------------------------------------------------------------------- */
  const SampleInstagramComponent = ({ value }: any) => {
    return (
      <a href={value.url} target="_blank" rel="noopener noreferrer">
        Se dette indlæg på Instagram
      </a>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                             LOAD COMPONENTS                                */
  /* -------------------------------------------------------------------------- */
  const components = {
    types: {
      imageWithMetadata: SampleImageComponent,
      youTube: SampleYoutubeComponent,
      tikTok: SampleTikTokComponent,
      faceBook: SampleFacebookComponent,
      instagram: SampleInstagramComponent,
    },
  };
  /* -------------------------------------------------------------------------- */
  /*                                   CONTENT                                  */
  /* -------------------------------------------------------------------------- */
  const data: Page[] = await getData();
  return (
    <main>
      {data ? (
        <>
          <Breadcrumb navItem={'Privatliv'} link="" navItemTwo="" />
          <div className="max-w-[1000px] m-auto px-8 mb-8">
            <div className="articleText text-lg prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary">
              <PortableText value={data[0].overview} components={components} />
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
