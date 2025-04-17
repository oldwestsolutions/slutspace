'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  HomeIcon, 
  UserCircleIcon, 
  BellIcon, 
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  CakeIcon,
  TrophyIcon,
  ComputerDesktopIcon,
  SwatchIcon,
  MapIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  // Sample data for live streams
  const liveStreams = [
    { id: 1, username: 'user1', viewers: 1234, title: 'Playing Fortnite' },
    { id: 2, username: 'user2', viewers: 567, title: 'Music Session' },
    { id: 3, username: 'user3', viewers: 890, title: 'Cooking Show' },
  ]

  // Sample data for posts
  const posts = [
    {
      id: 1,
      username: 'user1',
      content: 'Just finished my new painting! What do you think?',
      likes: 123,
      comments: 45,
      timeAgo: '2h ago',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 2,
      username: 'user2',
      content: 'Beautiful sunset at the beach today 🌅',
      likes: 456,
      comments: 78,
      timeAgo: '4h ago',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-purple-500">
                Invitation
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
              >
                <UserIcon className="h-8 w-8 text-purple-500" />
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Live Streams */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4">Stories</h2>
              <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { id: 'user1', username: 'user1', viewers: 1234, isLive: true, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' },
                  { id: 'user2', username: 'user2', viewers: 567, isLive: true, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' },
                  { id: 'user3', username: 'user3', viewers: 890, isLive: true, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' },
                  { id: 'user4', username: 'user4', isLive: false, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' },
                  { id: 'user5', username: 'user5', isLive: false, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' },
                  { id: 'user6', username: 'user6', isLive: false, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' }
                ].map((user) => (
                  <Link
                    key={user.id}
                    href={user.isLive ? `/live/${user.id}` : `/profile/${user.id}`}
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div className="relative">
                      {/* Halo effect for live users */}
                      {user.isLive && (
                        <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
                      )}
                      {/* Story bubble */}
                      <div className={`relative w-20 h-20 rounded-full ${user.isLive ? 'bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5' : 'bg-gradient-to-tr from-gray-600 to-gray-400 p-0.5'} group-hover:scale-105 transition-transform duration-200`}>
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={user.image}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      {/* Live indicator */}
                      {user.isLive && (
                        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1.5 shadow-lg shadow-red-500/50">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium truncate max-w-[80px] group-hover:text-purple-400 transition-colors">@{user.username}</p>
                      {user.isLive && (
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <p className="text-xs text-gray-400">{user.viewers} viewers</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
                {/* Add Story Button */}
                <button className="flex flex-col items-center space-y-2 group">
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-gray-600 to-gray-400 p-0.5 group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <PlusIcon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-400 group-hover:text-purple-400 transition-colors">Add Story</p>
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500" />
                        <div>
                          <p className="font-semibold">@{post.username}</p>
                          <p className="text-sm text-gray-400">{post.timeAgo}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-300">
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between text-gray-400">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 hover:text-purple-400">
                          <HeartIcon className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-purple-400">
                          <ChatBubbleLeftIcon className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button className="hover:text-purple-400">
                        <ShareIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Suggested Users */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4">Suggested for You</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500" />
                      <div>
                        <p className="font-semibold">@user{i}</p>
                        <p className="text-sm text-gray-400">New to Invitation</p>
                      </div>
                    </div>
                    <button className="text-purple-500 hover:text-purple-400 text-sm font-semibold">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Gaming', icon: VideoCameraIcon },
                  { name: 'Music', icon: MusicalNoteIcon },
                  { name: 'Art', icon: PaintBrushIcon },
                  { name: 'Food', icon: CakeIcon },
                  { name: 'Sports', icon: TrophyIcon },
                  { name: 'Tech', icon: ComputerDesktopIcon },
                  { name: 'Fashion', icon: SwatchIcon },
                  { name: 'Travel', icon: MapIcon }
                ].map((category) => (
                  <button
                    key={category.name}
                    className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <category.icon className="h-6 w-6 text-purple-500 mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Favorites</h2>
                <Link 
                  href="/favorites" 
                  className="text-purple-500 hover:text-purple-400 text-sm font-semibold transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { username: 'gamer123', status: 'Live - Fortnite', viewers: '2.3K', isLive: true },
                  { username: 'chef_master', status: 'Live - Cooking Show', viewers: '1.5K', isLive: true },
                  { username: 'music_lover', status: 'Live - Piano Session', viewers: '856', isLive: true },
                  { username: 'art_creator', status: 'Live - Digital Art', viewers: '1.2K', isLive: true },
                  { username: 'fitness_guru', status: 'Live - Workout', viewers: '3.1K', isLive: true },
                  { username: 'tech_reviewer', status: 'Live - Gadget Review', viewers: '1.8K', isLive: true },
                  { username: 'fashion_icon', status: 'Live - Fashion Show', viewers: '2.7K', isLive: true },
                  { username: 'travel_expert', status: 'Live - Travel Tips', viewers: '945', isLive: true },
                  { username: 'food_critic', status: 'Live - Food Review', viewers: '1.4K', isLive: true },
                  { username: 'comedy_king', status: 'Live - Standup', viewers: '4.2K', isLive: true }
                ].map((favorite) => (
                  <Link
                    key={favorite.username}
                    href={favorite.isLive ? `/live/${favorite.username}` : `/profile/${favorite.username}`}
                    className="flex items-center justify-between group hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full ${favorite.isLive ? 'bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5' : 'bg-gradient-to-tr from-gray-600 to-gray-400 p-0.5'} group-hover:scale-105 transition-transform duration-200`}>
                          <div className="w-full h-full rounded-full bg-gray-800" />
                        </div>
                        {favorite.isLive && (
                          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-lg shadow-red-500/50">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-purple-400 transition-colors">@{favorite.username}</p>
                        <p className="text-xs text-gray-400">{favorite.status}</p>
                      </div>
                    </div>
                    {favorite.isLive && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-400">{favorite.viewers}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 