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
  PuzzlePieceIcon,
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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
  isGifter?: boolean;
  gifterLevel?: 'bronze' | 'silver' | 'gold' | 'diamond';
}

// Define Gift interface
interface Gift {
  id: number;
  name: string;
  price: number;
  icon: IconType;
  color: string;
}

interface StreamInfo {
  streamer: string;
  isVerified: boolean;
  profileImage: string;
  hasLiveNFT: boolean;
  followers: string;
  isDancing: boolean;
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
  const [charCount, setCharCount] = useState(0)
  const MAX_CHARS = 120
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Sophie', text: 'Hey everyone!', time: '2 min ago', userColor: 'text-pink-400', isGift: false, giftColor: '', giftName: '', giftValue: 0, isGifter: true, gifterLevel: 'gold' },
    { id: 2, user: 'Mike', text: 'Love this stream!', time: '1 min ago', userColor: 'text-blue-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
    { id: 3, user: 'Jen23', text: 'Where did you get that shirt?', time: '1 min ago', userColor: 'text-purple-400', isGift: false, giftColor: '', giftName: '', giftValue: 0, isGifter: true, gifterLevel: 'silver' },
    { id: 4, user: 'Taylor', text: 'Just gifted you a rocket!', time: '45 sec ago', userColor: 'text-green-400', isGift: true, giftIcon: RocketLaunchIcon, giftColor: 'text-red-500', giftName: 'Rocket', giftValue: 100, isGifter: true, gifterLevel: 'diamond' },
    { id: 5, user: 'Chris', text: 'Your makeup looks great today', time: '30 sec ago', userColor: 'text-yellow-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 },
    { id: 6, user: 'Alex', text: 'Just sent you a star!', time: '20 sec ago', userColor: 'text-orange-400', isGift: true, giftIcon: StarIcon, giftColor: 'text-yellow-500', giftName: 'Star', giftValue: 50, isGifter: true, gifterLevel: 'bronze' },
    { id: 7, user: 'Brooklyn', text: "What's your favorite song right now?", time: '10 sec ago', userColor: 'text-indigo-400', isGift: false, giftColor: '', giftName: '', giftValue: 0 }
  ])
  const [showGiftMenu, setShowGiftMenu] = useState(false)
  const [selectedGiftCategory, setSelectedGiftCategory] = useState('popular')
  const [floatingGifts, setFloatingGifts] = useState<{id: number, gift: any, x: number, y: number}[]>([])
  const [showShare, setShowShare] = useState(false)
  const [viewers, setViewers] = useState(1289)
  const [currentGiftPage, setCurrentGiftPage] = useState(1)
  const giftsPerPage = 6
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [walletBalance, setWalletBalance] = useState(1000)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showBankingModal, setShowBankingModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{amount: number, price: number} | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | null>(null)
  const [reloadAmount, setReloadAmount] = useState('')
  const [showGiftList, setShowGiftList] = useState(false)
  const [showTipMenu, setShowTipMenu] = useState(false)
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [splashAnimation, setSplashAnimation] = useState<{x: number, y: number} | null>(null)
  const [sendingGift, setSendingGift] = useState<Gift | null>(null)
  const controls = useAnimation()
  const [isExiting, setIsExiting] = useState(false)

  const [streamInfo, setStreamInfo] = useState<StreamInfo>({
    streamer: params.id,
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    hasLiveNFT: true,
    followers: "45.2K",
    isDancing: true
  })

  const [userProfile] = useState({
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    name: "You"
  })

