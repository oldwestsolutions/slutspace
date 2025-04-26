'use client'

import { useState } from 'react'
import Link from 'next/link'
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
      channelIcon: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '12:34'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Tailwind CSS',
      channel: 'WebDevSimplified',
      views: '254K views',
      posted: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '18:21'
    },
    {
      id: 3,
      title: 'React vs. Vue vs. Angular: Which One Should You Choose?',
      channel: 'TechTalks',
      views: '543K views',
      posted: '3 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '24:15'
    },
    {
      id: 4,
      title: 'Mastering JavaScript Promises and Async/Await',
      channel: 'JSMaster',
      views: '324K views',
      posted: '5 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '15:48'
    },
    {
      id: 5,
      title: 'Building a Responsive Website from Scratch',
      channel: 'FrontendMaster',
      views: '187K views',
      posted: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '22:10'
    },
    {
      id: 6,
      title: 'TypeScript Full Course for Beginners',
      channel: 'TypeMaster',
      views: '432K views',
      posted: '2 months ago',
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '1:02:34'
    },
    {
      id: 7,
      title: 'NodeJS API Development Tutorial',
      channel: 'BackendDev',
      views: '198K views',
      posted: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '32:45'
    },
    {
      id: 8,
      title: 'Docker and Kubernetes for Beginners',
      channel: 'DevOpsMaster',
      views: '345K views',
      posted: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '45:21'
    },
    {
      id: 9,
      title: 'Machine Learning for Web Developers',
      channel: 'AIExplorer',
      views: '276K views',
      posted: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '28:12'
    },
    {
      id: 10,
      title: 'Web3 and Blockchain Development Guide',
      channel: 'CryptoExplorer',
      views: '423K views',
      posted: '3 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '34:56'
    },
    {
      id: 11,
      title: 'GraphQL vs REST API Comparison',
      channel: 'APIExpert',
      views: '198K views',
      posted: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '16:42'
    },
    {
      id: 12,
      title: 'Cybersecurity Essentials for Developers',
      channel: 'SecureCode',
      views: '324K views',
      posted: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '42:18'
    },
    {
      id: 13,
      title: 'Creating Custom React Hooks Step by Step',
      channel: 'ReactMaster',
      views: '245K views',
      posted: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '19:27'
    },
    {
      id: 14,
      title: 'Responsive UI Design with CSS Grid and Flexbox',
      channel: 'CSSWizard',
      views: '167K views',
      posted: '4 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '14:53'
    },
    {
      id: 15,
      title: 'Full Stack Development with MongoDB, Express, React, Node.js',
      channel: 'MERNMaster',
      views: '543K views',
      posted: '2 months ago',
      thumbnail: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '52:14'
    },
    {
      id: 16,
      title: 'Advanced Git Techniques for Developers',
      channel: 'GitPro',
      views: '321K views',
      posted: '3 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      channelIcon: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      duration: '26:38'
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
            <Link href={`/video/${video.id}`} key={video.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-750">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
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
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 