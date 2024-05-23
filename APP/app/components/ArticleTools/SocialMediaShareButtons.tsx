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

export default function SocialMediaShareButtons({ articleUrl }: { articleUrl: string }) {
  return (
    <div className='grid gap-2 mt-8 px-3'>
        <h4 className='text-center md:text-start mb-4 text-xl font-semibold w-full'>Del artikel på sociale medier</h4>
        <div className='w-full'>
            <div className='grid grid-cols-[auto_auto_auto] m-auto md:m-[inherit] w-fit md:flex gap-6 md:gap-4'>
                <FacebookShareButton
                    url={articleUrl}
                    quote={'Læs denne artikel!'}
                    hashtag={'#artikel'}
                >
                    <FacebookIcon size={44} round />
                </FacebookShareButton> 
        
                <TwitterShareButton
                    url={articleUrl}
                    title={'Læs denne artikel!'}
                >
                    <TwitterIcon size={44} round />
                </TwitterShareButton>
        
                <LinkedinShareButton url={articleUrl}>
                    <LinkedinIcon size={44} round />
                </LinkedinShareButton>
        
                <RedditShareButton
                    url={articleUrl}
                    title={'Læs denne artikel!'}
                >
                    <RedditIcon size={44} round />
                </RedditShareButton>

                <FacebookMessengerShareButton
                    url={articleUrl}
                    appId={''}
                >
                    <FacebookMessengerIcon size={44} round />
                </FacebookMessengerShareButton>
        
                <WhatsappShareButton
                    url={articleUrl}
                    title={'Læs denne artikel!'}
                    separator=":: "
                >
                    <WhatsappIcon size={44} round />
                </WhatsappShareButton>
            </div>
        </div>
    </div>
  )
}