  const gifts = [
    // Basic Gifts (1-50 coins)
    { id: 1, name: 'Heart', price: 5, icon: HeartIcon, color: 'text-red-500' },
    { id: 2, name: 'Fire', price: 10, icon: FireIcon, color: 'text-orange-500' },
    { id: 3, name: 'Wave', price: 15, icon: HandRaisedIcon, color: 'text-blue-400' },
    { id: 4, name: 'Sparkles', price: 25, icon: SparklesIcon, color: 'text-purple-400' },
    { id: 5, name: 'Music', price: 30, icon: MusicalNoteIcon, color: 'text-pink-500' },
    { id: 6, name: 'Star', price: 50, icon: StarIcon, color: 'text-yellow-500' },
    
    // Premium Gifts (51-200 coins)
    { id: 7, name: 'Puzzle', price: 75, icon: PuzzlePieceIcon, color: 'text-indigo-500' },
    { id: 8, name: 'Rocket', price: 100, icon: RocketLaunchIcon, color: 'text-red-500' },
    { id: 9, name: 'Dollar', price: 150, icon: CurrencyDollarIcon, color: 'text-green-500' },
    { id: 10, name: 'Crown', price: 200, icon: SparklesIcon, color: 'text-yellow-500' },
    
    // Luxury Gifts (201-500 coins)
    { id: 11, name: 'Diamond', price: 250, icon: SparklesIcon, color: 'text-blue-400' },
    { id: 12, name: 'Castle', price: 300, icon: PuzzlePieceIcon, color: 'text-purple-500' },
    { id: 13, name: 'Dragon', price: 350, icon: FireIcon, color: 'text-red-600' },
    { id: 14, name: 'Unicorn', price: 400, icon: SparklesIcon, color: 'text-pink-400' },
    { id: 15, name: 'Phoenix', price: 500, icon: FireIcon, color: 'text-orange-600' },
    
    // Special Gifts (501-1000 coins)
    { id: 16, name: 'Galaxy', price: 600, icon: SparklesIcon, color: 'text-indigo-600' },
    { id: 17, name: 'Rainbow', price: 700, icon: SparklesIcon, color: 'text-pink-500' },
    { id: 18, name: 'Meteor', price: 800, icon: FireIcon, color: 'text-orange-500' },
    { id: 19, name: 'Comet', price: 900, icon: SparklesIcon, color: 'text-blue-500' },
    { id: 20, name: 'Supernova', price: 1000, icon: FireIcon, color: 'text-red-500' },
    
    // Legendary Gifts (1001-2000 coins)
    { id: 21, name: 'Cosmic', price: 1200, icon: SparklesIcon, color: 'text-purple-600' },
    { id: 22, name: 'Celestial', price: 1400, icon: StarIcon, color: 'text-blue-600' },
    { id: 23, name: 'Eternal', price: 1600, icon: SparklesIcon, color: 'text-pink-600' },
    { id: 24, name: 'Infinite', price: 1800, icon: SparklesIcon, color: 'text-indigo-500' },
    { id: 25, name: 'Immortal', price: 2000, icon: FireIcon, color: 'text-red-600' },
    
    // Mythical Gifts (2001-5000 coins)
    { id: 26, name: 'Titan', price: 2500, icon: FireIcon, color: 'text-orange-600' },
    { id: 27, name: 'Olympus', price: 3000, icon: SparklesIcon, color: 'text-yellow-500' },
    { id: 28, name: 'Atlantis', price: 3500, icon: SparklesIcon, color: 'text-blue-500' },
    { id: 29, name: 'Avalon', price: 4000, icon: SparklesIcon, color: 'text-green-500' },
    { id: 30, name: 'Valhalla', price: 5000, icon: FireIcon, color: 'text-red-600' },
    
    // Divine Gifts (5001-10000 coins)
    { id: 31, name: 'Divine', price: 6000, icon: SparklesIcon, color: 'text-yellow-600' },
    { id: 32, name: 'Celestial', price: 7000, icon: StarIcon, color: 'text-blue-600' },
    { id: 33, name: 'Ethereal', price: 8000, icon: SparklesIcon, color: 'text-purple-600' },
    { id: 34, name: 'Mystical', price: 9000, icon: SparklesIcon, color: 'text-pink-600' },
    { id: 35, name: 'Transcendent', price: 10000, icon: FireIcon, color: 'text-red-600' },
    
    // Ultimate Gifts (10001-50000 coins)
    { id: 36, name: 'Infinity', price: 15000, icon: SparklesIcon, color: 'text-indigo-600' },
    { id: 37, name: 'Eternity', price: 20000, icon: SparklesIcon, color: 'text-purple-600' },
    { id: 38, name: 'Omnipotent', price: 30000, icon: FireIcon, color: 'text-red-600' },
    { id: 39, name: 'Absolute', price: 50000, icon: SparklesIcon, color: 'text-yellow-600' },
    
    // Supreme Gifts (50001-100000 coins)
    { id: 40, name: 'Supreme', price: 75000, icon: FireIcon, color: 'text-red-600' },
    { id: 41, name: 'Paradise', price: 100000, icon: SparklesIcon, color: 'text-pink-600' },
    
    // Royal Gifts (100001-500000 coins)
    { id: 42, name: 'Emperor', price: 150000, icon: FireIcon, color: 'text-red-600' },
    { id: 43, name: 'Empress', price: 200000, icon: SparklesIcon, color: 'text-pink-600' },
    { id: 44, name: 'Kingdom', price: 300000, icon: SparklesIcon, color: 'text-purple-600' },
    { id: 45, name: 'Dynasty', price: 500000, icon: FireIcon, color: 'text-red-600' },
    
    // Mythical Gifts (500001-1000000 coins)
    { id: 46, name: 'Creation', price: 600000, icon: SparklesIcon, color: 'text-blue-600' },
    { id: 47, name: 'Genesis', price: 750000, icon: FireIcon, color: 'text-orange-600' },
    { id: 48, name: 'Destiny', price: 1000000, icon: SparklesIcon, color: 'text-purple-600' },
    
    // Legendary Gifts (1000001-5000000 coins)
    { id: 49, name: 'Universe', price: 2000000, icon: SparklesIcon, color: 'text-indigo-600' },
    { id: 50, name: 'Multiverse', price: 3000000, icon: FireIcon, color: 'text-red-600' },
    { id: 51, name: 'Omniverse', price: 5000000, icon: SparklesIcon, color: 'text-purple-600' },
    
    // Divine Gifts (5000001-10000000 coins)
    { id: 52, name: 'Godhood', price: 6000000, icon: FireIcon, color: 'text-red-600' },
    { id: 53, name: 'Deity', price: 7500000, icon: SparklesIcon, color: 'text-yellow-600' },
    { id: 54, name: 'Divinity', price: 10000000, icon: SparklesIcon, color: 'text-blue-600' },
    
    // Ultimate Gifts (10000001+ coins)
    { id: 55, name: 'Reality', price: 15000000, icon: FireIcon, color: 'text-red-600' },
    { id: 56, name: 'Existence', price: 25000000, icon: SparklesIcon, color: 'text-purple-600' },
    { id: 57, name: 'Cosmos', price: 50000000, icon: SparklesIcon, color: 'text-indigo-600' },
    { id: 58, name: 'Infinity', price: 75000000, icon: FireIcon, color: 'text-red-600' },
    { id: 59, name: 'Eternity', price: 100000000, icon: SparklesIcon, color: 'text-purple-600' },
    { id: 60, name: 'Supreme', price: 1000000000, icon: FireIcon, color: 'text-red-600' }
  ]

