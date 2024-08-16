import Script from "next/script";
import React from "react";

export default function LoadAds() {
  return (
    <>
      {/* Google Publisher Tag - Definerer og anmoder om reklamer */}
      <Script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      />

      {/* OneTag scriptet bruges til at optimere og forenkle indlæsning af reklamer fra forskellige netværk, 
        hvilket hjælper med at øge indtægterne fra reklamevisninger. */}
      <Script
        async
        src="//get.s-onetag.com/fe24cb85-40ce-4663-902a-d4273cadd44f/tag.min.js"
      />

      {/* Prebid.js er en open source teknologi, der tillader ad tech firmaer at foretage real-tidsbudgivning 
        på reklamepladser, før reklamen bliver vist. */}
      <Script src="/lib/prebid8.46.0-1.js" strategy="afterInteractive" />

      {/* Relevant Digital */}
      <Script
        async
        src="https://mgdk-cdn.relevant-digital.com/static/tags/66bdb1b086834271b536bf67.js"
        data-cmp-vendor="1100"
        className="cmplazyload"
      />
      <Script src="/lib/relevant.js" strategy="afterInteractive" />
      { console.log("Ads Refreshed") }
    </>
  );
}
