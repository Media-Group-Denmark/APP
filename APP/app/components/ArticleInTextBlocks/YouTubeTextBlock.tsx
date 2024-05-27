import React from 'react';

interface YouTubeTextBlockProps {
    value: { url: string };
}

const YouTubeTextBlock: React.FC<YouTubeTextBlockProps> = ({ value }) => {
    // Ekstraher videoID fra YouTube URL'en
    let videoId: any = "";
    const url = new URL(value.url);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    // Tjek om URL'en er en kort URL eller en standard YouTube-video URL
    if (pathname.includes("/shorts/")) {
      videoId = pathname.split("/shorts/")[1];
    } else if (searchParams.has("v")) {
      videoId = searchParams.get("v");
    } else {
      // Hvis URL'en er i et andet format, skal der måske tilføjes yderligere logik
      console.error("YouTube URL format ikke genkendt:", value.url);
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className='w-full grid place-content-center'>
            <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
    );
};

export default YouTubeTextBlock;

