'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function ModelsPage() {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const modelsPerPage = 9;
  
  const models = [
    {
      id: 1,
      name: 'Claude 3 Opus',
      creator: 'Anthropic',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Claude 3 Opus is the most powerful model from Anthropic, offering superior intelligence and reasoning capabilities.',
      tags: ['Text Generation', 'Reasoning', 'Creative'],
      rating: 4.9,
      category: 'text',
      region: 'us',
      type: 'language'
    },
    {
      id: 2,
      name: 'GPT-4',
      creator: 'OpenAI',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'GPT-4 is OpenAI\'s most advanced system, producing safer and more useful responses.',
      tags: ['Text Generation', 'Code', 'Multimodal'],
      rating: 4.8,
      category: 'text',
      region: 'us',
      type: 'language'
    },
    {
      id: 3,
      name: 'Gemini Pro',
      creator: 'Google',
      image: 'https://images.unsplash.com/photo-1677442136019-21740b2d7be3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Gemini Pro is Google\'s advanced multimodal AI model designed for diverse tasks.',
      tags: ['Text Generation', 'Multimodal', 'Reasoning'],
      rating: 4.7,
      category: 'multimodal',
      region: 'us',
      type: 'multimodal'
    },
    {
      id: 4,
      name: 'DALL-E 3',
      creator: 'OpenAI',
      image: 'https://images.unsplash.com/photo-1681372930015-b567afbc9dd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'DALL-E 3 creates realistic images and art from natural language descriptions.',
      tags: ['Image Generation', 'Creative', 'Art'],
      rating: 4.6,
      category: 'image',
      region: 'us',
      type: 'image'
    },
    {
      id: 5,
      name: 'Midjourney',
      creator: 'Midjourney',
      image: 'https://images.unsplash.com/photo-1684141149833-090ebc4d9acb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Midjourney is an independent research lab that produces a proprietary artificial intelligence program that creates images from textual descriptions.',
      tags: ['Image Generation', 'Art', 'Creative'],
      rating: 4.8,
      category: 'image',
      region: 'us',
      type: 'image'
    },
    {
      id: 6,
      name: 'Stable Diffusion XL',
      creator: 'Stability AI',
      image: 'https://images.unsplash.com/photo-1684391539255-d81ffcb88fc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Stable Diffusion XL is a text-to-image model that generates high-quality images from text prompts.',
      tags: ['Image Generation', 'Open Source', 'Creative'],
      rating: 4.5,
      category: 'image',
      region: 'uk',
      type: 'image'
    },
    {
      id: 7,
      name: 'Whisper',
      creator: 'OpenAI',
      image: 'https://images.unsplash.com/photo-1618761617460-bcd05bd2f86a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Whisper is an automatic speech recognition system that provides robust transcription in multiple languages.',
      tags: ['Speech Recognition', 'Transcription', 'Multilingual'],
      rating: 4.7,
      category: 'audio',
      region: 'us',
      type: 'audio'
    },
    {
      id: 8,
      name: 'CodeLlama',
      creator: 'Meta',
      image: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'CodeLlama is a large language model specialized for code generation and understanding.',
      tags: ['Code Generation', 'Programming', 'Technical'],
      rating: 4.6,
      category: 'code',
      region: 'us',
      type: 'language'
    },
    {
      id: 9,
      name: 'Baidu ERNIE',
      creator: 'Baidu',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'ERNIE (Enhanced Representation through kNowledge IntEgration) is a large language model developed by Baidu.',
      tags: ['Text Generation', 'Multilingual', 'Knowledge'],
      rating: 4.5,
      category: 'text',
      region: 'asia',
      type: 'language'
    },
    {
      id: 10,
      name: 'Jukebox',
      creator: 'OpenAI',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Jukebox is a neural net that generates music, including rudimentary singing, in a variety of genres and artist styles.',
      tags: ['Music Generation', 'Creative', 'Audio'],
      rating: 4.3,
      category: 'audio',
      region: 'us',
      type: 'audio'
    },
    {
      id: 11,
      name: 'Llama 2',
      creator: 'Meta',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Llama 2 is a collection of open-source large language models released by Meta, available in various sizes.',
      tags: ['Text Generation', 'Open Source', 'Research'],
      rating: 4.4,
      category: 'text',
      region: 'us',
      type: 'language'
    },
    {
      id: 12,
      name: 'Runway Gen-2',
      creator: 'Runway',
      image: 'https://images.unsplash.com/photo-1599453383199-8edcbd52aaa8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Gen-2 is a text-to-video AI model that can generate, edit, and extend videos from text prompts.',
      tags: ['Video Generation', 'Creative', 'Motion'],
      rating: 4.7,
      category: 'video',
      region: 'us',
      type: 'video'
    },
    {
      id: 13,
      name: 'DeepL Translator',
      creator: 'DeepL',
      image: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'DeepL Translator is a neural machine translation service that produces more natural-sounding translations.',
      tags: ['Translation', 'Multilingual', 'NLP'],
      rating: 4.8,
      category: 'text',
      region: 'europe',
      type: 'language'
    },
    {
      id: 14,
      name: 'ChatGLM',
      creator: 'Tsinghua University',
      image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'ChatGLM is a bilingual (Chinese and English) dialogue model based on General Language Model architecture.',
      tags: ['Text Generation', 'Bilingual', 'Dialogue'],
      rating: 4.3,
      category: 'text',
      region: 'asia',
      type: 'language'
    },
    {
      id: 15,
      name: 'Suno AI',
      creator: 'Suno',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Suno AI is a music generation model that creates complete songs from text prompts with vocals, instruments, and lyrics.',
      tags: ['Music Generation', 'Creative', 'Audio'],
      rating: 4.5,
      category: 'audio',
      region: 'us',
      type: 'audio'
    }
  ];

  const getFilteredModels = () => {
    let filtered = [...models];
    
    // Apply category filter
    if (activeCategory === 'popular') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeCategory !== 'all') {
      filtered = filtered.filter(model => model.category === activeCategory);
    }
    
    // Apply region filter
    if (regionFilter !== 'all') {
      filtered = filtered.filter(model => model.region === regionFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(model => model.type === typeFilter);
    }
    
    return filtered;
  };

  const filteredModels = getFilteredModels();
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  
  // Get current page models
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">AI Models</h1>
        
        {/* Main Category Navigation */}
        <div className="flex mb-6 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => {setActiveCategory('popular'); setCurrentPage(1);}}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-colors ${
              activeCategory === 'popular' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => {setActiveCategory('text'); setCurrentPage(1);}}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-colors ${
              activeCategory === 'text' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Text Generation
          </button>
          <button
            onClick={() => {setActiveCategory('image'); setCurrentPage(1);}}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-colors ${
              activeCategory === 'image' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Image Generation
          </button>
          <button
            onClick={() => {setActiveCategory('audio'); setCurrentPage(1);}}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-colors ${
              activeCategory === 'audio' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Audio Processing
          </button>
          <button
            onClick={() => {setActiveCategory('video'); setCurrentPage(1);}}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-colors ${
              activeCategory === 'video' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Video Models
          </button>
          <button
            onClick={() => {setActiveCategory('code'); setCurrentPage(1);}}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-colors ${
              activeCategory === 'code' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Code Models
          </button>
        </div>
        
        {/* Additional Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Model Type Filter */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Model Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {setTypeFilter('all'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => {setTypeFilter('language'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'language' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Language Models
              </button>
              <button
                onClick={() => {setTypeFilter('image'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'image' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Image Models
              </button>
              <button
                onClick={() => {setTypeFilter('audio'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'audio' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Audio Models
              </button>
              <button
                onClick={() => {setTypeFilter('video'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'video' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Video Models
              </button>
              <button
                onClick={() => {setTypeFilter('multimodal'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === 'multimodal' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Multimodal
              </button>
            </div>
          </div>
          
          {/* Region Filter */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-2">Region</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {setRegionFilter('all'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  regionFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Worldwide
              </button>
              <button
                onClick={() => {setRegionFilter('us'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  regionFilter === 'us' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                United States
              </button>
              <button
                onClick={() => {setRegionFilter('europe'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  regionFilter === 'europe' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Europe
              </button>
              <button
                onClick={() => {setRegionFilter('asia'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  regionFilter === 'asia' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Asia
              </button>
              <button
                onClick={() => {setRegionFilter('uk'); setCurrentPage(1);}}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  regionFilter === 'uk' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                United Kingdom
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-400 text-sm">
            Showing {indexOfFirstModel + 1}-{Math.min(indexOfLastModel, filteredModels.length)} of {filteredModels.length} models
          </p>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">Sort by:</span>
            <select 
              className="bg-gray-700 text-white text-sm rounded-md px-2 py-1 border border-gray-600"
              onChange={(e) => {
                if (e.target.value === 'rating') {
                  setActiveCategory('popular');
                } else {
                  setActiveCategory(e.target.value);
                }
                setCurrentPage(1);
              }}
              value={activeCategory === 'popular' ? 'rating' : activeCategory}
            >
              <option value="rating">Highest Rating</option>
              <option value="text">Text Models</option>
              <option value="image">Image Models</option>
              <option value="audio">Audio Models</option>
              <option value="video">Video Models</option>
            </select>
          </div>
        </div>
        
        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentModels.map((model) => (
            <div key={model.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition duration-300">
              <Link href={`/models/${model.id}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/models/${model.id}`}>
                    <h3 className="text-white font-medium text-lg hover:text-blue-400 transition-colors">{model.name}</h3>
                  </Link>
                  <div className="flex items-center bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    <span>★</span>
                    <span className="ml-1">{model.rating}</span>
                  </div>
                </div>
                <Link href={`/profile/${model.creator}`} className="block hover:text-blue-400 transition-colors">
                  <p className="text-gray-400 text-sm mb-2">by {model.creator}</p>
                </Link>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{model.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Link 
                    href={`/models/${model.id}`}
                    className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                  >
                    Learn More
                  </Link>
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full text-sm px-4 py-1 transition-colors">
                    Try Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`px-2 py-2 mx-1 rounded-lg ${
                  currentPage === 1 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Show current page, first, last, and pages around current
                const showPageNum = pageNum === 1 || 
                                   pageNum === totalPages || 
                                   (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
                
                // Show ellipsis if needed
                if (!showPageNum) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return (
                      <span key={pageNum} className="px-3 py-2 mx-1 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 mx-1 rounded-lg text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`px-2 py-2 mx-1 rounded-lg ${
                  currentPage === totalPages 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </AppLayout>
  )
} 