'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  UserGroupIcon, 
  HeartIcon, 
  XMarkIcon, 
  ArrowsPointingOutIcon, 
  ArrowsPointingInIcon,
  GiftIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
  RocketLaunchIcon,
  HandRaisedIcon,
  MusicalNoteIcon,
  SwatchIcon,
  MapIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  HandThumbUpIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Define Icon type for component icons
type IconType = React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>

// Define Message interface
interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  userColor: string;
  isGift: boolean;
  giftIcon?: IconType;
  giftColor: string;
  giftName: string;
  giftValue: number;
}

// Define Gift interface
interface Gift {
  id: number;
  name: string;
  price: number;
  icon: IconType;
  category: string;
  color: string;
}

export default function LivePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const streamRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(1245)
  const [floatingHearts, setFloatingHearts] = useState<{id: number, x: number, y: number}[]>([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Sophie', text: 'Hey everyone!', time: '2 min ago', userColor: 'text-pink-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
    { id: 2, user: 'Mike', text: 'Love this stream!', time: '1 min ago', userColor: 'text-blue-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
    { id: 3, user: 'Jen23', text: 'Where did you get that shirt?', time: '1 min ago', userColor: 'text-purple-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
    { id: 4, user: 'Taylor', text: 'Just gifted you a rocket!', time: '45 sec ago', userColor: 'text-green-400', isGift: true, giftIcon: RocketLaunchIcon, giftColor: 'text-red-500', giftName: 'Rocket', giftValue: 100 },
    { id: 5, user: 'Chris', text: 'Your makeup looks great today', time: '30 sec ago', userColor: 'text-yellow-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
    { id: 6, user: 'Alex', text: 'Just sent you a star!', time: '20 sec ago', userColor: 'text-orange-400', isGift: true, giftIcon: StarIcon, giftColor: 'text-yellow-500', giftName: 'Star', giftValue: 50 },
    { id: 7, user: 'Brooklyn', text: "What's your favorite song right now?", time: '10 sec ago', userColor: 'text-indigo-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 }
  ])
  const [showGiftMenu, setShowGiftMenu] = useState(false)
  const [selectedGiftCategory, setSelectedGiftCategory] = useState('popular')
  const [floatingGifts, setFloatingGifts] = useState<{id: number, gift: any, x: number, y: number}[]>([])
  const [showShare, setShowShare] = useState(false)
  const [viewers, setViewers] = useState(1289)
  const [streamInfo, setStreamInfo] = useState({
    title: "Friday Night Vibes",
    streamer: params.id,
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasLiveNFT: true,
    followers: "45.2K",
    isDancing: true,
    musicPlaying: "As It Was - Harry Styles"
  })

  const giftCategories = [
    { id: 'popular', name: 'Popular' },
    { id: 'economy', name: 'Economy' },
    { id: 'premium', name: 'Premium' },
    { id: 'exclusive', name: 'Exclusive' }
  ]

  const gifts = [
    { id: 1, name: 'Heart', price: 5, icon: HeartIcon, category: 'economy', color: 'text-red-500' },
    { id: 2, name: 'Fire', price: 10, icon: FireIcon, category: 'economy', color: 'text-orange-500' },
    { id: 3, name: 'Star', price: 50, icon: StarIcon, category: 'popular', color: 'text-yellow-500' },
    { id: 4, name: 'Rocket', price: 100, icon: RocketLaunchIcon, category: 'popular', color: 'text-red-500' },
    { id: 5, name: 'Sparkles', price: 25, icon: SparklesIcon, category: 'economy', color: 'text-purple-400' },
    { id: 6, name: 'Dollar', price: 200, icon: CurrencyDollarIcon, category: 'premium', color: 'text-green-500' },
    { id: 7, name: 'Wave', price: 15, icon: HandRaisedIcon, category: 'economy', color: 'text-blue-400' },
    { id: 8, name: 'Music', price: 30, icon: MusicalNoteIcon, category: 'popular', color: 'text-pink-500' },
    { id: 9, name: 'Puzzle', price: 40, icon: PuzzlePieceIcon, category: 'premium', color: 'text-indigo-500' }
  ]

  useEffect(() => {
    // Auto-scroll chat to bottom when new messages come in
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate new viewers joining
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 5));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Simulate new messages
  useEffect(() => {
    const randomNames = ['Jamie', 'Casey', 'Robin', 'Jordan', 'Taylor', 'Avery', 'Quinn', 'Morgan', 'Riley', 'Alex'];
    
    // Define messages with proper typing
    const randomMessages: Message[] = [
      { id: 1, user: 'Jamie', text: 'Just joined! What did I miss?', time: '1 min ago', userColor: 'text-green-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
      { id: 2, user: 'Casey', text: 'Love your energy!', time: '1 min ago', userColor: 'text-blue-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
      { id: 3, user: 'Robin', text: 'Followed you! Keep it up!', time: '1 min ago', userColor: 'text-purple-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
      { id: 4, user: 'Jordan', text: 'Just sent a star!', time: '1 min ago', userColor: 'text-yellow-400', isGift: true, giftIcon: StarIcon, giftColor: 'text-yellow-500', giftName: 'Star', giftValue: 50 },
      { id: 5, user: 'Taylor', text: 'Can you do a dance?', time: '1 min ago', userColor: 'text-pink-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
      { id: 6, user: 'Avery', text: 'You look amazing today!', time: '1 min ago', userColor: 'text-red-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
      { id: 7, user: 'Quinn', text: 'Just gifted you a rocket!', time: '1 min ago', userColor: 'text-orange-400', isGift: true, giftIcon: RocketLaunchIcon, giftColor: 'text-red-500', giftName: 'Rocket', giftValue: 100 }
    ];

    const interval = setInterval(() => {
      const newMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const now = new Date();
      setMessages(prev => [...prev, {
        id: Date.now(),
        user: newMessage.user,
        text: newMessage.text,
        time: 'Just now',
        userColor: newMessage.userColor,
        isGift: newMessage.isGift,
        ...(newMessage.isGift && { giftIcon: newMessage.giftIcon }),
        giftColor: newMessage.giftColor,
        giftName: newMessage.giftName,
        giftValue: newMessage.giftValue
      }]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array

  const handleSendMessage = () => {
    if (message.trim() === '') return
    
    const newMessage: Message = {
      id: Date.now(),
      user: 'You',
      text: message,
      time: 'Just now',
      userColor: 'text-blue-500',
      isGift: false,
      giftColor: '',
      giftName: '',
      giftValue: 0
    }
    
    setMessages(prev => [...prev, newMessage])
    setMessage('')
  }

  const handleLike = () => {
    setIsLiked(true);
    setLikeCount(prev => prev + 1);
    
    // Create a floating heart
    addFloatingHeart();
    
    // Reset like button after animation
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  }

  const addFloatingHeart = () => {
    const newHeart = {
      id: Date.now(),
      x: 20 + Math.random() * 60, // Random position
      y: 0
    };
    
    setFloatingHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation completes
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  }

  const addFloatingGift = (GiftIcon: any) => {
    const newGift = {
      id: Date.now(),
      gift: GiftIcon,
      x: 10 + Math.random() * 80, // Random position
      y: 0
    };
    
    setFloatingGifts(prev => [...prev, newGift]);
    
    // Remove gift after animation completes
    setTimeout(() => {
      setFloatingGifts(prev => prev.filter(gift => gift.id !== newGift.id));
    }, 3000);
  }

  const handleSendGift = (gift: Gift) => {
    const newMessage: Message = {
      id: Date.now(),
      user: 'You',
      text: `Just sent a ${gift.name}!`,
      time: 'Just now',
      userColor: 'text-blue-500',
      isGift: true,
      giftIcon: gift.icon,
      giftColor: gift.color,
      giftName: gift.name,
      giftValue: gift.price
    }
    
    setMessages(prev => [...prev, newMessage])
    addFloatingGift(gift.icon)
    setShowGiftMenu(false)
  }

  const toggleFullscreen = () => {
    if (!streamRef.current) return;
    
    if (!isFullscreen) {
      if (streamRef.current.requestFullscreen) {
        streamRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  }

  const filteredGifts = gifts.filter(gift => 
    selectedGiftCategory === 'popular' ? true : gift.category === selectedGiftCategory
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Floating hearts animation */}
      <AnimatePresence>
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            className="fixed z-50 pointer-events-none"
            initial={{ 
              bottom: "10%", 
              left: `${heart.x}%`, 
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              bottom: "90%", 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1.2, 1],
              rotate: Math.random() * 60 - 30
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <HeartSolidIcon className="h-8 w-8 text-red-500" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating gifts animation */}
      <AnimatePresence>
        {floatingGifts.map(item => {
          const GiftIcon = item.gift;
          return (
            <motion.div
              key={item.id}
              className="fixed z-50 pointer-events-none"
              initial={{ 
                bottom: "20%", 
                left: `${item.x}%`, 
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                bottom: "80%", 
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.5, 1.5, 1],
                rotate: Math.random() * 60 - 30
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <div className="bg-gradient-to-tr from-purple-600/80 to-pink-600/80 backdrop-blur-sm p-2 rounded-full">
                <GiftIcon className="h-10 w-10 text-white" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Main layout */}
      <div className="h-screen flex flex-col lg:flex-row">
        {/* Left side - Video Stream */}
        <div ref={streamRef} className={`${isFullscreen ? 'fixed inset-0 z-50' : 'lg:w-3/4'} h-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden`}>
          {/* Placeholder for stream */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-pink-500 animate-spin"></div>
          </div>

          {/* Video overlay controls and info */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {/* Top row - Stream info & viewer count */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full">
                <div className="relative">
                  <img 
                    src={streamInfo.profileImage} 
                    alt={streamInfo.streamer} 
                    className="w-8 h-8 rounded-full border-2 border-pink-500"
                  />
                  {streamInfo.isVerified && (
                    <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">@{streamInfo.streamer}</p>
                  <p className="text-xs text-gray-300">{streamInfo.followers} followers</p>
                </div>
                <button className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full ml-2">
                  Follow
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1 text-pink-500" />
                  <span className="text-sm">{viewers.toLocaleString()}</span>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800"
                >
                  {isFullscreen ? (
                    <ArrowsPointingInIcon className="h-4 w-4" />
                  ) : (
                    <ArrowsPointingOutIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Stream information overlay */}
            <div className="mb-24 lg:mb-0">
              <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg max-w-md">
                <h2 className="font-bold">{streamInfo.title}</h2>
                {streamInfo.musicPlaying && (
                  <div className="flex items-center mt-2 text-sm text-gray-300">
                    <MusicalNoteIcon className="h-4 w-4 mr-1 text-pink-500" />
                    <p className="truncate">{streamInfo.musicPlaying}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right side buttons */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
              <button
                onClick={handleLike}
                className={`bg-black/40 backdrop-blur-sm p-3 rounded-full flex flex-col items-center ${isLiked ? 'text-red-500' : 'text-white'}`}
              >
                <HeartIcon className={`h-6 w-6 ${isLiked ? 'animate-pulse' : ''}`} />
                <span className="text-xs mt-1">{likeCount}</span>
              </button>
              
              <button
                onClick={() => setShowGiftMenu(!showGiftMenu)}
                className="bg-black/40 backdrop-blur-sm p-3 rounded-full flex flex-col items-center"
              >
                <GiftIcon className="h-6 w-6 text-pink-500" />
                <span className="text-xs mt-1">Gift</span>
              </button>
              
              <button
                onClick={() => setShowShare(!showShare)}
                className="bg-black/40 backdrop-blur-sm p-3 rounded-full flex flex-col items-center"
              >
                <ShareIcon className="h-6 w-6 text-blue-400" />
                <span className="text-xs mt-1">Share</span>
              </button>
              
              <Link href="/live" className="bg-black/40 backdrop-blur-sm p-3 rounded-full flex flex-col items-center">
                <XMarkIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Exit</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right side - Chat & Gifts */}
        <div className={`${isFullscreen ? 'hidden' : 'lg:w-1/4 h-full'} border-l border-gray-800`}>
          <div className="h-full flex flex-col">
            {/* Chat header */}
            <div className="bg-gray-900 border-b border-gray-800 p-3 flex justify-between items-center">
              <h3 className="font-semibold">Live Chat</h3>
              <span className="text-xs text-gray-400">{messages.length} messages</span>
            </div>
            
            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-3 space-y-3"
              style={{ maxHeight: 'calc(100vh - 160px)' }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className="animate-slideUp">
                  {msg.isGift ? (
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/30 backdrop-blur-md rounded-lg p-3 border border-gray-700">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-semibold ${msg.userColor}`}>{msg.user}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-tr from-gray-700 to-gray-600 p-2 rounded-full ${msg.giftColor}`}>
                          {msg.giftIcon && <msg.giftIcon className="h-6 w-6" />}
                        </div>
                        <div>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs text-pink-400">
                            {msg.giftValue} coins
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${msg.userColor}`}>{msg.user}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Chat input */}
            <div className="bg-gray-900 border-t border-gray-800 p-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-800 rounded-full flex items-center overflow-hidden">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say something..."
                    className="bg-transparent text-white px-4 py-2 flex-1 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="text-gray-400 p-2">
                    <FaceSmileIcon className="h-5 w-5" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gift menu */}
      {showGiftMenu && (
        <div className="fixed inset-x-0 bottom-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 rounded-t-xl z-50 animate-slideUp">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Send a Gift</h3>
            <button
              onClick={() => setShowGiftMenu(false)}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Gift categories */}
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            {giftCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedGiftCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedGiftCategory === category.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Gift grid */}
          <div className="grid grid-cols-4 gap-4">
            {filteredGifts.map((gift) => (
              <button
                key={gift.id}
                onClick={() => handleSendGift(gift)}
                className="flex flex-col items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
              >
                <div className={`p-3 rounded-full bg-gray-700 ${gift.color}`}>
                  <gift.icon className="h-6 w-6" />
                </div>
                <span className="mt-2 text-sm">{gift.name}</span>
                <span className="text-xs text-pink-400">{gift.price} coins</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Share menu */}
      {showShare && (
        <div className="fixed inset-x-0 bottom-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 rounded-t-xl z-50 animate-slideUp">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Share</h3>
            <button
              onClick={() => setShowShare(false)}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-3">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </div>
              <span className="mt-2 text-sm">Facebook</span>
            </button>
            
            <button className="flex flex-col items-center p-3">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <span className="mt-2 text-sm">Twitter</span>
            </button>
            
            <button className="flex flex-col items-center p-3">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 18.67c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43H8.5c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.16-.48-.28z"/>
                </svg>
              </div>
              <span className="mt-2 text-sm">WhatsApp</span>
            </button>
            
            <button className="flex flex-col items-center p-3">
              <div className="p-3 rounded-full bg-pink-100">
                <svg className="h-6 w-6 text-pink-500" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </div>
              <span className="mt-2 text-sm">Instagram</span>
            </button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Copy link</p>
            <div className="flex items-center">
              <input 
                type="text" 
                value={`https://sluttube.com/live/${params.id}`} 
                readOnly
                className="bg-gray-800 rounded-l-lg px-4 py-2 flex-1 text-sm"
              />
              <button className="bg-pink-500 text-white px-4 py-2 rounded-r-lg text-sm">Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 