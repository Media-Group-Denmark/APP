"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/app/lib/sanityclient';

export default function LoadShowHeroes({ mainArticle }) {
  const [hasLoadedContent, setHasLoadedContent] = useState(false);

  useEffect(() => {
    const container = document.getElementById('viralizeContainer');

    if (!container) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && container.hasChildNodes()) {
          // Indholdet er blevet loadet
          setHasLoadedContent(true);
          observer.disconnect();
          break;
        }
      }
    });

    observer.observe(container, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <aside>
      <div id="viralizeContainer"></div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script
              src="https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y"
              data-wid="viralizeContainer"
              type="text/javascript"
            ></script>
          `,
        }}
      />
      {!hasLoadedContent && (
        <figure className="relative h-[14em] md:h-[25em] overflow-clip">
          <Image
            src={urlFor(mainArticle.image)
              .format('webp')
              .width(700)
              .height(400)
              .quality(100)
              .url()}
            alt={`Billede af ${mainArticle.source}`}
            className="block w-full bg-gray-300 rounded-t-lg object-cover"
            loading="eager"
            layout="fill"
            priority={true}
            sizes="(max-width: 800px) 100vw, 700px"
          />
          <figcaption className="absolute text-xs lg:text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
            Foto: {mainArticle.source}
          </figcaption>
        </figure>
      )}
    </aside>
  );
}
