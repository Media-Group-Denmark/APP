import React from 'react';
import TikTokClientBlock from './ClientBlocks/TikTokClientBlock';

interface TikTokTextBlockProps {
    value: { url: string };
}

const TikTokTextBlock: React.FC<TikTokTextBlockProps> = ({ value }) => {
    const url = value.url;

    return (
      <>
        {
          url && (
            <TikTokClientBlock value={url} />
          )
        }
      </>
    );
};

export default TikTokTextBlock;

