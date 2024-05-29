import { MetadataRoute } from 'next'
import theme from "@/app/lib/theme.json";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: theme.site_url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${theme.site_url}/sider/referencer/kategorier`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${theme.site_url}/sider/referencer/tag`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${theme.site_url}/sider/referencer/journalister`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${theme.site_url}/sider/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${theme.site_url}/sider/omos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${theme.site_url}/sider/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${theme.site_url}/sitemaps/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
