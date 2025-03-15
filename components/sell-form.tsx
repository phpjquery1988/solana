"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TokenData } from "@/app/token/[address]/page"

export function SellForm({ token }: { token: TokenData }) {
  const [amount, setAmount] = useState("")

  const handleSell = () => {
    // Implement sell logic
    console.log("Selling:", amount)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sell {token.ticker}</h3>
      <div>
        <label className="text-sm text-gray-400">Amount (Tokens)</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-800 border-gray-700"
          placeholder="0.00"
        />
      </div>
      <Button onClick={handleSell} variant="outline" className="w-full">
        Sell
      </Button>
    </div>
  )
}

