'use client'

import { useState } from 'react'
import AppLayout from './components/AppLayout'

export default function Home() {
  // Sample video data
  const videos = [
    {
      id: 1,
      title: 'How to Build a NextJS Application in 10 Minutes',
      channel: 'CodeMaster',
      views: '120K views',
      posted: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Tailwind CSS',
      channel: 'WebDevSimplified',
      views: '254K views',
      posted: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      title: 'React vs. Vue vs. Angular: Which One Should You Choose?',
      channel: 'TechTalks',
      views: '543K views',
      posted: '3 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 4,
      title: 'Mastering JavaScript Promises and Async/Await',
      channel: 'JSMaster',
      views: '324K views',
      posted: '5 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 5,
      title: 'Building a Responsive Website from Scratch',
      channel: 'FrontendMaster',
      views: '187K views',
      posted: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 6,
      title: 'TypeScript Full Course for Beginners',
      channel: 'TypeMaster',
      views: '432K views',
      posted: '2 months ago',
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 7,
      title: 'NodeJS API Development Tutorial',
      channel: 'BackendDev',
      views: '198K views',
      posted: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 8,
      title: 'Docker and Kubernetes for Beginners',
      channel: 'DevOpsMaster',
      views: '345K views',
      posted: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];

  return (
    <AppLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">Recommended</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  12:34
                </div>
              </div>
              <div className="p-3 flex">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={video.channelIcon} 
                    alt={video.channel} 
                    className="w-9 h-9 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium line-clamp-2 text-sm">{video.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{video.channel}</p>
                  <p className="text-gray-400 text-xs">{video.views} • {video.posted}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 