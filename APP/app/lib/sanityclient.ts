import { createClient } from "next-sanity";
import  ImageUrlBuilder  from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2024-01-01",
  dataset: "production",
  projectId: process.env.SANITY_PROJECT_ID || '123',
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