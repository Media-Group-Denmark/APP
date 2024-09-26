import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const aboutUsPageMate: Metadata = {
  title: `Om Os | ${theme.site_name}`,
  description: `${theme.metadata.description}`,
  alternates: {
    canonical: `${theme.site_name}/tags`,
  },
  keywords: `om os, ${theme.site_name}, ${theme.metadata.keywords}`,
  openGraph: {
    title: `Om Os | ${theme.site_name}`,
    description: `${theme.metadata.description}`,
    url: `${theme.site_name}/om-os`,
    type: "website",
    siteName: `${theme.site_name}`,
    locale: "da_DK",
    images: [
      {
        url: `${theme.logo_public_url}`,
        width: 800,
        height: 600,
        alt: `Om ${theme.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `${theme.metadata.twitter.site}`,
    title: `Om Os | ${theme.site_name}`,
    description: `${theme.metadata.description}`,
    images: `${theme.logo_public_url}`,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
};
