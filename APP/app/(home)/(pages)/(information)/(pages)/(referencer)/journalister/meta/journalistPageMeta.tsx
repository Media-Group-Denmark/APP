
import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const journalistPageMeta: Metadata = {
    title: `Vores Journalister | ${theme.site_name}`,
    description: `Mød teamet af eksperter og journalister bag ${theme.site_name}, der bringer dig de seneste indsigter inden for ${theme.metadata.keywords}.`,
    alternates: {
      canonical: `${theme.site_name}/journalister`,
    }, 
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