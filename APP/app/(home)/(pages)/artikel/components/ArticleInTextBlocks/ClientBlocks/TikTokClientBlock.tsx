'use client';
import React, { useEffect, useState } from 'react'


export default function TikTokClientBlock( { value }: { value: string }) {
  const [pageLoaded, setPageLoaded] = useState(false)
  useEffect(() => {
      setPageLoaded(true)
  }, [])
  return (
    <aside style={{ display: 'flex', justifyContent: 'center' }}>
        {
            pageLoaded && (
                <div>
                <blockquote
                  className="tiktok-embed"
                  cite={value}
                  data-video-id={value.split("/").pop()}
                  style={{ maxWidth: "605px", minWidth: "280px" }}
                >
                  <section></section>
                </blockquote>
              </div>
            )
        }
</aside>
  )
}
