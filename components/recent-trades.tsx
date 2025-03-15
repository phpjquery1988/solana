"use client"

import { useState } from "react"
import Link from "next/link"

interface Trade {
  type: "buy" | "sell"
  amount: number
  price: number
  timestamp: string
  wallet: string
  solSpent: number
}

export function RecentTrades({ address }: { address: string }) {
  const [trades, setTrades] = useState<Trade[]>([
    {
      type: "buy",
      amount: 1000,
      price: 0.00042,
      timestamp: "2 mins ago",
      wallet: "8xJ4...9kL2",
      solSpent: 0.42,
    },
    {
      type: "sell",
      amount: 500,
      price: 0.00041,
      timestamp: "5 mins ago",
      wallet: "7yH2...4mN9",
      solSpent: 0.205,
    },
    // Add more mock trades
  ])

  return (
    <div className="space-y-2 text-white">
      {trades.map((trade, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
          <div>
            <span className={trade.type === "buy" ? "text-green-500" : "text-red-500"}>
              {trade.type === "buy" ? "Buy" : "Sell"}
            </span>
            <Link
              href={`https://solscan.io/account/${trade.wallet}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 ml-2 hover:text-white"
            >
              {trade.wallet}
            </Link>
          </div>
          <div className="text-right">
            <div>{trade.amount.toLocaleString()} tokens</div>
            <div className="text-sm text-gray-400">{trade.solSpent.toFixed(3)} SOL</div>
            <div className="text-sm text-gray-400">{trade.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

