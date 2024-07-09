'use client'
import React from "react";
import { useDetectAdBlock } from "adblock-detect-react";

const AdBlockDetect = () => {
  const adBlockDetected = useDetectAdBlock();

  React.useEffect(() => {
    if (adBlockDetected) {
      window.alert("ad block detected");
    }
  }, []);

  return <section>
    {
        adBlockDetected && (
            <div className="fixed inset-0 bg-red-900 z-[999]">
            <div className="grid h-screen place-content-center m-auto text-white text-4xl" >
                {adBlockDetected} 
                <h1>Disable that AdBlock!</h1>
            </div>
            </div>
        )
    }
   </section>;
};

export default AdBlockDetect;