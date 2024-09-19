import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default async function ReadMoreArticlesSkeleton() {
  

  return (
    <section className="my-2 sm:my-6">
      <ul className="list-disc list-inside grid gap-2 !mx-0">
        
          <li className='elementList'>
          <Skeleton height={90} />
          </li>
          <li className='elementList'>
          <Skeleton height={90} />
          </li>
        
      </ul>
    </section>
  );
}
