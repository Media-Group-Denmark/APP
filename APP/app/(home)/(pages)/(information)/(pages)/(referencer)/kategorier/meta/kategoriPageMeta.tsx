import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const categoryPageMeta: Metadata = {
    title: `Alle Kategorier | ${theme.site_name}`,
    description: `Udforsk et bredt udvalg af kategorier på ${theme.site_name}, fra ${theme.metadata.keywords}. Find dybdegående artikler, der matcher dine interesser.`,
    alternates: {
      canonical: `${theme.site_name}/kategorier`,
    },
    keywords: `Kategorier ${theme.metadata.keywords} | ${theme.site_name}`,
    openGraph: {
      title: `Alle Kategorier | ${theme.site_name}`,
      description: `Udforsk et bredt udvalg af kategorier på ${theme.site_name}, fra ${theme.metadata.keywords}. Find dybdegående artikler, der matcher dine interesser.`,
      url: `${theme.site_name}/kategorier`,
      type: "website",
      siteName: `${theme.site_name}`,
      locale: "da_DK",
      images: [
        {
          url: `${theme.logo_public_url}`,
          width: 800,
          height: 600,
          alt: `Udforsk Kategorier - ${theme.site_name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: `${theme.metadata.twitter.site}`,
      title: `Alle Kategorier | ${theme.site_name}`,
      description: `Udforsk et bredt udvalg af kategorier på ${theme.site_name}, fra ${theme.metadata.keywords}. Find dybdegående artikler, der matcher dine interesser.`,
      images: `${theme.logo_public_url}`,
    },
    robots: theme.metadata.robots,
    publisher: theme.site_name,
  };