'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const channels = [
    {
      id: 1,
      name: 'CodeMaster',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.2M subscribers',
      videos: 245,
      description: 'Professional tutorials on web development, programming, and coding interviews.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 2,
      name: 'FitnessHub',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '890K subscribers',
      videos: 178,
      description: 'Fitness tutorials, workout routines, and healthy lifestyle tips for everyone.',
      isVerified: false,
      category: 'fitness'
    },
    {
      id: 3,
      name: 'MusicWorld',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.5M subscribers',
      videos: 312,
      description: 'Music tutorials, song covers, and original compositions for music lovers.',
      isVerified: true,
      category: 'music'
    },
    {
      id: 4,
      name: 'CookingMaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.1M subscribers',
      videos: 189,
      description: 'Delicious recipes, cooking tips, and culinary adventures around the world.',
      isVerified: true,
      category: 'food'
    },
    {
      id: 5,
      name: 'TravelExplorer',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.7M subscribers',
      videos: 223,
      description: 'Travel guides, destination reviews, and tips for budget-friendly travel.',
      isVerified: false,
      category: 'travel'
    },
    {
      id: 6,
      name: 'GamingPro',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '4.2M subscribers',
      videos: 567,
      description: 'Game reviews, playthroughs, and gaming tips for casual and hardcore gamers.',
      isVerified: true,
      category: 'gaming'
    },
    {
      id: 7,
      name: 'ArtStudio',
      avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '950K subscribers',
      videos: 145,
      description: 'Art tutorials, creative techniques, and inspiration for artists of all levels.',
      isVerified: false,
      category: 'art'
    },
    {
      id: 8,
      name: 'ScienceGeek',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.3M subscribers',
      videos: 289,
      description: 'Science experiments, explanations, and fascinating facts about our universe.',
      isVerified: true,
      category: 'science'
    }
  ];

  const filteredChannels = activeTab === 'all' 
    ? channels 
    : channels.filter(channel => channel.category === activeTab);

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Featured Channels</h1>
        
        {/* Category Filter */}
        <div className="overflow-x-auto whitespace-nowrap mb-8 pb-2 scrollbar-hide">
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'tech' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Technology
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'music' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Music
            </button>
            <button
              onClick={() => setActiveTab('gaming')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'gaming' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Gaming
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'food' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Food
            </button>
            <button
              onClick={() => setActiveTab('fitness')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'fitness' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Fitness
            </button>
            <button
              onClick={() => setActiveTab('travel')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'travel' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Travel
            </button>
            <button
              onClick={() => setActiveTab('art')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'art' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Art
            </button>
            <button
              onClick={() => setActiveTab('science')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'science' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Science
            </button>
          </div>
        </div>
        
        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <div key={channel.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
              <div className="p-4">
                <div className="flex items-start">
                  <img 
                    src={channel.avatar} 
                    alt={channel.name} 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-white font-medium text-lg">{channel.name}</h3>
                      {channel.isVerified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-500 ml-1" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{channel.subscribers}</p>
                    <p className="text-gray-400 text-sm">{channel.videos} videos</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-4 line-clamp-2">{channel.description}</p>
                <div className="mt-4 flex justify-between">
                  <Link 
                    href={`/channel/${channel.id}`}
                    className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                  >
                    View Channel
                  </Link>
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full text-sm px-4 py-1 transition-colors">
                    Subscribe
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