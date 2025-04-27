'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SparklesIcon, UserIcon, ChatBubbleLeftIcon, HandThumbUpIcon, XMarkIcon, HeartIcon, CheckIcon } from '@heroicons/react/24/outline'
import AppLayout from '../components/AppLayout'

export default function FantasyPage() {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [selectedPreference, setSelectedPreference] = useState<'submissive' | 'dominant' | null>(null);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Check for existing preference on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('userPreference') as 'submissive' | 'dominant' | null;
    if (savedPreference) {
      setSelectedPreference(savedPreference);
    }
  }, []);

  // Save preference to localStorage when user confirms
  const savePreference = (preference: 'submissive' | 'dominant' | null) => {
    if (preference) {
      localStorage.setItem('userPreference', preference);
      showToastNotification(`Preferences set for preferred recommended content`);
    } else {
      localStorage.removeItem('userPreference');
      showToastNotification('Preference cleared');
    }
  };

  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePreferenceClick = (preference: 'submissive' | 'dominant') => {
    // If they click the same preference they already selected, toggle it off
    if (selectedPreference === preference) {
      setSelectedPreference(null);
      savePreference(null);
      return;
    }
    
    setSelectedPreference(preference);
    setIsButtonAnimating(true);
    
    // Animate the button press and directly save preference
    setTimeout(() => {
      setIsButtonAnimating(false);
      savePreference(preference);
    }, 500);
  };

  const stories = [
    {
      id: 1,
      title: "The Heart's Surrender",
      author: 'ElvenWriter',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'When powerful CEO Alexander first met the headstrong artist Sophia, neither expected the intense passion that would ignite between them...',
      category: 'romance',
      tags: ['Romance', 'Passion', 'Desire'],
      views: 67800,
      likes: 12543,
      comments: 2187,
      date: '1 day ago'
    },
    {
      id: 2,
      title: "The Witch's Familiar",
      author: 'MysticScribe',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'She never wanted a familiar, especially not one as troublesome as this snarky black cat with golden eyes and secrets of his own...',
      category: 'witches',
      tags: ['Witches', 'Familiars', 'Magic'],
      views: 38900,
      likes: 7154,
      comments: 986,
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Starship Odyssey',
      author: 'CosmicTales',
      authorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'The crew of the Andromeda was sent to explore a newly discovered planet, but what they found there defied all scientific explanation...',
      category: 'scifi',
      tags: ['Space', 'Exploration', 'Aliens'],
      views: 31200,
      likes: 5876,
      comments: 754,
      date: '2 weeks ago'
    },
    {
      id: 4,
      title: 'The Forgotten Kingdom',
      author: 'LegendMaster',
      authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'Hidden behind magical mists, the ancient kingdom of Avaloria awaited its rightful heir. The crown would only accept one of true royal blood...',
      category: 'medieval',
      tags: ['Kingdom', 'Royalty', 'Magic'],
      views: 29800,
      likes: 5421,
      comments: 687,
      date: '3 weeks ago'
    },
    {
      id: 5,
      title: 'Whispers in the Shadows',
      author: 'NightScribe',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'The old mansion had a reputation for being haunted, but Claire never believed in ghosts... until she started hearing the whispers...',
      category: 'paranormal',
      tags: ['Ghosts', 'Haunting', 'Mystery'],
      views: 27500,
      likes: 4932,
      comments: 612,
      date: '1 month ago'
    },
    {
      id: 6,
      title: 'The Last Spellcaster',
      author: 'ArcaneMage',
      authorImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'With magic dying out across the land, Elara discovered she might be the last person capable of casting the ancient spells...',
      category: 'magic',
      tags: ['Spells', 'Ancient', 'Power'],
      views: 25300,
      likes: 4576,
      comments: 543,
      date: '1 month ago'
    },
    {
      id: 7,
      title: 'Fae Contracts',
      author: 'EnchantedScribe',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'Never sign a contract with the fae without reading the fine print. Unfortunately, Thomas only learned this lesson after it was too late...',
      category: 'fae',
      tags: ['Faeries', 'Contracts', 'Trickery'],
      views: 23900,
      likes: 4321,
      comments: 498,
      date: '2 months ago'
    },
    {
      id: 8,
      title: "The Time Traveler's Journal",
      author: 'ChronoWanderer',
      authorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'The journal appeared on his doorstep with notes written in his own handwriting, but he hadn\'t written them yet. The dates were from the future...',
      category: 'time',
      tags: ['Time Travel', 'Paradox', 'Mystery'],
      views: 22100,
      likes: 3987,
      comments: 465,
      date: '2 months ago'
    }
  ];

  const getFilteredStories = () => {
    if (activeCategory === 'trending') {
      return [...stories].sort((a, b) => b.views - a.views);
    } else if (activeCategory !== 'all') {
      return stories.filter(story => story.category === activeCategory);
    }
    return stories;
  };

  return (
    <AppLayout userPreference={selectedPreference}>
      <div>
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg ${
              selectedPreference === 'submissive' 
                ? 'bg-purple-600 text-white' 
                : selectedPreference === 'dominant' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-white'
            }`}>
              <CheckIcon className="h-5 w-5" />
              <span className="text-sm font-medium">{toastMessage}</span>
            </div>
          </div>
        )}

        <div className="flex items-center mb-6">
          <SparklesIcon className="h-6 w-6 text-purple-500 mr-2" />
          <h1 className="text-2xl font-bold text-white">Fantasy Stories</h1>
        </div>

        {/* Featured Story Banner */}
        <div className="mb-10">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Featured Story" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  alt="Author" 
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <p className="text-white text-sm ml-2">ElvenWriter</p>
                <span className="mx-2 text-gray-400">•</span>
                <p className="text-gray-400 text-sm">Featured Story</p>
              </div>
              <h2 className="text-4xl font-bold text-white mb-3">The Heart's Surrender</h2>
              <p className="text-gray-300 mb-6 max-w-2xl">Select your preference below to personalize your experience. Choosing "Submissive" or "Dominant" will customize your content recommendations and match you with compatible partners. Your preference will appear in the header for easy access and can be toggled off at any time.</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handlePreferenceClick('submissive')}
                  className={`bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform ${
                    selectedPreference === 'submissive' 
                      ? 'ring-2 ring-white bg-purple-700' 
                      : ''
                  } ${
                    isButtonAnimating && selectedPreference === 'submissive' 
                      ? 'scale-90 bg-purple-800 ring-4 ring-purple-400 ring-opacity-50 shadow-lg shadow-purple-600/50' 
                      : 'hover:shadow-md hover:shadow-purple-600/30'
                  }`}
                >
                  <span className="flex items-center">
                    <HeartIcon className={`h-5 w-5 mr-2 ${isButtonAnimating && selectedPreference === 'submissive' ? 'animate-ping' : ''}`} />
                    Submissive
                  </span>
                </button>
                <button 
                  onClick={() => handlePreferenceClick('dominant')}
                  className={`bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform ${
                    selectedPreference === 'dominant' 
                      ? 'ring-2 ring-white bg-red-700' 
                      : ''
                  } ${
                    isButtonAnimating && selectedPreference === 'dominant' 
                      ? 'scale-90 bg-red-800 ring-4 ring-red-400 ring-opacity-50 shadow-lg shadow-red-600/50' 
                      : 'hover:shadow-md hover:shadow-gray-500/30 hover:bg-red-700'
                  }`}
                >
                  <span className="flex items-center">
                    <HeartIcon className={`h-5 w-5 mr-2 ${isButtonAnimating && selectedPreference === 'dominant' ? 'animate-ping' : ''}`} />
                    Dominant
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="overflow-x-auto whitespace-nowrap mb-8 pb-2 scrollbar-hide">
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setActiveCategory('trending')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'trending' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveCategory('romance')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'romance' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Romance
            </button>
            <button
              onClick={() => setActiveCategory('dragons')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'dragons' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Dragons
            </button>
            <button
              onClick={() => setActiveCategory('magic')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'magic' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Magic
            </button>
            <button
              onClick={() => setActiveCategory('medieval')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'medieval' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Medieval
            </button>
            <button
              onClick={() => setActiveCategory('witches')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'witches' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Witches
            </button>
            <button
              onClick={() => setActiveCategory('scifi')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'scifi' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Sci-Fi
            </button>
            <button
              onClick={() => setActiveCategory('paranormal')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'paranormal' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Paranormal
            </button>
          </div>
        </div>
        
        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredStories().map((story) => (
            <div key={story.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={story.coverImage} 
                  alt={story.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-bold text-lg">{story.title}</h3>
                  <div className="flex items-center mt-1">
                    <img 
                      src={story.authorImage} 
                      alt={story.author} 
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <p className="text-gray-300 text-sm">{story.author}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{story.preview}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      <span>{(story.views / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center">
                      <HandThumbUpIcon className="h-4 w-4 mr-1" />
                      <span>{(story.likes / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                  <span>{story.date}</span>
                </div>
                <Link 
                  href={`/fantasy/${story.id}`}
                  className="mt-4 block bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg py-2 font-medium transition-colors"
                >
                  Read Story
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Write Your Own CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-800 to-blue-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Have a story to tell?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">Share your fantasy worlds with our community of readers and writers.</p>
          <button className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
            Start Writing
          </button>
        </div>
      </div>
    </AppLayout>
  )
} 