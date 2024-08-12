'use client'
import React from 'react'
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

export default function SocialMediaShareButtons({ articleUrl, views }: { articleUrl: string, views: string}) {
    const numericViews = Number(views);
  return (
    <aside className='hidden md:grid gap-2 mt-8 px-3'>
        <p className='text-center md:text-start mb-4 text-xl font-extrabold w-full'>Del artikel på sociale medier</p>
        <div className='w-full'>
            <div className='grid grid-cols-[auto_auto_auto] m-auto md:m-[inherit] w-fit md:flex gap-6 md:gap-4'>
            <FacebookShareButton
                        url={articleUrl}
                        quote={'Læs denne artikel!'} 
                        hashtag={'#artikel'}
                    >
                        <div className="flex rounded-3xl items-center bg-[#405a9a] px-4 py-1 ">
                            <FacebookIcon size={44} round />
                            <p className='text-white font-extrabold'>Del: {numericViews > 80 ? Math.round(numericViews / 3) : (numericViews > 3 ? (numericViews + 9) : numericViews)}</p>
                        </div>
                    </FacebookShareButton>
    
                    <LinkedinShareButton
                        url={articleUrl}
                        title={'Læs denne artikel!'}
                    >
                        <div className="flex rounded-3xl items-center bg-[#297CAD] text-white font-extrabold px-4 py-1 ">
                            <LinkedinIcon size={44} round />
                            <p className='text-white font-extrabold'>Del: {numericViews > 80 ? Math.round(numericViews / 10) : (numericViews > 5 ? (numericViews - 4) : numericViews)}</p>
                        </div>
                    </LinkedinShareButton>

                    <TwitterShareButton
                        url={articleUrl}
                        title={'Læs denne artikel!'}
                    >
                        <div className="flex rounded-3xl items-center bg-[#000000] text-white font-extrabold px-4 py-1 ">
                            <TwitterIcon size={44} round />
                            <p className='text-white font-extrabold'>Del: {numericViews > 80 ? Math.round(numericViews / 19) : (numericViews > 10 ? (numericViews - 10) : 0)}</p>
                        </div>
                    </TwitterShareButton>

                    <RedditShareButton
                        url={articleUrl}
                        title={'Læs denne artikel!'}
                    >
                        <div className="flex rounded-3xl items-center bg-[#f54200] font-extrabold px-4 py-1 ">
                            <RedditIcon className='  ' size={44} round />
                            <p className='text-white font-extrabold'>Del: {numericViews > 80 ? Math.round(numericViews / 16) : (numericViews > 13 ? (numericViews - 13) : 0)}</p>
                        </div>
                    </RedditShareButton>


                    <FacebookMessengerShareButton
                        url={articleUrl}
                        appId=''
                    >
                        <div className="flex rounded-3xl items-center bg-[#3f97f6] text-white font-extrabold px-4 py-1 ">
                            <FacebookMessengerIcon size={44} round />
                            <p className='text-white font-extrabold'>Del: {numericViews > 80 ? Math.round(numericViews / 18) : (numericViews > 8 ? (numericViews - 8) : numericViews)}</p>
                        </div>
                    </FacebookMessengerShareButton>


                    <WhatsappShareButton 
                        url={articleUrl}
                        title={'Læs denne artikel!'}
                        separator=":: "
                    >
                        <div className="flex rounded-3xl items-center bg-[#4cd360] text-white font-extrabold px-2 py-1 ">
                            <WhatsappIcon size={44} round />
                            <p className='text-white font-extrabold'>Del: {numericViews > 80 ? Math.round(numericViews / 22) : (numericViews > 14 ? (numericViews - 14) : 0)}</p>
                        </div>
                    </WhatsappShareButton>
            </div>
        </div>
    </aside>
  )
}
