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
  CameraIcon,
  WalletIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ChevronRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { CurrencyDollarIcon as CurrencyDollarIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showWalletDetails, setShowWalletDetails] = useState(false)
  const [user, setUser] = useState({
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Digital creator | Photography enthusiast | Travel lover',
    followers: '12.5K',
    following: '856',
    posts: '234',
    isVerified: true,
    wallet: {
      balance: 2580.75,
      coins: 15000,
      nfts: 6,
      transactions: [
        { id: 1, type: 'deposit', amount: 100, date: '2023-08-15', status: 'completed' },
        { id: 2, type: 'tip', amount: -25, date: '2023-08-14', status: 'completed' },
        { id: 3, type: 'purchase', amount: -50, date: '2023-08-10', status: 'completed' }
      ]
    }
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

        {/* Wallet Section */}
        <div className="mt-8">
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('/coin-pattern.svg')] mix-blend-overlay opacity-10"></div>
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <WalletIcon className="h-6 w-6 text-white mr-2" />
                  <h3 className="text-xl font-semibold text-white">Wallet</h3>
                </div>
                <button 
                  onClick={() => setShowWalletDetails(!showWalletDetails)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <ChevronRightIcon className={`w-5 h-5 transform transition-transform ${showWalletDetails ? 'rotate-90' : ''}`} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CurrencyDollarIconSolid className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-gray-200 text-sm">Balance</span>
                    </div>
                    <span className="text-white font-bold">${user.wallet.balance.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center text-xs text-green-400">
                      <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                      <span>+5.7%</span>
                    </div>
                    <button className="text-xs text-blue-300 hover:text-blue-200 font-medium">
                      Top Up
                    </button>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs flex items-center justify-center font-bold mr-2">S</span>
                      <span className="text-gray-200 text-sm">SLUT Coins</span>
                    </div>
                    <span className="text-white font-bold">{user.wallet.coins.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center text-xs text-purple-300">
                      <span>{user.wallet.nfts} NFTs</span>
                    </div>
                    <button className="text-xs text-blue-300 hover:text-blue-200 font-medium">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2">
                <button className="flex-1 flex items-center justify-center py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white text-sm font-medium">
                  <PlusIcon className="h-4 w-4 mr-1" />
                  <span>Add Funds</span>
                </button>
                <button className="flex-1 flex items-center justify-center py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-lg text-white text-sm font-medium">
                  <ShareIcon className="h-4 w-4 mr-1" />
                  <span>Send</span>
                </button>
                <Link href="/wallet" className="flex-1 flex items-center justify-center py-2 bg-purple-500/50 hover:bg-purple-500/70 transition-colors rounded-lg text-white text-sm font-medium">
                  <WalletIcon className="h-4 w-4 mr-1" />
                  <span>Wallet</span>
                </Link>
              </div>
            </div>
            
            {/* Expandable Transaction History */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showWalletDetails ? 'max-h-64' : 'max-h-0'}`}>
              <div className="px-6 py-3 bg-gray-800/60 backdrop-blur-sm">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Transactions</h4>
                <div className="space-y-2">
                  {user.wallet.transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          transaction.amount > 0 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {transaction.amount > 0 ? (
                            <PlusIcon className="h-4 w-4" />
                          ) : (
                            <CurrencyDollarIcon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm capitalize">{transaction.type}</p>
                          <p className="text-gray-400 text-xs">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-blue-400'}`}>
                          {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <Link href="/wallet" className="text-blue-400 text-sm hover:underline">
                    View All Transactions
                  </Link>
                </div>
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