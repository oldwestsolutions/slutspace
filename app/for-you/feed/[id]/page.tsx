'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, UserIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import AppLayout from '../../../components/AppLayout'

export default function FeedPage({ params }: { params: { id: string } }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mock data for the feed
  const feedItems = [
    {
      id: 1,
      videoUrl: 'https://player.vimeo.com/video/824804225?h=06525fe027&autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&background=1',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        followers: '1.2M'
      },
      description: 'The art of surrender... #romance #love',
      likes: '245.2K',
      comments: '12.4K',
      shares: '8.9K'
    },
    {
      id: 2,
      videoUrl: 'https://player.vimeo.com/video/824804225?h=06525fe027&autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&background=1',
      user: {
        name: 'Emma Rose',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        followers: '856K'
      },
      description: 'Midnight whispers... #mystery #thriller',
      likes: '189.5K',
      comments: '9.8K',
      shares: '5.2K'
    },
    {
      id: 3,
      videoUrl: 'https://player.vimeo.com/video/824804225?h=06525fe027&autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&background=1',
      user: {
        name: 'Luna Black',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        followers: '2.1M'
      },
      description: 'Eternal bonds... #fantasy #adventure',
      likes: '312.7K',
      comments: '15.3K',
      shares: '12.1K'
    }
  ]

  // Handle scroll events for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollPosition = container.scrollTop
      const itemHeight = container.clientHeight
      const newIndex = Math.round(scrollPosition / itemHeight)

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [currentIndex])

  // Handle wheel events for smooth scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (!containerRef.current) return

    const container = containerRef.current
    const delta = e.deltaY
    const currentScroll = container.scrollTop
    const itemHeight = container.clientHeight

    if (delta > 0 && currentIndex < feedItems.length - 1) {
      container.scrollTo({
        top: (currentIndex + 1) * itemHeight,
        behavior: 'smooth'
      })
    } else if (delta < 0 && currentIndex > 0) {
      container.scrollTo({
        top: (currentIndex - 1) * itemHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <AppLayout>
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
        onWheel={handleWheel}
      >
        {feedItems.map((item, index) => (
          <div
            key={item.id}
            className="h-screen snap-start relative"
          >
            {/* Video Background */}
            <div className="absolute inset-0">
              <iframe
                src={item.videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* User Info */}
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={item.user.avatar}
                    alt={item.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.user.name}</h3>
                  <p className="text-gray-300 text-sm">{item.user.followers} followers</p>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    isFollowing
                      ? 'bg-gray-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Description */}
              <p className="text-white mb-4">{item.description}</p>

              {/* Interaction Buttons */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex flex-col items-center"
                >
                  {isLiked ? (
                    <HeartIconSolid className="h-8 w-8 text-red-500" />
                  ) : (
                    <HeartIcon className="h-8 w-8 text-white" />
                  )}
                  <span className="text-white text-sm mt-1">{item.likes}</span>
                </button>

                <button className="flex flex-col items-center">
                  <ChatBubbleLeftIcon className="h-8 w-8 text-white" />
                  <span className="text-white text-sm mt-1">{item.comments}</span>
                </button>

                <button className="flex flex-col items-center">
                  <ShareIcon className="h-8 w-8 text-white" />
                  <span className="text-white text-sm mt-1">{item.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
} 