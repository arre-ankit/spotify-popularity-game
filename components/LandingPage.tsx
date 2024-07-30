import Link from "next/link"
import { Button } from "@/components/ui/button"
import cover from 'public/cover.png'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-gradient-to-r from-[#295f3c] to-[#191414] py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
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
      <section className="bg-[#191414] py-12 md:py-20 lg:py-28">
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
                  src="/Jab we met.png"
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

