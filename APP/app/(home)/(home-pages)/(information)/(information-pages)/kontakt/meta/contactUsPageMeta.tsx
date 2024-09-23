import { Metadata } from "next";
import theme from "@/app/lib/theme.json";

export const contactUsPageMeta: Metadata = {
  title: `Kontakt Os | ${theme.site_name}`,
  description: `Har du spørgsmål eller feedback? Kontakt ${theme.site_name} team direkte for support, information, eller mediehenvendelser.`,
  keywords: `kontakt, support, feedback, ${theme.site_name}, mediehenvendelser`,
  openGraph: {
    title: `Kontakt Os | ${theme.site_name}`,
    description: `Har du spørgsmål eller feedback? Kontakt ${theme.site_name} team direkte for support, information, eller mediehenvendelser.`,
    url: `${theme.site_name}/kontakt`,
    type: "website",
    siteName: `${theme.site_name}`,
    locale: "da_DK",
    images: [
      {
        url: `${theme.logo_public_url}`,
        width: 800,
        height: 600,
        alt: `Kontakt ${theme.site_name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `${theme.metadata.twitter.site}`,
    title: `Kontakt Os | ${theme.site_name}`,
    description: `Har du spørgsmål eller feedback? Kontakt ${theme.site_name} team direkte for support, information, eller mediehenvendelser.`,
    images: `${theme.logo_public_url}`,
  },
  robots: theme.metadata.robots,
  publisher: theme.site_name,
};
