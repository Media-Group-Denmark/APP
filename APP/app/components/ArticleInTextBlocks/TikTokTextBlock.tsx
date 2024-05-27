import React from 'react';

interface TikTokTextBlockProps {
    value: { url: string };
}

const TikTokTextBlock: React.FC<TikTokTextBlockProps> = ({ value }) => {
    const tikTokUrl = value.url;

    return (
      <blockquote
        className="tiktok-embed"
        cite={tikTokUrl}
        data-video-id={tikTokUrl.split("/").pop()}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section></section>
      </blockquote>
    );
};

export default TikTokTextBlock;

