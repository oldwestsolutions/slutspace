import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function MessagesPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center h-16 px-4">
          <h1 className="text-2xl font-bold text-instagram-blue">Messages</h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ChatBubbleLeftIcon className="h-6 w-6" />
          </Link>
        </div>
      </header>

      {/* Messages Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-4rem)]">
        {/* Conversations List */}
        <div className="border-r bg-white">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search messages"
              className="input w-full"
            />
          </div>
          <div className="overflow-y-auto">
            {[1, 2, 3, 4, 5].map((conversation) => (
              <div
                key={conversation}
                className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Username {conversation}</span>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    Last message preview...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <h2 className="font-semibold">Username</h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {[1, 2, 3].map((message) => (
              <div
                key={message}
                className={`flex ${
                  message % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message % 2 === 0
                      ? 'bg-instagram-blue text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p>This is a sample message {message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Message..."
                className="input flex-1"
              />
              <button className="btn">Send</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 