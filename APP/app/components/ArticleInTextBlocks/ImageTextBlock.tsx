import React from "react";
import { urlFor, client } from "@/app/lib/sanityclient";

interface ImageWithMetadataProps {
  value: any;
  isInline?: boolean;
}

async function fetchImageData(assetRef: string) {
  const query = `*[_type == "sanity.imageAsset" && _id == $assetRef][0]`;
  try {
    const data = await client.fetch(query, { assetRef });
    return data;
  } catch (error) {
    console.error("Error fetching image data:", error);
    throw error;
  }
}

export default async function ImageTextBlock({
  value,
  isInline = false,
}: ImageWithMetadataProps) {
  const imageData = await fetchImageData(value.asset._ref);

  return (
    <div className="w-full max-w-[90vw] grid place-content-center">
      <div className="w-fit relative">
          <img
            src={urlFor(imageData)
                .format("webp")
                .width(700)
                .height(400)
                .fit("fill")
                .quality(85)
              .url()}
            alt={value.alt || " "}
            loading="lazy"
            className="relative"
            style={{ display: isInline ? "inline-block" : "block" }}
          />
          <p className="absolute text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
            Foto: {imageData.description || value.alt || " "}
          </p>
      </div>
    </div>
  );
}
