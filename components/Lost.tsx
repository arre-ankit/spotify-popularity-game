"use client";

import React, { useEffect, useState } from 'react';

type Props = {};
export const runtime = 'edge';

const Lost = (props: Props) => {
  const [score, setScore] = useState<string | null>(null);
  const [highScore, setHighScore] = useState<string | null>(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    const currentScore = localStorage.getItem("score");
    const storedHighScore = localStorage.getItem("highScore");
    setScore(currentScore);
    setHighScore(storedHighScore);
   
    //@ts-ignore
    if(currentScore >= storedHighScore){
      setIsNewHighScore(true);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#295f3c] to-[#191414] flex items-center justify-center">
      <div className="flex-1 items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
        <h1 className="flex items-center justify-center text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-7xl">
        {isNewHighScore ? "Congratulations!✨🚀💫" : "You Lost!😵‍💫😭"}
        </h1>
        <p className="flex items-center justify-center text-lg text-white md:text-xl font-semibold">
        {isNewHighScore
            ? "New High score! Keep it up."
            : "Play again to beat your score."}
        </p>
        <h2 className='flex items-center justify-center text-xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-3xl'>
          Score: {score}
        </h2>
        <h2 className='flex items-center justify-center text-2xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-3xl'>
          High Score: {highScore}
        </h2>
        <a href="/spotify" className="flex items-center justify-center w-40 h-10 mx-auto bg-white text-xl font-bold rounded-sm">
          Replay </a>

      </div>
    </div>
  );
};

export default Lost;