import fetch from 'node-fetch';
import theme from './app/lib/theme.json' assert { type: 'json' };
import 'dotenv/config';
import { createClient } from "next-sanity";

const client = createClient({
  apiVersion: "2024-01-01",
  dataset: "production",
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});

async function getData() {
  const today = new Date();
  const formattedToday = today.toISOString();

  const query = `
  {
    "articles": *[
      _type == "article" && publishedAt <= "${formattedToday}" && previewMode == false
    ] 
    | order(coalesce(publishedAt, _createdAt) desc) [0...250] {
      _id,
      publishedAt,
      "articleSlug": slug.current,
      previewMode,
    },
    "navigation": *[_type == "navigation"] {
      _id,
      navItems[] {
        "slug": @->slug.current
      }
    }
  }`;

  try {
    const data = await client.fetch(query);
    return data;  
  } catch (error) {
    console.error('Error fetching combined data:', error);
    return null;
  }
}

async function warmCache() {
  const baseUrl = theme.site_url;
  const data = await getData();

   // Map articles to paths
   const articlePaths = data.articles.map((post) => `/artikel/${post.articleSlug}`);

   // Map navigation slugs to paths
   const categoryPaths = data.navigation && data.navigation.navItems
    ? data.navigation.navItems.map((item) => `/artikler/kategori/${item.slug}`)
    : [];

  const paths = [
    '/',
    ...categoryPaths, 
    ...articlePaths,   
  ];

  console.log('paths', paths);
  console.log('baseUrl', baseUrl);

  // Fetch all URLs in parallel
  const fetchPromises = paths.map(async (path) => {
    const url = `${baseUrl}${path}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`Vellykket caching af: ${url}`);
      } else {
        console.log(`Fejl ved caching af: ${url}`);
      }
    } catch (error) {
      console.log(`Fejl ved adgang til: ${url}`, error);
    }
  });

  // Wait for all fetches to complete
  await Promise.all(fetchPromises);
}

warmCache();