import React from 'react';
import TikTokClientBlock from './ClientBlocks/TikTokClientBlock';

interface TikTokTextBlockProps {
    value: { url: string };
}

const TikTokTextBlock: React.FC<TikTokTextBlockProps> = ({ value }) => {
    const url = value.url;

    return (
      <aside>
        {
          url && (
            <TikTokClientBlock value={url} />
          )
        }
      </aside>
    );
};

export default TikTokTextBlock;

