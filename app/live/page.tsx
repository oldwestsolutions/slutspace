'use client'

import Link from 'next/link'
import { VideoCameraIcon } from '@heroicons/react/24/outline'
import AppLayout from '../components/AppLayout'

export default function LivePage() {
  // Stories data for the top row
  const stories = [
    {
      id: 1,
      name: 'GamingPro',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 2,
      name: 'CodeMaster',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 3,
      name: 'MusicWorld',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 4,
      name: 'CookingM',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 5,
      name: 'FitnessHub',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 6,
      name: 'TravelExp',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 7,
      name: 'ArtStudio',
      image: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 8,
      name: 'ScienceG',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    }
  ];
  
  const liveStreams = [
    {
      id: 1,
      title: 'Live Coding: Building a React App from Scratch',
      streamer: 'CodeMaster',
      viewers: 1234,
      startedAt: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'tech',
      tags: ['coding', 'tutorial', 'indie'],
      location: 'San Francisco'
    },
    {
      id: 2,
      title: 'PUBG Mobile Tournament Finals - Road to Champion',
      streamer: 'GamingPro',
      viewers: 8765,
      startedAt: '30 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'gaming',
      tags: ['esports', 'tournament', 'trending'],
      location: 'Los Angeles'
    },
    {
      id: 3,
      title: 'Live Piano Session - Taking Requests!',
      streamer: 'MusicWorld',
      viewers: 567,
      startedAt: '1 hour ago',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'music',
      tags: ['piano', 'classical', 'indie'],
      location: 'New York'
    },
    {
      id: 4,
      title: 'Making Homemade Pasta - Italian Cooking Show',
      streamer: 'CookingMaster',
      viewers: 890,
      startedAt: '45 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1596075780750-81249df16d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'food',
      tags: ['cooking', 'italian', 'trending'],
      location: 'Chicago'
    },
    {
      id: 5,
      title: 'Full Body HIIT Workout - Join Me!',
      streamer: 'FitnessHub',
      viewers: 345,
      startedAt: '15 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'fitness',
      tags: ['workout', 'hiit', 'trending'],
      location: 'Miami'
    },
    {
      id: 6,
      title: 'Exploring Tokyo at Night - Japan Travel Vlog',
      streamer: 'TravelExplorer',
      viewers: 678,
      startedAt: '3 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'travel',
      tags: ['travel', 'japan', 'indie'],
      location: 'Tokyo'
    },
    {
      id: 7,
      title: 'Digital Art Session - Drawing Fantasy Characters',
      streamer: 'ArtStudio',
      viewers: 234,
      startedAt: '50 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'art',
      tags: ['drawing', 'digital', 'indie'],
      location: 'Seattle'
    },
    {
      id: 8,
      title: 'Building a DIY Telescope - Science Show Live',
      streamer: 'ScienceGeek',
      viewers: 456,
      startedAt: '25 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1564460576398-ef55d99548b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'science',
      tags: ['diy', 'astronomy', 'trending'],
      location: 'Boston'
    }
  ];

  // Generate more streams for each category
  const categoryStreams = {
    recommended: [...liveStreams].sort(() => 0.5 - Math.random()),
    popular: [...liveStreams].sort((a, b) => b.viewers - a.viewers),
    new: [...liveStreams].sort(() => 0.5 - Math.random()),
    lastWatch: [...liveStreams].slice(0, 4).sort(() => 0.5 - Math.random()),
    indie: liveStreams.filter(stream => stream.tags.includes('indie')),
    recentlyWatched: [...liveStreams].slice(0, 5).sort(() => 0.5 - Math.random()),
    favoriteTag: liveStreams.filter(stream => stream.tags.includes('trending')),
    trending: liveStreams.filter(stream => stream.tags.includes('trending')),
    nearYou: [...liveStreams].sort(() => 0.5 - Math.random()),
    topRated: [...liveStreams].sort(() => 0.5 - Math.random())
  };

  const categories = [
    { id: 'recommended', name: 'Recommended For You' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'new', name: 'New' },
    { id: 'lastWatch', name: 'Based on Your Last Watch' },
    { id: 'indie', name: 'Indie' },
    { id: 'recentlyWatched', name: 'Recently Watched' },
    { id: 'favoriteTag', name: 'Favorite Tag' },
    { id: 'trending', name: 'Trending' },
    { id: 'nearYou', name: 'Near You' },
    { id: 'topRated', name: 'Top Rated' }
  ];

  // Video card component for reuse
  const VideoCard = ({ stream }: { stream: typeof liveStreams[0] }) => (
    <Link href={`/video/${stream.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow hover:bg-gray-750">
        <div className="relative">
          <img 
            src={stream.thumbnail} 
            alt={stream.title} 
            className="w-full aspect-video object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded flex items-center">
            <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
            <span>{stream.viewers.toLocaleString()}</span>
          </div>
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-0.5 animate-pulse"></span>
            <span>LIVE</span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-start space-x-2">
            <img 
              src={stream.streamerImage} 
              alt={stream.streamer} 
              className="w-8 h-8 rounded-full mt-1 border border-gray-700"
            />
            <div>
              <h3 className="text-white font-medium line-clamp-1 text-sm">{stream.title}</h3>
              <p className="text-gray-400 text-xs">{stream.streamer}</p>
              <p className="text-gray-500 text-xs">{stream.category} • {stream.startedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <AppLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">Live</h1>
          <Link href="/go-live" className="bg-red-500 text-white text-sm px-4 py-2 rounded-full flex items-center">
            <VideoCameraIcon className="h-4 w-4 mr-1" />
            Go Live
          </Link>
        </div>
        
        {/* Stories Section */}
        <div className="mb-6 overflow-hidden">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center flex-shrink-0">
                <div className="relative cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full border-[2px] border-gray-900 overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {story.isLive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-0.5 animate-pulse"></span>
                      <span>LIVE</span>
                    </div>
                  )}
                </div>
                <span className="text-gray-300 text-xs mt-1 truncate w-16 text-center">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All category sections displayed as rows */}
        {categories.map(category => (
          <div key={category.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{category.name}</h2>
              <Link href={`/live/categories/${category.id}`} className="text-sm text-blue-400">See all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
              {categoryStreams[category.id as keyof typeof categoryStreams].slice(0, 4).map(stream => (
                <VideoCard key={`${category.id}-${stream.id}`} stream={stream} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
} 