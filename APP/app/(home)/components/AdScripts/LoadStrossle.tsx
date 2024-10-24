'use client'
import Script from 'next/script';
import { useEffect } from 'react';
export default function LoadStrossle() {
  useEffect(() => {
    // Initialiserer Strossle SDK, hvis den ikke allerede er initialiseret
    window.strossle = window.strossle || function() {
      (strossle.q = strossle.q || []).push(arguments);
    };
    // Kalder Strossle SDK for at vise widget på alle .strossle-widget divs
    strossle(process.env.NEXT_PUBLIC_STROSSLE_ID, '.strossle-widget');
  }, []);
  return (
    <>
      {/* Strossle SDK i <head> */}
      <Script id="strossle-sdk-init" strategy="beforeInteractive">
        {`
          window.strossle = window.strossle || function() {
            (strossle.q = strossle.q || []).push(arguments);
          };
        `}
      </Script>
      <Script 
        src="https://assets.strossle.com/strossle-widget-sdk/1/strossle-widget-sdk.js" 
        strategy="lazyOnload" 
        async 
      />
      {/* Placering af Strossle widget */}
      <div className="strossle-widget"></div>
    </>
  );
}