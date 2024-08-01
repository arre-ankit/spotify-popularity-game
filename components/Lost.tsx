"use client";

import React, { useEffect, useState } from 'react';

type Props = {};
export const runtime = 'edge';

const Lost = (props: Props) => {
  const [score, setScore] = useState<string | null>(null);

  useEffect(() => {
    setScore(localStorage.getItem('score'));
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#295f3c] to-[#191414] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-7xl">
          You Lost!
        </h1>
        <h2 className='text-2xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-7xl'>
          Score: {score}
        </h2>
        <p className="max-w-[600px] text-lg text-white md:text-xl">
          Play again to beat your score.
        </p>
        <a href='/spotify' className='flex justify-center items-center px-7 py-3 ml-5 md:ml-20 h-50 w-50 rounded-sm bg-white text-xl font-bold'>Replay</a>
      </div>
    </div>
  );
};

export default Lost;