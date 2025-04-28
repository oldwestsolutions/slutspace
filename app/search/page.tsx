'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  VideoCameraIcon, 
  UserCircleIcon, 
  PhotoIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  UserGroupIcon,
  Squares2X2Icon,
  FilmIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowRightIcon,
  VideoCameraSlashIcon,
  PlayIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid 
} from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Define proper TypeScript interfaces that match the actual data structure
interface VideoType {
  id: string;
  username: string;
  userImage: string;
  thumbnail: string;
  duration: string;
  views: number;
  title: string;
  date: string;
  likes: number;
  comments: number;
}

interface PhotoType {
  id: string;
  username: string;
  userImage: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  date: string;
}

interface ModelType {
  id: string;
  username: string;
  name: string;
  followers: number;
  isVerified: boolean;
  profileImage: string;
  bio: string;
  postsCount: number;
}

// Update the initial videos to match the actual structure
const initialVideos: VideoType[] = [
  { 
    id: 'video1', 
    username: 'sophie_model', 
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
    duration: '2:45', 
    views: 45600,
    title: 'Summer fashion lookbook 2023',
    date: '2023-08-14',
    likes: 342,
    comments: 56
  },
  { 
    id: 'video2', 
    username: 'alex_star', 
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    thumbnail: 'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1',
    duration: '8:12', 
    views: 32800,
    title: 'Full body workout routine',
    date: '2023-08-11',
    likes: 342,
    comments: 56
  },
  { 
    id: 'video3', 
    username: 'emma_rose', 
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    thumbnail: 'https://images.unsplash.com/photo-1580554996018-ff8b408fc162',
    duration: '4:37', 
    views: 27400,
    title: 'Paris vlog day 2',
    date: '2023-08-09',
    likes: 342,
    comments: 56
  }
];

// Sample models data
const models = [
  { 
    id: 'user1', 
    username: 'sophie_model', 
    name: 'Sophie J.',
    followers: 158000, 
    isVerified: true,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Fashion model & content creator',
    postsCount: 240
  },
  { 
    id: 'user2', 
    username: 'alex_star', 
    name: 'Alex Star',
    followers: 89400, 
    isVerified: true,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Fitness & lifestyle model',
    postsCount: 186
  },
  { 
    id: 'user3', 
    username: 'emma_rose', 
    name: 'Emma Rose',
    followers: 67800, 
    isVerified: false,
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    bio: 'Travel enthusiast & model',
    postsCount: 124
  }
];

// Sample photos data
const photos = [
  { 
    id: 'photo1', 
    username: 'sophie_model', 
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    image: 'https://images.unsplash.com/photo-1516575832020-0933dd936006',
    likes: 12450, 
    comments: 238,
    caption: 'Beach day vibes ☀️ #summer',
    date: '2023-08-15'
  },
  { 
    id: 'photo2', 
    username: 'alex_star', 
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    image: 'https://images.unsplash.com/photo-1547586696-ea22b4d4235d',
    likes: 8670, 
    comments: 154,
    caption: 'Morning workout routine 💪',
    date: '2023-08-12'
  },
  { 
    id: 'photo3', 
    username: 'emma_rose', 
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    likes: 7340, 
    comments: 98,
    caption: 'City explore day',
    date: '2023-08-10'
  }
];

// Sample videos data
const videos = [
  { 
    id: 'video1', 
    username: 'sophie_model', 
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
    duration: '2:45', 
    views: 45600,
    title: 'Summer fashion lookbook 2023',
    date: '2023-08-14',
    likes: 342,
    comments: 56
  },
  { 
    id: 'video2', 
    username: 'alex_star', 
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    thumbnail: 'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1',
    duration: '8:12', 
    views: 32800,
    title: 'Full body workout routine',
    date: '2023-08-11',
    likes: 342,
    comments: 56
  },
  { 
    id: 'video3', 
    username: 'emma_rose', 
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    thumbnail: 'https://images.unsplash.com/photo-1580554996018-ff8b408fc162',
    duration: '4:37', 
    views: 27400,
    title: 'Paris vlog day 2',
    date: '2023-08-09',
    likes: 342,
    comments: 56
  }
];

