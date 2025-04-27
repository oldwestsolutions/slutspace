'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)
  
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

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
    setShowControls(!showControls);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
            <div ref={videoRef} className="relative bg-black rounded-lg overflow-hidden group">
              <div className="aspect-video relative" onClick={handleVideoClick}>
                {/* Replace with actual video player component */}
                <img 
                  src={currentStream.thumbnail} 
                  alt={currentStream.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Play/Pause overlay */}
                {showControls && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full h-16 w-16 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      {isPlaying ? (
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                        </svg>
                      ) : (
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Video controls */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="space-y-2">
                    {/* Progress bar */}
                    <div className="relative">
                      <div className="h-1 bg-gray-600 rounded-full">
                        <div 
                          className="h-1 bg-red-500 rounded-full" 
                          style={{ width: `${videoProgress}%` }}
                        ></div>
                      </div>
                      <div 
                        className="absolute top-1/2 -translate-y-1/2" 
                        style={{ left: `${videoProgress}%` }}
                      >
                        <div className="w-3 h-3 bg-red-500 rounded-full -mt-1"></div>
                      </div>
                    </div>
                    
                    {/* Controls row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button onClick={togglePlay} className="text-white hover:text-gray-300">
                          {isPlaying ? (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"></path>
                            </svg>
                          )}
                        </button>
                        
                        {/* Volume control */}
                        <div className="flex items-center space-x-2">
                          <button className="text-white hover:text-gray-300">
                            {volume === 0 ? (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 1 0 1.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"></path>
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                              </svg>
                            )}
                          </button>
                          <div className="w-20 lg:w-32">
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={volume} 
                              onChange={handleVolumeChange}
                              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                        
                        {/* Time display */}
                        <div className="text-white text-xs">
                          {formatTime(videoProgress * 5)} / {formatTime(500)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Settings */}
                        <button className="text-white hover:text-gray-300">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
                          </svg>
                        </button>
                        
                        {/* Fullscreen */}
                        <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                          {isFullscreen ? (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Live indicator */}
                <div className="absolute top-4 left-4">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                    <div className="relative">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="ml-2 text-sm font-semibold">LIVE</span>
                  </div>
                </div>
                
                {/* Viewer count */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                    <span className="text-sm">{currentStream.viewers.toLocaleString()} viewers</span>
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
                  <button
                    onClick={handleLike}
                    className={`px-4 py-2 rounded-md font-medium flex items-center ${
                      isLiked 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="h-5 w-5 mr-1" />
                    ) : (
                      <HeartIcon className="h-5 w-5 mr-1" />
                    )}
                    Like
                  </button>
                  <button
                    onClick={handleSave}
                    className={`px-4 py-2 rounded-md font-medium flex items-center ${
                      isSaved 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    <BookmarkIcon className="h-5 w-5 mr-1" />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
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
            <h3 className="text-lg font-medium text-white mb-4">For You Streams</h3>
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