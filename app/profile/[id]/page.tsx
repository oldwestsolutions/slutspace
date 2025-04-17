'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, VideoCameraIcon, PhotoIcon, UserGroupIcon, HeartIcon, ChatBubbleLeftIcon, UserPlusIcon, BookmarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)

  // Sample user data
  const user = {
    username: params.id,
    name: 'User Name',
    bio: 'This is a sample bio. User can write about themselves here.',
    followers: 1000,
    following: 500,
    posts: 25,
    isLive: false
  }

  // Sample posts data
  const posts = [
    { id: 1, likes: 120, comments: 15 },
    { id: 2, likes: 80, comments: 5 },
    { id: 3, likes: 50, comments: 3 },
    { id: 4, likes: 200, comments: 25 },
    { id: 5, likes: 90, comments: 8 },
    { id: 6, likes: 60, comments: 4 }
  ]

  // Sample live streams data
  const liveStreams = [
    { id: 1, viewers: 100, title: 'Playing Game' },
    { id: 2, viewers: 50, title: 'Chatting' },
    { id: 3, viewers: 200, title: 'Music Stream' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href="/" className="mr-4 text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-200">@{user.username}</h1>
              <p className="text-xs text-gray-400">{user.posts} posts</p>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 rounded-full bg-purple-500 p-1">
            <div className="bg-gray-800 rounded-full p-1">
              <div className="w-20 h-20 rounded-full bg-gray-700" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-200">{user.name}</h2>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  isFollowing
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <p className="mt-2 text-gray-300">{user.bio}</p>
            <div className="flex space-x-4 mt-4">
              <div>
                <span className="font-semibold text-gray-200">{user.followers}</span>
                <span className="text-gray-400 ml-1">followers</span>
              </div>
              <div>
                <span className="font-semibold text-gray-200">{user.following}</span>
                <span className="text-gray-400 ml-1">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 text-center font-semibold ${
              activeTab === 'posts'
                ? 'text-purple-500 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-4 text-center font-semibold ${
              activeTab === 'live'
                ? 'text-purple-500 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Live
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'posts' ? (
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-700" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {liveStreams.map((stream) => (
              <Link
                key={stream.id}
                href={`/live?streamer=${user.username}`}
                className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-purple-500 p-1">
                    <div className="bg-gray-800 rounded-full p-1">
                      <div className="w-14 h-14 rounded-full bg-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200">{stream.title}</h3>
                    <p className="text-sm text-gray-400">{stream.viewers} viewers</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 