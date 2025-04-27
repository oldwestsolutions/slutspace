'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ChevronLeftIcon, 
  StarIcon,
  ShareIcon,
  BoltIcon,
  TagIcon,
  GlobeAltIcon,
  PuzzlePieceIcon,
  ClipboardDocumentCheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import AppLayout from '../../components/AppLayout'

// Models data (should be fetched from API in production)
const models = [
  {
    id: 1,
    name: 'Claude 3 Opus',
    creator: 'Anthropic',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Claude 3 Opus is the most powerful model from Anthropic, offering superior intelligence and reasoning capabilities.',
    fullDescription: 'Claude 3 Opus is Anthropic\'s most intelligent AI assistant, capable of handling complex reasoning, following nuanced instructions, coding proficiently, and collaborating effectively with humans. It understands documents, images, and text with remarkable depth, proving valuable for research, creative work, programming, and data analysis. Opus is particularly skilled at maintaining a factual, helpful, and harmless approach in its interactions.',
    tags: ['Text Generation', 'Reasoning', 'Creative'],
    rating: 4.9,
    category: 'text',
    region: 'us',
    type: 'language',
    website: 'https://www.anthropic.com/claude',
    releaseDate: 'March 4, 2024',
    latestVersion: '3.0',
    capabilities: ['Text understanding & generation', 'Code generation & debugging', 'Image understanding', 'Advanced reasoning'],
    limitations: ['No internet browsing capability', 'Knowledge cutoff date limitations', 'Cannot execute code'],
    pricingModel: 'API access with token-based pricing',
    examples: [
      {title: 'Scientific research assistant', description: 'Helps researchers analyze papers and synthesize findings'},
      {title: 'Programming partner', description: 'Assists with code generation, debugging, and optimization'},
      {title: 'Content creation', description: 'Helps draft, edit, and refine written content'}
    ]
  },
  {
    id: 2,
    name: 'GPT-4',
    creator: 'OpenAI',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'GPT-4 is OpenAI\'s most advanced system, producing safer and more useful responses.',
    fullDescription: 'GPT-4 is OpenAI\'s most advanced system, producing safer and more useful responses. GPT-4 generally excels at tasks that require advanced reasoning, complex instruction understanding, and more nuance. GPT-4o (omni) is the latest evolution, offering faster responses, improved understanding, and voice and image capabilities.',
    tags: ['Text Generation', 'Code', 'Multimodal'],
    rating: 4.8,
    category: 'text',
    region: 'us',
    type: 'language',
    website: 'https://openai.com/gpt-4',
    releaseDate: 'March 14, 2023',
    latestVersion: '4o',
    capabilities: ['Text understanding & generation', 'Image understanding', 'Voice interaction', 'Advanced reasoning'],
    limitations: ['Potential for generating incorrect information', 'Limited context window', 'Training data cutoff limitations'],
    pricingModel: 'Subscription-based and API token pricing',
    examples: [
      {title: 'Content creation', description: 'Assists with writing, editing, and creative projects'},
      {title: 'Conversational assistant', description: 'Engages in helpful dialogue across diverse topics'},
      {title: 'Programming help', description: 'Assists with code generation and debugging tasks'}
    ]
  }
];

