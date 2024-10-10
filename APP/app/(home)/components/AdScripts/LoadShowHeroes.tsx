"use client";

import React, { useState, useEffect } from 'react';

export default function LoadShowHeroes() {
  const [videoLoaded, setVideoLoaded] = useState(null); // null: loading, true: loaded, false: failed

  useEffect(() => {
    const container = document.getElementById('viralizeContainer');
    if (!container) return;

    let observer;
    const timeoutDuration = 5000; // Adjust the timeout duration as needed (e.g., 5000ms = 5 seconds)
    const timeout = setTimeout(() => {
      if (videoLoaded === null) {
        // Video was not loaded within the time limit
        setVideoLoaded(false);
        if (observer) observer.disconnect();
      }
    }, timeoutDuration);

    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'childList' &&
          container.hasChildNodes()
        ) {
          // Video content has been loaded into the container
          setVideoLoaded(true);
          if (observer) observer.disconnect();
          clearTimeout(timeout);
          break;
        }
      }
    });

    observer.observe(container, { childList: true });

    // Cleanup function
    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timeout);
    };
  }, [videoLoaded]);

  return (
    <aside>
      {videoLoaded === false && <h1 className='opacity-0 h-0'>Not fetched</h1>}
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
    </aside>
  );
}
