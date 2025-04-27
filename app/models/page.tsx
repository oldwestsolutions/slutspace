'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import AppLayout from '../components/AppLayout'

export default function ModelsPage() {
  const [activeCategory, setActiveCategory] = useState('top');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 9;
  
  const models = [
    {
      id: 1,
      name: 'Claude 3 Opus',
      creator: 'Sophia Chen',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Claude 3 Opus is the most powerful model from Anthropic, offering superior intelligence and reasoning capabilities.',
      tags: ['Text Generation', 'Reasoning', 'Creative'],
      rating: 4.9,
      category: 'text',
      popularity: 98,
      isNew: false,
      date: '2023-09-15'
    },
    {
      id: 2,
      name: 'GPT-4',
      creator: 'Emma Watson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'GPT-4 is OpenAI\'s most advanced system, producing safer and more useful responses.',
      tags: ['Text Generation', 'Code', 'Multimodal'],
      rating: 4.8,
      category: 'text',
      popularity: 100,
      isNew: false,
      date: '2023-03-14'
    },
    {
      id: 3,
      name: 'Gemini Pro',
      creator: 'Aisha Johnson',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Gemini Pro is Google\'s advanced multimodal AI model designed for diverse tasks.',
      tags: ['Text Generation', 'Multimodal', 'Reasoning'],
      rating: 4.7,
      category: 'multimodal',
      popularity: 92,
      isNew: false,
      date: '2023-12-06'
    },
    {
      id: 4,
      name: 'DALL-E 3',
      creator: 'Maya Patel',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'DALL-E 3 creates realistic images and art from natural language descriptions.',
      tags: ['Image Generation', 'Creative', 'Art'],
      rating: 4.6,
      category: 'image',
      popularity: 95,
      isNew: false,
      date: '2023-10-03'
    },
    {
      id: 5,
      name: 'Midjourney',
      creator: 'Zoe Martinez',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Midjourney is an independent research lab that produces a proprietary artificial intelligence program that creates images from textual descriptions.',
      tags: ['Image Generation', 'Art', 'Creative'],
      rating: 4.8,
      category: 'image',
      popularity: 97,
      isNew: false,
      date: '2022-07-12'
    },
    {
      id: 6,
      name: 'Stable Diffusion XL',
      creator: 'Olivia Kim',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Stable Diffusion XL is a text-to-image model that generates high-quality images from text prompts.',
      tags: ['Image Generation', 'Open Source', 'Creative'],
      rating: 4.5,
      category: 'image',
      popularity: 90,
      isNew: false,
      date: '2023-07-24'
    },
    {
      id: 7,
      name: 'Whisper',
      creator: 'Leila Rodriguez',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Whisper is an automatic speech recognition system that provides robust transcription in multiple languages.',
      tags: ['Speech Recognition', 'Transcription', 'Multilingual'],
      rating: 4.7,
      category: 'audio',
      popularity: 85,
      isNew: false,
      date: '2022-09-21'
    },
    {
      id: 8,
      name: 'CodeLlama',
      creator: 'Tara Chakraborty',
      image: 'https://images.unsplash.com/photo-1629747490241-624f07d70e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'CodeLlama is a large language model specialized for code generation and understanding.',
      tags: ['Code Generation', 'Programming', 'Technical'],
      rating: 4.6,
      category: 'code',
      popularity: 88,
      isNew: false,
      date: '2023-08-24'
    },
    {
      id: 9,
      name: 'Baidu ERNIE',
      creator: 'Lin Wei',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'ERNIE (Enhanced Representation through kNowledge IntEgration) is a large language model developed by Baidu.',
      tags: ['Text Generation', 'Multilingual', 'Knowledge'],
      rating: 4.5,
      category: 'text',
      popularity: 82,
      isNew: false,
      date: '2023-03-16'
    },
    {
      id: 10,
      name: 'Jukebox',
      creator: 'Carmen Morales',
      image: 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Jukebox is a neural net that generates music, including rudimentary singing, in a variety of genres and artist styles.',
      tags: ['Music Generation', 'Creative', 'Audio'],
      rating: 4.3,
      category: 'audio',
      popularity: 78,
      isNew: false,
      date: '2020-04-30'
    },
    {
      id: 11,
      name: 'Llama 2',
      creator: 'Naomi Wright',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Llama 2 is a collection of open-source large language models released by Meta, available in various sizes.',
      tags: ['Text Generation', 'Open Source', 'Research'],
      rating: 4.4,
      category: 'text',
      popularity: 89,
      isNew: false,
      date: '2023-07-18'
    },
    {
      id: 12,
      name: 'Runway Gen-2',
      creator: 'Jessica Liu',
      image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Gen-2 is a text-to-video AI model that can generate, edit, and extend videos from text prompts.',
      tags: ['Video Generation', 'Creative', 'Motion'],
      rating: 4.7,
      category: 'video',
      popularity: 91,
      isNew: false,
      date: '2023-03-20'
    },
    {
      id: 13,
      name: 'DeepL Translator',
      creator: 'Sophia Miller',
      image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'DeepL Translator is a neural machine translation service that produces more natural-sounding translations.',
      tags: ['Translation', 'Multilingual', 'NLP'],
      rating: 4.8,
      category: 'text',
      popularity: 93,
      isNew: false,
      date: '2017-08-29'
    },
    {
      id: 14,
      name: 'ChatGLM',
      creator: 'Elena Zhang',
      image: 'https://images.unsplash.com/photo-1464863979621-258859e62245?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'ChatGLM is a bilingual (Chinese and English) dialogue model based on General Language Model architecture.',
      tags: ['Text Generation', 'Bilingual', 'Dialogue'],
      rating: 4.3,
      category: 'text',
      popularity: 75,
      isNew: false,
      date: '2023-03-13'
    },
    {
      id: 15,
      name: 'Suno AI',
      creator: 'Amara Thomas',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Suno AI is a music generation model that creates complete songs from text prompts with vocals, instruments, and lyrics.',
      tags: ['Music Generation', 'Creative', 'Audio'],
      rating: 4.5,
      category: 'audio',
      popularity: 96,
      isNew: true,
      date: '2024-03-01'
    }
  ];

  const getFilteredModels = () => {
    let filtered = [...models];
    
    // Apply sorting based on active category
    if (activeCategory === 'top') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeCategory === 'new') {
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeCategory === 'hottest') {
      filtered = filtered.sort((a, b) => b.popularity - a.popularity);
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-6">Models</h1>
        
        {/* Results Summary and Sort By */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400 text-sm">
            Showing {indexOfFirstModel + 1}-{Math.min(indexOfLastModel, filteredModels.length)} of {filteredModels.length} models
          </p>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">Sort by:</span>
            <select 
              className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600"
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setCurrentPage(1);
              }}
              value={activeCategory}
            >
              <option value="top">Top</option>
              <option value="new">New</option>
              <option value="hottest">Hottest</option>
            </select>
          </div>
        </div>
        
        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentModels.map((model) => (
            <div key={model.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition duration-300">
              <Link href={`/models/${model.id}`}>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {model.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
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