import { urlFor } from '@/app/lib/sanityclient';
import React from 'react';

interface ImageTextBlockProps {
    value: {
        url: string;
        alt?: string;
    };
    isInline?: boolean;
}

const ImageTextBlock: React.FC<ImageTextBlockProps> = ({ value, isInline = false }) => {
    const imageUrl = urlFor(value.url)  // Assuming urlFor is a function similar to what you have described
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .format("webp")
        .width(400)
        .height(300)
        .fit("fill")
        .quality(85)
        .url();

    const imageAlt = value.alt || "Default alt text if none provided";  // Default alt text if not provided

    return (
        <div style={{ position: 'relative' }}>
            <img
                src={imageUrl}
                alt={imageAlt}
                loading="lazy"
                style={{ display: isInline ? 'inline-block' : 'block', width: isInline ? '100px' : '100%', height: 'auto' }}
            />
            <p className="absolute text-sm bottom-0 right-0 text-gray-300 p-1 bg-gray-400 bg-opacity-50">
                Foto: {imageAlt}
            </p>
        </div>
    );
};

export default ImageTextBlock;
