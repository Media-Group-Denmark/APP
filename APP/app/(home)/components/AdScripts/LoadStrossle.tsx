import React from 'react';

export default function LoadStrossle() {
  return (
    <>
      {/* Placering af Strossle widget */}
      <div className="strossle-widget"></div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <!-- Initialisering af Strossle SDK -->
            <script>
              window.strossle = window.strossle || function() {
                (strossle.q = strossle.q || []).push(arguments);
              };
            </script>
            <!-- Indlæsning af Strossle SDK -->
            <script 
              src="https://assets.strossle.com/strossle-widget-sdk/1/strossle-widget-sdk.js" 
              async 
            ></script>
            <!-- Kald til Strossle SDK for at vise widget -->
            <script>
              window.strossle('${process.env.NEXT_PUBLIC_STROSSLE_ID}', '.strossle-widget');
            </script>
          `,
        }}
      />
    </>
  );
}
