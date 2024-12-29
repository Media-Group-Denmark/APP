"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { ChevronUp, ChevronDown } from "lucide-react";

function calculateAdjustmentFactor(views: any) {
  const base = Math.floor(Number(views) / 6);
  return Math.max(3, Math.min(11, base)); // Sikrer at factor er mellem 3 og 11
}

export default function ReadMoreAutomaticViews({ views }: { views: string }) {
  const initialReaders = Math.min(80, Math.floor(Number(views) / 6));
  const [liveReaders, setLiveReaders] = useState(initialReaders);
  const [previousReaders, setPreviousReaders] = useState(initialReaders);
  const adjustmentFactor = calculateAdjustmentFactor(views);

  useEffect(() => {
    const intervalDuration = 2500 + Math.random() * 2000; // Giver variation i opdateringsintervallet
    const intervalId = setInterval(() => {
      const randomChange =
        Math.floor(Math.random() * adjustmentFactor) -
        Math.floor(adjustmentFactor / 2);
      const newReaders = Math.max(3, Math.min(24, liveReaders + randomChange));
      setPreviousReaders(liveReaders);
      setLiveReaders(newReaders);
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [liveReaders, adjustmentFactor]);

  const readerChange = liveReaders - previousReaders;
  const arrow =
    readerChange >= 0 ? (
      <ChevronUp className="scale-[0.9] sm:scale-[1]" color="green" />
    ) : (
      <ChevronDown className="scale-[0.9] sm:scale-[1]" color="red" />
    );
  const color = readerChange >= 0 ? "green" : "red";

  return (
    <figure className="flex gap-2">
      <span className="grid w-fit grid-cols-[auto_1fr] place-content-center items-center !text-[15px] md:!text-[1.12em] min-w-[3em] sm:min-w-[2.5em] ">
        {arrow}
        <CountUp
          start={previousReaders}
          end={liveReaders}
          duration={6.75}
          className="!font-semibold"
        />
      </span>
      <span className="text-[0.8em] sm:text-sm md:text-lg block font-bold transition-all my-auto">
        Læser lige nu:
      </span>
    </figure>
  );
}
