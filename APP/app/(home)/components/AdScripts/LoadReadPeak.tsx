'use client'
import { useEffect } from 'react';
import Script from 'next/script';

const LoadReadPeak = () => {
  useEffect(() => {
    const insertReadpeak = (tcData, success) => {
      if (success && tcData.eventStatus === 'tcloaded') {
        const tcstring = tcData.tcString;
        const settings = {
          id: 'bf551b421dbbf88f',
          width: '500',
          height: '435',
          gdpr_consent: tcstring,
          cats: [],
          tags: [],
          numberOfAds: 3,
        };
        const element = document.currentScript || document.querySelectorAll('script')[document.querySelectorAll('script').length - 1];
        window.__rpplc = window.__rpplc || [];
        window.__rpplc.push(settings, element);

        if (window.location.href.indexOf('?gdpr_debug') > -1) {
          console.log('tcString: ' + tcstring);
          console.log('settings: ' + JSON.stringify(settings));
        }
      } else {
        if (window.location.href.indexOf('?gdpr_debug') > -1) {
          console.log('No tcString.');
        }
      }
    };

    if (typeof __tcfapi !== 'undefined') {
      __tcfapi('addEventListener', 2, insertReadpeak);
    }
  }, []);

  return (
    <>
      <Script
        async
        src="https://static.readpeak.com/js/rp-int.js"
        data-cmp-vendor="290"
        className="cmplazyload"
      />
      <div className="rpWidget"></div>
    </>
  );
};

export default LoadReadPeak;