  // Calculate pagination
  const totalGiftPages = Math.ceil(gifts.length / giftsPerPage)
  const startIndex = (currentGiftPage - 1) * giftsPerPage
  const endIndex = startIndex + giftsPerPage
  const currentGifts = gifts.slice(startIndex, endIndex)

  const tipOptions = [
    { id: 1, amount: 50, label: 'Quick Tip' },
    { id: 2, amount: 100, label: 'Nice Tip' },
    { id: 3, amount: 200, label: 'Sweet Tip' },
    { id: 4, amount: 500, label: 'Amazing Tip' },
    { id: 5, amount: 1000, label: 'Epic Tip' },
    { id: 6, amount: 2000, label: 'Legendary Tip' }
  ]

  const tokenPackages = [
    { id: 1, amount: 100, price: 0.99 },
    { id: 2, amount: 500, price: 4.99 },
    { id: 3, amount: 1000, price: 9.99 },
    { id: 4, amount: 2000, price: 19.99 },
    { id: 5, amount: 5000, price: 49.99 },
    { id: 6, amount: 10000, price: 99.99 }
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

  // Simulate new messages and notifications
  useEffect(() => {
    if (showGiftMenu) {
      const interval = setInterval(() => {
        // Randomly trigger notification
        if (Math.random() > 0.7) {
          setHasNewMessage(true)
          // Reset notification after 3 seconds
          setTimeout(() => {
            setHasNewMessage(false)
          }, 3000)
        }
      }, 5000) // Check every 5 seconds

      return () => clearInterval(interval)
    }
  }, [showGiftMenu])

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value
    if (newMessage.length <= MAX_CHARS) {
      setMessage(newMessage)
      setCharCount(newMessage.length)
    }
  }

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

