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

    const showHeroesElement = document.getElementById('viralizeContainer');
    console.log('showHeroesElement', showHeroesElement?.offsetHeight);

    // Append the script to the aside element
    if (asideRef.current) {
      asideRef.current.appendChild(script);
      console.log('Script appended to aside element');
      console.log('showHeroesElement2', showHeroesElement?.offsetHeight);
    }

    // Clean up script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
        console.log('Script REMOVED to aside element');
      }
    };
  }, []);
  return (
    <aside ref={asideRef}>
      <div id="viralizeContainer"></div>
    </aside>
  );
}