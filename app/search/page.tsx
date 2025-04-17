'use client'

import { useState } from 'react'
import Link from 'next/link'
import { VideoCameraIcon, UserCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'posts' | 'live'>('users')
  const [searchQuery] = useState('example') // This would come from the URL params

  // Sample data
  const users = [
    { id: 'user1', username: 'gamer123', followers: 1200, isLive: true },
    { id: 'user2', username: 'artist456', followers: 800, isLive: false },
    { id: 'user3', username: 'musician789', followers: 500, isLive: true },
  ]

  const posts = [
    { id: 'post1', username: 'gamer123', likes: 120, comments: 15 },
    { id: 'post2', username: 'artist456', likes: 80, comments: 5 },
    { id: 'post3', username: 'musician789', likes: 50, comments: 3 },
  ]

  const liveStreams = [
    { id: 'stream1', username: 'gamer123', viewers: 1200, title: 'Gaming Session' },
    { id: 'stream2', username: 'musician789', viewers: 500, title: 'Music Live' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-semibold text-purple-500">Search Results for "{searchQuery}"</h1>
          </div>
          <div className="flex space-x-1 mb-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'users' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'posts' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'live' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              Live
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Link 
                key={user.id}
                href={`/profile/${user.id}`}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-700/50 transition-colors"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-purple-500 p-0.5">
                    <div className="bg-gray-800 rounded-full p-0.5">
                      <div className="w-14 h-14 rounded-full bg-gray-700" />
                    </div>
                  </div>
                  {user.isLive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-800" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">@{user.username}</h3>
                  <p className="text-sm text-gray-400">{user.followers.toLocaleString()} followers</p>
                  {user.isLive && (
                    <span className="text-xs text-red-500">Live Now</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden"
              >
                <div className="aspect-square bg-gray-700 relative">
                  <PhotoIcon className="h-12 w-12 text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <span className="font-semibold text-gray-200">@{post.username}</span>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <span className="text-sm text-gray-400">{post.likes} likes</span>
                    <span className="text-sm text-gray-400">{post.comments} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Live Tab */}
        {activeTab === 'live' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveStreams.map((stream) => (
              <Link
                key={stream.id}
                href={`/live?streamer=${stream.id}`}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden group"
              >
                <div className="aspect-video bg-gray-700 relative">
                  <VideoCameraIcon className="h-12 w-12 text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-semibold">LIVE</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-full">
                    <span className="text-xs">{stream.viewers.toLocaleString()} viewers</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <span className="font-semibold text-gray-200">@{stream.username}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">{stream.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
} 