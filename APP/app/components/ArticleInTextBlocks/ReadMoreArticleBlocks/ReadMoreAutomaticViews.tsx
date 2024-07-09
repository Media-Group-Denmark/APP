'use client';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { ChevronUp, ChevronDown } from 'lucide-react';

function calculateAdjustmentFactor(views) {
  const base = Math.floor(Number(views) / 6);
  return Math.max(3, Math.min(11, base)); // Sikrer at factor er mellem 3 og 11
}

export default function ReadMoreAutomaticViews({ views }: { views: string }) {
  const initialReaders = Math.min(80, Math.floor(Number(views) / 6));
  const [liveReaders, setLiveReaders] = useState(initialReaders);
  const [previousReaders, setPreviousReaders] = useState(initialReaders);
  const adjustmentFactor = calculateAdjustmentFactor(views);

  useEffect(() => {
    const intervalDuration = 2500 + Math.random() * 1000; // Giver variation i opdateringsintervallet
    const intervalId = setInterval(() => {
      const randomChange = Math.floor(Math.random() * adjustmentFactor) - Math.floor(adjustmentFactor / 2);
      const newReaders = Math.max(3, Math.min(67, liveReaders + randomChange));
      setPreviousReaders(liveReaders);
      setLiveReaders(newReaders);
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [liveReaders, adjustmentFactor]);

  const readerChange = liveReaders - previousReaders;
  const arrow = readerChange >= 0 ? <ChevronUp color='green' /> : <ChevronDown color='red' />;
  const color = readerChange >= 0 ? 'green' : 'red';

  return (
    <div className='flex gap-2'>
      <span className='grid w-fit grid-cols-[auto_1fr] place-content-center items-center !text-[1em] md:!text-[1.12em] min-w-[2.7em] '>
        {arrow}
        <CountUp start={previousReaders} end={liveReaders} duration={2.75} className='!font-semibold'/>
      </span>
      <span className="text-sm md:text-lg block font-semibold transition-all my-auto">
        Læser lige nu:
      </span>
    </div>
  );
}
