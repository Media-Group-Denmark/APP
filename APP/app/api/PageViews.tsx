import { createClient } from "next-sanity";

export const client = createClient({
    apiVersion: "2024-01-01",
    dataset: "production",
    projectId: process.env.SANITY_PROJECT_ID || '123',
    token: process.env.PAGEVIEW_TOKEN || '123',
    useCdn: false
  });

export async function PageViews(articleId: string) {
  try {
    await client.patch(articleId).inc({ views: 1 }).commit();
    console.log('Article views incremented');
  } catch (error) {
    console.error('Error incrementing article views :', error);
    console.error('Article ID:', articleId);
  }
}
