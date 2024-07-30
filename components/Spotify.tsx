"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Music } from 'lucide-react';
import { useRouter } from 'next/navigation'


// Function to get Spotify access token
const getAccessToken = async () => {
  const clientId =process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  //@ts-ignore
  return data.access_token;
};

// Function to fetch random tracks from Spotify
//@ts-ignore
const fetchRandomTracks = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/search?q=year:2000-2024&type=track&limit=50&market=IN', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  //@ts-ignore
  return data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    popularity: track.popularity,
    previewUrl: track.preview_url,
    image: track.album.images[0].url
  }));
};

const SpotifyPopularityGame = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Failed to fetch tracks. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (tracks.length >= 2) {
      selectNewPair();
    }
  }, [tracks]);

  const selectNewPair = () => {
    const shuffled = [...tracks].sort(() => 0.5 - Math.random());
    setCurrentPair(shuffled.slice(0, 2));
    setMessage('');
  };


  //@ts-ignore
  const handleGuess = (guessedTrack) => {
    //@ts-ignore
    const otherTrack = currentPair.find(track => track.id !== guessedTrack.id);
    //@ts-ignore
    if (guessedTrack.popularity > otherTrack.popularity) {
      setScore(score + 1);
      setMessage('Correct! You earned a point.');
      selectNewPair();
    } 
    else {
        setMessage('Sorry, that was incorrect.');
        setScore(0);
        setTimeout(() => {
            router.push('/lost');
        }
        , 2000);
      
    }

  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading tracks...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Spotify Popularity Game</h1>
      <div className="text-center mb-4">
      </div>
      {message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded flex items-center justify-center">
          <AlertCircle className="mr-2" />
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {currentPair.map((track:any) => (
            //@ts-ignore
          <div>
            <Card key={track.id} className="flex flex-col h-full">
            <img src={track.image} alt={track.name} className="h-fit" />
            <CardHeader>
              <CardTitle className="flex items-center">
                <Music className="mr-2" />
                {track.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p>{track.artist}</p>
              {track.previewUrl && (
                <audio controls className="w-full mt-2">
                  <source src={track.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <Button 
                onClick={() => handleGuess(track)}
                className="mt-4 w-full"
              >
                This
              </Button>
            </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div>
      <p className="text-2xl font-bold flex justify-center">Score: {score}</p>
      </div>
    </div>
  );
};

export default SpotifyPopularityGame;