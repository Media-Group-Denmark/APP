import theme from "@/app/lib/theme.json";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";

export async function generateCategoryMetadata(currentCategory: Reference) {
  
    if (currentCategory) {
      return {
        title: `${currentCategory.name} - Artikler og Indsigter | ${theme.site_name}`,
        description:
          currentCategory.categoryDescription ||
          `Kategori ${currentCategory.name} - Artikler og Indsigter, ${theme.site_name}`,
          alternates: {
            canonical: `${theme.site_url}/kategori/${
              currentCategory.slug
            }`,
          }, 
        keywords: `Kategori ${currentCategory.name} - Artikler og Indsigter, ${theme.site_name}`,
        openGraph: {
          title: `${currentCategory.name} | ${theme.site_name}`,
          description:
            currentCategory.categoryDescription || theme.metadata.description,
          url: `${theme.site_name}/kategori/${currentCategory.slug}`,
          type: "website",
          siteName: `${theme.site_name}`,
          locale: "da_DK",
          images: [
            {
              url: `${theme.logo_public_url}`,
              width: 800,
              height: 600,
              alt: `Billede for kategori ${currentCategory.name}`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          site: `${theme.metadata.twitter.site}`,
          title: `${currentCategory.name} - Artikler og Indsigter | ${theme.site_name}`,
          description:
            currentCategory.categoryDescription || theme.metadata.description,
          images: `${theme.logo_public_url}`,
        },
        robots: "index, follow",
        publisher: `${theme.site_name}`,
      };
    } else {
      return {
        title: "Default Title",
        robots: "noindex, nofollow", // Added robots meta tag
      };
    }
  }