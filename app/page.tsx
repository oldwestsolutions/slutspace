'use client'

import { useState } from 'react'
import Link from 'next/link'
import AppLayout from './components/AppLayout'
import { allVideos } from '../utils/videoData'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10; // Single column, 10 videos per page
  const totalPages = Math.ceil(allVideos.length / videosPerPage);
  
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
        
        <div className="space-y-4">
          {currentVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-750">
              <Link href={`/video/${video.id}`}>
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-3 md:p-4 flex-1">
                    <h3 className="text-white font-medium text-base md:text-lg mb-2">{video.title}</h3>
                    <div className="flex items-center mb-2">
                      <Link href={`/profile/${video.channel}`} onClick={(e) => e.stopPropagation()} className="mr-2">
                        <img 
                          src={video.channelIcon} 
                          alt={video.channel} 
                          className="w-8 h-8 rounded-full cursor-pointer hover:ring-1 hover:ring-blue-500 transition-all"
                        />
                      </Link>
                      <div>
                        <Link href={`/profile/${video.channel}`} className="hover:text-blue-400 transition-colors">
                          <p className="text-gray-300 text-sm">{video.channel}</p>
                        </Link>
                        <p className="text-gray-400 text-xs">{video.views} • {video.posted}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 hidden md:block">{video.title}</p>
                  </div>
                </div>
              </Link>
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