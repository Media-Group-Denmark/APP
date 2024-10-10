import React from 'react';

export default function LoadReadPeak() {
  return (
    <>
      <div className="rpWidget"></div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script async src="https://static.readpeak.com/js/rp-int.js" data-cmp-vendor="290" class="cmplazyload"></script>
            <script>
              (function() {
                var insertReadpeak = function(tcData, success) {
                  if (success && tcData.eventStatus === 'tcloaded') {
                    var tcstring = tcData.tcString;
                    var settings = {
                      id: 'bf551b421dbbf88f',
                      width: '500',
                      height: '435',
                      gdpr_consent: tcstring,
                      cats: [],
                      tags: [],
                      numberOfAds: 3,
                    };
                    var element = document.currentScript || document.querySelectorAll('script')[document.querySelectorAll('script').length - 1];
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
              })();
            </script>
          `,
        }}
      />
    </>
  );
}
