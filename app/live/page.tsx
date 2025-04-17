'use client'

import { 
  VideoCameraIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  UserGroupIcon, 
  GiftIcon,
  XMarkIcon,
  SparklesIcon,
  StarIcon,
  RocketLaunchIcon,
  FireIcon,
  HeartIcon as HeartSolidIcon,
  ShieldCheckIcon,
  CubeIcon,
  SunIcon,
  MoonIcon,
  BoltIcon,
  TrophyIcon,
  FaceSmileIcon,
  StarIcon as StarSolidIcon,
  BoltIcon as BoltSolidIcon,
  FireIcon as FireSolidIcon,
  SparklesIcon as SparklesSolidIcon,
  MoonIcon as MoonSolidIcon,
  TrophyIcon as TrophySolidIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LivePage() {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(2500)
  const [isTyping, setIsTyping] = useState(false)
  const [message, setMessage] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const streamRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([
    { user: 'user1', text: 'Amazing stream!', time: '2m ago' },
    { user: 'user2', text: 'Hello everyone!', time: '1m ago' },
    { user: 'user3', text: 'Great content!', time: '30s ago' },
  ])
  const [showGiftMenu, setShowGiftMenu] = useState(false)
  const [gifts, setGifts] = useState([
    { id: 1, name: 'Rose', price: 1, icon: HeartSolidIcon, category: 'basic', color: 'text-red-500' },
    { id: 2, name: 'Crown', price: 5, icon: ShieldCheckIcon, category: 'basic', color: 'text-yellow-500' },
    { id: 3, name: 'Diamond', price: 10, icon: CubeIcon, category: 'basic', color: 'text-blue-500' },
    { id: 4, name: 'Rocket', price: 50, icon: RocketLaunchIcon, category: 'premium', color: 'text-purple-500' },
    { id: 5, name: 'Super Star', price: 100, icon: StarSolidIcon, category: 'premium', color: 'text-yellow-400' },
    { id: 6, name: 'Love', price: 2, icon: HeartSolidIcon, category: 'basic', color: 'text-pink-500' },
    { id: 7, name: 'Fire', price: 3, icon: FireSolidIcon, category: 'basic', color: 'text-orange-500' },
    { id: 8, name: 'Rainbow', price: 20, icon: SunIcon, category: 'premium', color: 'text-amber-500' },
    { id: 9, name: 'Unicorn', price: 30, icon: SparklesSolidIcon, category: 'premium', color: 'text-indigo-500' },
    { id: 10, name: 'Dragon', price: 75, icon: BoltSolidIcon, category: 'premium', color: 'text-green-500' },
    { id: 11, name: 'Galaxy', price: 200, icon: MoonSolidIcon, category: 'exclusive', color: 'text-violet-500' },
    { id: 12, name: 'Golden Crown', price: 500, icon: TrophySolidIcon, category: 'exclusive', color: 'text-amber-400' },
  ])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const searchParams = useSearchParams()
  const streamerId = searchParams.get('streamer') || 'default'
  const [likeAnimation, setLikeAnimation] = useState(false)
  const [likePosition, setLikePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<'chat' | 'gifts'>('chat')
  const [suggestedStreams] = useState([
    { id: 'user1', viewers: 1200, title: 'Gaming with Friends' },
    { id: 'user2', viewers: 800, title: 'Music Live Session' },
    { id: 'user3', viewers: 500, title: 'Cooking Show' },
    { id: 'user4', viewers: 300, title: 'Art Stream' },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: 'You', text: message, time: 'now' }])
      setMessage('')
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSendGift = (gift: { id: number, name: string, price: number, icon: any, category: string, color: string }) => {
    setMessages([...messages, { 
      user: 'You', 
      text: `Sent a ${gift.name}`, 
      time: 'now' 
    }])
    setShowGiftMenu(false)
  }

  const handleLeaveStream = () => {
    router.push('/')
  }

  const filteredGifts = selectedCategory === 'all' 
    ? gifts 
    : gifts.filter(gift => gift.category === selectedCategory)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      streamRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleStreamClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setLikePosition({ x, y })
    setLikeAnimation(true)
    handleLike()
    setTimeout(() => setLikeAnimation(false), 1000)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Stream Header */}
      <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-instagram-yellow to-instagram-pink p-0.5">
              <div className="bg-white rounded-full p-0.5">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
              </div>
            </div>
            <div>
              <h1 className="font-semibold">@{streamerId}</h1>
              <p className="text-sm text-gray-400">Live Now</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="h-5 w-5" />
              <span>1.2k</span>
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-all duration-300 ${isLiked ? 'text-red-500 scale-110' : 'text-white'}`}
            >
              <HeartIcon className={`h-5 w-5 ${isLiked ? 'animate-bounce' : ''}`} />
              <span className="font-semibold">{likeCount.toLocaleString()}</span>
            </button>
            <button
              onClick={handleLeaveStream}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Leave Stream"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        {/* Left Column - Stream and Suggestions */}
        <div className={`lg:col-span-8 space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
          {/* Stream Area */}
          <div 
            ref={streamRef}
            className={`aspect-video bg-gray-800 rounded-lg relative ${isFullscreen ? 'h-screen w-screen rounded-none' : ''}`}
            onClick={handleStreamClick}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoCameraIcon className="h-16 w-16 text-gray-600" />
            </div>
            <div className="absolute bottom-4 left-4 bg-red-500 px-3 py-1 rounded-full flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-semibold">LIVE</span>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/50 rounded-full hover:bg-gray-800 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <ArrowsPointingInIcon className="h-5 w-5" />
                ) : (
                  <ArrowsPointingOutIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* Like Animation */}
            {likeAnimation && (
              <div 
                className="absolute pointer-events-none animate-like"
                style={{
                  left: `${likePosition.x}px`,
                  top: `${likePosition.y}px`,
                }}
              >
                <HeartSolidIcon className="h-8 w-8 text-red-500" />
              </div>
            )}
          </div>

          {/* Suggested Streams */}
          {!isFullscreen && (
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-4">Suggested Streams</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {suggestedStreams.map((stream) => (
                  <Link
                    key={stream.id}
                    href={`/live?streamer=${stream.id}`}
                    className="group"
                  >
                    <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <VideoCameraIcon className="h-8 w-8 text-gray-600" />
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs font-semibold">LIVE</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-full">
                        <span className="text-xs">{stream.viewers.toLocaleString()} viewers</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium truncate">{stream.title}</p>
                      <p className="text-xs text-gray-400">@{stream.id}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Chat and Gifts */}
        {!isFullscreen && (
          <div className="lg:col-span-4 space-y-4">
            {/* Tabs */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-1">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'chat' 
                      ? 'bg-instagram-blue text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('gifts')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'gifts' 
                      ? 'bg-instagram-blue text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Gifts
                </button>
              </div>
            </div>

            {/* Chat Section */}
            {activeTab === 'chat' && (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg flex flex-col h-[600px]">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="font-semibold">Live Chat</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-400">1.2k viewers</span>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{msg.user}</span>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-800">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                        setIsTyping(e.target.value.length > 0)
                      }}
                      placeholder="Send a message..."
                      className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-instagram-blue"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-instagram-blue text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                  {isTyping && (
                    <p className="text-xs text-gray-400 mt-2">Typing...</p>
                  )}
                </div>
              </div>
            )}

            {/* Gift Menu */}
            {activeTab === 'gifts' && (
              <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                <h3 className="font-semibold mb-4">Select a Gift</h3>
                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === 'all' 
                        ? 'bg-instagram-blue text-white' 
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedCategory('basic')}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === 'basic' 
                        ? 'bg-instagram-blue text-white' 
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setSelectedCategory('premium')}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === 'premium' 
                        ? 'bg-instagram-blue text-white' 
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    Premium
                  </button>
                  <button
                    onClick={() => setSelectedCategory('exclusive')}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === 'exclusive' 
                        ? 'bg-instagram-blue text-white' 
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    Exclusive
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {filteredGifts.map((gift) => {
                    const Icon = gift.icon
                    return (
                      <button
                        key={gift.id}
                        onClick={() => handleSendGift(gift)}
                        className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-800 transition-colors group"
                      >
                        <Icon className={`h-8 w-8 mb-1 group-hover:scale-110 transition-transform ${gift.color}`} />
                        <span className="text-xs">{gift.name}</span>
                        <span className="text-xs text-instagram-blue">${gift.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes like {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-like {
          animation: like 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
} 