'use client';

import { useEffect } from 'react';

export default function LoadAds() {
  useEffect(() => {
    // Relevant Digital setup
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

    function createSidebanners() {
      const contentElement = document.querySelector("main");

      const leftSticky = document.createElement("div");
      leftSticky.style.position = "absolute";
      leftSticky.style.top = "310px";
      leftSticky.style.right = "calc(80vw/2 + 750px)";
      leftSticky.style.height = contentElement.clientHeight - 220 + "px";
      leftSticky.style.width = "300px";

      const rightSticky = document.createElement("div");
      rightSticky.style.position = "absolute";
      rightSticky.style.top = "310px";
      rightSticky.style.left = "calc(80vw/2 + 750px)";
      rightSticky.style.height = contentElement.clientHeight - 220 + "px";
      rightSticky.style.width = "300px";

      const div160x600L = document.createElement("div");
      div160x600L.dataset.adUnitId = "/49662453/PengehjoernetDK/skyscraper_l";
      div160x600L.style.position = "sticky";
      div160x600L.style.top = "50px";
      div160x600L.style.height = "600px";
      div160x600L.style.float = "right";
      leftSticky.appendChild(div160x600L);

      const div160x600R = document.createElement("div");
      div160x600R.dataset.adUnitId = "/49662453/PengehjoernetDK/skyscraper_r";
      div160x600R.style.position = "sticky";
      div160x600R.style.top = "50px";
      div160x600R.style.height = "600px";
      div160x600R.style.float = "left";
      rightSticky.appendChild(div160x600R);

      contentElement.appendChild(leftSticky);
      contentElement.appendChild(rightSticky);

      const listenerSidebarSizeUpdater = function() {
        leftSticky.style.height = contentElement.clientHeight - 220 + "px";
        rightSticky.style.height = contentElement.clientHeight - 220 + "px";
      };

      try {
        window.addEventListener('scroll', listenerSidebarSizeUpdater, {
          passive: true
        });
      } catch (err) {
        window.addEventListener('scroll', listenerSidebarSizeUpdater);
      }
    }

    if (window.innerWidth >= 1500) {
      createSidebanners();
    }

    loadAds();
  }, []);

  return null;
}
