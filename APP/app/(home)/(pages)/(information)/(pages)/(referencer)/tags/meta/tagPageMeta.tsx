import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const tagPageMeta: Metadata = {
    title: `Alle Tags | ${theme.site_name}`,
    description: `Opdag indhold skræddersyet til dine interesser. Udforsk ${theme.site_name}s tags for ${theme.metadata.keywords}, og meget mere.`,
    alternates: {
      canonical: `${theme.site_name}/tags`,
    },
    keywords: `${theme.metadata.keywords} ${theme.site_name}`,
    openGraph: {
      title: `Alle Tags | ${theme.site_name}`,
      description: `Opdag indhold skræddersyet til dine interesser. Udforsk ${theme.site_name}s tags for ${theme.metadata.keywords}, og meget mere.`,
      url: `${theme.site_url}/tags`,
      type: "website",
      siteName: theme.site_name,
      locale: "da_DK",
      images: [
        {
          url: `${theme.logo_public_url}`,
          width: 800,
          height: 600,
          alt: `Udforsk Tags - ${theme.site_name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: `${theme.metadata.twitter.site}`,
      title: `Alle Tags | ${theme.site_name}`,
      description: `Opdag indhold skræddersyet til dine interesser. Udforsk ${theme.site_name}s tags for ${theme.metadata.keywords}, og meget mere.`,
      images: `${theme.logo_public_url}`,
    },
    robots: theme.metadata.robots,
    publisher: theme.site_name,
  };