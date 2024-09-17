import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import React from 'react'
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID as string;

export default function GoogleAnalyticsScripts() {
  return (
    <>
        <GoogleAnalytics gaId={googleAnalyticsId} />
            <Script id="gtag-consent" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'security_storage': 'granted',
                'personalization_storage': 'granted',
                'functionality_storage': 'granted',
                'wait_for_update': 500
              });
              gtag("set", "url_passthrough", true);
            `}
          </Script>
          <Script id="consent-update" strategy="afterInteractive">
            {`
              var attemptsLeft = 50;
              function updateConsentMode() {
                if (window.__tcfapi) {
                  window.__tcfapi("addEventListener", 2, function (tcData, success) {
                    if (success && (tcData.eventStatus === "useractioncomplete" || tcData.eventStatus === "tcloaded")) {
                      gtag('consent', 'update', {
                        'ad_user_data': tcData.purpose.consents[3] ? 'granted' : 'denied',
                        'ad_personalization':  (tcData.purpose.consents[4] && tcData.vendor.consents[755]) ? 'granted' : 'denied',
                        'ad_storage': (tcData.purpose.consents[1] && tcData.vendor.consents[755]) ? 'granted' : 'denied',
                        'analytics_storage': tcData.purpose.consents[1] ? 'granted' : 'denied',
                        'security_storage': 'granted',
                        'personalization_storage': tcData.purpose.consents[5] ? 'granted' : 'denied',
                        'functionality_storage': tcData.purpose.consents[8] ? 'granted' : 'denied'
                      });
                    }
                  });
                } else {
                  if (attemptsLeft > 0) {
                    setTimeout(updateConsentMode, 100);
                  }
                  attemptsLeft--;
                }
              }
              updateConsentMode();
            `}
          </Script>
    </>
  )
}
