'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MusicalNoteIcon, PlayIcon, HeartIcon } from '@heroicons/react/24/solid'
import { PauseIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import AppLayout from '../components/AppLayout'

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  
  const songs = [
    {
      id: 1,
      title: 'Cruel Summer',
      artist: 'Taylor Swift',
      plays: '145M',
      duration: '3:42',
      thumbnail: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: 'Lover'
    },
    {
      id: 2,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      plays: '543M',
      duration: '4:22',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: 'After Hours'
    },
    {
      id: 3,
      title: 'Hotline Bling',
      artist: 'Drake',
      plays: '1.8B',
      duration: '4:55',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'hiphop',
      album: 'Views'
    },
    {
      id: 4,
      title: 'Nothing Else Matters',
      artist: 'Metallica',
      plays: '1.2B',
      duration: '6:24',
      thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'rock',
      album: 'Metallica'
    },
    {
      id: 5,
      title: 'Roar',
      artist: 'Katy Perry',
      plays: '3.7B',
      duration: '4:30',
      thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: 'Prism'
    },
    {
      id: 6,
      title: 'Symphony No.40 in G Minor',
      artist: 'Vienna Philharmonic',
      plays: '45M',
      duration: '28:15',
      thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'classical',
      album: 'Mozart: Essential Works'
    },
    {
      id: 7,
      title: 'HUMBLE.',
      artist: 'Kendrick Lamar',
      plays: '865M',
      duration: '2:57',
      thumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'hiphop',
      album: 'DAMN.'
    },
    {
      id: 8,
      title: 'Levitating ft. DaBaby',
      artist: 'Dua Lipa',
      plays: '675M',
      duration: '3:23',
      thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: 'Future Nostalgia'
    }
  ];

  const playlists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The hottest tracks right now - updated daily",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 50,
      duration: "3 hr 15 min",
      category: "pop"
    },
    {
      id: 2,
      title: "RapCaviar",
      description: "The most influential hip hop playlist",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 45,
      duration: "2 hr 50 min",
      category: "hiphop"
    },
    {
      id: 3,
      title: "Rock Classics",
      description: "The greatest rock songs of all time",
      coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 65,
      duration: "4 hr 20 min",
      category: "rock"
    },
    {
      id: 4,
      title: "Peaceful Piano",
      description: "Relax and indulge with beautiful piano pieces",
      coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 35,
      duration: "2 hr 30 min",
      category: "classical"
    },
    {
      id: 5,
      title: "Dance Party",
      description: "The biggest dance hits for your party",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 40,
      duration: "2 hr 45 min",
      category: "pop"
    },
    {
      id: 6,
      title: "Chill Lofi Beats",
      description: "Beats to study, relax, and focus",
      coverImage: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 55,
      duration: "3 hr 30 min",
      category: "chill"
    }
  ];

  const filteredSongs = activeCategory === 'all' 
    ? songs 
    : songs.filter(song => song.category === activeCategory);

  const filteredPlaylists = activeCategory === 'all'
    ? playlists
    : playlists.filter(playlist => playlist.category === activeCategory);

  return (
    <AppLayout>
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-black"></div>
          <div className="w-full h-64 md:h-80 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Music Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">MUSIC</h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl drop-shadow-md">Discover the latest tracks, exclusive releases, and curated playlists.</p>
          </div>
        </div>
        
        {/* Category Navigation - Tidal Style */}
        <div className="mb-10 px-6">
          <div className="flex items-center space-x-6 border-b border-gray-800 pb-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'all' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              For You
            </button>
            <button
              onClick={() => setActiveCategory('pop')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'pop' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Pop
            </button>
            <button
              onClick={() => setActiveCategory('rock')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'rock' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Rock
            </button>
            <button
              onClick={() => setActiveCategory('hiphop')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'hiphop' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Hip Hop
            </button>
            <button
              onClick={() => setActiveCategory('classical')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'classical' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Classical
            </button>
          </div>
        </div>
        
        {/* Featured Playlists */}
        <div className="mb-12 px-6">
          <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPlaylists.map(playlist => (
              <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="group">
                <div className="bg-gray-900 rounded-md overflow-hidden transition-all hover:bg-gray-800">
                  <div className="aspect-square">
                    <img src={playlist.coverImage} alt={playlist.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white line-clamp-1">{playlist.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{playlist.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{playlist.trackCount} tracks</span>
                      <button className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-2 transition-opacity">
                        <PlayIcon className="h-4 w-4 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Top Songs */}
        <div className="mb-12 px-6">
          <h2 className="text-2xl font-bold mb-6">Top Songs</h2>
          <div className="bg-gray-900/50 rounded-md overflow-hidden">
            {filteredSongs.map((song, index) => (
              <div 
                key={song.id}
                className="flex items-center p-3 hover:bg-gray-800 group cursor-pointer transition-colors border-b border-gray-800 last:border-b-0"
                onMouseEnter={() => setHoveredTrack(song.id)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div className="w-6 text-center mr-3 text-gray-500">{index + 1}</div>
                <div className="mr-3 w-10 h-10 flex-shrink-0">
                  <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex flex-1 items-center overflow-hidden mr-4">
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{song.title}</h3>
                    <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                  </div>
                </div>
                <div className="text-gray-400 text-xs hidden md:block">{song.album}</div>
                <div className="text-gray-400 text-xs ml-auto md:ml-6">{song.duration}</div>
                <div className="ml-4 md:ml-6 flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-white">
                    <HeartIcon className="h-4 w-4" />
                  </button>
                  <button className={`rounded-full p-2 ${hoveredTrack === song.id ? 'bg-white' : 'invisible group-hover:visible bg-gray-700'}`}>
                    <PlayIcon className={`h-3 w-3 ${hoveredTrack === song.id ? 'text-black' : 'text-white'}`} />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* New Releases */}
        <div className="px-6 pb-12">
          <h2 className="text-2xl font-bold mb-6">New Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSongs.slice(0, 6).reverse().map(song => (
              <div 
                key={`new-${song.id}`} 
                className="group"
                onMouseEnter={() => setHoveredTrack(song.id + 100)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div className="relative aspect-square mb-3">
                  <img 
                    src={song.thumbnail} 
                    alt={song.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ${hoveredTrack === song.id + 100 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    <button className="bg-white rounded-full p-3 transform transition-transform hover:scale-110">
                      <PlayIcon className="h-6 w-6 text-black" />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{song.title}</h3>
                <p className="text-gray-400 text-xs">{song.artist}</p>
                <p className="text-gray-500 text-xs mt-1">{song.album}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 