// rssGenerator.js

import RSS from "rss";
import theme from "../lib/theme.json";
import { getMSNFeedData } from "./api/getMSNFeedData";
export const revalidate = 0;

function escapeXML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getRFC822Date(date = new Date()) {
  const utcString = date.toUTCString();
  return utcString.replace("GMT", "+0000");
}
function getISODate(date = new Date()) {
  return date.toISOString().replace("Z", "+01:00");
}

export async function GET() {
  const allData = await getMSNFeedData();
  const lastBuildDate = getRFC822Date(new Date(allData[0]._updatedAt));
  // General
  const feed = new RSS({
    title: `Galleri Feed ${theme.site_name}`,
    feed_url: `${theme.site_url}/msnfeed`,
    site_url: `${theme.site_url}`,
    description: "Galleri feed med slideshows",
    custom_namespaces: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
      mi: "http://schemas.ingestion.microsoft.com/common/",
      dc: "http://purl.org/dc/elements/1.1/",
      dcterms: "http://purl.org/dc/terms/",
    },
  });

  // Item
  allData.forEach((feedItem: any) => {
    const mediaContents = (feedItem.articles || []).map((article: any) => {
      const imageUrl = article.subImage
        ? article.subImage.asset.url
        : article.imageSrc;
      const imageSize = article.subImage
        ? article.subImage.asset.size.toString()
        : "0";
      const imageExtension = article.subImage
        ? article.subImage.asset.extension
        : "jpeg";
      const desc = escapeXML(article.description) || "";
      const title = escapeXML(article.title) || "";
      const source = article.source || "Shutterstock.com";

      return {
        "media:content": [
          {
            _attr: {
              url: imageUrl,
              size: `${imageSize}`,
              type: `image/${imageExtension}`,
              medium: "image",
            },
          },
          { "media:title": title },
          { "media:credit": escapeXML(source) },
          { "media:text": escapeXML(desc) },
          { "media:description": escapeXML(desc) },
        ],
      };
    });

    feed.item({
      title: escapeXML(feedItem.title),
      description: escapeXML(feedItem.description) || "",
      url: `${theme.site_url}/guide/${feedItem.feedSlug}`,
      guid: feedItem._id,
      date: getRFC822Date(new Date(feedItem.publishedAt)),
      categories: [feedItem.category || "Underholdning"],
      custom_elements: [
        { "dc:creator": feedItem.JournalistName },
        { "dcterms:modified": getISODate(new Date(feedItem._updatedAt)) },
        ...mediaContents,
      ],
    });
  });

  const xml = feed.xml({ indent: true });
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
