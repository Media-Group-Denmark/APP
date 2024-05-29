'use client';
import { FacebookEmbed } from 'react-social-media-embed';
import React, { useEffect, useState } from 'react'


export default function FacebookClientBlock( { value }: { value: string }) {
  const [pageLoaded, setPageLoaded] = useState(false)
  useEffect(() => {
      setPageLoaded(true)
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
            pageLoaded && (
                  <FacebookEmbed url={value} width={450} />
            )
        }
</div>
  )
}
