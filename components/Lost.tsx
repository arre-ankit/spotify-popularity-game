import React from 'react'
import Link from 'next/link'

type Props = {}
export const runtime = 'edge'

const Lost = (props: Props) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#295f3c] to-[#191414] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-7xl">
          You Lost!
        </h1>
        <p className="max-w-[600px] text-lg text-white md:text-xl">
          Play again to beat your score.
        </p>
        <a href='/spotify' className='flex justify-center items-center px-7 ml-20 h-30 w-30 rounded-sm bg-white'>Replay</a>
      </div>
    </div>
  )
}

export default Lost