  const handleReloadWallet = () => {
    const amount = parseInt(reloadAmount)
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance(prev => prev + amount)
      setShowWalletModal(false)
      setReloadAmount('')
    }
  }

  const handleGiftClick = (gift: Gift, event: React.MouseEvent) => {
    if (!selectedGift) {
      // First click - select the gift
      setSelectedGift(gift)
    } else if (selectedGift.id === gift.id) {
      // Second click on same gift - send it
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setSplashAnimation({ x, y })
      setSendingGift(gift)
      
      // Send the gift
      handleSendGift(gift)
      
      // Reset selection and animation after a delay
      setTimeout(() => {
        setSelectedGift(null)
        setSplashAnimation(null)
        setSendingGift(null)
      }, 1000)
    } else {
      // Clicked different gift - switch selection
      setSelectedGift(gift)
    }
  }

  const handleTipClick = (amount: number) => {
    // Handle tip sending
    const newMessage: Message = {
      id: Date.now(),
      user: 'You',
      text: `Just sent a ${amount} coin tip!`,
      time: 'Just now',
      userColor: 'text-blue-500',
      isGift: false,
      giftColor: '',
      giftName: '',
      giftValue: 0
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handlePackageSelect = (pkg: {amount: number, price: number}) => {
    setSelectedPackage(pkg)
    setShowBankingModal(true)
  }

  const handlePaymentComplete = () => {
    if (selectedPackage) {
      setWalletBalance(prev => prev + selectedPackage.amount)
      setShowBankingModal(false)
      setShowWalletModal(false)
      setSelectedPackage(null)
      setPaymentMethod(null)
    }
  }

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  // Action transition variants
  const actionVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }

  // Message transition variants
  const messageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  // Gift transition variants
  const giftVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  }

  // Modal transition variants
  const modalVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }

  const handleBack = async () => {
    setIsExiting(true)
    await controls.start({
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
    router.back()
  }

  return (
          <motion.div
      className="h-screen flex flex-col overflow-hidden"
      initial="initial"
      animate={isExiting ? controls : "animate"}
      exit="exit"
      variants={pageVariants}
    >
      {/* Main content area */}
      <motion.div 
        ref={streamRef} 
        className={`${isFullscreen ? 'fixed inset-0 z-50' : 'flex-1'} bg-gradient-to-br from-gray-900 to-black relative overflow-hidden`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <motion.button
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={isExiting ? { rotate: -180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeftIcon className="h-5 w-5 text-white" />
          </motion.div>
        </motion.button>

        {/* Placeholder for stream */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Pink Star */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative mr-8"
          >
            <StarIcon className="w-16 h-16 text-pink-500/70" />
            <motion.div
            animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.05, 0.3, 0.05],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
              className="absolute inset-0"
          >
              <StarIcon className="w-16 h-16 text-pink-400/50 blur-[0.5px]" />
          </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.02, 0.2, 0.02],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute inset-0"
            >
              <StarIcon className="w-16 h-16 text-pink-300/40 blur-[1px]" />
            </motion.div>
          </motion.div>

          {/* Blue Star */}
            <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <StarIcon className="w-24 h-24 text-sky-500/70" />
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.05, 0.3, 0.05],
              }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.15
              }}
              className="absolute inset-0"
            >
              <StarIcon className="w-24 h-24 text-sky-400/50 blur-[0.5px]" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.02, 0.2, 0.02],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.25
              }}
              className="absolute inset-0"
            >
              <StarIcon className="w-24 h-24 text-sky-300/40 blur-[1px]" />
            </motion.div>
          </motion.div>

          {/* Yellow Star */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative ml-8"
          >
            <StarIcon className="w-20 h-20 text-amber-500/70" />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.05, 0.3, 0.05],
              }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.12
              }}
              className="absolute inset-0"
            >
              <StarIcon className="w-20 h-20 text-amber-400/50 blur-[0.5px]" />
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.6, 1],
                opacity: [0.02, 0.2, 0.02],
              }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.22
              }}
              className="absolute inset-0"
            >
              <StarIcon className="w-20 h-20 text-amber-300/40 blur-[1px]" />
            </motion.div>
          </motion.div>
          </div>

          {/* Video overlay controls and info */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-between p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
            {/* Top row - Stream info & viewer count */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full ml-16">
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
                </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
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
                  </div>
              </div>
        </motion.div>
      </motion.div>
      
      {/* Bottom chat section */}
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className={`${isFullscreen ? 'hidden' : 'h-64'} flex backdrop-blur-sm`}
      >
        {/* Chat section (full width) */}
        <motion.div 
          className="w-full flex flex-col"
          variants={actionVariants}
        >
            {/* Chat header */}
          <div className="bg-black/40 border-b border-gray-700/50 p-2 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-gray-500 flex items-center space-x-2">
              {showGiftList || showTipMenu ? (
                'Send Gift or Tip'
              ) : (
                <>
                  <span>Live Chat</span>
                  <HeartIcon className="h-4 w-4 text-pink-500" />
                </>
              )}
            </h3>
            <button
              onClick={() => setShowWalletModal(true)}
              className="bg-black hover:bg-gray-900 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">T</span>
              </div>
              <span>{walletBalance}</span>
            </button>
          </div>
            
            {/* Chat messages or Gift/Tip menu */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-2 space-y-2"
            >
              {showGiftList || showTipMenu ? (
                <div className="h-full overflow-y-auto">
                  {/* Toggle buttons */}
                  <div className="flex space-x-2 mb-4 sticky top-0 bg-black/40 backdrop-blur-sm p-2 -mx-2 -mt-2 z-10">
                    <button
                      onClick={() => {
                        setShowTipMenu(true)
                        setShowGiftList(false)
                      }}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showTipMenu 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-black/40 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CurrencyDollarIcon className="h-4 w-4" />
                        <span>Tips</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setShowGiftList(true)
                        setShowTipMenu(false)
                      }}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showGiftList 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-black/40 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <GiftIcon className="h-4 w-4" />
                        <span>Gifts</span>
                      </div>
                    </button>
                  </div>

                  {/* Tip Menu */}
                  {showTipMenu && (
                    <div className="grid grid-cols-2 gap-2">
                      {tipOptions.map((tip) => (
                        <button
                          key={tip.id}
                          onClick={() => handleTipClick(tip.amount)}
                          className="bg-black/40 backdrop-blur-sm p-2 rounded-lg hover:bg-gray-800/40 flex flex-col items-center space-y-1 group"
                        >
                          <div className="p-1.5 rounded-full bg-black/20 text-gray-500 group-hover:text-pink-500 transition-colors">
                            <CurrencyDollarIcon className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] text-white text-center">{tip.label}</span>
                          <span className="text-[10px] text-pink-500">{tip.amount}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Gift List */}
                  {showGiftList && (
                    <div className="grid grid-cols-4 gap-1.5">
                      {gifts.map((gift) => (
                        <div key={gift.id} className="relative">
                          <motion.button
                            onClick={(e) => handleGiftClick(gift, e)}
                            className={`w-full bg-black/40 backdrop-blur-sm p-1.5 rounded-lg hover:bg-gray-800/40 flex flex-col items-center space-y-1 transition-all duration-200 ${
                              selectedGift?.id === gift.id ? 'ring-2 ring-pink-500 scale-105' : ''
                            }`}
                            animate={sendingGift?.id === gift.id ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div 
                              className={`p-1.5 rounded-full ${gift.color} bg-black/20`}
                              animate={sendingGift?.id === gift.id ? {
                                scale: [1, 1.5, 1],
                                rotate: [0, 360],
                              } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              <gift.icon className="h-4 w-4" />
                            </motion.div>
                            <span className="text-[10px] text-white text-center line-clamp-1">{gift.name}</span>
                            <span className="text-[10px] text-pink-500">{gift.price}</span>
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                    >
                      {msg.isGift ? (
                        <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 border border-gray-700/50">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`font-semibold ${msg.userColor}`}>{msg.user}</span>
                            {msg.isGifter && msg.gifterLevel && (
                              <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                                msg.gifterLevel === 'bronze' ? 'bg-amber-900/50 text-amber-300' :
                                msg.gifterLevel === 'silver' ? 'bg-gray-400/50 text-gray-200' :
                                msg.gifterLevel === 'gold' ? 'bg-yellow-600/50 text-yellow-300' :
                                'bg-blue-600/50 text-blue-300'
                              }`}>
                                <SparklesIcon className="h-3 w-3" />
                                <span>{msg.gifterLevel === 'bronze' ? "King's Court" :
                                       msg.gifterLevel === 'silver' ? "King's Guard" :
                                       msg.gifterLevel === 'gold' ? "King's Right Hand" :
                                       'King'}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`bg-gradient-to-tr from-gray-700/80 to-gray-600/80 p-2 rounded-full ${msg.giftColor}`}>
                              {msg.giftIcon && <msg.giftIcon className="h-4 w-4" />}
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
                        <div className="bg-black/40 backdrop-blur-md rounded-lg p-2">
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${msg.userColor}`}>{msg.user}</span>
                            {msg.isGifter && msg.gifterLevel && (
                              <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                                msg.gifterLevel === 'bronze' ? 'bg-amber-900/50 text-amber-300' :
                                msg.gifterLevel === 'silver' ? 'bg-gray-400/50 text-gray-200' :
                                msg.gifterLevel === 'gold' ? 'bg-yellow-600/50 text-yellow-300' :
                                'bg-blue-600/50 text-blue-300'
                              }`}>
                                <SparklesIcon className="h-3 w-3" />
                                <span>{msg.gifterLevel === 'bronze' ? "King's Court" :
                                       msg.gifterLevel === 'silver' ? "King's Guard" :
                                       msg.gifterLevel === 'gold' ? "King's Right Hand" :
                                       'King'}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            {/* Chat input */}
          <motion.div 
            className="bg-black/40 border-t border-gray-700/50 p-2"
            variants={actionVariants}
          >
              <div className="flex items-center space-x-2">
              <div className="flex-1 bg-black/40 backdrop-blur-md rounded-full flex items-center overflow-hidden border border-gray-700/50">
                <div className="flex items-center space-x-2 px-3 w-full">
                  <img 
                    src={userProfile.image} 
                    alt={userProfile.name}
                    className="w-6 h-6 rounded-full border border-pink-500 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Say something..."
                    className="bg-transparent text-white text-sm flex-1 focus:outline-none w-full"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    maxLength={MAX_CHARS}
                  />
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`text-xs ${charCount >= MAX_CHARS ? 'text-red-500' : 'text-gray-500'}`}>
                      {charCount}/{MAX_CHARS}
                    </span>
                    <button 
                      onClick={() => {
                        if (showGiftList || showTipMenu) {
                          setShowGiftList(false)
                          setShowTipMenu(false)
                        } else {
                          setShowGiftList(true)
                          setShowTipMenu(false)
                        }
                      }}
                      className={`p-1.5 rounded-full transition-colors ${
                        (showGiftList || showTipMenu) 
                          ? 'bg-pink-500/20 text-pink-500' 
                          : 'text-gray-400 hover:text-pink-500'
                      }`}
                    >
                      <GiftIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`bg-black hover:bg-gray-900 text-white p-1.5 rounded-full transition-colors ${
                    !message.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Wallet Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 w-[480px] relative overflow-hidden"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>

              {/* Close Button */}
            <button
                onClick={() => setShowWalletModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

              {/* Header */}
              <div className="relative mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Get Tokens</h3>
                <p className="text-gray-400 text-sm">Choose a package to reload your wallet</p>
          </div>
          
              {/* Token Packages Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tokenPackages.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePackageSelect(pkg)}
                    className="relative bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-pink-500/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white">T</span>
              </div>
                        <span className="text-white font-semibold">{pkg.amount}</span>
                      </div>
                      <span className="text-pink-500 font-semibold">${pkg.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4"></div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Custom Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={reloadAmount}
                        onChange={(e) => setReloadAmount(e.target.value)}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                        placeholder="Enter amount"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white">T</span>
              </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleReloadWallet}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity mt-6"
                  >
                    Reload
            </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banking Modal */}
      <AnimatePresence>
        {showBankingModal && selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 w-[480px] relative overflow-hidden"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowBankingModal(false)
                  setSelectedPackage(null)
                  setPaymentMethod(null)
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
            </button>
            
              {/* Header */}
              <div className="relative mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Complete Purchase</h3>
                <p className="text-gray-400 text-sm">Select your preferred payment method</p>
              </div>

              {/* Transaction Details */}
              <div className="bg-black/40 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">T</span>
                    </div>
                    <span className="text-white font-semibold">{selectedPackage.amount} Tokens</span>
                  </div>
                  <span className="text-pink-500 font-semibold">${selectedPackage.price}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-pink-500 bg-pink-500/10' 
                      : 'border-gray-800 hover:border-pink-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
                      <div className="text-left">
                        <p className="text-white font-medium">Credit/Debit Card</p>
                        <p className="text-gray-400 text-sm">Visa, Mastercard, American Express</p>
          </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="w-5 h-5 rounded-full border-2 border-pink-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('crypto')}
                  className={`w-full p-4 rounded-xl border transition-colors ${
                    paymentMethod === 'crypto' 
                      ? 'border-pink-500 bg-pink-500/10' 
                      : 'border-gray-800 hover:border-pink-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
            </div>
                      <div className="text-left">
                        <p className="text-white font-medium">Cryptocurrency</p>
                        <p className="text-gray-400 text-sm">BTC, ETH, USDT, and more</p>
          </div>
                    </div>
                    {paymentMethod === 'crypto' && (
                      <div className="w-5 h-5 rounded-full border-2 border-pink-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
        </div>
      )}
    </div>
                </button>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePaymentComplete}
                disabled={!paymentMethod}
                className={`w-full py-3 rounded-xl font-medium transition-opacity ${
                  paymentMethod 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {paymentMethod === 'card' ? 'Pay with Card' : 
                 paymentMethod === 'crypto' ? 'Pay with Crypto' : 
                 'Select Payment Method'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}