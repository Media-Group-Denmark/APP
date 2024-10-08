import Script from 'next/script';
import React from 'react';

export default function LoadReadPeak() {
  return (
    <aside>
      {/* Load ReadPeak external script asynchronously */}
      <Script async strategy="afterInteractive" src="https://static.readpeak.com/js/rp-int.js" />

      <Script
        id="readpeak-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            let element = document.currentScript || document.querySelectorAll('script')[document.querySelectorAll('script').length-1];
            window.__rpplc = window.__rpplc || [];
            window.__rpplc.push({
              id: '558b086e75462fd8',
              width: 1300,
              height: 490,
              gdpr_consent: '', // Make sure to pass the correct consent string here
              cats: [],
              tags: [],
              numberOfAds: 3,
            }, element);
          `,
        }}
      />
    </aside>
  );
}
