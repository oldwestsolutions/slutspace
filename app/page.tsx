'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChatBubbleLeftIcon, WalletIcon, VideoCameraIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, UserCircleIcon, BookmarkIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Home() {
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Sample data
  const posts = [
    { 
      id: 'post1',
      username: 'gamer123',
      name: 'Gamer Pro',
      likes: 120,
      comments: 15,
      time: '2h ago'
    },
    { 
      id: 'post2',
      username: 'artist456',
      name: 'Creative Artist',
      likes: 80,
      comments: 5,
      time: '4h ago'
    },
    { 
      id: 'post3',
      username: 'musician789',
      name: 'Music Master',
      likes: 50,
      comments: 3,
      time: '6h ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-purple-500">Invitation</h1>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                    }
                  }}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-full py-2 pl-10 pr-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/messages" className="text-gray-400 hover:text-purple-400 transition-colors">
                <ChatBubbleLeftIcon className="h-6 w-6" />
              </Link>
              <Link href="/wallet" className="text-gray-400 hover:text-purple-400 transition-colors">
                <WalletIcon className="h-6 w-6" />
              </Link>
              <div className="relative">
                <button 
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="p-2 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 py-1">
                    <Link 
                      href="/login"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Sign In
                    </Link>
                    <Link 
                      href="/signup"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      <UserPlusIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Sign Up
                    </Link>
                    <div className="border-t border-gray-700 my-1" />
                    <Link 
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      <Cog6ToothIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Settings
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Livestreaming Bubble */}
        <div className="md:col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center space-x-2 text-red-500">
            <VideoCameraIcon className="h-5 w-5" />
            <span className="font-semibold">Live Now</span>
          </div>
          <div className="flex space-x-4 overflow-x-auto mt-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Link 
                key={item} 
                href={`/live?streamer=user${item}`}
                className="flex flex-col items-center relative group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500 p-0.5 group-hover:scale-105 transition-transform">
                  <div className="bg-gray-800 rounded-full p-0.5">
                    <div className="w-14 h-14 rounded-full bg-gray-700" />
                  </div>
                </div>
                {item % 2 === 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-800" />
                )}
                <span className="text-xs mt-1 group-hover:text-purple-400 transition-colors">Username {item}</span>
                {item % 2 === 0 && (
                  <span className="text-xs text-red-500">Live</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="md:col-span-2 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700">
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <Link href={`/profile/${post.username}`} className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-full bg-purple-500 p-0.5">
                      <div className="bg-gray-800 rounded-full p-0.5">
                        <div className="w-6 h-6 rounded-full bg-gray-700" />
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">@{post.username}</span>
                      <p className="text-xs text-gray-400">{post.name}</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="aspect-square bg-gray-700" />
              <div className="p-4">
                <div className="flex space-x-4">
                  <button className="text-2xl hover:text-red-500 transition-colors">❤️</button>
                  <button className="text-2xl hover:text-purple-500 transition-colors">💬</button>
                  <button className="text-2xl hover:text-pink-500 transition-colors">📤</button>
                </div>
                <p className="mt-2 text-gray-300">
                  <Link href={`/profile/${post.username}`} className="font-semibold text-gray-200 hover:text-purple-400 transition-colors">@{post.username}</Link> This is a sample post caption
                </p>
                <p className="text-gray-400 text-sm mt-1">{post.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="hidden md:block space-y-4">
          {/* Suggestions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-400">Suggestions For You</span>
              <button className="text-sm font-semibold text-purple-500 hover:text-purple-400 transition-colors">See All</button>
            </div>
            {[1, 2, 3, 4, 5].map((suggestion) => (
              <div key={suggestion} className="flex items-center justify-between py-2">
                <Link href={`/profile/user${suggestion}`} className="flex items-center space-x-2 group">
                  <div className="w-8 h-8 rounded-full bg-purple-500 p-0.5">
                    <div className="bg-gray-800 rounded-full p-0.5">
                      <div className="w-6 h-6 rounded-full bg-gray-700" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-200 group-hover:text-purple-400 transition-colors">username</p>
                    <p className="text-gray-400 text-xs">Followed by user1 + 2 more</p>
                  </div>
                </Link>
                <button className="text-xs font-semibold text-purple-500 hover:text-purple-400 transition-colors">Follow</button>
              </div>
            ))}
          </div>

          {/* Favorites */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 p-4 sticky top-[500px]">
            <div className="flex items-center space-x-2 mb-4">
              <HeartIcon className="h-5 w-5 text-red-500" />
              <span className="font-semibold text-gray-400">Favorites</span>
            </div>
            {[1, 2, 3].map((favorite) => (
              <Link 
                key={favorite} 
                href={`/profile/user${favorite}`}
                className="flex items-center space-x-2 py-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500 p-0.5">
                  <div className="bg-gray-800 rounded-full p-0.5">
                    <div className="w-6 h-6 rounded-full bg-gray-700" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-200 group-hover:text-purple-400 transition-colors">username</p>
                  <p className="text-gray-400 text-xs">Last active 2h ago</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 