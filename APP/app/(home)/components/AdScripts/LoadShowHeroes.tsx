'use client'
import { useEffect, useRef } from 'react';

export default function LoadShowHeroes() {
  const asideRef = useRef(null);

  useEffect(() => {
    // Remove existing script if any to prevent duplicates
    const existingScript = document.getElementById('viralize-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create a new script element
    const script = document.createElement('script');
    script.id = 'viralize-script';
    script.type = 'text/javascript';
    script.src = 'https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y';
    script.setAttribute('data-wid', 'viralizeContainer');

    // Append the script to the aside element
    if (asideRef.current) {
      asideRef.current.appendChild(script);
    }

    // Clean up script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <aside ref={asideRef}>
      <div id="viralizeContainer"></div>
    </aside>
  );
}