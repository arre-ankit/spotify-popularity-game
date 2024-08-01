import Link from "next/link"
import { Button } from "@/components/ui/button"
import cover from 'public/cover.png'
import Image from 'next/image'

export const runtime = 'edge'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-gradient-to-r from-[#295f3c] to-[#191414] py-12 md:py-20 lg:py-28">
      <div className="flex justify-end -mt-24 mr-3">   
                <a className="flex justify-center text-sm font-medium hover:underline" href="https://github.com/arre-ankit/spotify-popularity-game">
                <svg color="white" className="fill-current flex justify-end" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
      </div>
        <div className="container px-4 py-8 md:px-6 sm:px-2">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div className="flex flex-col items-center justify-center space-y-6 text-center lg:items-start lg:text-left">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl xl:text-7xl">
                Spotify Popularity Game
              </h1>
              <p className="max-w-[600px] text-lg text-white md:text-xl">
                Test your music knowledge by guessing which song is more popular on Spotify.
              </p>
              <Link
                href="/spotify"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-[#191414] shadow-md transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Play
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="/cover.png"
                width={10000000}
                height={1000000}
                alt="Spotify Logo"
                className="w-full max-w-[300px] lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </header>
      <section className="bg-[#191414] py-12 md:py-20 lg:py-40 w-auto h-auto ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-20">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-[#fffefe] sm:text-4xl md:text-5xl">
                How to Play
              </h2>
              <p className="text-muted md:text-lg">
                1. Two album covers will be displayed side-by-side.
                <br />
                2. Guess which song is more popular on Spotify.
                <br />
                3. If you're correct, you'll earn points
                <br />
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/Heeriye.png"
                  width={200}
                  height={200}
                  alt="Album Cover 1"
                  className="rounded-lg shadow-md"
                />
                <Image
                  src="/Tum_Se.png"
                  width={200}
                  height={200}
                  alt="Album Cover 2"
                  className="rounded-lg shadow-md"
                />
              </div>
              <a href='/spotify' className="inline-flex h-10 items-center justify-center rounded-md bg-slate-800 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/70">Which is more popular? </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

