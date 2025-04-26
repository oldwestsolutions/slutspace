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
  ShoppingCartIcon
} from "@heroicons/react/24/solid";

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

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("coins");
  const [balance, setBalance] = useState({ usd: 2580.75, tokens: 15000 });
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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
        <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-xl border border-slate-700 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/coin-pattern.svg)', backgroundSize: '200px' }}></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">Your Wallet</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-900 to-indigo-800 rounded-lg p-5 shadow-lg border border-purple-700 transition duration-300 hover:shadow-purple-900/30 hover:shadow-xl">
                <div className="flex items-center mb-2">
                  <CurrencyDollarIcon className="h-6 w-6 text-purple-300 mr-2" />
                  <h2 className="text-xl font-semibold">Total Balance</h2>
                </div>
                <p className="text-3xl font-bold mb-1">${balance.usd.toLocaleString()}</p>
                <div className="flex items-center text-green-400">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  <span>+5.7% from last week</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-lg p-5 shadow-lg border border-indigo-700 transition duration-300 hover:shadow-indigo-900/30 hover:shadow-xl">
                <div className="flex items-center mb-2">
                  <SparklesIcon className="h-6 w-6 text-indigo-300 mr-2" />
                  <h2 className="text-xl font-semibold">Token Balance</h2>
                </div>
                <p className="text-3xl font-bold mb-1">{balance.tokens.toLocaleString()} SLUT</p>
                <div className="flex items-center text-blue-300">
                  <span>Available for tipping and purchases</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg flex flex-col items-center transition duration-300 border border-slate-700 shadow-md">
            <div className="rounded-full bg-blue-900/50 p-3 mb-2">
              <ArrowsRightLeftIcon className="h-6 w-6 text-blue-400" />
            </div>
            <span>Exchange</span>
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg flex flex-col items-center transition duration-300 border border-slate-700 shadow-md">
            <div className="rounded-full bg-purple-900/50 p-3 mb-2">
              <ShoppingCartIcon className="h-6 w-6 text-purple-400" />
            </div>
            <span>Buy</span>
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg flex flex-col items-center transition duration-300 border border-slate-700 shadow-md">
            <div className="rounded-full bg-green-900/50 p-3 mb-2">
              <StarIcon className="h-6 w-6 text-green-400" />
            </div>
            <span>Earn</span>
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg flex flex-col items-center transition duration-300 border border-slate-700 shadow-md">
            <div className="rounded-full bg-red-900/50 p-3 mb-2">
              <FireIcon className="h-6 w-6 text-red-400" />
            </div>
            <span>Trending</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-slate-800 p-1 rounded-lg border border-slate-700 max-w-md">
          <button
            onClick={() => setActiveTab("coins")}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition ${
              activeTab === "coins" 
                ? "bg-indigo-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            Coins
          </button>
          <button
            onClick={() => setActiveTab("nfts")}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition ${
              activeTab === "nfts" 
                ? "bg-indigo-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            NFTs
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition ${
              activeTab === "transactions" 
                ? "bg-indigo-600 text-white" 
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            History
          </button>
        </div>

        {/* Featured Section */}
        {activeTab === "coins" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Coins</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredCoins.map((coin) => (
                  <div 
                    key={coin.id}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 shadow-lg hover:shadow-xl transition duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-700 to-purple-700 px-3 py-1 text-xs font-bold rounded-bl-lg">Featured</div>
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 mr-4 rounded-full bg-slate-700 flex items-center justify-center">
                        {coin.logo ? (
                          <Image src={coin.logo} alt={coin.name} width={40} height={40} className="rounded-full" />
                        ) : (
                          <span className="text-xl font-bold">{coin.symbol.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{coin.name}</h3>
                        <p className="text-slate-400">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold">${coin.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</p>
                      <p className={`inline-flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <ArrowTrendingUpIcon className={`h-4 w-4 mr-1 ${coin.change24h < 0 ? 'rotate-180' : ''}`} />
                        {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                      </p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleBuy(coin.name, coin.priceUSD)}
                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium text-sm transition duration-300 w-full"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Coins */}
            <div>
              <h2 className="text-2xl font-bold mb-4">All Coins</h2>
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900">
                      <tr>
                        <th className="px-6 py-4 font-medium">Coin</th>
                        <th className="px-6 py-4 font-medium">Price</th>
                        <th className="px-6 py-4 font-medium">24h Change</th>
                        <th className="px-6 py-4 font-medium">Market Cap</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {coins.map((coin) => (
                        <tr key={coin.id} className="hover:bg-slate-750 transition duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="relative w-8 h-8 mr-3 rounded-full bg-slate-700 flex items-center justify-center">
                                {coin.logo ? (
                                  <Image src={coin.logo} alt={coin.name} width={24} height={24} className="rounded-full" />
                                ) : (
                                  <span className="text-sm font-bold">{coin.symbol.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{coin.name}</div>
                                <div className="text-slate-400">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">
                            ${coin.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                          </td>
                          <td className={`px-6 py-4 font-medium ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <div className="flex items-center">
                              <ArrowTrendingUpIcon className={`h-4 w-4 mr-1 ${coin.change24h < 0 ? 'rotate-180' : ''}`} />
                              {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                            </div>
                          </td>
                          <td className="px-6 py-4">{coin.marketCap}</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleBuy(coin.name, coin.priceUSD)}
                              className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-xs font-medium transition duration-200"
                            >
                              Buy
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NFTs Tab */}
        {activeTab === "nfts" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your NFT Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {nfts.map((nft) => (
                <div 
                  key={nft.id}
                  className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-xl transition duration-300 group"
                >
                  <div className="relative aspect-square bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
                    <Image 
                      src={nft.image || "https://via.placeholder.com/400"} 
                      alt={nft.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className={`absolute top-2 right-2 z-20 px-2 py-1 rounded text-xs font-bold
                      ${nft.rarity === 'Common' ? 'bg-slate-600' : 
                        nft.rarity === 'Rare' ? 'bg-blue-600' : 
                        nft.rarity === 'Epic' ? 'bg-purple-600' : 
                        nft.rarity === 'Legendary' ? 'bg-yellow-600' : 'bg-pink-600'}`
                    }>
                      {nft.rarity}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
                    <p className="text-lg font-bold mt-2">{nft.price} ETH</p>
                    <button 
                      onClick={() => handleBuy(nft.name, nft.price)}
                      className="mt-3 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg mb-10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Asset</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr className="hover:bg-slate-750">
                      <td className="px-6 py-4">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium">Buy</span>
                      </td>
                      <td className="px-6 py-4">SlutCoin (SLUT)</td>
                      <td className="px-6 py-4 font-medium">1,500 SLUT</td>
                      <td className="px-6 py-4">May 15, 2023</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-750">
                      <td className="px-6 py-4">
                        <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs font-medium">Tip</span>
                      </td>
                      <td className="px-6 py-4">SlutCoin (SLUT)</td>
                      <td className="px-6 py-4 font-medium">50 SLUT</td>
                      <td className="px-6 py-4">May 12, 2023</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-750">
                      <td className="px-6 py-4">
                        <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs font-medium">NFT</span>
                      </td>
                      <td className="px-6 py-4">Digital Dreams #42</td>
                      <td className="px-6 py-4 font-medium">1.2 ETH</td>
                      <td className="px-6 py-4">May 10, 2023</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-750">
                      <td className="px-6 py-4">
                        <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded text-xs font-medium">Exchange</span>
                      </td>
                      <td className="px-6 py-4">ETH → SLUT</td>
                      <td className="px-6 py-4 font-medium">0.5 ETH → 13,500 SLUT</td>
                      <td className="px-6 py-4">May 5, 2023</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-750">
                      <td className="px-6 py-4">
                        <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded text-xs font-medium">Sell</span>
                      </td>
                      <td className="px-6 py-4">Bitcoin (BTC)</td>
                      <td className="px-6 py-4 font-medium">0.05 BTC</td>
                      <td className="px-6 py-4">May 1, 2023</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 