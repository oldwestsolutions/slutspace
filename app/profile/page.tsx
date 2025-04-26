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
  PlusIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  Squares2X2Icon
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
  const [viewMode, setViewMode] = useState<'grid' | 'albums'>('grid')
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
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

  // Sample albums
  const albums = [
    { id: 'photos', name: 'Photos', count: 148, cover: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538' },
    { id: 'selfies', name: 'Selfies', count: 52, cover: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61' },
    { id: 'travel', name: 'Travel', count: 87, cover: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b' },
    { id: 'favorites', name: 'Favorites', count: 35, cover: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f' }
  ]

  // Sample posts
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      likes: 1234,
      comments: 56,
      date: '2023-10-15'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
      likes: 856,
      comments: 23,
      date: '2023-10-10'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
      likes: 2345,
      comments: 89,
      date: '2023-10-08'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
      likes: 543,
      comments: 32,
      date: '2023-10-05'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
      likes: 876,
      comments: 45,
      date: '2023-10-01'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1526800544336-d04f0cbfd700',
      likes: 987,
      comments: 67,
      date: '2023-09-28'
    }
  ]

  // Wallet modal state and handlers
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const renderContentByTab = () => {
    if (activeTab === 'posts') {
      if (viewMode === 'albums' && !selectedAlbum) {
        return (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Albums</h3>
              <button 
                onClick={() => setViewMode('grid')} 
                className="text-sm text-blue-400 font-medium"
              >
                See All Photos
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {albums.map((album) => (
                <div 
                  key={album.id} 
                  className="relative rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedAlbum(album.id)}
                >
                  <img 
                    src={album.cover} 
                    alt={album.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3">
                    <h4 className="text-white font-medium">{album.name}</h4>
                    <p className="text-gray-300 text-sm">{album.count} photos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (viewMode === 'albums' && selectedAlbum) {
        // Album detail view
        const album = albums.find(a => a.id === selectedAlbum);
        return (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                className="flex items-center text-blue-400"
                onClick={() => setSelectedAlbum(null)}
              >
                <ChevronRightIcon className="h-4 w-4 transform rotate-180 mr-1" />
                <span>Albums</span>
              </button>
              <div className="text-white font-medium">{album?.name}</div>
              <button 
                onClick={() => setViewMode('grid')} 
                className="text-sm text-blue-400 font-medium"
              >
                See All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-square">
                  <img 
                    src={post.image} 
                    alt={`Post ${post.id}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        // Default grid view
        return (
          <div className="mt-6">
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-square">
                  <img 
                    src={post.image} 
                    alt={`Post ${post.id}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else if (activeTab === 'live') {
      return (
        <div className="flex items-center justify-center h-60 text-gray-500">
          <p>No live videos yet</p>
        </div>
      )
    } else if (activeTab === 'saved') {
      return (
        <div className="flex items-center justify-center h-60 text-gray-500">
          <p>No saved posts yet</p>
        </div>
      )
    }
  }

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
                onClick={openWalletModal}
                className="text-gray-400 hover:text-white transition-colors relative"
              >
                <WalletIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              </button>
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

        {/* Content Tabs with View Options */}
        <div className="mt-8 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'posts'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <PhotoIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Photos</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('live')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'live'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <VideoCameraIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Live</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-3 border-b-2 font-medium ${
                  activeTab === 'saved'
                    ? 'border-purple-500 text-purple-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <BookmarkIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Saved</span>
                </div>
              </button>
            </div>
            
            {activeTab === 'posts' && (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => {
                    setViewMode('albums');
                    setSelectedAlbum(null);
                  }}
                  className={`p-1.5 rounded-md ${viewMode === 'albums' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                >
                  <RectangleStackIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Content based on tab and view mode */}
        {renderContentByTab()}
      </div>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-md relative">
            <button 
              onClick={closeWalletModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <WalletIcon className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">Your Wallet</h3>
              </div>
              
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-5 mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/coin-pattern.svg')] mix-blend-overlay opacity-10"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-200">Available Balance</div>
                    <div className="bg-white/20 px-2 py-1 rounded-full text-xs text-white">
                      <span className="text-green-300">+5.7%</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-3">${user.wallet.balance.toLocaleString()}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-200">SLUT Coins</div>
                      <div className="text-white font-semibold">{user.wallet.coins.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-200">NFTs</div>
                      <div className="text-white font-semibold">{user.wallet.nfts}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center font-medium">
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Funds
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center font-medium">
                  <ShareIcon className="h-5 w-5 mr-1" />
                  Send
                </button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300">Recent Transactions</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {user.wallet.transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between bg-gray-750 rounded-lg p-3">
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
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="/wallet" className="block text-center text-blue-400 hover:underline mt-4">
                  View All Transactions
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 