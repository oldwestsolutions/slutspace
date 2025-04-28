"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowsRightLeftIcon, 
  CurrencyDollarIcon, 
  FireIcon, 
  SparklesIcon, 
  StarIcon, 
  ArrowTrendingUpIcon,
  ShoppingCartIcon,
  GiftIcon,
  TrophyIcon,
  ArrowLeftIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  priceUSD: number;
  change24h: number;
  marketCap: string;
  volume: string;
  logo: string;
  featured?: boolean;
}

interface NFT {
  id: string;
  name: string;
  rarity: string;
  image: string;
  price: number;
}

interface GiftingMerit {
  level: string;
  title: string;
  description: string;
  icon: string;
  threshold: number;
}

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [balance, setBalance] = useState({ 
    coins: 150.75, 
    usd: 2580.75 
  });
  const [giftingStats, setGiftingStats] = useState({
    totalGifted: 5000,
    giftsGiven: 150,
    topGifterRank: 1,
    meritLevel: "Diamond",
    nextLevel: "Legendary",
    progressToNext: 75 // percentage
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showGiftingModal, setShowGiftingModal] = useState(false);
  const [showMeritModal, setShowMeritModal] = useState(false);
  const [showBuyCoinsModal, setShowBuyCoinsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const router = useRouter();

  const meritLevels: GiftingMerit[] = [
    {
      level: "Bronze",
      title: "Generous Beginner",
      description: "Just starting your gifting journey",
      icon: "🥉",
      threshold: 100
    },
    {
      level: "Silver",
      title: "Notable Supporter",
      description: "Making a positive impact",
      icon: "🥈",
      threshold: 500
    },
    {
      level: "Gold",
      title: "Elite Patron",
      description: "A valued community member",
      icon: "🥇",
      threshold: 2000
    },
    {
      level: "Platinum",
      title: "Distinguished Benefactor",
      description: "Setting the standard for generosity",
      icon: "💎",
      threshold: 5000
    },
    {
      level: "Diamond",
      title: "Legendary Philanthropist",
      description: "The pinnacle of community support",
      icon: "💎",
      threshold: 10000
    }
  ];

  const currentMeritLevel = meritLevels.find(level => level.level === giftingStats.meritLevel);
  const nextMeritLevel = meritLevels.find(level => level.level === giftingStats.nextLevel);

  const exchangeRates = [
    { coins: 100, usd: 15.00 },
    { coins: 500, usd: 70.00 },
    { coins: 1000, usd: 130.00 },
    { coins: 5000, usd: 600.00 },
    { coins: 10000, usd: 1100.00 }
  ];

  const calculateCustomPrice = (coins: number) => {
    // Base price per coin
    const basePrice = 0.13;
    // Volume discount for larger amounts
    const discount = coins >= 5000 ? 0.12 : coins >= 1000 ? 0.11 : 0.13;
    return coins * discount;
  };

  const handleAmountSelect = (coins: number) => {
    setSelectedAmount(coins);
    setIsCustomAmount(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      const coins = parseInt(value);
      setSelectedAmount(coins);
      setIsCustomAmount(true);
    }
  };

  const getSelectedPrice = () => {
    if (isCustomAmount && selectedAmount) {
      return calculateCustomPrice(selectedAmount);
    }
    return exchangeRates.find(rate => rate.coins === selectedAmount)?.usd || 0;
  };

  const handleNextLevel = () => {
    setCurrentLevelIndex((prev) => (prev + 1) % meritLevels.length);
  };

  const handlePrevLevel = () => {
    setCurrentLevelIndex((prev) => (prev - 1 + meritLevels.length) % meritLevels.length);
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const coins: Coin[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      priceUSD: 54297.63,
      change24h: 2.34,
      marketCap: "$1.05T",
      volume: "$34.2B",
      logo: "/images/bitcoin.png",
      featured: true
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      priceUSD: 2897.41,
      change24h: 1.56,
      marketCap: "$347.5B",
      volume: "$20.1B",
      logo: "/images/ethereum.png",
      featured: true
    },
    {
      id: "slutcoin",
      name: "SlutCoin",
      symbol: "SLUT",
      priceUSD: 0.0932,
      change24h: 15.67,
      marketCap: "$93.2M",
      volume: "$12.7M",
      logo: "/images/slutcoin.png",
      featured: true
    },
    {
      id: "binancecoin",
      name: "Binance Coin",
      symbol: "BNB",
      priceUSD: 597.32,
      change24h: -0.78,
      marketCap: "$92.1B",
      volume: "$3.2B",
      logo: "/images/bnb.png"
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      priceUSD: 135.68,
      change24h: 3.45,
      marketCap: "$56.7B",
      volume: "$2.8B",
      logo: "/images/solana.png"
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      priceUSD: 0.5743,
      change24h: -1.23,
      marketCap: "$20.3B",
      volume: "$967.5M",
      logo: "/images/cardano.png"
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      priceUSD: 7.83,
      change24h: 0.87,
      marketCap: "$9.9B",
      volume: "$421.6M",
      logo: "/images/polkadot.png"
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      priceUSD: 0.1652,
      change24h: 5.23,
      marketCap: "$22.4B",
      volume: "$1.7B",
      logo: "/images/dogecoin.png"
    },
    {
      id: "avalanche",
      name: "Avalanche",
      symbol: "AVAX",
      priceUSD: 36.42,
      change24h: 2.12,
      marketCap: "$13.2B",
      volume: "$682.3M",
      logo: "/images/avalanche.png"
    }
  ];

  const nfts: NFT[] = [
    {
      id: "nft1",
      name: "Space Voyager #372",
      rarity: "Legendary",
      image: "/images/nft1.png",
      price: 2.5
    },
    {
      id: "nft2",
      name: "Cyber Punk #189",
      rarity: "Rare",
      image: "/images/nft2.png",
      price: 0.75
    },
    {
      id: "nft3",
      name: "Digital Dreams #42",
      rarity: "Epic",
      image: "/images/nft3.png",
      price: 1.2
    },
    {
      id: "nft4",
      name: "Pixel Universe #103",
      rarity: "Common",
      image: "/images/nft4.png",
      price: 0.3
    },
    {
      id: "nft5",
      name: "Neon Future #54",
      rarity: "Rare",
      image: "/images/nft5.png",
      price: 0.85
    },
    {
      id: "nft6",
      name: "Slutspace Genesis #7",
      rarity: "Mythic",
      image: "/images/nft6.png",
      price: 4.2
    }
  ];

  const handleBuy = (name: string, price: number) => {
    setNotificationMessage(`Successfully purchased ${name} for $${price}`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const featuredCoins = coins.filter(coin => coin.featured);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading your wallet...</h2>
          <p className="text-slate-400">Connecting to the blockchain</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeInOut">
          {notificationMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-xl border border-slate-700 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/coin-pattern.svg)', backgroundSize: '200px' }}></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">Your Wallet</h1>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Coin Balance */}
              <motion.div 
                className="bg-gradient-to-r from-purple-900 to-indigo-800 rounded-lg p-5 shadow-lg border border-purple-700 transition duration-300 hover:shadow-purple-900/30 hover:shadow-xl cursor-pointer"
                onClick={() => setShowBalanceModal(true)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <CircleStackIcon className="h-6 w-6 text-purple-300 mr-2" />
                  <h2 className="text-xl font-semibold">Coin Balance</h2>
                </div>
                <div className="flex items-center">
                  <p className="text-3xl font-bold mb-1">{balance.coins.toLocaleString()}</p>
                  <CircleStackIcon className="h-6 w-6 text-purple-300 ml-2" />
                </div>
                <p className="text-gray-300">≈ ${balance.usd.toLocaleString()}</p>
              </motion.div>

              {/* Merit Level */}
              <motion.div 
                className="bg-gradient-to-r from-blue-900 to-cyan-800 rounded-lg p-5 shadow-lg border border-blue-700 transition duration-300 hover:shadow-blue-900/30 hover:shadow-xl cursor-pointer"
                onClick={() => setShowMeritModal(true)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <TrophyIcon className="h-6 w-6 text-blue-300 mr-2" />
                  <h2 className="text-xl font-semibold">Merit Level</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl mr-2">{currentMeritLevel?.icon}</span>
                  <div>
                    <p className="text-xl font-bold">{giftingStats.meritLevel}</p>
                    <p className="text-gray-300">Next: {giftingStats.nextLevel}</p>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${giftingStats.progressToNext}%` }}
                  ></div>
                </div>
              </motion.div>

              {/* Connection Status */}
              <motion.div 
                className="bg-gradient-to-r from-emerald-900 to-green-800 rounded-lg p-5 shadow-lg border border-emerald-700 transition duration-300 hover:shadow-emerald-900/30 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <ShieldCheckIcon className="h-6 w-6 text-emerald-300 mr-2" />
                  <h2 className="text-xl font-semibold">Wallet Connection</h2>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-emerald-300">Connected to Coinbase Custodial</p>
                </div>
                <p className="text-gray-300 text-sm">Your funds are securely managed by Coinbase</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Balance Modal */}
        {showBalanceModal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-slate-800 rounded-xl w-full max-w-md p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Coin Balance Details</h2>
                <button 
                  onClick={() => setShowBalanceModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400">Available Balance</p>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold">{balance.coins.toLocaleString()}</p>
                    <CircleStackIcon className="h-6 w-6 text-purple-300 ml-2" />
                  </div>
                  <p className="text-gray-300">≈ ${balance.usd.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300"
                    onClick={() => {
                      setShowBalanceModal(false);
                      setShowBuyCoinsModal(true);
                    }}
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Buy Coins
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300">
                    <ArrowsRightLeftIcon className="h-5 w-5 mr-2" />
                    Exchange
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Gifting Stats Modal */}
        {showGiftingModal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-slate-800 rounded-xl w-full max-w-md p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Gifting Statistics</h2>
                <button 
                  onClick={() => setShowGiftingModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400">Total Gifts Given</p>
                  <p className="text-3xl font-bold">{giftingStats.giftsGiven}</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400">Total Amount Gifted</p>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold">{giftingStats.totalGifted.toLocaleString()}</p>
                    <CircleStackIcon className="h-6 w-6 text-indigo-300 ml-2" />
                  </div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400">Gifter Rank</p>
                  <p className="text-3xl font-bold">Top {giftingStats.topGifterRank}%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Merit Level Modal */}
        {showMeritModal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-slate-800 rounded-xl w-full max-w-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Merit Level Details</h2>
                <button 
                  onClick={() => setShowMeritModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Current Level Section */}
                <div className="bg-slate-700 rounded-lg p-4 border border-purple-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-2">{currentMeritLevel?.icon}</span>
                      <div>
                        <p className="text-xl font-bold">{currentMeritLevel?.level}</p>
                        <p className="text-gray-300">{currentMeritLevel?.title}</p>
                      </div>
                    </div>
                    <button 
                      className="bg-purple-600/50 hover:bg-purple-600/70 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
                      onClick={() => setCurrentLevelIndex(meritLevels.findIndex(level => level.level === giftingStats.meritLevel))}
                    >
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View All Levels
                    </button>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <p className="text-purple-300 text-sm font-medium mb-2">Current Level</p>
                    <p className="text-gray-400">{currentMeritLevel?.description}</p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-gray-400 mb-2">Progress to Next Level</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{giftingStats.meritLevel}</span>
                    <span className="text-sm">{giftingStats.nextLevel}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${giftingStats.progressToNext}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    0 coins needed for {giftingStats.nextLevel}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Buy Coins Modal */}
        {showBuyCoinsModal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-slate-800 rounded-xl w-full max-w-2xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Buy Coins</h2>
                <button 
                  onClick={() => setShowBuyCoinsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exchange Rates Table */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Exchange Rates</h3>
                  <div className="space-y-2">
                    {exchangeRates.map((rate, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                          selectedAmount === rate.coins && !isCustomAmount 
                            ? 'bg-purple-600/30 border border-purple-500' 
                            : 'bg-slate-600/50 hover:bg-slate-600/70'
                        }`}
                        onClick={() => handleAmountSelect(rate.coins)}
                      >
                        <div className="flex items-center">
                          <CircleStackIcon className="h-5 w-5 text-purple-300 mr-2" />
                          <span className="font-medium">{rate.coins.toLocaleString()} coins</span>
                        </div>
                        <span className="text-gray-300">${rate.usd.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Custom Amount</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter amount"
                          className="flex-1 bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-gray-300">coins</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Selected Amount</span>
                      <div className="flex items-center">
                        <span className="font-medium">{selectedAmount.toLocaleString()}</span>
                        <CircleStackIcon className="h-5 w-5 text-purple-300 ml-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Cost</span>
                      <span className="font-medium">${getSelectedPrice().toFixed(2)}</span>
                    </div>
                    <div className="pt-4">
                      <button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300"
                        onClick={() => {
                          setShowBuyCoinsModal(false);
                          setShowPaymentModal(true);
                        }}
                      >
                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                        Proceed to Payment
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-400">
                      <p>Powered by Coinbase</p>
                      <p className="mt-1">Secure payment processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-slate-800 rounded-xl w-full max-w-md p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Complete Payment</h2>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400">Purchasing</p>
                      <div className="flex items-center">
                        <span className="text-xl font-bold">{selectedAmount.toLocaleString()}</span>
                        <CircleStackIcon className="h-5 w-5 text-purple-300 ml-1" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400">Total</p>
                      <p className="text-xl font-bold">${getSelectedPrice().toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-600 pt-4">
                    <p className="text-sm text-gray-400 mb-2">Payment Method</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-600 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <CurrencyDollarIcon className="h-4 w-4 text-white" />
                          </div>
                          <span className="ml-3">Coinbase Wallet</span>
                        </div>
                        <span className="text-green-400">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300"
                    onClick={() => {
                      setShowPaymentModal(false);
                      setShowBuyCoinsModal(true);
                    }}
                  >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300">
                    Confirm Payment
                  </button>
                </div>

                <div className="text-center text-sm text-gray-400">
                  <p>By proceeding, you agree to our Terms of Service</p>
                  <p className="mt-1">Your payment will be processed securely by Coinbase</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 