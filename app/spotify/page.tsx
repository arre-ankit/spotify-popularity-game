import SpotifyPopularityGame from '@/components/Spotify'
import React from 'react'

type Props = {}
export const runtime = 'edge'

const SpotifyGame = (props: Props) => {
  return (
    <div>
        <SpotifyPopularityGame  />
    </div>
  )
}

export default SpotifyGame
