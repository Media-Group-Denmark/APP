'use client'
import Script from 'next/script';

export default function LoadShowHeroes() {
  return (
    <>
      {/* Placeholder for the Viralize widget */}
      <aside>
        <div id="viralizeContainer"></div>
      </aside>

      {/* Load the Viralize script */}
      <Script
        id="viralize-script"
        src="https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y"
        type="text/javascript"
        data-wid="viralizeContainer"
        strategy="beforeInteractive"
      />
    </>
  );
}
