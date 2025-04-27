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

  // Generate more streams for each category
  const categoryStreams = {
    recommended: [...liveStreams].sort(() => 0.5 - Math.random()),
    popular: [...liveStreams].sort((a, b) => b.viewers - a.viewers),
    new: [...liveStreams].sort(() => 0.5 - Math.random()),
    lastWatch: [...liveStreams].slice(0, 4).sort(() => 0.5 - Math.random()),
    indie: liveStreams.filter(stream => stream.tags.includes('indie')),
    recentlyWatched: [...liveStreams].slice(0, 5).sort(() => 0.5 - Math.random()),
    favoriteTag: liveStreams.filter(stream => stream.tags.includes('trending')),
    trending: liveStreams.filter(stream => stream.tags.includes('trending')),
    nearYou: [...liveStreams].sort(() => 0.5 - Math.random()),
    topRated: [...liveStreams].sort(() => 0.5 - Math.random())
  };

  const categories = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'new', name: 'New' },
    { id: 'lastWatch', name: 'Based on Your Last Watch' },
    { id: 'indie', name: 'Indie' },
    { id: 'recentlyWatched', name: 'Recently Watched' },
    { id: 'favoriteTag', name: 'Favorite Tag' },
    { id: 'trending', name: 'Trending' },
    { id: 'nearYou', name: 'Near You' },
    { id: 'topRated', name: 'Top Rated' }
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

  // Video card component for reuse
  const VideoCard = ({ stream }: { stream: typeof liveStreams[0] }) => (
    <div 
      className="block bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow hover:bg-gray-750 cursor-pointer"
      onClick={() => router.push(`/live/${stream.id}`)}
    >
      <div className="relative">
        <img 
          src={stream.thumbnail} 
          alt={stream.title} 
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded flex items-center">
          <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
          <span>{stream.viewers.toLocaleString()}</span>
        </div>
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
          <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-0.5 animate-pulse"></span>
          <span>LIVE</span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start space-x-2">
          <img 
            src={stream.streamerImage} 
            alt={stream.streamer} 
            className="w-8 h-8 rounded-full mt-1 border border-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/live/${stream.id}`);
            }}
          />
          <div>
            <h3 className="text-white font-medium line-clamp-1 text-sm">{stream.title}</h3>
            <p className="text-gray-400 text-xs">{stream.streamer}</p>
            <p className="text-gray-500 text-xs">{stream.category} • {stream.startedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="h-full overflow-y-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4 pt-4">
          <h1 className="text-xl font-bold text-white">Live</h1>
          <Link href="/go-live" className="bg-red-500 text-white text-sm px-4 py-2 rounded-full flex items-center">
            <VideoCameraIcon className="h-4 w-4 mr-1" />
            Go Live
          </Link>
        </div>
        
        {/* All category sections displayed as rows */}
        {categories.map(category => (
          <div key={category.id} className="mb-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{category.name}</h2>
              <Link href={`/live/categories/${category.id}`} className="text-sm text-blue-400">See all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryStreams[category.id as keyof typeof categoryStreams].slice(0, 4).map(stream => (
                <VideoCard key={`${category.id}-${stream.id}`} stream={stream} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

// Plus icon component
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
  )
} 