import React from 'react';

interface FacebookTextBlockProps {
    value: { url: string };
}

const FacebookTextBlock: React.FC<FacebookTextBlockProps> = ({ value }) => {
    const embedUrl = value.url.replace("fb.watch", "www.facebook.com/watch");

    return (
        <div className='w-full grid place-content-center'>
            <iframe
                src={embedUrl}
                width="560"
                height="315"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen={true}
            ></iframe>
        </div>
    );
};

export default FacebookTextBlock;
