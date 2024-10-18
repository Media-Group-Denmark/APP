import React from 'react';
import theme from "@/app/lib/theme.json";
import { urlFor } from '@/app/lib/sanityclient';
import { singleArticle } from '../models/singleArticle';

export default function articleSchema({ mainArticle, params }: { mainArticle: singleArticle, params: string }) {

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: mainArticle?.title,
    description: mainArticle?.teaser,
    image: [
      {
        "@context": "http://schema.org",
        "@type": "ImageObject",
        "thumbnail": urlFor(mainArticle?.image),
        "caption": mainArticle?.source || 'Shutterstock.com',
        "author": "RAI",
        "url": urlFor(mainArticle?.image)
      },
    ],
    "mainEntityOfPage": `${theme.site_url}/artikel/${params}`,
    "url": `${theme.site_url}/artikel/${params}`,
    "inLanguage": "da-dk",
    "author": [
      {
        "@type": "Person",
        "url": `${theme.site_url}/journalist/${mainArticle?.JournalistSlug}`,
        "image": urlFor(mainArticle?.JournalistPhoto),
        "name": mainArticle?.JournalistName
      }
    ],
    "datePublished": mainArticle?.publishedAt,
    "dateModified": mainArticle?._updatedAt,
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
    "copyrightYear": new Date().getFullYear(), // Rettelse: Kalder funktionen korrekt
    "isAccessibleForFree": true,
    "hasPart": {
      "@type": "WebPageElement",
      "isAccessibleForFree": true
    }
  };

  return articleJsonLd;
}
