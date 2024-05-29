import React from 'react';
import InstagramClientBlock from './ClientBlocks/InstagramClientBlock';

interface InstagramTextBlockProps {
    value: { url: string };
}

const InstagramTextBlock: React.FC<InstagramTextBlockProps> = ({ value }) => {
    console.log(value.url, 'value.url', 'InstagramTextBlock');
    //const embedUrl = value.url.replace("fb.watch", "www.Instagram.com/watch");

    return (
       <div className='w-full max-w-[90vw] m-auto grid place-content-center'>
        {
            value.url && (
                <InstagramClientBlock value='https://www.instagram.com/p/C7iBkUCs07A/?utm_source=ig_web_copy_link'/>
            )
        }
       </div>
    );
};

export default InstagramTextBlock;

