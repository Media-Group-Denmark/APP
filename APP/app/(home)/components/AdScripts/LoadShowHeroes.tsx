import Script from 'next/script'
import React from 'react'

export default function LoadShowHeroes() {

  return (
    <>
    <h1 className=' opacity-0 h-0 '>ShowHeroes</h1>
        <Script
           src="https://content.viralize.tv/display/?zid=AAFp6TIrtjcx6N9Y"
           data-wid="auto"
           type="text/javascript"
         />
    </>
  )
}
