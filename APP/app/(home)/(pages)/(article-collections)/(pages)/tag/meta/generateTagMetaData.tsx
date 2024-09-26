import theme from "@/app/lib/theme.json";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";

export async function generateTagMetadata(currentTag: Reference) {

    if (currentTag) {
      return {
        title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
        description: currentTag.tagDescription,
        alternates: {
          canonical: `${theme.site_url}/kategori/${
            currentTag.slug
          }`,
        }, 
        keywords: `Tag ${currentTag.name} - Artikler og Indsigter, ${theme.site_name}`,
        openGraph: {
          title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
          description: currentTag.tagDescription,
          url: `${theme.site_name}/tag/${currentTag.slug}`,
          type: "website",
          siteName: `${theme.site_name}`,
          locale: "da_DK",
          images: [
            {
              url: `${theme.logo_public_url}`,
              width: 800,
              height: 600,
              alt: `Billede for tag ${currentTag.name}`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          site: `${theme.metadata.twitter.site}`,
          title: `${currentTag.name} - Artikler og Indsigter | ${theme.site_name}`,
          description: currentTag.tagDescription,
          images: `${theme.logo_public_url}`,
        },
        robots: "index, follow",
        publisher: `${theme.site_name}`,
      };
    } else {
      return {
        title: "Default Title",
        robots: "noindex, nofollow",
      };
    }
  }