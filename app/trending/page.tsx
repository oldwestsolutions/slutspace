'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FireIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function TrendingPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const trendingVideos = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Healthcare in 2023',
      channel: 'TechInsights',
      views: '1.5M views',
      posted: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '15:42',
      category: 'tech',
      trending: 1
    },
    {
      id: 2,
      title: 'The Last of Us Part 2 - Complete Gameplay Walkthrough',
      channel: 'GameMaster',
      views: '2.3M views',
      posted: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '3:24:18',
      category: 'gaming',
      trending: 2
    },
    {
      id: 3,
      title: 'Summer Festival 2023 - Live Performance Highlights',
      channel: 'MusicWorld',
      views: '3.7M views',
      posted: '5 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '28:45',
      category: 'music',
      trending: 3
    },
    {
      id: 4,
      title: 'Gordon Ramsay\'s Secret Fried Chicken Recipe',
      channel: 'CookingMaster',
      views: '4.2M views',
      posted: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '18:23',
      category: 'food',
      trending: 4
    },
    {
      id: 5,
      title: 'Morning Yoga Routine for Beginners',
      channel: 'FitnessHub',
      views: '1.8M views',
      posted: '4 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1599447292180-45a5f468ff95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '32:14',
      category: 'fitness',
      trending: 5
    },
    {
      id: 6,
      title: 'Hidden Gems in Paris - Travel Guide 2023',
      channel: 'TravelExplorer',
      views: '987K views',
      posted: '6 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '22:57',
      category: 'travel',
      trending: 6
    },
    {
      id: 7,
      title: 'Digital Art Masterclass - Creating Realistic Portraits',
      channel: 'ArtStudio',
      views: '756K views',
      posted: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1596457597458-f31a712a0d14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '45:12',
      category: 'art',
      trending: 7
    },
    {
      id: 8,
      title: 'The Universe Explained in 20 Minutes',
      channel: 'ScienceGeek',
      views: '2.1M views',
      posted: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '20:05',
      category: 'science',
      trending: 8
    }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? trendingVideos 
    : trendingVideos.filter(video => video.category === activeCategory);

  return (
    <AppLayout>
      <div>
        <div className="flex items-center mb-6">
          <FireIcon className="h-6 w-6 text-red-500 mr-2" />
          <h1 className="text-2xl font-bold text-white">Trending</h1>
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
              onClick={() => setActiveCategory('music')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'music' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Music
            </button>
            <button
              onClick={() => setActiveCategory('gaming')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'gaming' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Gaming
            </button>
            <button
              onClick={() => setActiveCategory('tech')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'tech' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Tech
            </button>
            <button
              onClick={() => setActiveCategory('food')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'food' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Food
            </button>
            <button
              onClick={() => setActiveCategory('fitness')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'fitness' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Fitness
            </button>
          </div>
        </div>
        
        {/* Trending Videos */}
        <div className="space-y-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
              <Link href={`/video/${video.id}`} className="relative md:w-96">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-56 md:h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                  <FireIcon className="h-3 w-3 mr-1" />
                  <span>#{video.trending}</span>
                </div>
              </Link>
              <div className="p-4 flex-1">
                <Link href={`/video/${video.id}`}>
                  <h3 className="text-white font-medium text-lg mb-2 hover:text-blue-400 transition-colors">{video.title}</h3>
                </Link>
                <div className="flex items-center mb-4">
                  <Link href={`/profile/${video.channel}`} className="mr-2">
                    <img 
                      src={video.channelIcon} 
                      alt={video.channel} 
                      className="w-8 h-8 rounded-full hover:ring-2 hover:ring-blue-500 transition-all"
                    />
                  </Link>
                  <div>
                    <Link href={`/profile/${video.channel}`} className="hover:text-blue-400 transition-colors">
                      <p className="text-gray-300 text-sm">{video.channel}</p>
                    </Link>
                    <p className="text-gray-400 text-xs">{video.views} • {video.posted}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm px-4 py-1 transition-colors">
                    Watch Later
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm px-4 py-1 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 