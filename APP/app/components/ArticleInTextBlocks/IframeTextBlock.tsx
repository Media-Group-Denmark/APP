import React from 'react';

interface IframeBlockProps {
    value: { url: string };
}

const IframeTextBlock: React.FC<IframeBlockProps> = ({ value }) => {
    return (
        <aside className='w-full max-w-[80vw] m-auto grid place-content-center'>
            {
                value.url && (
                    <div dangerouslySetInnerHTML={{ __html: value.url }} />
                )
            }
       </aside>
    );
};

export default IframeTextBlock;
