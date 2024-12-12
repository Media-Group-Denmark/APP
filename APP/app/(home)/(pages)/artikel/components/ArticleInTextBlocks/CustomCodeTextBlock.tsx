import React from 'react';

interface CustomCodeBlockProps {
    value: { code: string };
}

const CustomCodeTextBlock: React.FC<CustomCodeBlockProps> = ({ value }) => {
    return (
        <aside className='w-full max-w-[80vw] m-auto grid place-content-center'>
            {
                value.code && (
                    <div dangerouslySetInnerHTML={{ __html: value.code }} />
                )
            }
       </aside>
    );
};

export default CustomCodeTextBlock;
