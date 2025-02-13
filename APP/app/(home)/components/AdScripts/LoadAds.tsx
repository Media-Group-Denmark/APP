"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LoadAds() {
  const pathname = usePathname();

  useEffect(() => {
    const scriptUrls = [
      "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
      "https://mgdk-cdn.relevant-digital.com/static/tags/66bdb1b086834271b536bf67.js",
      "https://macro.adnami.io/macro/hosts/adsm.macro.pengehjoernet.dk.js",
      "//static.chartbeat.com/js/chartbeat_mab.js",
      "/lib/relevant.js",
    ];

    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[data-cmp-src="${src}"]`)) {
          console.log(`Script already loaded: ${src}`);
          return resolve(null);
        }
        const script = document.createElement("script");
        script.async = true;
        if (
          src ===
          "https://macro.adnami.io/macro/hosts/adsm.macro.pengehjoernet.dk.js"
        ) {
          script.setAttribute("data-cmp-src", src);
          script.setAttribute("type", "text-plain");
          script.setAttribute("class", "cmplazyload");
          script.setAttribute("data-cmp-vendor", "612");
        } else {
          script.src = src;
        }
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript(
      "https://mgdk-cdn.relevant-digital.com/static/tags/66bdb1b086834271b536bf67.js"
    )
      .then(() => {
        return Promise.all(
          scriptUrls
            .filter(
              (url) =>
                url !==
                "https://mgdk-cdn.relevant-digital.com/static/tags/66bdb1b086834271b536bf67.js"
            )
            .map((url) => loadScript(url))
        );
      })
      .catch((error) => {
        console.error("Error loading scripts:", error);
      });
  }, [pathname]);

  return null;
}
