"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LoadAds() {
  const pathname = usePathname();

  useEffect(() => {
    const scriptUrls = [
      "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
      "/lib/prebid8.46.0-1.js",
      "/lib/ad-script.min.js",
    ];

    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js")
      .then(() => {
        return Promise.all(
          scriptUrls
            .filter(
              (url) =>
                url !== "https://securepubads.g.doubleclick.net/tag/js/gpt.js"
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
