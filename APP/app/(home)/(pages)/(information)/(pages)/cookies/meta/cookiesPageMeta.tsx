import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const cookiesPageMeta: Metadata = {
  title: `Cookiepolitik | ${theme.site_name}`,
  description: `Læs om hvordan ${theme.site_name} anvender cookies for at forbedre din oplevelse på vores website, og hvilke data vi indsamler.`,
  alternates: {
    canonical: `${theme.site_name}/cookies`,
  },
  keywords: `cookiepolitik, cookies, persondata, privatlivspolitik, ${theme.site_name}`,
  openGraph: {
    title: `Cookiepolitik | ${theme.site_name}`,
    description: `Læs om hvordan ${theme.site_name} anvender cookies for at forbedre din oplevelse på vores website, og hvilke data vi indsamler.`,
    url: `${theme.site_name}/cookies`,
    type: "article",
    siteName: `${theme.site_name}`,
    locale: "da_DK",
    images: [
      {
        url: `${theme.logo_public_url}`,
        width: 800,
        height: 600,
        alt: `Cookiepolitik - ${theme.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `${theme.metadata.twitter.site}`,
    title: `Cookiepolitik | ${theme.site_name}`,
    description: `Læs om hvordan ${theme.site_name} anvender cookies for at forbedre din oplevelse på vores website, og hvilke data vi indsamler.`,
    images: `${theme.logo_public_url}`,
  },
  robots: theme.metadata.robots,
  publisher: `${theme.site_name}`,
};
