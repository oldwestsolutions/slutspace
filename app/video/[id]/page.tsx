'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { 
  ChevronLeftIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  PaperAirplaneIcon, 
  BookmarkIcon,
  ShareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import AppLayout from '../../components/AppLayout'

export default function VideoPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = parseInt(params.id as string)
  
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [currentStream, setCurrentStream] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [commentText, setCommentText] = useState('')
  
  // Mock data - would normally come from an API
  const liveStreams = [
    {
      id: 1,
      title: 'Live Coding: Building a React App from Scratch',
      streamer: 'CodeMaster',
      viewers: 1234,
      startedAt: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'tech',
      likes: 253,
      comments: 124,
      description: 'Join me as I build a complete React application from scratch. We\'ll cover component structure, state management, and styling with Tailwind CSS.'
    },
    {
      id: 2,
      title: 'PUBG Mobile Tournament Finals - Road to Champion',
      streamer: 'GamingPro',
      viewers: 8765,
      startedAt: '30 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'gaming',
      likes: 1547,
      comments: 348,
      description: 'Watch the exciting finals of our PUBG Mobile tournament! Top players competing for the championship title and $10,000 prize pool.'
    },
    {
      id: 3,
      title: 'Live Piano Session - Taking Requests!',
      streamer: 'MusicWorld',
      viewers: 567,
      startedAt: '1 hour ago',
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'music',
      likes: 742,
      comments: 98,
      description: 'Relaxing piano session where I\'ll be taking your requests. Drop your favorite songs in the chat!'
    },
    {
      id: 4,
      title: 'Making Homemade Pasta - Italian Cooking Show',
      streamer: 'CookingMaster',
      viewers: 890,
      startedAt: '45 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'food',
      likes: 325,
      comments: 86,
      description: 'Learn how to make authentic Italian pasta from scratch. I\'ll share my family recipes passed down for generations.'
    },
    {
      id: 5,
      title: 'Full Body HIIT Workout - Join Me!',
      streamer: 'FitnessHub',
      viewers: 345,
      startedAt: '15 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'fitness',
      likes: 198,
      comments: 42,
      description: 'Get ready for an intense 30-minute HIIT workout that will burn calories and boost your energy. No equipment needed!'
    },
    {
      id: 6,
      title: 'Exploring Tokyo at Night - Japan Travel Vlog',
      streamer: 'TravelExplorer',
      viewers: 678,
      startedAt: '3 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'travel',
      likes: 412,
      comments: 78,
      description: 'Join me as I explore the vibrant nightlife of Tokyo! We\'ll visit popular spots and discover hidden gems in this amazing city.'
    },
    {
      id: 7,
      title: 'Digital Art Session - Drawing Fantasy Characters',
      streamer: 'ArtStudio',
      viewers: 234,
      startedAt: '50 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'art',
      likes: 156,
      comments: 29,
      description: 'Watch me create fantasy character designs using digital art techniques. Perfect for aspiring artists and fantasy enthusiasts.'
    },
    {
      id: 8,
      title: 'Building a DIY Telescope - Science Show Live',
      streamer: 'ScienceGeek',
      viewers: 456,
      startedAt: '25 minutes ago',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      streamerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      category: 'science',
      likes: 267,
      comments: 54,
      description: 'Learn how to build your own telescope with common materials. We\'ll cover the science behind telescopes and practical assembly tips.'
    }
  ];

  // Mock comments
  const dummyComments = [
    { id: 1, user: 'AstroFan42', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', text: 'This is amazing content! Keep it up!', time: '5 minutes ago', likes: 12 },
    { id: 2, user: 'TechEnthusiast', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', text: 'I learned so much from this stream. Thanks for sharing your knowledge!', time: '10 minutes ago', likes: 8 },
    { id: 3, user: 'DigitalNomad', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', text: 'Can you explain that last part again? I missed it.', time: '15 minutes ago', likes: 3 },
    { id: 4, user: 'GamingGuru', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', text: 'Your streams are always the highlight of my day!', time: '20 minutes ago', likes: 15 },
    { id: 5, user: 'CreativeSoul', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', text: 'I tried this technique last week and it worked perfectly!', time: '30 minutes ago', likes: 7 }
  ];

  useEffect(() => {
    // Simulate loading the video
    setIsLoading(true);
    
    // Find the stream with the matching ID
    const stream = liveStreams.find(s => s.id === videoId);
    if (stream) {
      setCurrentStream(stream);
      setComments(dummyComments);
    } else {
      // Handle not found case
      router.push('/live');
    }
    
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [videoId, router]);

  // Get recommendations (excluding current video)
  const recommendations = liveStreams.filter(stream => stream.id !== videoId);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Add the new comment
    const newComment = {
      id: comments.length + 1,
      user: 'CurrentUser',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      text: commentText,
      time: 'Just now',
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (isLoading || !currentStream) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-full mx-auto">
        {/* Back button */}
        <div className="mb-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-400 hover:text-white"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main video content */}
          <div className="lg:col-span-2">
            {/* Video player */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                {/* Replace with actual video player component */}
                <img 
                  src={currentStream.thumbnail} 
                  alt={currentStream.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full h-16 w-16 flex items-center justify-center">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-70 text-white px-3 py-2 rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse absolute -top-0.5 -right-0.5"></div>
                          <span className="text-red-500 font-medium">LIVE</span>
                        </div>
                        <span className="mx-2">•</span>
                        <span>{currentStream.viewers.toLocaleString()} viewers</span>
                      </div>
                      <div className="flex space-x-3">
                        <button className="hover:text-gray-300">
                          <ShareIcon className="h-5 w-5" />
                        </button>
                        <button className="hover:text-gray-300">
                          <FlagIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video info */}
            <div className="mt-4 bg-gray-800 rounded-lg p-4">
              <h1 className="text-xl font-bold text-white mb-2">{currentStream.title}</h1>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={currentStream.streamerImage} 
                    alt={currentStream.streamer} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-white font-medium">{currentStream.streamer}</p>
                    <p className="text-gray-400 text-sm">Started {currentStream.startedAt}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition">
                    Follow
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">
                    Subscribe
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4 border-t border-b border-gray-700 py-3 mb-4">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  <HandThumbUpIcon className="h-5 w-5 mr-1" />
                  <span>{isLiked ? currentStream.likes + 1 : currentStream.likes}</span>
                </button>
                <button className="flex items-center text-gray-300 hover:text-white">
                  <HandThumbDownIcon className="h-5 w-5 mr-1" />
                  <span>Dislike</span>
                </button>
                <button className="flex items-center text-gray-300 hover:text-white">
                  <ShareIcon className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  <BookmarkIcon className="h-5 w-5 mr-1" />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-3 mb-4">
                <p className="text-white text-sm">{currentStream.description}</p>
              </div>
              
              {/* Comments section */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Comments ({comments.length})</h3>
                
                <form onSubmit={handleCommentSubmit} className="flex mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Your avatar" 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      type="submit"
                      disabled={!commentText.trim()}
                      className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-3 py-1 rounded-full text-sm font-medium transition"
                    >
                      Post
                    </button>
                  </div>
                </form>
                
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex">
                      <img 
                        src={comment.avatar} 
                        alt={comment.user} 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <p className="text-white font-medium mr-2">{comment.user}</p>
                          <p className="text-gray-400 text-xs">{comment.time}</p>
                        </div>
                        <p className="text-white text-sm mb-1">{comment.text}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <button className="flex items-center hover:text-white">
                            <HandThumbUpIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="hover:text-white">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Recommended Streams</h3>
            <div className="space-y-4">
              {recommendations.slice(0, 5).map(stream => (
                <Link 
                  key={stream.id} 
                  href={`/video/${stream.id}`}
                  className="flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors"
                >
                  <div className="w-40 h-24 relative flex-shrink-0">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                      {stream.viewers.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 flex-1">
                    <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{stream.title}</h4>
                    <p className="text-gray-400 text-xs mb-1">{stream.streamer}</p>
                    <div className="flex items-center">
                      <div className="flex items-center text-xs text-red-500">
                        <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-0.5 animate-pulse"></span>
                        <span>LIVE</span>
                      </div>
                      <span className="mx-1 text-gray-500 text-xs">•</span>
                      <span className="text-gray-400 text-xs">{stream.startedAt}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 