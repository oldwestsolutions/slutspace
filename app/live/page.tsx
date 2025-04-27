'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  VideoCameraIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  UserGroupIcon, 
  GiftIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'
import { motion, AnimatePresence } from 'framer-motion'

interface LiveStream {
  id: number;
  title: string;
  streamer: string;
  viewers: number;
  startedAt: string;
  thumbnail: string;
  streamerImage: string;
  category: string;
  tags: string[];
  location: string;
  likes: number;
  comments: number;
  shares: number;
  description: string;
}

export default function LivePage() {
  const [activeStreamIndex, setActiveStreamIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<{[key: number]: boolean}>({});
  const [floatingHearts, setFloatingHearts] = useState<{id: number, streamId: number, x: number, y: number}[]>([]);
  const [floatingGifts, setFloatingGifts] = useState<{id: number, streamId: number, type: string}[]>([]);
  const [floatingComments, setFloatingComments] = useState<{id: number, streamId: number, text: string, user: string}[]>([]);
  const [autoPlay, setAutoPlay] = useState(true);
  const streamRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Stories data for the top row
  const stories = [
    {
      id: 1,
      name: 'GamingPro',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 2,
      name: 'CodeMaster',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 3,
      name: 'MusicWorld',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 4,
      name: 'CookingM',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 5,
      name: 'FitnessHub',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 6,
      name: 'TravelExp',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 7,
      name: 'ArtStudio',
      image: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    },
    {
      id: 8,
      name: 'ScienceG',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isLive: true
    }
  ];
  
  const liveStreams: LiveStream[] = [
    {
      id: 1,
      title: 'Live Coding: Building a React App from Scratch',
      streamer: 'CodeMaster',
      viewers: 1234,
      startedAt: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'tech',
      tags: ['coding', 'tutorial', 'indie'],
      location: 'San Francisco',
      likes: 3245,
      comments: 578,
      shares: 124,
      description: 'Learn how to build a full React app from scratch! Going over hooks, context, and more.'
    },
    {
      id: 2,
      title: 'PUBG Mobile Tournament Finals - Road to Champion',
      streamer: 'GamingPro',
      viewers: 8765,
      startedAt: '30 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'gaming',
      tags: ['esports', 'tournament', 'trending'],
      location: 'Los Angeles',
      likes: 9875,
      comments: 1285,
      shares: 543,
      description: 'Finals of the PUBG Mobile tournament! Watch us compete for the grand prize!'
    },
    {
      id: 3,
      title: 'Live Piano Session - Taking Requests!',
      streamer: 'MusicWorld',
      viewers: 567,
      startedAt: '1 hour ago',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'music',
      tags: ['piano', 'classical', 'indie'],
      location: 'New York',
      likes: 2345,
      comments: 421,
      shares: 98,
      description: 'Playing piano and taking your requests! Drop your favorite songs in the comments.'
    },
    {
      id: 4,
      title: 'Making Homemade Pasta - Italian Cooking Show',
      streamer: 'CookingMaster',
      viewers: 890,
      startedAt: '45 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1596075780750-81249df16d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'food',
      tags: ['cooking', 'italian', 'trending'],
      location: 'Chicago',
      likes: 3456,
      comments: 765,
      shares: 201,
      description: 'Learn to make authentic Italian pasta from scratch! Family recipe passed down generations.'
    },
    {
      id: 5,
      title: 'Full Body HIIT Workout - Join Me!',
      streamer: 'FitnessHub',
      viewers: 345,
      startedAt: '15 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'fitness',
      tags: ['workout', 'hiit', 'trending'],
      location: 'Miami',
      likes: 1298,
      comments: 342,
      shares: 78,
      description: 'Join me for a 30-minute HIIT workout! No equipment needed, just bring your energy!'
    },
    {
      id: 6,
      title: 'Exploring Tokyo at Night - Japan Travel Vlog',
      streamer: 'TravelExplorer',
      viewers: 678,
      startedAt: '3 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'travel',
      tags: ['travel', 'japan', 'indie'],
      location: 'Tokyo',
      likes: 4567,
      comments: 876,
      shares: 321,
      description: 'Walking through the neon-lit streets of Tokyo! Ask me anything about Japan.'
    },
    {
      id: 7,
      title: 'Digital Art Session - Drawing Fantasy Characters',
      streamer: 'ArtStudio',
      viewers: 234,
      startedAt: '50 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'art',
      tags: ['drawing', 'digital', 'indie'],
      location: 'Seattle',
      likes: 1897,
      comments: 432,
      shares: 87,
      description: 'Creating a fantasy character concept from scratch! Watch my digital art process.'
    },
    {
      id: 8,
      title: 'Building a DIY Telescope - Science Show Live',
      streamer: 'ScienceGeek',
      viewers: 456,
      startedAt: '25 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1564460576398-ef55d99548b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'science',
      tags: ['diy', 'astronomy', 'trending'],
      location: 'Boston',
      likes: 2143,
      comments: 385,
      shares: 96,
      description: 'Building a functional telescope with basic materials! Perfect for stargazing beginners.'
    }
  ];

  const randomComments = [
    { text: "You're amazing!", user: "Sophia" },
    { text: "Love this content!", user: "JakeDM" },
    { text: "Can you do a tutorial next?", user: "TechGuru" },
    { text: "First time watching, instant follow!", user: "NewFan32" },
    { text: "How long have you been doing this?", user: "Curious92" },
    { text: "This is exactly what I needed today", user: "GratefulViewer" },
    { text: "Sending gifts! 🎁", user: "BigTipper" },
    { text: "Greetings from Germany!", user: "BerlinCaller" },
    { text: "Your energy is contagious!", user: "VibeChecker" },
    { text: "Do you stream every day?", user: "RegularWatcher" }
  ];

  // Handle scroll to detect which stream is currently in view
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Find which stream is most in view
      const index = Math.floor(scrollPosition / containerHeight);
      if (index >= 0 && index < liveStreams.length) {
        setActiveStreamIndex(index);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [liveStreams.length]);

  // Handle auto-playing videos when they come into view
  useEffect(() => {
    streamRefs.current.forEach((videoRef, index) => {
      if (!videoRef) return;

      if (index === activeStreamIndex && autoPlay) {
        videoRef.play().catch(err => console.log('Video play error:', err));
      } else {
        videoRef.pause();
      }
    });
  }, [activeStreamIndex, autoPlay]);

  // Add a floating heart animation
  const handleLike = (streamId: number) => {
    if (isLiked[streamId]) return;

    setIsLiked(prev => ({ ...prev, [streamId]: true }));

    // Add floating hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const newHeart = {
          id: Date.now() + i,
          streamId,
          x: 10 + Math.random() * 30, // Random position
          y: 0
        };
        
        setFloatingHearts(prev => [...prev, newHeart]);
        
        // Remove heart after animation completes
        setTimeout(() => {
          setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
        }, 3000);
      }, i * 100);
    }

    // Reset like button after animation
    setTimeout(() => {
      setIsLiked(prev => ({ ...prev, [streamId]: false }));
    }, 1000);
  };

  // Simulate random comments appearing
  useEffect(() => {
    const addRandomComment = () => {
      const randomStreamId = liveStreams[activeStreamIndex].id;
      const randomComment = randomComments[Math.floor(Math.random() * randomComments.length)];
      
      const newComment = {
        id: Date.now(),
        streamId: randomStreamId,
        text: randomComment.text,
        user: randomComment.user
      };
      
      setFloatingComments(prev => [...prev, newComment]);
      
      // Remove comment after animation
      setTimeout(() => {
        setFloatingComments(prev => prev.filter(comment => comment.id !== newComment.id));
      }, 4000);
    };

    const commentInterval = setInterval(addRandomComment, 2000);
    
    return () => clearInterval(commentInterval);
  }, [activeStreamIndex, liveStreams]);
  
  // Simulate random gifts appearing
  useEffect(() => {
    const addRandomGift = () => {
      if (Math.random() > 0.3) return; // Only show gifts occasionally
      
      const randomStreamId = liveStreams[activeStreamIndex].id;
      const giftTypes = ['coin', 'heart', 'star', 'flower', 'rocket'];
      const randomGift = giftTypes[Math.floor(Math.random() * giftTypes.length)];
      
      const newGift = {
        id: Date.now(),
        streamId: randomStreamId,
        type: randomGift
      };
      
      setFloatingGifts(prev => [...prev, newGift]);
      
      // Remove gift after animation
      setTimeout(() => {
        setFloatingGifts(prev => prev.filter(gift => gift.id !== newGift.id));
      }, 3000);
    };

    const giftInterval = setInterval(addRandomGift, 5000);
    
    return () => clearInterval(giftInterval);
  }, [activeStreamIndex, liveStreams]);

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Stories Section (Top) */}
        <div className="bg-gray-800 z-10">
          <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
            <div className="flex-shrink-0">
              <Link href="/go-live" className="flex flex-col items-center w-16">
                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                  <VideoCameraIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-white mt-1">Go Live</span>
              </Link>
            </div>
            
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center flex-shrink-0">
                <div className="relative cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full border-[2px] border-gray-900 overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {story.isLive && (
                    <div className="absolute -bottom-1 inset-x-0 flex justify-center">
                      <div className="px-1 py-0.5 bg-red-500 rounded-sm text-white text-[8px] font-medium">
                        LIVE
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs text-white mt-1 truncate w-14 text-center">{story.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* TikTok-style vertical scroll feed */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-scroll snap-y snap-mandatory"
          style={{ height: 'calc(100vh - 150px)' }}
        >
          {liveStreams.map((stream, index) => (
            <div 
              key={stream.id}
              className="h-full w-full snap-start snap-always relative"
            >
              {/* Video */}
              <div className="absolute inset-0 bg-black">
                {/* Placeholder image instead of video for demo - in production use actual video */}
                <div className="h-full w-full relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                  />
                  {/* This would be a video in production */}
                  {/* <video
                    ref={el => streamRefs.current[index] = el}
                    src={`/videos/stream${stream.id}.mp4`}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
              
              {/* Floating hearts animation */}
              <AnimatePresence>
                {floatingHearts
                  .filter(heart => heart.streamId === stream.id)
                  .map(heart => (
                    <motion.div
                      key={heart.id}
                      className="absolute pointer-events-none z-20"
                      initial={{ 
                        bottom: "10%", 
                        right: `${heart.x}%`, 
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
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    </motion.div>
                  ))
                }
              </AnimatePresence>
              
              {/* Floating gifts animation */}
              <AnimatePresence>
                {floatingGifts
                  .filter(gift => gift.streamId === stream.id)
                  .map(gift => (
                    <motion.div
                      key={gift.id}
                      className="absolute pointer-events-none z-20"
                      initial={{ 
                        bottom: "10%", 
                        left: `${Math.random() * 70 + 15}%`, 
                        opacity: 0,
                        scale: 0.5
                      }}
                      animate={{ 
                        bottom: "80%", 
                        opacity: [0, 1, 1, 0.5, 0],
                        scale: [0.5, 1.2, 1.5, 1.2, 1],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3, ease: "easeOut" }}
                    >
                      {gift.type === 'star' && (
                        <div className="bg-yellow-500 bg-opacity-70 rounded-full p-2">
                          <svg className="h-8 w-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>
                      )}
                      {gift.type === 'heart' && (
                        <div className="bg-red-500 bg-opacity-70 rounded-full p-2">
                          <HeartSolidIcon className="h-8 w-8 text-red-300" />
                        </div>
                      )}
                      {gift.type === 'coin' && (
                        <div className="bg-yellow-600 bg-opacity-70 rounded-full p-2">
                          <svg className="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v7h-2zm0 8h2v2h-2z" />
                          </svg>
                        </div>
                      )}
                      {gift.type === 'rocket' && (
                        <div className="bg-blue-500 bg-opacity-70 rounded-full p-2">
                          <svg className="h-8 w-8 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.13 22.19L11.5 18.36c-1.15.51-2.43.51-3.58 0L6.34 22.19C3.73 20.73 2 18.1 2 15.36v-3.17c0-2.73 1.73-5.36 4.34-6.82L8 1.62c1.73.77 3.35 2.07 4.34 3.73.99-1.66 2.61-2.96 4.34-3.73l1.66 3.75c2.61 1.46 4.34 4.09 4.34 6.82v3.17c0 2.74-1.73 5.37-4.34 6.83l-1.66 3.75c-1.37-.61-2.61-1.54-3.55-2.75zM12 8.42c-1.94 0-3.5 1.56-3.5 3.5s1.56 3.5 3.5 3.5 3.5-1.56 3.5-3.5-1.56-3.5-3.5-3.5z" />
                          </svg>
                        </div>
                      )}
                      {gift.type === 'flower' && (
                        <div className="bg-pink-500 bg-opacity-70 rounded-full p-2">
                          <svg className="h-8 w-8 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z" />
                          </svg>
                        </div>
                      )}
                    </motion.div>
                  ))
                }
              </AnimatePresence>
              
              {/* Floating comments */}
              <div className="absolute left-4 right-16 bottom-24 overflow-hidden z-10 pointer-events-none">
                <AnimatePresence>
                  {floatingComments
                    .filter(comment => comment.streamId === stream.id)
                    .slice(-3) // Only show the last 3 comments
                    .map((comment, commentIndex) => (
                      <motion.div
                        key={comment.id}
                        className="bg-black bg-opacity-40 backdrop-blur-sm rounded-full px-3 py-1.5 mb-2 max-w-xs"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center">
                          <span className="text-xs font-semibold text-white">{comment.user}: </span>
                          <span className="text-xs text-gray-200 ml-1">{comment.text}</span>
                        </div>
                      </motion.div>
                    ))
                  }
                </AnimatePresence>
              </div>
              
              {/* Stream info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                {/* Streamer info */}
                <div className="flex items-center mb-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src={stream.streamerImage} 
                        alt={stream.streamer} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5">
                      <PlusIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-white text-sm font-semibold">{stream.streamer}</h3>
                    <p className="text-gray-300 text-xs">{stream.title}</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-white text-sm mb-4">{stream.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {stream.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="bg-gray-800 bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <button 
                    className="bg-red-500 text-white text-sm px-4 py-2 rounded-full"
                    onClick={() => router.push(`/live/${stream.id}`)}
                  >
                    Enter Live
                  </button>
                  <div className="flex items-center space-x-1">
                    <span className="bg-black bg-opacity-50 p-1 rounded-md text-xs text-white">
                      <UserGroupIcon className="h-3 w-3 inline mr-1" />
                      {stream.viewers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Side action buttons */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 z-10">
                {/* Profile button */}
                <div className="flex flex-col items-center">
                  <button className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                    <img 
                      src={stream.streamerImage} 
                      alt={stream.streamer} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center -mt-2">
                    <PlusIcon className="h-3 w-3 text-white" />
                  </div>
                </div>
                
                {/* Like button */}
                <button 
                  className="flex flex-col items-center"
                  onClick={() => handleLike(stream.id)}
                >
                  <div className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                    {isLiked[stream.id] ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <span className="text-white text-xs mt-1">{stream.likes.toLocaleString()}</span>
                </button>
                
                {/* Comment button */}
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                    <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{stream.comments.toLocaleString()}</span>
                </button>
                
                {/* Gift button */}
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                    <GiftIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">Gift</span>
                </button>
                
                {/* Share button */}
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                    <ShareIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{stream.shares.toLocaleString()}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

// Plus icon component
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
  )
} 