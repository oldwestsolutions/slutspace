'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    },
    {
      id: 9,
      title: "The Last Dragon",
      author: 'DragonHeart',
      authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      coverImage: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      preview: 'In a world where dragons were thought to be extinct, a young girl discovers an egg that could change everything...',
      category: 'fantasy',
      tags: ['Dragons', 'Adventure', 'Magic'],
      views: 19800,
      likes: 3654,
      comments: 432,
      date: '3 months ago'
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
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <Link href="/for-you/feed/1" className="block">
          <div className="relative h-[60vh] min-h-[500px] cursor-pointer group">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Featured Story"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:translate-y-[-8px] transition-transform duration-300">For You</h1>
              </div>
            </div>
          </div>
        </Link>

        {/* Stories Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredStories().map((story) => (
              <Link 
                key={story.id}
                href={`/for-you/feed/${story.id}`}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800 hover:scale-[1.02] transition-transform duration-300"
              >
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm text-gray-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 