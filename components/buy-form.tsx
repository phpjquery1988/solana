"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TokenData } from "@/app/token/[address]/page"

export function BuyForm({ token }: { token: TokenData }) {
  const [amount, setAmount] = useState("")

  const handleBuy = () => {
    // Implement buy logic
    console.log("Buying:", amount)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Buy {token.ticker}</h3>
      <div>
        <label className="text-sm text-gray-400">Amount (SOL)</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-800 border-gray-700"
          placeholder="0.00"
        />
      </div>
      <Button onClick={handleBuy} className="w-full bg-[#0d7f76] hover:bg-[#0d7f76]/80">
        Buy
      </Button>
    </div>
  )
}

