'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MusicalNoteIcon, PlayIcon, HeartIcon } from '@heroicons/react/24/solid'
import { PauseIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import AppLayout from '../components/AppLayout'

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [hasListeningHistory, setHasListeningHistory] = useState(false);
  
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
      title: 'SICKO MODE',
      artist: 'Travis Scott',
      plays: '1.8B',
      duration: '5:12',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'trap',
      album: 'Astroworld'
    },
    {
      id: 4,
      title: 'Strobe',
      artist: 'Deadmau5',
      plays: '1.2B',
      duration: '10:37',
      thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'edm',
      album: 'For Lack of a Better Name'
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
      title: 'Feel Good Inc',
      artist: 'Gorillaz',
      plays: '987M',
      duration: '3:43',
      thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'alternative',
      album: 'Demon Days'
    },
    {
      id: 7,
      title: 'Highest in the Room',
      artist: 'Travis Scott',
      plays: '865M',
      duration: '2:57',
      thumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'trap',
      album: 'Jackboys'
    },
    {
      id: 8,
      title: 'Levels',
      artist: 'Avicii',
      plays: '675M',
      duration: '3:19',
      thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'edm',
      album: 'Levels'
    },
    {
      id: 9,
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      plays: '1.3B',
      duration: '3:14',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: 'When We All Fall Asleep, Where Do We Go?'
    },
    {
      id: 10,
      title: 'Uptown Funk',
      artist: 'Mark Ronson ft. Bruno Mars',
      plays: '4.5B',
      duration: '4:30',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: 'Uptown Special'
    },
    {
      id: 11,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      plays: '5.2B',
      duration: '3:53',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'pop',
      album: '÷ (Divide)'
    },
    {
      id: 12,
      title: 'Goosebumps',
      artist: 'Travis Scott',
      plays: '1.5B',
      duration: '4:03',
      thumbnail: 'https://images.unsplash.com/photo-1498550744921-75f79806b8a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'trap',
      album: 'Birds in the Trap Sing McKnight'
    },
    {
      id: 13,
      title: 'Bad and Boujee',
      artist: 'Migos ft. Lil Uzi Vert',
      plays: '1.2B',
      duration: '5:43',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'trap',
      album: 'Culture'
    },
    {
      id: 14,
      title: 'Life Is Good',
      artist: 'Future ft. Drake',
      plays: '1.1B',
      duration: '3:57',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'trap',
      album: 'High Off Life'
    },
    {
      id: 15,
      title: 'Titanium',
      artist: 'David Guetta ft. Sia',
      plays: '1.7B',
      duration: '4:05',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'edm',
      album: 'Nothing but the Beat'
    },
    {
      id: 16,
      title: 'Don\'t You Worry Child',
      artist: 'Swedish House Mafia',
      plays: '1.3B',
      duration: '6:43',
      thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'edm',
      album: 'Until Now'
    },
    {
      id: 17,
      title: 'Clarity',
      artist: 'Zedd ft. Foxes',
      plays: '890M',
      duration: '4:30',
      thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'edm',
      album: 'Clarity'
    },
    {
      id: 18,
      title: 'Stressed Out',
      artist: 'Twenty One Pilots',
      plays: '2.1B',
      duration: '3:22',
      thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'alternative',
      album: 'Blurryface'
    },
    {
      id: 19,
      title: 'Radioactive',
      artist: 'Imagine Dragons',
      plays: '1.9B',
      duration: '3:06',
      thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'alternative',
      album: 'Night Visions'
    },
    {
      id: 20,
      title: 'Take Me to Church',
      artist: 'Hozier',
      plays: '1.5B',
      duration: '4:02',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'alternative',
      album: 'Hozier'
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
      title: "Trap Nation",
      description: "The most influential trap playlist",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 45,
      duration: "2 hr 50 min",
      category: "trap"
    },
    {
      id: 3,
      title: "Alternative Essentials",
      description: "The best alternative rock songs of the moment",
      coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 65,
      duration: "4 hr 20 min",
      category: "alternative"
    },
    {
      id: 4,
      title: "EDM Workout",
      description: "High energy electronic dance music for your workout",
      coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 35,
      duration: "2 hr 30 min",
      category: "edm"
    },
    {
      id: 5,
      title: "Pop Party",
      description: "The biggest pop hits for your party",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 40,
      duration: "2 hr 45 min",
      category: "pop"
    },
    {
      id: 6,
      title: "Future Trap",
      description: "Cutting-edge trap beats from around the world",
      coverImage: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 55,
      duration: "3 hr 30 min",
      category: "trap"
    },
    {
      id: 7,
      title: "Pop Classics",
      description: "Timeless pop hits from the last few decades",
      coverImage: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 100,
      duration: "6 hr 45 min",
      category: "pop"
    },
    {
      id: 8,
      title: "Global Pop",
      description: "The biggest international pop hits right now",
      coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 50,
      duration: "3 hr 10 min",
      category: "pop"
    },
    {
      id: 9,
      title: "Trap Bangers",
      description: "The hardest hitting trap beats for your playlist",
      coverImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 40,
      duration: "2 hr 25 min",
      category: "trap"
    },
    {
      id: 10,
      title: "Trap Essentials",
      description: "The must-have trap tracks for any collection",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 35,
      duration: "2 hr 10 min",
      category: "trap"
    },
    {
      id: 11,
      title: "EDM Classics",
      description: "The electronic dance music tracks that defined the genre",
      coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 60,
      duration: "4 hr 30 min",
      category: "edm"
    },
    {
      id: 12,
      title: "Festival EDM",
      description: "The biggest EDM tracks from festivals around the world",
      coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      trackCount: 45,
      duration: "3 hr 15 min",
      category: "edm"
    }
  ];

  const filteredSongs = activeCategory === 'all' 
    ? songs 
    : songs.filter(song => song.category === activeCategory);

  const filteredPlaylists = activeCategory === 'all'
    ? playlists
    : playlists.filter(playlist => playlist.category === activeCategory);

  // Get recently played songs (for demonstration - using first 4 songs)
  const recentlyPlayed = hasListeningHistory ? songs.slice(0, 4) : [];

  return (
    <AppLayout>
      <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
        {/* Hero Section - Cute Purple Theme */}
        <div className="relative mb-12">
          <div className="w-full h-64 md:h-80 overflow-hidden bg-purple-400">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-purple-600 z-0"></div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              {/* Stars */}
              <div className="absolute top-5 left-10 w-6 h-6 text-yellow-300 animate-pulse">★</div>
              <div className="absolute top-20 right-20 w-8 h-8 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }}>★</div>
              <div className="absolute bottom-10 left-1/4 w-4 h-4 text-yellow-300 animate-pulse" style={{ animationDelay: '1s' }}>★</div>
              
              {/* Hearts */}
              <div className="absolute top-12 left-1/3 w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '0.7s' }}>❤</div>
              <div className="absolute bottom-16 right-1/4 w-8 h-8 text-pink-400 animate-pulse" style={{ animationDelay: '1.2s' }}>❤</div>
              
              {/* Sparkles */}
              <div className="absolute top-1/3 right-10 w-4 h-4 text-white animate-pulse" style={{ animationDelay: '0.3s' }}>✨</div>
              <div className="absolute bottom-5 left-1/2 w-4 h-4 text-white animate-pulse" style={{ animationDelay: '0.8s' }}>✨</div>
              
              {/* Moon */}
              <div className="absolute top-12 right-1/3 w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center">
                <div className="text-yellow-500 text-2xl rotate-90">◡</div>
              </div>
            </div>
            
            {/* Title area - positioned at bottom left */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-20">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg" style={{ textShadow: '3px 3px 0 #5B21B6' }}>
                MUSIC
              </h1>
              <div className="flex items-center">
                <span className="text-pink-200 text-xl mr-2">♫</span>
                <p className="text-white text-lg md:text-xl">Discover the latest tracks</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recently Played - Small Row at Top */}
        <div className="mb-8 px-6">
          <h2 className="text-lg font-bold mb-4">Recently Played</h2>
          {hasListeningHistory ? (
            <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
              {recentlyPlayed.map(song => (
                <div key={`recent-${song.id}`} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className="relative w-40 h-40 mb-2">
                    <img 
                      src={song.thumbnail} 
                      alt={song.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button className="bg-white rounded-full p-2.5 hover:scale-110 transition-transform">
                        <PlayIcon className="h-5 w-5 text-black" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium truncate">{song.title}</h3>
                  <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center">
              <MusicalNoteIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No listening history yet</p>
              <p className="text-gray-500 text-sm">Play some music to create your listening history</p>
            </div>
          )}
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
              onClick={() => setActiveCategory('trap')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'trap' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Trap
            </button>
            <button
              onClick={() => setActiveCategory('edm')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'edm' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              EDM
            </button>
            <button
              onClick={() => setActiveCategory('alternative')}
              className={`text-sm font-semibold whitespace-nowrap pb-3 relative ${
                activeCategory === 'alternative' 
                ? 'text-white border-b-2 border-white -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Alternative
            </button>
          </div>
        </div>
        
        {/* Featured Playlists */}
        <div className="mb-12 px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Playlists</h2>
            <Link href="/playlists" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPlaylists.map(playlist => (
              <div key={playlist.id} className="group bg-gray-900 rounded-md overflow-hidden transition-all hover:bg-gray-800 relative hover:shadow-xl hover:shadow-purple-900/20">
                <div className="aspect-square">
                  <img src={playlist.coverImage} alt={playlist.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white line-clamp-1">{playlist.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{playlist.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{playlist.trackCount} tracks</span>
                    <button className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-2 transition-all hover:scale-110">
                      <PlayIcon className="h-4 w-4 text-black" />
                    </button>
                  </div>
                </div>
                <Link href={`/playlist/${playlist.id}`} className="absolute inset-0" aria-label={`Go to playlist ${playlist.title}`}></Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Songs */}
        <div className="mb-12 px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Top Songs</h2>
            <Link href="/songs" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="bg-gray-900/50 rounded-md overflow-hidden shadow-lg">
            {filteredSongs.slice(0, 10).map((song, index) => (
              <div 
                key={song.id}
                className="flex items-center p-3 hover:bg-gray-800 group cursor-pointer transition-colors border-b border-gray-800 last:border-b-0"
                onMouseEnter={() => setHoveredTrack(song.id)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div className="w-6 text-center mr-3 text-gray-500">{index + 1}</div>
                <div className="mr-3 w-10 h-10 flex-shrink-0 relative group">
                  <img src={song.thumbnail} alt={song.title} className="w-full h-full object-cover rounded" />
                  <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded ${hoveredTrack === song.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    <PlayIcon className="h-4 w-4 text-white" />
                  </div>
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Releases</h2>
            <Link href="/new-releases" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSongs.slice(0, 6).reverse().map(song => (
              <div 
                key={`new-${song.id}`} 
                className="group"
                onMouseEnter={() => setHoveredTrack(song.id + 100)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div className="relative aspect-square mb-3 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all">
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