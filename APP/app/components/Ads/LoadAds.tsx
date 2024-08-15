'use client';

import { useEffect } from 'react';

export default function LoadAds() {
  console.log('LoadAds');
  useEffect(() => {
    console.log('LoadAds useEffect');
    // Sørg for at `relevantDigital` er defineret efter `window` er tilgængelig
    let relevantDigital = window.relevantDigital || {};
    relevantDigital.cmd = relevantDigital.cmd || [];

    function loadAds() {
      const isMobile = window.innerWidth < 576;
      relevantDigital.cmd.push(function() {
        relevantDigital.loadPrebid({
          configId: isMobile ? '66bdbecb7c95ce1f507a0a63' : '66bdbea12d86ad295e7a0a62',
          manageAdserver: true,
          collapseEmptyDivs: true,
          collapseBeforeAdFetch: false,
          allowedDivIds: null,
          noSlotReload: true,
          noGpt: true,
          delayedAdserverLoading: true
        });
      });
    }

    loadAds();
  }, []);

  return null; 
}
