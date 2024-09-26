import React from 'react';
import InstagramClientBlock from './ClientBlocks/InstagramClientBlock';

interface InstagramTextBlockProps {
    value: { url: string };
}

const InstagramTextBlock: React.FC<InstagramTextBlockProps> = ({ value }) => {
    //const embedUrl = value.url.replace("fb.watch", "www.Instagram.com/watch");

    return (
       <aside className='w-full max-w-[90vw] m-auto grid place-content-center'>
        {
            value.url && (
                <InstagramClientBlock value={value.url}/>
            )
        }
       </aside>
    );
};

export default InstagramTextBlock;