export default function ModelProfilePage() {
  const params = useParams();
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTryingDemo, setIsTryingDemo] = useState(false);
  const [demoPrompt, setDemoPrompt] = useState('');
  const [demoResponse, setDemoResponse] = useState('');
  const [submittingDemo, setSubmittingDemo] = useState(false);

  useEffect(() => {
    // In a real application, this would be an API call
    const modelId = typeof params.id === 'string' ? parseInt(params.id) : Array.isArray(params.id) ? parseInt(params.id[0]) : 0;
    const foundModel = models.find(m => m.id === modelId);
    
    // Simulate API call
    setTimeout(() => {
      setModel(foundModel || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleTryDemo = () => {
    setIsTryingDemo(true);
  };

  const submitDemo = () => {
    if (!demoPrompt.trim()) return;
    
    setSubmittingDemo(true);
    
    // Simulate API response
    setTimeout(() => {
      setDemoResponse(`This is a simulated response from ${model?.name} based on your prompt: "${demoPrompt}". In a production environment, this would make an actual API call to the model service.`);
      setSubmittingDemo(false);
    }, 1500);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (!model) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">Model Not Found</h1>
          <p className="text-gray-400 mb-6">The model you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/models" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Back to Models
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/models" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          <span>Back to Models</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-8">
          <div className="h-72 overflow-hidden">
            <img 
              src={model.image} 
              alt={model.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{model.name}</h1>
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="mr-4">By {model.creator}</span>
                  <div className="flex items-center">
                    <StarSolidIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{model.rating} rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <a 
                  href={model.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
                >
                  <span>Visit Website</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                </a>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg mb-6">{model.fullDescription || model.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {model.tags.map((tag: string, index: number) => (
                <span 
                  key={index} 
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">Type</div>
                <div className="text-white font-medium flex items-center">
                  <PuzzlePieceIcon className="h-4 w-4 mr-1 text-blue-400" />
                  {model.type.charAt(0).toUpperCase() + model.type.slice(1)}
                </div>
              </div>
              
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">Category</div>
                <div className="text-white font-medium flex items-center">
                  <TagIcon className="h-4 w-4 mr-1 text-purple-400" />
                  {model.category.charAt(0).toUpperCase() + model.category.slice(1)}
                </div>
              </div>
              
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">Region</div>
                <div className="text-white font-medium flex items-center">
                  <GlobeAltIcon className="h-4 w-4 mr-1 text-green-400" />
                  {model.region === 'us' ? 'United States' : 
                   model.region === 'uk' ? 'United Kingdom' : 
                   model.region === 'europe' ? 'Europe' : 
                   model.region === 'asia' ? 'Asia' : 'Global'}
                </div>
              </div>
              
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">Released</div>
                <div className="text-white font-medium flex items-center">
                  <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1 text-yellow-400" />
                  {model.releaseDate || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Try Demo Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <BoltIcon className="h-5 w-5 mr-2 text-yellow-500" />
              Try {model.name}
            </h2>
            
            {!isTryingDemo ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-6">Experience {model.name} with a quick demo</p>
                <button 
                  onClick={handleTryDemo}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Start Demo
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label htmlFor="prompt" className="block text-gray-400 mb-2">Enter a prompt</label>
                  <textarea
                    id="prompt"
                    value={demoPrompt}
                    onChange={(e) => setDemoPrompt(e.target.value)}
                    placeholder={`Ask ${model.name} something...`}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={submitDemo}
                    disabled={!demoPrompt.trim() || submittingDemo}
                    className={`${
                      !demoPrompt.trim() || submittingDemo ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white px-4 py-2 rounded-lg transition-colors`}
                  >
                    {submittingDemo ? 'Processing...' : 'Submit'}
                  </button>
                </div>
                
                {demoResponse && (
                  <div className="mt-6 bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">Response:</h3>
                    <p className="text-gray-300">{demoResponse}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Capabilities and Limitations */}
        {(model.capabilities || model.limitations) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {model.capabilities && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Capabilities</h2>
                <ul className="space-y-2">
                  {model.capabilities.map((capability: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {model.limitations && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Limitations</h2>
                <ul className="space-y-2">
                  {model.limitations.map((limitation: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Use Cases */}
        {model.examples && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {model.examples.map((example: any, index: number) => (
                <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="font-medium text-white mb-1">{example.title}</h3>
                  <p className="text-gray-400 text-sm">{example.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Similar Models */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Similar Models</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {models
              .filter(m => m.id !== model.id && m.type === model.type)
              .slice(0, 3)
              .map(similarModel => (
                <Link href={`/models/${similarModel.id}`} key={similarModel.id}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition duration-200">
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={similarModel.image} 
                        alt={similarModel.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium">{similarModel.name}</h3>
                      <p className="text-gray-400 text-sm">{similarModel.creator}</p>
                      <div className="flex items-center mt-2">
                        <StarSolidIcon className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-gray-400 text-xs">{similarModel.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 