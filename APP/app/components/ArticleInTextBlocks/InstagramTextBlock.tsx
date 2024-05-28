import React from 'react';
import InstagramClientBlock from './ClientBlocks/InstagramClientBlock';
import FacebookClientBlock from './ClientBlocks/FacebookClientBlock';

interface InstagramTextBlockProps {
    value: { url: string };
}

const InstagramTextBlock: React.FC<InstagramTextBlockProps> = ({ value }) => {
    //const embedUrl = value.url.replace("fb.watch", "www.Instagram.com/watch");

    return (
       <div className='w-full max-w-[90vw] m-auto grid place-content-center'>
        
                    <InstagramClientBlock value={value.url}/>
           
       </div>
    );
};

export default InstagramTextBlock;

