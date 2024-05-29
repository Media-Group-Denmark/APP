import React from 'react';
import FacebookClientBlock from './ClientBlocks/FacebookClientBlock';

interface FacebookTextBlockProps {
    value: { posturl: string };
}

const FacebookTextBlock: React.FC<FacebookTextBlockProps> = ({ value }) => {
    return (
        <div className='w-full max-w-[80vw] m-auto grid place-content-center'>

            {
                value.posturl && (
                    <div>
                        <FacebookClientBlock value={value.posturl}/>
                    </div>
                )
            
            }
       </div>
    );
};

export default FacebookTextBlock;
