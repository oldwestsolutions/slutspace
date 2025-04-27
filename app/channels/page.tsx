'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function ChannelsPage() {
  // Create a more comprehensive list of 30 channels (6 rows of 5)
  const channels = [
    // Row 1
    {
      id: 1,
      name: 'CodeMaster',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.2M subscribers',
      videos: 245,
      description: 'Professional tutorials on web development, programming, and coding interviews.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 2,
      name: 'FitnessHub',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '890K subscribers',
      videos: 178,
      description: 'Fitness tutorials, workout routines, and healthy lifestyle tips for everyone.',
      isVerified: false,
      category: 'fitness'
    },
    {
      id: 3,
      name: 'MusicWorld',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.5M subscribers',
      videos: 312,
      description: 'Music tutorials, song covers, and original compositions for music lovers.',
      isVerified: true,
      category: 'music'
    },
    {
      id: 4,
      name: 'CookingMaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.1M subscribers',
      videos: 189,
      description: 'Delicious recipes, cooking tips, and culinary adventures around the world.',
      isVerified: true,
      category: 'food'
    },
    {
      id: 5,
      name: 'TravelExplorer',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.7M subscribers',
      videos: 223,
      description: 'Travel guides, destination reviews, and tips for budget-friendly travel.',
      isVerified: false,
      category: 'travel'
    },
    // Row 2
    {
      id: 6,
      name: 'GamingPro',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '4.2M subscribers',
      videos: 567,
      description: 'Game reviews, playthroughs, and gaming tips for casual and hardcore gamers.',
      isVerified: true,
      category: 'gaming'
    },
    {
      id: 7,
      name: 'ArtStudio',
      avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '950K subscribers',
      videos: 145,
      description: 'Art tutorials, creative techniques, and inspiration for artists of all levels.',
      isVerified: false,
      category: 'art'
    },
    {
      id: 8,
      name: 'ScienceGeek',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.3M subscribers',
      videos: 289,
      description: 'Science experiments, explanations, and fascinating facts about our universe.',
      isVerified: true,
      category: 'science'
    },
    {
      id: 9,
      name: 'DesignDaily',
      avatar: 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.6M subscribers',
      videos: 210,
      description: 'UI/UX design tutorials, design trends, and creative inspiration for designers.',
      isVerified: true,
      category: 'design'
    },
    {
      id: 10,
      name: 'LanguageMaster',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '870K subscribers',
      videos: 176,
      description: 'Language tutorials and cultural insights for learning new languages.',
      isVerified: false,
      category: 'education'
    },
    // Row 3
    {
      id: 11,
      name: 'FinanceGuru',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.4M subscribers',
      videos: 198,
      description: 'Personal finance, investing strategies, and financial independence advice.',
      isVerified: true,
      category: 'finance'
    },
    {
      id: 12,
      name: 'MovieCritic',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '940K subscribers',
      videos: 275,
      description: 'Movie reviews, analysis, and film history discussions for cinema enthusiasts.',
      isVerified: false,
      category: 'entertainment'
    },
    {
      id: 13,
      name: 'TechReviews',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.8M subscribers',
      videos: 340,
      description: 'Latest gadget reviews, tech news, and product comparisons for tech enthusiasts.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 14,
      name: 'FashionTrends',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '980K subscribers',
      videos: 203,
      description: 'Fashion tips, styling advice, and trend forecasts for fashion enthusiasts.',
      isVerified: false,
      category: 'fashion'
    },
    {
      id: 15,
      name: 'DIYCrafts',
      avatar: 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '750K subscribers',
      videos: 187,
      description: 'DIY projects, crafting tutorials, and home decor inspiration for crafters.',
      isVerified: false,
      category: 'crafts'
    },
    // Row 4
    {
      id: 16,
      name: 'PhotographyPro',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.2M subscribers',
      videos: 217,
      description: 'Photography tutorials, camera reviews, and editing techniques for photographers.',
      isVerified: true,
      category: 'photography'
    },
    {
      id: 17,
      name: 'HistoryBuff',
      avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '640K subscribers',
      videos: 156,
      description: 'Historical documentaries, facts, and stories about world history.',
      isVerified: false,
      category: 'education'
    },
    {
      id: 18,
      name: 'PetLovers',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.1M subscribers',
      videos: 234,
      description: 'Pet care tips, training guides, and heartwarming animal stories.',
      isVerified: true,
      category: 'pets'
    },
    {
      id: 19,
      name: 'AnimationStudio',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.8M subscribers',
      videos: 156,
      description: 'Animation tutorials, character design, and storytelling for animators.',
      isVerified: true,
      category: 'art'
    },
    {
      id: 20,
      name: 'MotivationDaily',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.5M subscribers',
      videos: 127,
      description: 'Motivational speeches, productivity tips, and self-improvement advice.',
      isVerified: false,
      category: 'motivation'
    },
    // Row 5
    {
      id: 21,
      name: 'SpaceExplorer',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.9M subscribers',
      videos: 189,
      description: 'Space exploration, astronomy facts, and cosmic discoveries.',
      isVerified: true,
      category: 'science'
    },
    {
      id: 22,
      name: 'BusinessInsider',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.3M subscribers',
      videos: 245,
      description: 'Business strategies, entrepreneurship tips, and success stories.',
      isVerified: true,
      category: 'business'
    },
    {
      id: 23,
      name: 'HealthyLiving',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '980K subscribers',
      videos: 156,
      description: 'Health tips, nutrition advice, and mental wellness guidance.',
      isVerified: false,
      category: 'health'
    },
    {
      id: 24,
      name: 'TravelVlogger',
      avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.4M subscribers',
      videos: 310,
      description: 'Adventure travel vlogs, destination guides, and travel hacks.',
      isVerified: true,
      category: 'travel'
    },
    {
      id: 25,
      name: 'AudiophileClub',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '670K subscribers',
      videos: 134,
      description: 'Audio equipment reviews, music production tips, and sound engineering.',
      isVerified: false,
      category: 'music'
    },
    // Row 6
    {
      id: 26,
      name: 'HomeRenovation',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.9M subscribers',
      videos: 187,
      description: 'Home renovation tips, DIY home projects, and interior design inspiration.',
      isVerified: true,
      category: 'home'
    },
    {
      id: 27,
      name: 'SportsFanatic',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '4.5M subscribers',
      videos: 432,
      description: 'Sports highlights, match analysis, and athlete interviews.',
      isVerified: true,
      category: 'sports'
    },
    {
      id: 28,
      name: 'GreenLiving',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '560K subscribers',
      videos: 124,
      description: 'Sustainable living tips, eco-friendly product reviews, and environmental awareness.',
      isVerified: false,
      category: 'lifestyle'
    },
    {
      id: 29,
      name: 'GameDeveloper',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '890K subscribers',
      videos: 167,
      description: 'Game development tutorials, coding tips, and industry insights.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 30,
      name: 'MakeupArtist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.2M subscribers',
      videos: 278,
      description: 'Makeup tutorials, product reviews, and beauty tips.',
      isVerified: true,
      category: 'beauty'
    }
  ];

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Channels</h1>
        
        {/* Channels Grid - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors h-full">
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-start mb-3">
                  <img 
                    src={channel.avatar} 
                    alt={channel.name} 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center">
                      <h3 className="text-white font-medium text-sm truncate mr-1">{channel.name}</h3>
                      {channel.isVerified && (
                        <CheckBadgeIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{channel.subscribers}</p>
                    <p className="text-gray-400 text-xs">{channel.videos} videos</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs mb-4 line-clamp-2 flex-grow">{channel.description}</p>
                <div className="flex justify-between mt-auto">
                  <Link 
                    href={`/channel/${channel.id}`}
                    className="text-blue-500 hover:text-blue-400 text-xs font-medium"
                  >
                    View
                  </Link>
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full text-xs px-3 py-1 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 