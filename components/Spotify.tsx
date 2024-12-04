"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const runtime = "edge";

// Add this type at the top of the file, after the imports
type CountryCode = 'AD' | 'AE' | 'AG' | 'AL' | 'AM' | 'AO' | 'AR' | 'AT' | 'AU' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BN' | 'BO' | 'BR' | 'BS' | 'BT' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CD' | 'CG' | 'CH' | 'CI' | 'CL' | 'CM' | 'CO' | 'CR' | 'CV' | 'CW' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FM' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GH' | 'GM' | 'GN' | 'GQ' | 'GR' | 'GT' | 'GW' | 'GY' | 'HK' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IN' | 'IQ' | 'IS' | 'IT' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KR' | 'KW' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MG' | 'MH' | 'MK' | 'ML' | 'MN' | 'MO' | 'MR' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NE' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PG' | 'PH' | 'PK' | 'PL' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RO' | 'RS' | 'RW' | 'SA' | 'SB' | 'SC' | 'SE' | 'SG' | 'SI' | 'SK' | 'SL' | 'SM' | 'SN' | 'SR' | 'ST' | 'SV' | 'SZ' | 'TD' | 'TG' | 'TH' | 'TJ' | 'TL' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'US' | 'UY' | 'UZ' | 'VC' | 'VE' | 'VN' | 'VU' | 'WS' | 'XK' | 'ZA' | 'ZM' | 'ZW';

// Add this interface near the top of the file, after the CountryCode type
interface Track {
  id: string;
  name: string;
  artist: string;
  popularity: number;
  previewUrl: string | null;
  image: string;
  url: string;
}

// Function to get Spotify access token
const getAccessToken = async () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  //@ts-ignore
  return data.access_token;
};


const fetchRandomTracks = async (accessToken: string) => {
  const getUserLocation = async (): Promise<CountryCode> => {
    try {
      const response = await fetch('/api/location');
      const countryCode = await response.text(); // Since we're returning just the country code
      const supportedCountries: CountryCode[] = ["AD", "AE", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CG", "CH", "CI", "CL", "CM", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PR", "PS", "PT", "PW", "PY", "QA", "RO", "RS", "RW", "SA", "SB", "SC", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SR", "ST", "SV", "SZ", "TD", "TG", "TH", "TJ", "TL", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "XK", "ZA", "ZM", "ZW"];
      
      return supportedCountries.includes(countryCode as CountryCode) 
        ? (countryCode as CountryCode) 
        : 'US';
    } catch (error) {
      console.error('Error getting location:', error);
      return 'US';
    }
  };

  const market = await getUserLocation();
  console.log(market);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=year:2000-2024&type=track&limit=50&market=${market}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();
  //@ts-ignore
  return data.tracks.items.map((track) => ({
    id: `${track.id}`,
    name: track.name,
    artist: track.artists[0].name,
    popularity: track.popularity,
    previewUrl: track.preview_url || null,
    image: track.album.images[0].url,
    url: `https://open.spotify.com/embed/track/${track.id}`,
  }));
};

const SpotifyPopularityGame = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState([]);
  const [currentPair, setCurrentPair] = useState<Track[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);


  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessToken();
        const fetchedTracks = await fetchRandomTracks(token);
        setTracks(fetchedTracks);
        setIsLoading(false);
      } catch (err) {
        //@ts-ignore
        setError("Failed to fetch tracks. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (tracks.length < 2) {
      return;
    }
    selectNewPair();
  }, [tracks]);

  const selectNewPair = () => {
    const shuffled = [...tracks].sort(() => 0.5 - Math.random());
    setCurrentPair(shuffled.slice(0, 2));
    setMessage("");
  };

  //@ts-ignore
  const handleGuess = (guessedTrack) => {
    //@ts-ignore
    const otherTrack = currentPair.find((track) => track.id !== guessedTrack.id);
    //@ts-ignore
    if (guessedTrack.popularity >= otherTrack.popularity) {
      const newScore = score + 1;
      setScore(newScore);

      // Update high score if new score is greater than the current high score
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore.toString());
      }

      setMessage("Correct! You earned a point.");
      setShowAnimation(true); // Trigger the animation
      setTimeout(() => setShowAnimation(false), 1000);
      selectNewPair();
    } else {
      setMessage("Sorry, that was incorrect.");
      //@ts-ignore
      localStorage.setItem("score", score);
      setScore(0);
      setTimeout(() => {
        router.push("/lost");
      }, 2000);
    }
  };

  if (isLoading) {
    return (    
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 -left-48 -top-48 bg-blue-500 rounded-full mix-blend-screen animate-pulse filter blur-xl"></div>
        <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-purple-500 rounded-full mix-blend-screen animate-pulse filter blur-xl"></div>
        <div className="absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full mix-blend-screen animate-pulse filter blur-xl"></div>
        <div className="text-center text-5xl mt-36 font-bold text-white">Loading tracks...</div>
      </div>
    </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 -left-48 -top-48 bg-blue-500 rounded-full mix-blend-screen animate-pulse filter blur-xl"></div>
        <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-purple-500 rounded-full mix-blend-screen animate-pulse filter blur-xl"></div>
        <div className="absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full mix-blend-screen animate-pulse filter blur-xl"></div>
      </div>
      
      <div className="p-4 max-w-4xl mx-auto relative z-10"> 
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Guess which song is trending ?</h1>
        <div className="text-center mt-5"></div>
        {message && <p className="text-2xl font-bold flex justify-center p-5 text-white">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-10">
          {currentPair.map((track: Track) => (
            <div key={track.id} className="flex flex-col items-center">
              <iframe 
                src={track.url}
                width="380" 
                height="380"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
              <Button onClick={() => handleGuess(track)} className="mt-4 w-full bg-neutral-900 text-lg">
                {track.id === `${currentPair[0].id}` ? 'Pick me bruh! 🔥' : 'No no, pick ME! ✨'}
              </Button>
            </div>
          ))}
        </div>
        <div></div>
        {showAnimation && (
          <div className="score-animation">+1</div> 
        )}
        <p className="text-2xl font-bold flex justify-center p-5 text-white">Score: {score}</p>
      </div>
    </div>
  );
};

export default SpotifyPopularityGame;
