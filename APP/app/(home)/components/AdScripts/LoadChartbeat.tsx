"use client";
import { useEffect } from "react";

export default function LoadChartbeat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      (function () {
        /** CONFIGURATION START **/
        var _sf_async_config = (window._sf_async_config = window._sf_async_config || {});
        _sf_async_config.uid = 67084;
        _sf_async_config.domain = "pengehjoernet.dk";
        _sf_async_config.flickerControl = false;
        _sf_async_config.useCanonical = true;
        _sf_async_config.useCanonicalDomain = true;

        try {
          var metaJsonTags = document.querySelectorAll("script[type~='application/ld+json']");
          var graphData;
          var authors = [];
          if (metaJsonTags.length > 0) {
            for (var metaJsonTag of metaJsonTags) {
              graphData = JSON.parse(metaJsonTag.innerText);
              if (graphData.author && graphData.author.length > 0) {
                for (var authorData of graphData.author) {
                  authors.push(authorData.name);
                }
              }
            }
          }
          if (authors.length > 0) {
            _sf_async_config.authors = authors.join(",");
          }

          var metaArticleTag = document.querySelector("meta[name~='article:section']");
          if (metaArticleTag) {
            _sf_async_config.sections = metaArticleTag.content;
          }
        } catch (e) {
          console.log("undefined pageVariables", e);
        }

        /** CONFIGURATION END **/
        function loadChartbeat() {
          var e = document.createElement("script");
          var n = document.getElementsByTagName("script")[0];
          e.type = "text/javascript";
          e.async = true;
          e.src = "//static.chartbeat.com/js/chartbeat.js";
          n.parentNode.insertBefore(e, n);
        }
        loadChartbeat();
      })();
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
