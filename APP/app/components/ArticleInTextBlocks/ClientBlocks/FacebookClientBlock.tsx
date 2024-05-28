'use client';
import { FacebookEmbed } from 'react-social-media-embed';
import React from 'react'

export default function FacebookClientBlock( { value }: { value: string }) {
    console.log(value, 'value URL RECEIVED 2nd')
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
            value && (
                <FacebookEmbed url={value} width={550} />
            )
        }
</div>
  )
}
