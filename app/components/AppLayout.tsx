'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  HomeIcon, 
  FireIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
  FilmIcon,
  BookmarkIcon,
  ClockIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  HeartIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  WalletIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isWalletExpanded, setIsWalletExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 sticky top-0 z-50">
        <div className="flex justify-between items-center h-14 px-4">
          {/* Left section - Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link href="/" className="ml-2 md:ml-4 text-xl md:text-2xl font-bold text-red-500">
              slutspace
            </Link>
          </div>

          {/* Middle section - Search */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-700 border border-gray-600 rounded-l-full pl-4 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute bg-gray-600 hover:bg-gray-500 rounded-r-full right-0 top-0 bottom-0 px-4 flex items-center justify-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Right section - User controls */}
          <div className="flex items-center space-x-1">
            {/* Only show these buttons on desktop */}
            <button className="hidden md:block p-2 text-gray-400 hover:text-white">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button className="hidden md:block p-2 text-gray-400 hover:text-white">
              <BellIcon className="h-6 w-6" />
            </button>
            {/* Profile button with dropdown - only on desktop */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                className="p-2 text-gray-400 hover:text-white focus:outline-none"
                aria-label="Open profile menu"
              >
                <UserCircleIcon className="h-6 w-6" />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm text-white font-semibold">John Doe</p>
                    <p className="text-xs text-gray-400 truncate">john.doe@example.com</p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <UserCircleIcon className="h-4 w-4 mr-2" />
                      <span>Your Profile</span>
                    </div>
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <CogIcon className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </div>
                  </Link>
                  <Link 
                    href="/wallet" 
                    className="block px-4 py-3 text-sm hover:bg-gray-700 transition-all duration-300"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg p-3 overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('/coin-pattern.svg')] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="relative">
                            <WalletIcon className="h-5 w-5 text-white mr-2" />
                            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                          </div>
                          <span className="text-white font-medium">Wallet</span>
                        </div>
                        <div className="bg-white/20 px-2 py-1 rounded-full flex items-center text-xs text-white font-bold">
                          <CurrencyDollarIcon className="h-3 w-3 mr-1" />
                          <span>3,240</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-white/10 rounded p-1.5 text-center">
                          <div className="text-xs text-blue-100 opacity-80">Balance</div>
                          <div className="text-white text-sm font-bold">$2,580.75</div>
                        </div>
                        <div className="bg-white/10 rounded p-1.5 text-center">
                          <div className="text-xs text-blue-100 opacity-80">SLUT Coins</div>
                          <div className="text-white text-sm font-bold">15,000</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-blue-100">Access your tokens & NFTs</div>
                        <div className="bg-green-500/20 px-1.5 py-0.5 rounded text-green-300 font-medium flex items-center">
                          <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                          </svg>
                          <span>+5.7%</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <Link 
                      href="/login" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center">
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        <span>Sign out</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - Optimized for mobile devices */}
      <div className={`
        md:hidden fixed inset-0 z-40 bg-gray-900 transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className={`
          h-full max-w-sm w-full bg-gray-800 transition-transform duration-300 ease-in-out transform
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex justify-between items-center h-14 px-4 bg-gray-800 border-b border-gray-700">
            <Link href="/" className="text-xl font-bold text-red-500">
              slutspace
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu profile section */}
          <div className="px-4 py-4 border-b border-gray-700 bg-gray-750">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-600 overflow-hidden mr-3">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-semibold">John Doe</h3>
                <p className="text-gray-400 text-sm">john.doe@example.com</p>
              </div>
            </div>

            {/* Mobile search */}
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-700 border border-gray-600 rounded-full pl-4 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2" aria-label="Search">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Mobile notifications */}
            <div className="flex space-x-2 mb-2">
              <Link href="/notifications" className="flex-1 flex items-center justify-center py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-650 transition-colors">
                <BellIcon className="h-5 w-5 mr-2" />
                <span>Notifications</span>
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">3</span>
              </Link>
              <Link href="/bookmarks" className="flex-1 flex items-center justify-center py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-650 transition-colors">
                <BookmarkIcon className="h-5 w-5 mr-2" />
                <span>Saved</span>
              </Link>
            </div>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {/* Navigation */}
            <nav className="pt-4 px-2">
              <div className="space-y-1">
                <Link href="/" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <HomeIcon className="h-6 w-6 mr-3" />
                  <span>Home</span>
                </Link>
                <Link href="/trending" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <FireIcon className="h-6 w-6 mr-3" />
                  <span>Trending</span>
                </Link>
                <Link href="/music" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <MusicalNoteIcon className="h-6 w-6 mr-3" />
                  <span>Music</span>
                </Link>
                <Link href="/live" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <VideoCameraIcon className="h-6 w-6 mr-3" />
                  <span>Live</span>
                </Link>
                <Link href="/channels" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <FilmIcon className="h-6 w-6 mr-3" />
                  <span>Channels</span>
                </Link>
                <Link href="/games" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <PuzzlePieceIcon className="h-6 w-6 mr-3" />
                  <span>Games</span>
                </Link>
                <Link href="/fantasy" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <SparklesIcon className="h-6 w-6 mr-3" />
                  <span>Fantasy</span>
                </Link>
                <Link href="/dating" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <HeartIcon className="h-6 w-6 mr-3" />
                  <span>Dating</span>
                </Link>
                <Link href="/models" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <LightBulbIcon className="h-6 w-6 mr-3" />
                  <span>Models</span>
                </Link>
              </div>
            </nav>

            {/* Account & Wallet Section */}
            <div className="px-2 py-4 mt-2">
              <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Account
              </h3>

              {/* Wallet section in mobile menu */}
              <div className="mt-2 px-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg overflow-hidden">
                  <div className="p-4 relative">
                    <div className="absolute inset-0 bg-[url('/coin-pattern.svg')] opacity-20"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <WalletIcon className="h-5 w-5 text-white mr-2" />
                          <span className="text-white font-medium">Wallet</span>
                        </div>
                        <button 
                          onClick={() => setIsWalletExpanded(!isWalletExpanded)} 
                          className="text-white p-1 rounded-full hover:bg-white/10"
                          aria-label={isWalletExpanded ? "Collapse wallet" : "Expand wallet"}
                        >
                          <ChevronRightIcon className={`h-4 w-4 transition-transform ${isWalletExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-6 w-6 text-white mr-1" />
                          <span className="text-white font-bold text-xl">$2,580.75</span>
                        </div>
                        <div className="bg-white/20 px-2 py-1 rounded-full flex items-center text-xs text-white font-medium">
                          <span>3,240 SLUT</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable wallet content */}
                  <div className={`overflow-hidden transition-all duration-300 ${isWalletExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-4 pt-0 bg-gray-800/40">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <button className="bg-green-500/20 text-green-400 rounded-lg py-2 flex items-center justify-center text-sm font-medium">
                          <PlusCircleIcon className="h-4 w-4 mr-1" />
                          <span>Deposit</span>
                        </button>
                        <button className="bg-blue-500/20 text-blue-400 rounded-lg py-2 flex items-center justify-center text-sm font-medium">
                          <WalletIcon className="h-4 w-4 mr-1" />
                          <span>Withdraw</span>
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-2">
                                <PlusCircleIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-white text-sm">Deposit</p>
                                <p className="text-gray-400 text-xs">2023-06-15</p>
                              </div>
                            </div>
                            <p className="text-green-400 font-medium">+$100.00</p>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-2">
                                <WalletIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-white text-sm">Tip</p>
                                <p className="text-gray-400 text-xs">2023-06-14</p>
                              </div>
                            </div>
                            <p className="text-blue-400 font-medium">-$25.00</p>
                          </div>
                        </div>
                      </div>
                      
                      <Link href="/wallet" className="mt-3 block text-center text-blue-400 text-sm py-2 hover:underline">
                        View All Transactions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <Link href="/profile" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <UserCircleIcon className="h-6 w-6 mr-3" />
                  <span>Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <CogIcon className="h-6 w-6 mr-3" />
                  <span>Settings</span>
                </Link>
                <Link href="/login" className="flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                  <span>Sign out</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Only visible on desktop */}
        <aside className="hidden md:block w-64 bg-gray-800 text-white min-h-screen fixed top-14">
          <nav className="pt-4">
            <div className="px-2 space-y-1">
              <Link href="/" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <HomeIcon className="h-6 w-6 mr-3" />
                <span>Home</span>
              </Link>
              <Link href="/trending" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <FireIcon className="h-6 w-6 mr-3" />
                <span>Trending</span>
              </Link>
              <Link href="/music" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <MusicalNoteIcon className="h-6 w-6 mr-3" />
                <span>Music</span>
              </Link>
              <Link href="/live" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <VideoCameraIcon className="h-6 w-6 mr-3" />
                <span>Live</span>
              </Link>
              <Link href="/channels" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <FilmIcon className="h-6 w-6 mr-3" />
                <span>Channels</span>
              </Link>
              <Link href="/games" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <PuzzlePieceIcon className="h-6 w-6 mr-3" />
                <span>Games</span>
              </Link>
              <Link href="/fantasy" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <SparklesIcon className="h-6 w-6 mr-3" />
                <span>Fantasy</span>
              </Link>
              <Link href="/dating" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <HeartIcon className="h-6 w-6 mr-3" />
                <span>Dating</span>
              </Link>
              <Link href="/models" className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                <LightBulbIcon className="h-6 w-6 mr-3" />
                <span>Models</span>
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="w-full md:ml-64 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 