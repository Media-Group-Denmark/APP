'use client';
import { InstagramEmbed } from 'react-social-media-embed';
import React, { useEffect, useState } from 'react'

export default function InstagramClientBlock( { value }: { value: string }) {
  const [pageLoaded, setPageLoaded] = useState(false)
  console.log(value, 'value.url', 'InstagramCBlock');
  useEffect(() => {
    console.log(value, 'value.url', 'InstagramCBlockEFF');
      setPageLoaded(true)
  }, [])
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      
              <InstagramEmbed url={value} width={328} />
          
</div>
  )
}
