import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  apiVersion: "2024-01-01",
  dataset: "production",
  projectId:
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});

const imgBuilder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return imgBuilder.image(source);
}
