'use client'
import { useEffect, useRef, useState } from 'react';

export default function LoadShowHeroes() {
  const asideRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

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

    // Function to check if video content has loaded
    const checkVideoLoaded = () => {
      const viralizeContainer = document.getElementById('viralizeContainer');
      if (viralizeContainer && viralizeContainer.childNodes.length > 0) {
        setVideoLoaded(true);
        observer.disconnect(); // Stop observing once video has loaded
      }
    };

    // Set up MutationObserver to detect changes in the viralizeContainer
    const observer = new MutationObserver(() => {
      checkVideoLoaded();
    });

    const viralizeContainer = document.getElementById('viralizeContainer');
    if (viralizeContainer) {
      observer.observe(viralizeContainer, { childList: true, subtree: true });
    }

    // Clean up script and observer when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <aside ref={asideRef}>
      {videoLoaded ? (
        // Show the video container when loaded
        <div id="viralizeContainer"></div>
      ) : (
        // Show a placeholder message while loading
        <h1>Testing</h1>
      )}
    </aside>
  );
}
