'use client'

import { useState } from 'react'
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  UserGroupIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

export default function LivePage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, username: 'user1', text: 'Great stream!', time: '2m ago' },
    { id: 2, username: 'user2', text: 'Love the content!', time: '1m ago' },
    { id: 3, username: 'user3', text: '🔥🔥🔥', time: '30s ago' }
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        username: 'you',
        text: message,
        time: 'now'
      }])
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-500" />
              <div>
                <p className="font-semibold">@user{params.id}</p>
                <p className="text-sm text-gray-400">1234 viewers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <UserGroupIcon className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <EllipsisHorizontalIcon className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {/* Live Stream */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 animate-pulse" />
              
              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-gray-800/50'} hover:bg-gray-700/50 transition-colors`}
                  >
                    <HeartIcon className="h-6 w-6" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
                    <ChatBubbleLeftIcon className="h-6 w-6" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
                    <GiftIcon className="h-6 w-6" />
                  </button>
                </div>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  <ShareIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-3 text-center ${activeTab === 'chat' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('gifts')}
                  className={`flex-1 py-3 text-center ${activeTab === 'gifts' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`}
                >
                  Gifts
                </button>
              </div>

              {/* Chat */}
              {activeTab === 'chat' && (
                <div className="p-4">
                  <div className="space-y-4 h-[400px] overflow-y-auto">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500" />
                        <div>
                          <p className="text-sm font-medium">@{msg.username}</p>
                          <p className="text-sm text-gray-400">{msg.text}</p>
                          <p className="text-xs text-gray-500">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Send a message..."
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              {/* Gifts */}
              {activeTab === 'gifts' && (
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <button
                        key={i}
                        className="flex flex-col items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-500 mb-2" />
                        <span className="text-sm font-medium">Gift {i}</span>
                        <span className="text-xs text-gray-400">100 coins</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 