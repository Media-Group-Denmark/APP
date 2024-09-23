import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const privacyPageMeta: Metadata = {
  title: `Privatlivspolitik | ${theme.site_name}`,
  description: `Opdag, hvordan ${theme.site_name} beskytter og håndterer dine personlige oplysninger. Læs vores forpligtelse til privatlivets fred.`,
  keywords: `privatlivspolitik, personlige oplysninger, databeskyttelse, ${theme.site_name}`,
  openGraph: {
    title: `Privatlivspolitik | ${theme.site_name}`,
    description: `Opdag, hvordan ${theme.site_name} beskytter og håndterer dine personlige oplysninger. Læs vores forpligtelse til privatlivets fred.`,
    url: `${theme.site_name}/privatliv`,
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
