'use client'
import Script from 'next/script';
import { useEffect } from 'react';

export default function LoadShowHeroes() {
  useEffect(() => {
    // Check if the Viralize script has already been loaded
    if (!document.getElementById('viralize-script')) {
      // Create a script element
      const script = document.createElement('script');
      script.id = 'viralize-script';
      script.type = 'text/javascript';
      script.src = 'https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y';
      script.setAttribute('data-wid', 'viralizeContainer');

      // Append the script to the document head or body
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Placeholder for the Viralize widget */}
      <aside>
        <div id="viralizeContainer"></div>
      </aside>
    </>
  );
}