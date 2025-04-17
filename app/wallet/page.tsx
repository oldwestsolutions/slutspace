'use client'

import { WalletIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

export default function WalletPage() {
  const [balance, setBalance] = useState(100.00) // Starting with $100 for demo
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [customAmount, setCustomAmount] = useState('')

  const handleRecharge = (amount: number) => {
    setBalance(prev => prev + amount)
    setSelectedAmount(0)
    setCustomAmount('')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center h-16 px-4">
          <h1 className="text-2xl font-bold text-instagram-blue">Wallet</h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <WalletIcon className="h-6 w-6" />
          </Link>
        </div>
      </header>

      {/* Wallet Content */}
      <main className="p-4">
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          {/* Balance Display */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Current Balance</h2>
            <p className="text-4xl font-bold text-instagram-blue mt-2">${balance.toFixed(2)}</p>
          </div>

          {/* Recharge Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Recharge Amount</h3>
            <div className="grid grid-cols-2 gap-4">
              {[5, 10, 20, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`border-2 rounded-lg p-4 text-center transition-colors ${
                    selectedAmount === amount
                      ? 'bg-instagram-blue text-white border-instagram-blue'
                      : 'border-instagram-blue hover:bg-instagram-blue hover:text-white'
                  }`}
                >
                  <span className="text-xl font-bold">${amount}</span>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Amount
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="input flex-1"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
                <button 
                  className="btn"
                  onClick={() => {
                    const amount = parseFloat(customAmount)
                    if (amount > 0) {
                      handleRecharge(amount)
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="text-instagram-blue" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="text-instagram-blue" />
                  <span>PayPal</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="text-instagram-blue" />
                  <span>Google Pay</span>
                </label>
              </div>
            </div>

            {/* Recharge Button */}
            <button 
              className="btn w-full mt-6"
              onClick={() => {
                if (selectedAmount > 0) {
                  handleRecharge(selectedAmount)
                }
              }}
            >
              Recharge Now
            </button>
          </div>

          {/* Transaction History */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[
                { type: 'Recharge', amount: 50, date: '2024-04-17' },
                { type: 'Purchase', amount: -20, date: '2024-04-16' },
                { type: 'Recharge', amount: 100, date: '2024-04-15' },
              ].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 