import React from 'react';
import FacebookClientBlock from './ClientBlocks/FacebookClientBlock';

interface FacebookTextBlockProps {
    value: { posturl: string };
}

const FacebookTextBlock: React.FC<FacebookTextBlockProps> = ({ value }) => {
    console.log(value.posturl, 'value URL RECEIVED 1st TIME')
    //const embedUrl = value.url.replace("fb.watch", "www.facebook.com/watch");

    return (
        <div className='w-full max-w-[90vw] m-auto grid place-content-center'>
                    <FacebookClientBlock value={value.posturl}/>
       </div>
    );
};

export default FacebookTextBlock;
