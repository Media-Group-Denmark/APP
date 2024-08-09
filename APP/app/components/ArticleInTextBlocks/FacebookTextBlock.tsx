import React from 'react';
import FacebookClientBlock from './ClientBlocks/FacebookClientBlock';

interface FacebookTextBlockProps {
    value: { posturl: string };
}

const FacebookTextBlock: React.FC<FacebookTextBlockProps> = ({ value }) => {
    return (
        <aside className='w-full max-w-[80vw] m-auto grid place-content-center'>

            {
                value.posturl && (
                    <div>
                        <FacebookClientBlock value={value.posturl}/>
                    </div>
                )
            
            }
       </aside>
    );
};

export default FacebookTextBlock;
