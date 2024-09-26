import { urlFor } from "@/app/lib/sanityclient";
import theme from "@/app/lib/theme.json";
import { Reference } from "@/app/(home)/(pages)/(information)/(pages)/(referencer)/models/reference";

export async function generateJournalistMetadata(currentJournalist: Reference) {
    if (currentJournalist) {
        return {
            title: `${currentJournalist.name} - Artikler og Indsigter | ${theme.site_name}`,
            description: Array.isArray(currentJournalist.description) ? currentJournalist.description.join(",") : currentJournalist.description,
            keywords: `Journalist ${currentJournalist.name} - Artikler og Indsigter, ${theme.site_name}`,
            alternates: {
                canonical: `${theme.site_url}/journalist/${
                  currentJournalist.slug
                }`,
              },  
            openGraph: {
                title: `${currentJournalist.name} | ${theme.site_name}`,
                description: `${currentJournalist.description},`,
                url: `${theme.site_name}/journalist/${currentJournalist.slug}`,
                type: "profile",
                siteName: `${theme.site_name}`,
                locale: "da_DK",
                images: [
                    {
                        url: currentJournalist.image
                            ? urlFor(currentJournalist.image).format("webp").width(400).height(300).fit("fill").quality(85).url()
                            : `${theme.logo_public_url}`,
                        width: 800,
                        height: 600,
                        alt: `Foto af ${currentJournalist.name}`,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                site: `${theme.metadata.twitter.site}`,
                title: `${currentJournalist.name} - Artikler og Indsigter | ${theme.site_name}`,
                description: `${currentJournalist.description}`,
                images: currentJournalist.image
                    ? urlFor(currentJournalist.image).format("webp").width(400).height(300).fit("fill").quality(85).url()
                    : `${theme.logo_public_url}`,
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
