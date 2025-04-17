'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  PhotoIcon,
  VideoCameraIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  CameraIcon
} from '@heroicons/react/24/outline'

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [user, setUser] = useState({
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Digital creator | Photography enthusiast | Travel lover',
    followers: '12.5K',
    following: '856',
    posts: '234',
    isVerified: true
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile changes
    setIsEditing(false)
  }

  // Sample posts
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      likes: 1234,
      comments: 56
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      likes: 856,
      comments: 23
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      likes: 2345,
      comments: 89
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold">@{user.username}</h1>
              {user.isVerified && (
                <span className="ml-2 text-purple-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isEditing ? (
                  <span className="text-purple-500 font-semibold" onClick={handleSaveProfile}>
                    Save
                  </span>
                ) : (
                  <PencilIcon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={() => router.push('/settings')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-full h-full text-gray-600" />
                )}
              </div>
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <CameraIcon className="h-8 w-8 text-white" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Name"
                />
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Bio"
                  rows={3}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      isFollowing
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
                <p className="mt-4 text-gray-400">{user.bio}</p>
              </>
            )}
            
            <div className="flex justify-center md:justify-start space-x-8 mt-6">
              <div className="text-center">
                <p className="font-semibold">{user.posts}</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{user.followers}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{user.following}</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-12 border-b border-gray-700">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium ${
                activeTab === 'posts'
                  ? 'border-purple-500 text-purple-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <PhotoIcon className="h-6 w-6 mx-auto" />
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`py-4 px-1 border-b-2 font-medium ${
                activeTab === 'live'
                  ? 'border-purple-500 text-purple-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <VideoCameraIcon className="h-6 w-6 mx-auto" />
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 px-1 border-b-2 font-medium ${
                activeTab === 'saved'
                  ? 'border-purple-500 text-purple-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <BookmarkIcon className="h-6 w-6 mx-auto" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <img
                src={post.image}
                alt="Post"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <HeartIcon className="h-6 w-6 text-white" />
                  <span className="text-white">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
                  <span className="text-white">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 