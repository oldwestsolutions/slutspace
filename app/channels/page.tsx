'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function ChannelsPage() {
  // State for channel cards hover effect
  const [hoveredChannel, setHoveredChannel] = useState<number | null>(null);
  
  // Create a more comprehensive list of 30 channels (6 rows of 5)
  const channels = [
    // Row 1
    {
      id: 1,
      name: 'CodeMaster',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.2M subscribers',
      videos: 245,
      description: 'Professional tutorials on web development, programming, and coding interviews.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 2,
      name: 'FitnessHub',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '890K subscribers',
      videos: 178,
      description: 'Fitness tutorials, workout routines, and healthy lifestyle tips for everyone.',
      isVerified: false,
      category: 'fitness'
    },
    {
      id: 3,
      name: 'MusicWorld',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.5M subscribers',
      videos: 312,
      description: 'Music tutorials, song covers, and original compositions for music lovers.',
      isVerified: true,
      category: 'music'
    },
    {
      id: 4,
      name: 'CookingMaster',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.1M subscribers',
      videos: 189,
      description: 'Delicious recipes, cooking tips, and culinary adventures around the world.',
      isVerified: true,
      category: 'food'
    },
    {
      id: 5,
      name: 'TravelExplorer',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '4.2M subscribers',
      videos: 567,
      description: 'Game reviews, playthroughs, and gaming tips for casual and hardcore gamers.',
      isVerified: true,
      category: 'gaming'
    },
    {
      id: 7,
      name: 'ArtStudio',
      avatar: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '950K subscribers',
      videos: 145,
      description: 'Art tutorials, creative techniques, and inspiration for artists of all levels.',
      isVerified: false,
      category: 'art'
    },
    {
      id: 8,
      name: 'ScienceGeek',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.3M subscribers',
      videos: 289,
      description: 'Science experiments, explanations, and fascinating facts about our universe.',
      isVerified: true,
      category: 'science'
    },
    {
      id: 9,
      name: 'DesignDaily',
      avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.6M subscribers',
      videos: 210,
      description: 'UI/UX design tutorials, design trends, and creative inspiration for designers.',
      isVerified: true,
      category: 'design'
    },
    {
      id: 10,
      name: 'LanguageMaster',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
      avatar: 'https://images.unsplash.com/photo-1596075780750-81249df16d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.4M subscribers',
      videos: 198,
      description: 'Personal finance, investing strategies, and financial independence advice.',
      isVerified: true,
      category: 'finance'
    },
    {
      id: 12,
      name: 'MovieCritic',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '940K subscribers',
      videos: 275,
      description: 'Movie reviews, analysis, and film history discussions for cinema enthusiasts.',
      isVerified: false,
      category: 'entertainment'
    },
    {
      id: 13,
      name: 'TechReviews',
      avatar: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.8M subscribers',
      videos: 340,
      description: 'Latest gadget reviews, tech news, and product comparisons for tech enthusiasts.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 14,
      name: 'FashionTrends',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '980K subscribers',
      videos: 203,
      description: 'Fashion tips, styling advice, and trend forecasts for fashion enthusiasts.',
      isVerified: false,
      category: 'fashion'
    },
    {
      id: 15,
      name: 'DIYCrafts',
      avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
      avatar: 'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.2M subscribers',
      videos: 217,
      description: 'Photography tutorials, camera reviews, and editing techniques for photographers.',
      isVerified: true,
      category: 'photography'
    },
    {
      id: 17,
      name: 'HistoryBuff',
      avatar: 'https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '640K subscribers',
      videos: 156,
      description: 'Historical documentaries, facts, and stories about world history.',
      isVerified: false,
      category: 'education'
    },
    {
      id: 18,
      name: 'PetLovers',
      avatar: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.1M subscribers',
      videos: 234,
      description: 'Pet care tips, training guides, and heartwarming animal stories.',
      isVerified: true,
      category: 'pets'
    },
    {
      id: 19,
      name: 'AnimationStudio',
      avatar: 'https://images.unsplash.com/photo-1564460576398-ef55d99548b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.8M subscribers',
      videos: 156,
      description: 'Animation tutorials, character design, and storytelling for animators.',
      isVerified: true,
      category: 'art'
    },
    {
      id: 20,
      name: 'MotivationDaily',
      avatar: 'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
      avatar: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.9M subscribers',
      videos: 189,
      description: 'Space exploration, astronomy facts, and cosmic discoveries.',
      isVerified: true,
      category: 'science'
    },
    {
      id: 22,
      name: 'BusinessInsider',
      avatar: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.3M subscribers',
      videos: 245,
      description: 'Business strategies, entrepreneurship tips, and success stories.',
      isVerified: true,
      category: 'business'
    },
    {
      id: 23,
      name: 'HealthyLiving',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '980K subscribers',
      videos: 156,
      description: 'Health tips, nutrition advice, and mental wellness guidance.',
      isVerified: false,
      category: 'health'
    },
    {
      id: 24,
      name: 'TravelVlogger',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '3.4M subscribers',
      videos: 310,
      description: 'Adventure travel vlogs, destination guides, and travel hacks.',
      isVerified: true,
      category: 'travel'
    },
    {
      id: 25,
      name: 'AudiophileClub',
      avatar: 'https://images.unsplash.com/photo-1485811904074-04513843270c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
      avatar: 'https://images.unsplash.com/photo-1505682750263-f3f9e519c565?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '1.9M subscribers',
      videos: 187,
      description: 'Home renovation tips, DIY home projects, and interior design inspiration.',
      isVerified: true,
      category: 'home'
    },
    {
      id: 27,
      name: 'SportsFanatic',
      avatar: 'https://images.unsplash.com/photo-1596075780750-81249df16d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '4.5M subscribers',
      videos: 432,
      description: 'Sports highlights, match analysis, and athlete interviews.',
      isVerified: true,
      category: 'sports'
    },
    {
      id: 28,
      name: 'GreenLiving',
      avatar: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '560K subscribers',
      videos: 124,
      description: 'Sustainable living tips, eco-friendly product reviews, and environmental awareness.',
      isVerified: false,
      category: 'lifestyle'
    },
    {
      id: 29,
      name: 'GameDeveloper',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '890K subscribers',
      videos: 167,
      description: 'Game development tutorials, coding tips, and industry insights.',
      isVerified: true,
      category: 'tech'
    },
    {
      id: 30,
      name: 'MakeupArtist',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      subscribers: '2.2M subscribers',
      videos: 278,
      description: 'Makeup tutorials, product reviews, and beauty tips.',
      isVerified: true,
      category: 'beauty'
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Channels</h1>
          <div className="flex space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors">
              Most Popular
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors">
              Recently Updated
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors">
              A-Z
            </button>
          </div>
        </div>
        
        {/* Channels Grid - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {channels.map((channel) => (
            <Link 
              href={`/channel/${channel.id}`}
              key={channel.id} 
              className={`block bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 h-full shadow-md hover:shadow-xl hover:scale-105 ${
                channel.id > 4 ? 'relative' : ''
              }`}
              onMouseEnter={() => setHoveredChannel(channel.id)}
              onMouseLeave={() => setHoveredChannel(null)}
            >
              {channel.id > 4 && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">Coming Soon</p>
                    <p className="text-gray-400 text-sm">This channel will be available soon</p>
                  </div>
                </div>
              )}
              <div className="p-4 flex flex-col h-full">
                <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={channel.avatar} 
                    alt={channel.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 flex items-center">
                    <h3 className="text-white font-medium text-sm mr-1">{channel.name}</h3>
                    {channel.isVerified && (
                      <CheckBadgeIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
                <div className="text-gray-400 text-xs mb-4">
                  <p>{channel.subscribers}</p>
                  <p>{channel.videos} videos</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle subscribe action
                    }}
                    className={`${
                      channel.id > 4 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : hoveredChannel === channel.id 
                          ? 'bg-red-500' 
                          : 'bg-red-600'
                    } hover:bg-red-700 text-white rounded-full text-xs px-3 py-1 transition-colors`}
                    disabled={channel.id > 4}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 