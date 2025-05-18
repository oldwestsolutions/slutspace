'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckBadgeIcon, ShareIcon } from '@heroicons/react/24/outline'
import AppLayout from '../../components/AppLayout'

// Custom Devil Icon component
const DevilIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="h-5 w-5"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
);

export default function ChannelPage({ params }: { params: { id: string } }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');
  
  // Mock channel data (in a real app, this would come from an API)
  const channel = {
    id: params.id,
    name: 'CodeMaster',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subscribers: '1.2M subscribers',
    videos: 245,
    description: 'Professional tutorials on web development, programming, and coding interviews.',
    isVerified: true,
    category: 'tech'
  };

  // Mock videos data
  const videos = [
    {
      id: 1,
      title: 'Getting Started with React',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '120K views',
      date: '2 days ago',
      duration: '15:30'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '85K views',
      date: '1 week ago',
      duration: '22:15'
    },
    {
      id: 3,
      title: 'Building REST APIs with Node.js',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '65K views',
      date: '2 weeks ago',
      duration: '18:45'
    },
    {
      id: 4,
      title: 'CSS Grid Masterclass',
      thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '45K views',
      date: '3 weeks ago',
      duration: '25:30'
    },
    {
      id: 5,
      title: 'TypeScript for Beginners',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '95K views',
      date: '1 month ago',
      duration: '20:15'
    },
    {
      id: 6,
      title: 'Next.js 14 Deep Dive',
      thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '78K views',
      date: '1 month ago',
      duration: '28:45'
    },
    {
      id: 7,
      title: 'State Management with Redux',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '62K views',
      date: '2 months ago',
      duration: '32:20'
    },
    {
      id: 8,
      title: 'GraphQL Fundamentals',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '55K views',
      date: '2 months ago',
      duration: '24:10'
    },
    {
      id: 9,
      title: 'Docker for Developers',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '48K views',
      date: '3 months ago',
      duration: '35:45'
    },
    {
      id: 10,
      title: 'AWS Cloud Architecture',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '42K views',
      date: '3 months ago',
      duration: '40:15'
    },
    {
      id: 11,
      title: 'CI/CD Pipeline Setup',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '38K views',
      date: '4 months ago',
      duration: '27:30'
    },
    {
      id: 12,
      title: 'Microservices Architecture',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      views: '35K views',
      date: '4 months ago',
      duration: '45:20'
    }
  ];

  // Mock photos data
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 1234,
      date: '2 days ago'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 856,
      date: '1 week ago'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 654,
      date: '2 weeks ago'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 432,
      date: '3 weeks ago'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 321,
      date: '1 month ago'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 210,
      date: '1 month ago'
    }
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900">
        {/* Channel Banner */}
        <div className="relative h-48 md:h-64">
          <img 
            src={channel.banner} 
            alt={channel.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        {/* Channel Info */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 pb-6">
            <img 
              src={channel.avatar} 
              alt={channel.name} 
              className="w-24 h-24 rounded-full border-4 border-gray-900"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-white">{channel.name}</h1>
                {channel.isVerified && (
                  <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                <span>{channel.subscribers}</span>
                <span>{channel.videos} videos</span>
              </div>
              <p className="text-gray-300 text-sm max-w-2xl">{channel.description}</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`${
                  isSubscribed ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
                } text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors`}
              >
                <DevilIcon />
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors">
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex gap-8">
              <button 
                onClick={() => setActiveTab('videos')}
                className={`${
                  activeTab === 'videos' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                } pb-4 px-2 transition-colors`}
              >
                VIDEOS
              </button>
              <button 
                onClick={() => setActiveTab('photos')}
                className={`${
                  activeTab === 'photos' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-400 hover:text-white'
                } pb-4 px-2 transition-colors`}
              >
                PHOTOS
              </button>
            </div>
          </div>

          {/* Content Section */}
          {activeTab === 'videos' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
              {videos.map((video) => (
                <Link 
                  href={`/video/${video.id}`}
                  key={video.id}
                  className="group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </h3>
                  <div className="text-gray-400 text-xs mt-1">
                    {video.views} • {video.date}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-8">
              {photos.map((photo) => (
                <div 
                  key={photo.id}
                  className="group relative aspect-square rounded-lg overflow-hidden"
                >
                  <img 
                    src={photo.url} 
                    alt="Channel photo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-sm">
                      <div className="flex items-center gap-2">
                        <span>❤️ {photo.likes}</span>
                        <span>•</span>
                        <span>{photo.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
} 