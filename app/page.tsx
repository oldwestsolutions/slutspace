'use client'

import { useState } from 'react'
import Link from 'next/link'
import AppLayout from './components/AppLayout'
import { allVideos } from '../utils/videoData'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 20; // 5 rows of 4 videos
  const totalPages = 8; // Total of 8 pages
  
  // Calculate the videos to display on the current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <AppLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">For You</h1>
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {currentVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-750">
              <Link href={`/video/${video.id}`}>
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded text-[10px] md:text-xs md:px-2 md:py-1 md:bottom-2 md:right-2">
                    {video.duration}
                  </div>
                </div>
              </Link>
              <div className="p-2 md:p-3">
                <Link href={`/video/${video.id}`}>
                  <h3 className="text-white font-medium line-clamp-1 text-xs md:text-sm">{video.title}</h3>
                </Link>
                <div className="flex items-center mt-1">
                  <Link href={`/profile/${video.channel}`} onClick={(e) => e.stopPropagation()} className="mr-1.5">
                    <img 
                      src={video.channelIcon} 
                      alt={video.channel} 
                      className="w-5 h-5 md:w-7 md:h-7 rounded-full cursor-pointer hover:ring-1 hover:ring-blue-500 transition-all"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${video.channel}`} className="hover:text-blue-400 transition-colors">
                      <p className="text-gray-400 text-[10px] md:text-xs truncate">{video.channel}</p>
                    </Link>
                    <p className="text-gray-400 text-[8px] md:text-xs truncate">{video.views} • {video.posted}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </AppLayout>
  )
} 