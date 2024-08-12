'use client'
import React, { useState } from 'react'
// https://www.npmjs.com/package/next-share
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon
  } from 'next-share'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function SocialMediaShareButtons({ articleUrl, views }: { articleUrl: string, views: string}) {

    const numericViews = Number(views);
    const [shareMenu, setShareMenu] = useState<boolean>(true);

    return (
        <aside className='grid mt-8 w-screen fixed md:hidden z-50 left-0 bottom-0 bg-red-50 shadow-xl'>
            {
                shareMenu ? (
                    <ChevronDown onClick={() => setShareMenu(!shareMenu)} size={30} className='absolute right-0 -top-8 bg-gray-300' />
                ) : (
                    <ChevronUp onClick={() => setShareMenu(!shareMenu)} size={30} className='absolute right-0 -top-8 bg-gray-300' />
                )
            }
            
            <div className={`w-full ${shareMenu ? 'h-fit' : 'h-0'}`}>
                <div className='grid grid-cols-3 place-content-start m-auto md:m-[inherit]  md:flex '>
                    <FacebookShareButton
                        url={articleUrl}
                        quote={'Læs denne artikel!'} 
                        hashtag={'#artikel'}
                    >
                        <div className="flex items-center bg-[#405a9a] px-2 py-1 ">
                            <FacebookIcon size={44} round />
                            <p className='text-white font-semibold'>Del: {numericViews > 80 ? Math.round(numericViews / 3) : (numericViews > 3 ? (numericViews + 9) : numericViews)}</p>
                        </div>
                    </FacebookShareButton>
    
                    <TwitterShareButton
                        url={articleUrl}
                        title={'Læs denne artikel!'}
                    >
                        <div className="flex items-center bg-[#000000] text-white px-2 py-1 ">
                            <TwitterIcon size={44} round />
                            <p className='text-white font-semibold'>Del: {numericViews > 80 ? Math.round(numericViews / 19) : (numericViews > 10 ? (numericViews - 10) : 0)}</p>
                        </div>
                    </TwitterShareButton>

                    <LinkedinShareButton
                        url={articleUrl}
                        title={'Læs denne artikel!'}
                    >
                        <div className="flex items-center bg-[#297CAD] text-white px-2 py-1 ">
                            <LinkedinIcon  opacity={50}  size={44} round />
                            <p className='text-white  font-semibold'>Del: {numericViews > 80 ? Math.round(numericViews / 16) : (numericViews > 13 ? (numericViews - 13) : 0)}</p>
                        </div>
                    </LinkedinShareButton>
                </div>
            </div>
        </aside>
      )
}