// Client-side only component that uses useSearchParams
function SearchContent() {
  const [activeTab, setActiveTab] = useState<'videos' | 'photos' | 'models'>('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [sortOption, setSortOption] = useState<'rating' | 'newest' | 'views' | 'trending'>('rating');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<
    | { type: 'videos'; data: VideoType[] }
    | { type: 'photos'; data: PhotoType[] }
    | { type: 'models'; data: ModelType[] }
  >({ type: 'videos', data: initialVideos });
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    duration: 'any',
    date: 'any',
    sort: 'relevance'
  });
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  
  // Get search params from URL
  const searchParams = useSearchParams();

  // Initialize with videos by default and check for query params
  useEffect(() => {
    // Set initial results to videos when the component mounts
    setSearchResults({ type: 'videos', data: initialVideos });
    
    // Check if there's a search query in the URL
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
      // Perform search with the query from URL
      setTimeout(() => {
        handleSearchWithQuery(queryParam);
      }, 100);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    handleSearchWithQuery(searchQuery);
  };

  const handleSearchWithQuery = (query: string) => {
    if (!query.trim()) return;
    
    setSearching(true);
    
    // Simulate search loading
    setTimeout(() => {
      let results;
      
      switch (activeTab) {
        case 'videos':
          results = videos.filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults({ type: 'videos', data: results });
          break;
        case 'photos':
          results = photos.filter(photo => 
            photo.caption?.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults({ type: 'photos', data: results });
          break;
        case 'models':
          results = models.filter(model => 
            model.name.toLowerCase().includes(query.toLowerCase()) ||
            model.bio.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults({ type: 'models', data: results });
          break;
      }
      
      setSearching(false);
    }, 500);
  };

  const handleTabChange = (tab: 'videos' | 'photos' | 'models') => {
    setActiveTab(tab);
    
    // Reset search results based on new tab
    switch (tab) {
      case 'videos':
        setSearchResults({ type: 'videos', data: videos });
        break;
      case 'photos':
        setSearchResults({ type: 'photos', data: photos });
        break;
      case 'models':
        setSearchResults({ type: 'models', data: models });
        break;
    }
  };

  const toggleLike = (id: string, type: 'videos' | 'photos' | 'models') => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: string, type: 'videos' | 'photos' | 'models') => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSortChange = (option: 'rating' | 'newest' | 'views' | 'trending') => {
    setSortOption(option);
    setShowSortDropdown(false);
    
    // Only sort if we have video results
    if (searchResults.type === 'videos') {
      const sortedVideos = [...searchResults.data].sort((a, b) => {
        switch (option) {
          case 'rating':
            return b.likes - a.likes;
          case 'newest':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'views':
            return b.views - a.views;
          case 'trending':
            return (b.views / (new Date().getTime() - new Date(b.date).getTime())) - 
                   (a.views / (new Date().getTime() - new Date(a.date).getTime()));
          default:
            return 0;
        }
      });
      setSearchResults({ ...searchResults, data: sortedVideos });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">
            SlutSpace
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Search</h1>
        
        {/* Mobile Search UI */}
        <div className="flex flex-col space-y-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for videos, photos, or models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-2.5 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
            >
              Search
            </button>
          </div>
          
          <div className="flex justify-between bg-gray-800 p-1 rounded-full">
            <button
              onClick={() => handleTabChange('videos')}
              className={`flex-1 py-2 px-4 rounded-full text-center text-sm ${
                activeTab === 'videos' ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => handleTabChange('photos')}
              className={`flex-1 py-2 px-4 rounded-full text-center text-sm ${
                activeTab === 'photos' ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => handleTabChange('models')}
              className={`flex-1 py-2 px-4 rounded-full text-center text-sm ${
                activeTab === 'models' ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              Models
            </button>
          </div>
        </div>
        
        {/* Desktop Search UI */}
        <div className="hidden md:flex space-x-4 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for videos, photos, or models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
          >
            Search
          </button>
          
          <div className="flex bg-gray-800 p-1 rounded-full">
            <button
              onClick={() => handleTabChange('videos')}
              className={`py-2 px-6 rounded-full ${
                activeTab === 'videos' ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => handleTabChange('photos')}
              className={`py-2 px-6 rounded-full ${
                activeTab === 'photos' ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => handleTabChange('models')}
              className={`py-2 px-6 rounded-full ${
                activeTab === 'models' ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              Models
            </button>
          </div>

          {/* Sort Dropdown */}
          {activeTab === 'videos' && (
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-sm">Sort by: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                  <div className="py-1">
                    {['rating', 'newest', 'views', 'trending'].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSortChange(option as 'rating' | 'newest' | 'views' | 'trending')}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          sortOption === option
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        {searching ? (
          // Render loading skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-700 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Render videos */}
              {searchResults.type === 'videos' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.data.length > 0 ? (
                    searchResults.data.map((video) => (
                      <motion.div
                        key={video.id}
                        whileHover={{ y: -5 }}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-medium truncate">{video.title}</h3>
                          <div className="mt-2 flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src={video.userImage}
                                alt={video.username}
                                className="h-8 w-8 rounded-full mr-2 object-cover"
                              />
                              <span className="text-gray-300 text-sm">{video.username}</span>
                            </div>
                            <div className="text-gray-400 text-xs">{video.views} views</div>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => toggleLike(video.id, 'videos')}
                                className="flex items-center text-gray-400 hover:text-red-500"
                              >
                                {likedItems.includes(video.id) ? (
                                  <HeartIconSolid className="h-5 w-5 text-red-500" />
                                ) : (
                                  <HeartIcon className="h-5 w-5" />
                                )}
                                <span className="ml-1 text-xs">{video.likes}</span>
                              </button>
                              <button className="flex items-center text-gray-400 hover:text-gray-300">
                                <ChatBubbleLeftIcon className="h-5 w-5" />
                                <span className="ml-1 text-xs">{video.comments}</span>
                              </button>
                            </div>
                            <button
                              onClick={() => toggleSave(video.id, 'videos')}
                              className="text-gray-400 hover:text-yellow-500"
                            >
                              {savedItems.includes(video.id) ? (
                                <BookmarkIconSolid className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <BookmarkIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <VideoCameraIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                      <h3 className="text-xl text-white font-medium">No videos found</h3>
                      <p className="text-gray-400 mt-2">Try different search terms</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Render photos */}
              {searchResults.type === 'photos' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.data.length > 0 ? (
                    searchResults.data.map((photo) => (
                      <motion.div
                        key={photo.id}
                        whileHover={{ scale: 1.03 }}
                        className="group relative aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={photo.image}
                          alt={photo.caption}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-sm font-medium line-clamp-1">{photo.caption}</p>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => toggleLike(photo.id, 'photos')}
                                  className="flex items-center text-gray-300 hover:text-red-500"
                                >
                                  {likedItems.includes(photo.id) ? (
                                    <HeartIconSolid className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <HeartIcon className="h-4 w-4" />
                                  )}
                                  <span className="ml-1 text-xs">{photo.likes}</span>
                                </button>
                              </div>
                              <button
                                onClick={() => toggleSave(photo.id, 'photos')}
                                className="text-gray-300 hover:text-yellow-500"
                              >
                                {savedItems.includes(photo.id) ? (
                                  <BookmarkIconSolid className="h-4 w-4 text-yellow-500" />
                                ) : (
                                  <BookmarkIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <PhotoIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                      <h3 className="text-xl text-white font-medium">No photos found</h3>
                      <p className="text-gray-400 mt-2">Try different search terms</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Render models */}
              {searchResults.type === 'models' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {searchResults.data.length > 0 ? (
                    searchResults.data.map((model) => (
                      <motion.div
                        key={model.id}
                        whileHover={{ y: -5 }}
                        className="bg-gray-800 rounded-lg p-4 text-center"
                      >
                        <Link href={`/profile/${model.id}`} className="block">
                          <img
                            src={model.profileImage}
                            alt={model.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mx-auto mb-3"
                          />
                          <h3 className="text-white font-medium">{model.name}</h3>
                          {model.isVerified && (
                            <span className="inline-flex items-center text-blue-500 text-sm">
                              <CheckBadgeIcon className="h-4 w-4 mr-1" />
                              Verified
                            </span>
                          )}
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{model.bio}</p>
                          <div className="flex justify-center space-x-4 text-xs text-gray-400">
                            <div>{model.followers} followers</div>
                            <div>{model.postsCount} posts</div>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-4 rounded-full w-full"
                          >
                            Follow
                          </motion.button>
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <UserIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                      <h3 className="text-xl text-white font-medium">No models found</h3>
                      <p className="text-gray-400 mt-2">Try different search terms</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-white mb-8">Search</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-700 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
} 