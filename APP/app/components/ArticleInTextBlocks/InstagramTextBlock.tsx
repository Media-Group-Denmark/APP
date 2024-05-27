import React from 'react';

interface InstagramTextBlockProps {
    value: { url: string };
}

const InstagramTextBlock: React.FC<InstagramTextBlockProps> = ({ value }) => {
    const embedUrl = value.url.replace("fb.watch", "www.Instagram.com/watch");

    return (
       <div className='w-full grid place-content-center'>
            <iframe
                src={value.url}
                width="560"
                height="315"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen={true}
            ></iframe>
            <a href={value.url} target="_blank" rel="noopener noreferrer">
            Se dette indlæg på Instagram
          </a>
       </div>
    );
};

export default InstagramTextBlock;

