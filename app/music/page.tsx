'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MusicalNoteIcon, PlayIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const musicVideos = [
    {
      id: 1,
      title: 'Taylor Swift - Cruel Summer (Official Video)',
      artist: 'Taylor Swift',
      views: '145M views',
      posted: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '3:42',
      category: 'pop',
      album: 'Lover'
    },
    {
      id: 2,
      title: 'The Weeknd - Blinding Lights (Official Video)',
      artist: 'The Weeknd',
      views: '543M views',
      posted: '3 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '4:22',
      category: 'pop',
      album: 'After Hours'
    },
    {
      id: 3,
      title: 'Drake - Hotline Bling (Official Video)',
      artist: 'Drake',
      views: '1.8B views',
      posted: '8 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '4:55',
      category: 'hiphop',
      album: 'Views'
    },
    {
      id: 4,
      title: 'Metallica - Nothing Else Matters (Official Video)',
      artist: 'Metallica',
      views: '1.2B views',
      posted: '11 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '6:24',
      category: 'rock',
      album: 'Metallica'
    },
    {
      id: 5,
      title: 'Katy Perry - Roar (Official Video)',
      artist: 'Katy Perry',
      views: '3.7B views',
      posted: '10 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '4:30',
      category: 'pop',
      album: 'Prism'
    },
    {
      id: 6,
      title: 'Mozart - Symphony No.40 in G Minor (Full)',
      artist: 'Vienna Philharmonic',
      views: '45M views',
      posted: '5 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '28:15',
      category: 'classical',
      album: 'Mozart: Essential Works'
    },
    {
      id: 7,
      title: 'Kendrick Lamar - HUMBLE. (Official Video)',
      artist: 'Kendrick Lamar',
      views: '865M views',
      posted: '6 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '2:57',
      category: 'hiphop',
      album: 'DAMN.'
    },
    {
      id: 8,
      title: 'Dua Lipa - Levitating ft. DaBaby (Official Video)',
      artist: 'Dua Lipa',
      views: '675M views',
      posted: '3 years ago',
      thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      artistImage: 'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '3:23',
      category: 'pop',
      album: 'Future Nostalgia'
    }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? musicVideos 
    : musicVideos.filter(video => video.category === activeCategory);

  return (
    <AppLayout>
      <div>
        <div className="flex items-center mb-6">
          <MusicalNoteIcon className="h-6 w-6 text-red-500 mr-2" />
          <h1 className="text-2xl font-bold text-white">Music</h1>
        </div>
        
        {/* Category Filter */}
        <div className="overflow-x-auto whitespace-nowrap mb-8 pb-2 scrollbar-hide">
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('pop')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'pop' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Pop
            </button>
            <button
              onClick={() => setActiveCategory('rock')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'rock' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Rock
            </button>
            <button
              onClick={() => setActiveCategory('hiphop')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'hiphop' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Hip Hop
            </button>
            <button
              onClick={() => setActiveCategory('classical')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'classical' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Classical
            </button>
          </div>
        </div>
        
        {/* Featured Playlist */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Featured Playlist</h2>
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 md:mr-6">
                <img 
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Weekly Hits" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-white mb-2">This Week's Top Hits</h3>
                <p className="text-gray-300 mb-4">The hottest tracks of the week. Updated every Friday.</p>
                <div className="flex items-center">
                  <button className="flex items-center bg-white text-black rounded-full px-6 py-2 font-medium hover:bg-gray-200 transition-colors mr-4">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Play All
                  </button>
                  <p className="text-gray-300 text-sm">50 tracks • 3 hours 15 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Music Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
              <div className="relative group">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button className="bg-red-600 rounded-full p-3 transform transition-transform group-hover:scale-110">
                    <PlayIcon className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-medium line-clamp-2 text-sm mb-1">{video.title}</h3>
                <div className="flex items-center mb-1">
                  <img 
                    src={video.artistImage} 
                    alt={video.artist} 
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <p className="text-gray-400 text-xs">{video.artist}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-xs">{video.views} • {video.posted}</p>
                  <span className="text-gray-400 text-xs px-2 py-1 bg-gray-700 rounded-full">{video.album}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 