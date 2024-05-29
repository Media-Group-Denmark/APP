'use client';
import { InstagramEmbed } from 'react-social-media-embed';
import React from 'react'

export default function InstagramClientBlock( { value }: { value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        
        <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
          
</div>
  )
}
