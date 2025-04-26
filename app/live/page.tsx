'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { VideoCameraIcon, HeartIcon, ChatBubbleLeftIcon, PaperAirplaneIcon, BookmarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function LivePage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  
  // Toggle like status for a stream
  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  // Toggle save status for a stream
  const toggleSave = (id: number) => {
    if (savedPosts.includes(id)) {
      setSavedPosts(savedPosts.filter(postId => postId !== id));
    } else {
      setSavedPosts([...savedPosts, id]);
    }
  };
  
  // Stories data
  const stories = [
    {
      id: 1,
      name: 'GamingPro',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 2,
      name: 'CodeMaster',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 3,
      name: 'MusicWorld',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 4,
      name: 'CookingM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 5,
      name: 'FitnessHub',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 6,
      name: 'TravelExp',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 7,
      name: 'ArtStudio',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 8,
      name: 'ScienceG',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    }
  ];
  
  // Live stream categories
  const categories = [
    {
      id: 1,
      name: 'Gaming',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '245K',
      channels: 478
    },
    {
      id: 2,
      name: 'Music',
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '135K',
      channels: 312
    },
    {
      id: 3,
      name: 'Technology',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '98K',
      channels: 215
    },
    {
      id: 4,
      name: 'Cooking',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '78K',
      channels: 187
    },
    {
      id: 5,
      name: 'Fitness',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '110K',
      channels: 243
    },
    {
      id: 6,
      name: 'Travel',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '67K',
      channels: 156
    },
    {
      id: 7,
      name: 'Art',
      image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '45K',
      channels: 134
    },
    {
      id: 8,
      name: 'Education',
      image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '58K',
      channels: 167
    },
    {
      id: 9,
      name: 'Science',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      viewers: '37K',
      channels: 94
    }
  ];
  
  const liveStreams = [
    {
      id: 1,
      title: 'Live Coding: Building a React App from Scratch',
      streamer: 'CodeMaster',
      viewers: 1234,
      startedAt: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'tech',
      likes: 253,
      comments: 124
    },
    {
      id: 2,
      title: 'PUBG Mobile Tournament Finals - Road to Champion',
      streamer: 'GamingPro',
      viewers: 8765,
      startedAt: '30 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'gaming',
      likes: 1547,
      comments: 348
    },
    {
      id: 3,
      title: 'Live Piano Session - Taking Requests!',
      streamer: 'MusicWorld',
      viewers: 567,
      startedAt: '1 hour ago',
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'music',
      likes: 742,
      comments: 98
    },
    {
      id: 4,
      title: 'Making Homemade Pasta - Italian Cooking Show',
      streamer: 'CookingMaster',
      viewers: 890,
      startedAt: '45 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'food',
      likes: 325,
      comments: 86
    },
    {
      id: 5,
      title: 'Full Body HIIT Workout - Join Me!',
      streamer: 'FitnessHub',
      viewers: 345,
      startedAt: '15 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'fitness',
      likes: 198,
      comments: 42
    },
    {
      id: 6,
      title: 'Exploring Tokyo at Night - Japan Travel Vlog',
      streamer: 'TravelExplorer',
      viewers: 678,
      startedAt: '3 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'travel',
      likes: 412,
      comments: 78
    },
    {
      id: 7,
      title: 'Digital Art Session - Drawing Fantasy Characters',
      streamer: 'ArtStudio',
      viewers: 234,
      startedAt: '50 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'art',
      likes: 156,
      comments: 29
    },
    {
      id: 8,
      title: 'Building a DIY Telescope - Science Show Live',
      streamer: 'ScienceGeek',
      viewers: 456,
      startedAt: '25 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'science',
      likes: 267,
      comments: 54
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header with Instagram-like title */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">SlutSpace Live</h1>
          </div>
          <div className="flex items-center space-x-4">
            <VideoCameraIcon className="h-6 w-6 text-red-500" />
            <Link href="/wallet" className="text-blue-400 text-sm">
              Wallet
            </Link>
          </div>
        </div>
        
        {/* Stories Section - Instagram-like */}
        <div className="mb-6 bg-gray-800 rounded-lg px-2 py-4 overflow-hidden border border-gray-700">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide pl-2">
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

        {/* Categories as horizontal scrollable items (like Instagram Explore) */}
        <div className="mb-6 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Explore Categories</h2>
            <Link href="/live/categories" className="text-blue-400 text-sm">
              View All
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-3 pb-3 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id} 
                href={`/live/category/${category.id}`}
                className="block flex-shrink-0 w-32 relative group"
              >
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-32 h-32 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-2">
                    <h3 className="text-white font-bold text-sm">{category.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                      <span className="text-white text-xs">{category.viewers}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Instagram-like Feed - Full width posts */}
        <div className="space-y-6">
          {liveStreams.map((stream) => (
            <div key={stream.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center p-3">
                <div className="w-9 h-9 rounded-full border border-pink-500 p-[2px] mr-3">
                  <img 
                    src={stream.streamerImage} 
                    alt={stream.streamer} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-white text-sm font-semibold">{stream.streamer}</p>
                    <div className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-0.5 animate-pulse"></span>
                      <span>LIVE</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs">{stream.startedAt}</p>
                </div>
                <button className="text-blue-400 text-sm font-medium mr-2">Follow</button>
                <button className="text-gray-400">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content - Make clickable */}
              <Link href={`/video/${stream.id}`}>
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title} 
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-black bg-opacity-60 rounded-full p-3">
                      <VideoCameraIcon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                    {stream.viewers.toLocaleString()} viewers
                  </div>
                </div>
              </Link>
              
              {/* Action Buttons */}
              <div className="p-3">
                <div className="flex justify-between mb-3">
                  <div className="flex space-x-4">
                    <button onClick={() => toggleLike(stream.id)} className="focus:outline-none">
                      {likedPosts.includes(stream.id) ? 
                        <HeartSolidIcon className="h-6 w-6 text-red-500" /> : 
                        <HeartIcon className="h-6 w-6 text-white hover:text-gray-300" />
                      }
                    </button>
                    <button className="focus:outline-none">
                      <ChatBubbleLeftIcon className="h-6 w-6 text-white hover:text-gray-300" />
                    </button>
                    <button className="focus:outline-none">
                      <PaperAirplaneIcon className="h-6 w-6 text-white hover:text-gray-300 rotate-45" />
                    </button>
                  </div>
                  <button onClick={() => toggleSave(stream.id)} className="focus:outline-none">
                    {savedPosts.includes(stream.id) ? 
                      <BookmarkSolidIcon className="h-6 w-6 text-white" /> : 
                      <BookmarkIcon className="h-6 w-6 text-white hover:text-gray-300" />
                    }
                  </button>
                </div>
                
                {/* Likes & Caption */}
                <div>
                  <p className="text-white text-sm font-semibold mb-1">
                    {likedPosts.includes(stream.id) ? 
                      `${stream.likes + 1} likes` : 
                      `${stream.likes} likes`
                    }
                  </p>
                  <div className="mb-1">
                    <span className="text-white text-sm font-semibold mr-1">{stream.streamer}</span>
                    <span className="text-white text-sm">{stream.title}</span>
                  </div>
                  <button className="text-gray-400 text-sm">View all {stream.comments} comments</button>
                  <div className="flex mt-2">
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      className="bg-transparent text-sm text-gray-300 focus:outline-none w-full"
                    />
                    <button className="text-blue-400 text-sm font-semibold">Post</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 