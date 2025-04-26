'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeartIcon, MapPinIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function DatingPage() {
  const [activeFilter, setActiveFilter] = useState('featured');
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  
  const toggleLike = (id: number) => {
    if (likedProfiles.includes(id)) {
      setLikedProfiles(likedProfiles.filter(profileId => profileId !== id));
    } else {
      setLikedProfiles([...likedProfiles, id]);
    }
  };
  
  const profiles = [
    {
      id: 1,
      name: 'Sophia',
      age: 28,
      location: 'New York',
      distance: '2 miles away',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Artist and coffee enthusiast. Love exploring the city and trying new restaurants.',
      interests: ['Art', 'Coffee', 'Travel', 'Food'],
      compatibility: 92,
      rating: 4.8,
      online: true
    },
    {
      id: 2,
      name: 'Alex',
      age: 31,
      location: 'Brooklyn',
      distance: '4 miles away',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Tech entrepreneur and fitness enthusiast. Looking for someone to share adventures with.',
      interests: ['Fitness', 'Technology', 'Hiking', 'Photography'],
      compatibility: 88,
      rating: 4.7,
      online: true
    },
    {
      id: 3,
      name: 'Emma',
      age: 26,
      location: 'Manhattan',
      distance: '1 mile away',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Bookworm and yoga teacher. Love quiet evenings and meaningful conversations.',
      interests: ['Books', 'Yoga', 'Nature', 'Cooking'],
      compatibility: 94,
      rating: 4.9,
      online: true
    },
    {
      id: 4,
      name: 'David',
      age: 30,
      location: 'Queens',
      distance: '6 miles away',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Musician and dog lover. Looking for someone to share my passion for music and outdoor activities.',
      interests: ['Music', 'Dogs', 'Hiking', 'Concerts'],
      compatibility: 85,
      rating: 4.6,
      online: false
    },
    {
      id: 5,
      name: 'Mia',
      age: 27,
      location: 'Manhattan',
      distance: '3 miles away',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Fashion designer and foodie. Love exploring new cuisines and traveling to new places.',
      interests: ['Fashion', 'Food', 'Travel', 'Art'],
      compatibility: 90,
      rating: 4.8,
      online: true
    },
    {
      id: 6,
      name: 'James',
      age: 32,
      location: 'Brooklyn',
      distance: '5 miles away',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Chef and sports enthusiast. Looking for someone to share delicious meals and watch games with.',
      interests: ['Cooking', 'Sports', 'Movies', 'Craft Beer'],
      compatibility: 87,
      rating: 4.7,
      online: false
    },
    {
      id: 7,
      name: 'Olivia',
      age: 29,
      location: 'Queens',
      distance: '7 miles away',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Veterinarian and animal lover. Looking for someone kind and compassionate.',
      interests: ['Animals', 'Nature', 'Reading', 'Volunteering'],
      compatibility: 91,
      rating: 4.8,
      online: true
    },
    {
      id: 8,
      name: 'Ethan',
      age: 33,
      location: 'Manhattan',
      distance: '2 miles away',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      bio: 'Architect and coffee addict. Love design, art, and spending weekends at museums.',
      interests: ['Architecture', 'Art', 'Coffee', 'Museums'],
      compatibility: 89,
      rating: 4.7,
      online: false
    }
  ];

  const getFilteredProfiles = () => {
    if (activeFilter === 'featured') {
      return [...profiles].sort((a, b) => b.compatibility - a.compatibility);
    } else if (activeFilter === 'nearby') {
      return [...profiles].sort((a, b) => {
        const distanceA = parseInt(a.distance.split(' ')[0]);
        const distanceB = parseInt(b.distance.split(' ')[0]);
        return distanceA - distanceB;
      });
    } else if (activeFilter === 'online') {
      return profiles.filter(profile => profile.online);
    }
    return profiles;
  };

  return (
    <AppLayout>
      <div>
        <div className="flex items-center mb-6">
          <HeartIcon className="h-6 w-6 text-pink-500 mr-2" />
          <h1 className="text-2xl font-bold text-white">Dating</h1>
        </div>
        
        {/* Featured Profile */}
        <div className="mb-10">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Featured Profile" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute top-4 right-4 bg-pink-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              <span>Online Now</span>
            </div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center mb-2">
                <h2 className="text-4xl font-bold text-white mr-3">Emma, 26</h2>
                <div className="flex items-center bg-pink-600 text-white text-sm px-2 py-1 rounded-lg">
                  <StarIcon className="h-4 w-4 mr-1" />
                  <span>94% Match</span>
                </div>
              </div>
              <div className="flex items-center mb-4 text-gray-300">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>Manhattan • 1 mile away</span>
              </div>
              <p className="text-gray-200 mb-6 max-w-xl">Bookworm and yoga teacher. I love quiet evenings with a good book, practicing yoga, and having meaningful conversations. Looking for someone genuine and kind-hearted.</p>
              <div className="flex space-x-4">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                  Start Conversation
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-8">
          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveFilter('featured')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'featured' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveFilter('nearby')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'nearby' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Nearby
            </button>
            <button
              onClick={() => setActiveFilter('online')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'online' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Online Now
            </button>
          </div>
        </div>
        
        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredProfiles().map((profile) => (
            <div key={profile.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                {profile.online && (
                  <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-0.5 animate-pulse"></span>
                    <span>Online</span>
                  </div>
                )}
                <button 
                  onClick={() => toggleLike(profile.id)} 
                  className="absolute top-2 left-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-pink-600 transition-colors"
                >
                  {likedProfiles.includes(profile.id) ? 
                    <HeartSolidIcon className="h-5 w-5 text-pink-500" /> : 
                    <HeartIcon className="h-5 w-5 text-white" />
                  }
                </button>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <StarIcon className="h-3 w-3 mr-1 text-yellow-400" />
                  <span>{profile.compatibility}% Match</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-bold text-xl">{profile.name}, {profile.age}</h3>
                  <div className="flex items-center text-gray-400 text-xs">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    <span>{profile.distance}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{profile.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.interests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/dating/${profile.id}`}
                  className="block bg-pink-600 hover:bg-pink-700 text-white text-center rounded-full py-2 font-medium transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Premium CTA */}
        <div className="mt-12 bg-gradient-to-r from-pink-700 to-purple-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Unlock Premium Features</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">Get unlimited matches, see who likes you, and access exclusive features.</p>
          <button className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </AppLayout>
  )
} 