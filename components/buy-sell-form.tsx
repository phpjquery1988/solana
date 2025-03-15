"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TokenData {
  ticker: string
  price: number
}

export function BuySellForm({ token }: { token: TokenData }) {
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [buyTokens, setBuyTokens] = useState("")
  const [sellSol, setSellSol] = useState("")

  useEffect(() => {
    if (buyAmount) {
      setBuyTokens((Number.parseFloat(buyAmount) / token.price).toFixed(2))
    }
  }, [buyAmount, token.price])

  useEffect(() => {
    if (sellAmount) {
      setSellSol((Number.parseFloat(sellAmount) * token.price).toFixed(6))
    }
  }, [sellAmount, token.price])

  const handleBuyPreset = (amount: number) => {
    setBuyAmount(amount.toString())
    setBuyTokens((amount / token.price).toFixed(2))
  }

  const handleSellPreset = (percentage: number) => {
    // This is a mock implementation. In a real app, you'd get the user's token balance
    const mockBalance = 10000
    const amount = ((mockBalance * percentage) / 100).toFixed(2)
    setSellAmount(amount)
    setSellSol((Number.parseFloat(amount) * token.price).toFixed(6))
  }

  return (
    <Tabs defaultValue="buy" className="w-full">
      <TabsList className="w-full bg-gray-800 mb-4">
        <TabsTrigger value="buy" className="flex-1">
          Buy
        </TabsTrigger>
        <TabsTrigger value="sell" className="flex-1">
          Sell
        </TabsTrigger>
      </TabsList>
      <TabsContent value="buy">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">From (SOL)</label>
            <Input
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">To ({token.ticker})</label>
            <Input
              type="number"
              value={buyTokens}
              onChange={(e) => setBuyTokens(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-between">
            {[1, 3, 5, 10].map((amount) => (
              <Button key={amount} onClick={() => handleBuyPreset(amount)} variant="outline" className="flex-1 mx-1">
                {amount} SOL
              </Button>
            ))}
          </div>
          <Button className="w-full bg-[#0d7f76] hover:bg-[#0d7f76]/80 font-bold">Buy</Button>
        </div>
      </TabsContent>
      <TabsContent value="sell">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">From ({token.ticker})</label>
            <Input
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">To (SOL)</label>
            <Input
              type="number"
              value={sellSol}
              onChange={(e) => setSellSol(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-between">
            {[10, 25, 50, 100].map((percentage) => (
              <Button
                key={percentage}
                onClick={() => handleSellPreset(percentage)}
                variant="outline"
                className="flex-1 mx-1"
              >
                {percentage}%
              </Button>
            ))}
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-700">Sell</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

