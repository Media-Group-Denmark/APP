'use client'
import Script from 'next/script';
import { useEffect } from 'react';

export default function LoadReadPeak() {
  useEffect(() => {
    // Function to insert the ReadPeak widget after obtaining GDPR consent
    const insertReadpeak = function (tcData, success) {
      if (success && tcData.eventStatus === 'tcloaded') {
        const tcstring = tcData.tcString;
        const settings = {
          id: '558b086e75462fd8',
          width: '1300',
          height: '490',
          gdpr_consent: tcstring,
          cats: [],
          tags: [],
          numberOfAds: 3,
        };
        const element = document.querySelector('.rpWidget');
        window.__rpplc = window.__rpplc || [];
        window.__rpplc.push(settings, element);

        if (window.location.href.indexOf('?gdpr_debug') > -1) {
          console.log('tcString:', tcstring);
          console.log('settings:', JSON.stringify(settings));
        }
      } else {
        if (window.location.href.indexOf('?gdpr_debug') > -1) {
          console.log('No tcString.');
        }
      }
    };

    // Wait for the __tcfapi to be available before adding the event listener
    const checkTCFAPI = () => {
      if (typeof __tcfapi !== 'undefined') {
        __tcfapi('addEventListener', 2, insertReadpeak);
      } else {
        setTimeout(checkTCFAPI, 100);
      }
    };

    checkTCFAPI();
  }, []);

  return (
    <>
      {/* Load the ReadPeak SDK */}
      <Script
        src="https://static.readpeak.com/js/rp-int.js"
        strategy="afterInteractive"
        data-cmp-vendor="290"
        className="cmplazyload"
        async
      />

      {/* Placeholder for the ReadPeak widget */}
      <div className="rpWidget"></div>
    </>
  );
}
