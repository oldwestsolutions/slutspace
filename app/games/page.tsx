'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PuzzlePieceIcon, StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import AppLayout from '../components/AppLayout'

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState('popular');
  
  const games = [
    {
      id: 1,
      title: 'Cyber Clash',
      developer: 'TechGames',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'A futuristic battle royale with stunning visuals and fast-paced gameplay.',
      category: 'action',
      rating: 4.8,
      players: '120K'
    },
    {
      id: 2,
      title: 'Fantasy Realms',
      developer: 'EpicStudios',
      image: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Explore a vast open world filled with magic, monsters, and epic quests.',
      category: 'rpg',
      rating: 4.9,
      players: '85K'
    },
    {
      id: 3,
      title: 'Puzzle Masters',
      developer: 'BrainGames',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Challenge your mind with increasingly difficult puzzles and brain teasers.',
      category: 'puzzle',
      rating: 4.6,
      players: '50K'
    },
    {
      id: 4,
      title: 'Speed Racers',
      developer: 'TurboGames',
      image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Experience the thrill of high-speed racing with realistic physics and stunning tracks.',
      category: 'racing',
      rating: 4.7,
      players: '65K'
    },
    {
      id: 5,
      title: 'Castle Defense',
      developer: 'StrategyMasters',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Build, defend, and expand your medieval kingdom against waves of enemies.',
      category: 'strategy',
      rating: 4.5,
      players: '45K'
    },
    {
      id: 6,
      title: 'Dungeon Crawlers',
      developer: 'RPGStudios',
      image: 'https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Delve into dangerous dungeons, defeat monsters, and collect epic loot.',
      category: 'rpg',
      rating: 4.7,
      players: '70K'
    },
    {
      id: 7,
      title: 'Word Masters',
      developer: 'LetterGames',
      image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Put your vocabulary to the test with challenging word puzzles and games.',
      category: 'puzzle',
      rating: 4.4,
      players: '35K'
    },
    {
      id: 8,
      title: 'Zombie Apocalypse',
      developer: 'SurvivalStudios',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Survive in a post-apocalyptic world overrun by zombies. Craft, build, and fight!',
      category: 'action',
      rating: 4.6,
      players: '95K'
    },
    {
      id: 9,
      title: 'Football Manager',
      developer: 'SportSimulation',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Manage your own football team, develop players, and compete for championships.',
      category: 'sports',
      rating: 4.8,
      players: '55K'
    },
    {
      id: 10,
      title: 'Cosmic Explorers',
      developer: 'GalaxyGames',
      image: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Explore distant galaxies, discover alien civilizations, and build your space empire.',
      category: 'strategy',
      rating: 4.9,
      players: '60K'
    },
    {
      id: 11,
      title: 'Dance Revolution',
      developer: 'MusicGames',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Dance to the latest hits and compete with players worldwide for the highest score.',
      category: 'music',
      rating: 4.5,
      players: '40K'
    },
    {
      id: 12,
      title: 'Cooking Master',
      developer: 'FoodGames',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Test your culinary skills in timed challenges and become the ultimate chef.',
      category: 'simulation',
      rating: 4.3,
      players: '30K'
    }
  ];

  const getFilteredGames = () => {
    if (activeCategory === 'popular') {
      return [...games].sort((a, b) => b.rating - a.rating);
    } else if (activeCategory !== 'all') {
      return games.filter(game => game.category === activeCategory);
    }
    return games;
  };

  return (
    <AppLayout>
      <div>
        <div className="flex items-center mb-6">
          <PuzzlePieceIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-white">Games</h1>
        </div>
        
        {/* Featured Game Banner */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Featured Game" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-3xl font-bold text-white mb-2">Cyber Clash</h2>
              <p className="text-gray-300 mb-4 max-w-xl">Join the battle royale that's taking the gaming world by storm. Intense combat, stunning visuals, and endless fun await!</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Play Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="overflow-x-auto whitespace-nowrap mb-8 pb-2 scrollbar-hide">
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setActiveCategory('popular')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'popular' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveCategory('action')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'action' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Action
            </button>
            <button
              onClick={() => setActiveCategory('rpg')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'rpg' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              RPG
            </button>
            <button
              onClick={() => setActiveCategory('strategy')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'strategy' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Strategy
            </button>
            <button
              onClick={() => setActiveCategory('puzzle')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'puzzle' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Puzzle
            </button>
            <button
              onClick={() => setActiveCategory('racing')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'racing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Racing
            </button>
            <button
              onClick={() => setActiveCategory('sports')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'sports' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Sports
            </button>
            <button
              onClick={() => setActiveCategory('music')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'music' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Music
            </button>
          </div>
        </div>
        
        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredGames().map((game) => (
            <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                  <StarIcon className="h-3 w-3 mr-1" />
                  {game.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{game.title}</h3>
                <p className="text-gray-400 text-sm mb-2">by {game.developer}</p>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{game.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{game.players} players</span>
                  <Link 
                    href={`/games/${game.id}`}
                    className="text-blue-500 hover:text-blue-400 flex items-center text-sm font-medium"
                  >
                    Play
                    <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call-to-Action */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to upload your own game?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Join our game developer community and reach millions of players worldwide.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </AppLayout>
  )
} 