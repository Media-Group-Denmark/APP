import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const defaultMeta: Metadata = {
  title: theme.metadata.title,
  description: theme.metadata.description,
  keywords: theme.metadata.keywords,
  openGraph: {
    title: theme.metadata.openGraph.title,
    description: theme.metadata.openGraph.description,
    url: theme.site_url,
    type: "website",
    siteName: theme.site_name,
    locale: theme.metadata.openGraph.locale,
    images: [
      {
        url: theme.logo_url,
        width: 800,
        height: 600,
        alt: theme.metadata.openGraph.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: theme.metadata.twitter.site,
    title: theme.metadata.twitter.title,
    description: theme.metadata.twitter.description,
    images: theme.logo_url,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
};
