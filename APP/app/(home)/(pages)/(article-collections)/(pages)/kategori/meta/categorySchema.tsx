import theme from "@/app/lib/theme.json";
import { ArticleModel } from '../../../models/article';

export default function categorySchema({ data, params }: { data: ArticleModel[], params: string }) {


    const articles = data.map((article, index: number) => {
        return {
                "@type": "ListItem",
                "url": `${theme.site_url}/${article?.articleSlug}`,
                "name": article?.title,
                "position": index + 1
                }
    })

  const categoryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `${theme.site_url}/kategori/${params}`,
    name: params,
    description: theme.metadata.description,
    "mainEntity": {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "url": theme.site_url,
      "numberOfItems": articles.length,
      "itemListElement": articles.slice(0, 29)
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": theme.site_name,
      "logo": {
        "@type": "ImageObject",
        "url": theme.logo_public_url
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": theme.addressLocality,
      "addressCountry": theme.addressCountry,
      "postalCode": theme.postalCode,
      "streetAddress": theme.streetAddress
    },
    "copyrightYear": new Date().getFullYear(),
    "isAccessibleForFree": true,
    "hasPart": {
      "@type": "WebPageElement",
      "isAccessibleForFree": true
    }
};

  return categoryJsonLd;
}