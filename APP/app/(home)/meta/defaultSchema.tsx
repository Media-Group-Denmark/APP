import theme from "@/app/lib/theme.json";

export const defaultSchema: Record<string, any> = {
  "@context": "https://schema.org",
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
  "isAccessibleForFree": true
};