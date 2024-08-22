import fetch from 'node-fetch';
import theme from './app/lib/theme.json' assert { type: 'json' };
import { getData } from './app/lib/GetData';
import { Article } from './app/models/article';

async function warmCache() {
  const baseUrl = theme.site_url;
  const data: Article[] = await getData(); 

  const articles = data.map((post) => {
    return `/artikel/${post.articleSlug}`;
  });

  const paths = [
    '/',
    '/artikler/kategori/nyheder',
    '/artikler/kategori/aktier',
    '/artikler/kategori/spare-hacks',
    '/artikler/kategori/privatokonomi',
    ...articles, 
  ];

  for (const path of paths) {
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
  }
}

warmCache();
