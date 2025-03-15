"use client"

import { useState } from "react"
import Link from "next/link"
import { CrownIcon, BankIcon } from "@/components/icons"

interface Holder {
  wallet: string
  percentage: number
  isCreator?: boolean
  isBondingCurve?: boolean
}

export function TopHolders({ address }: { address: string }) {
  const [holders, setHolders] = useState<Holder[]>([
    { wallet: "8xJ4...9kL2", percentage: 10.5, isCreator: true },
    { wallet: "7yH2...4mN9", percentage: 7.8, isBondingCurve: true },
    { wallet: "3zF6...2kL7", percentage: 5.2 },
    { wallet: "9wQ1...6mP3", percentage: 4.1 },
    { wallet: "2xR8...1nS5", percentage: 3.7 },
  ])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">Top Holders</h3>
      <div className="space-y-1 text-sm">
        {holders.map((holder, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center">
              {holder.isCreator && <CrownIcon className="h-4 w-4 mr-2 text-yellow-500" />}
              {holder.isBondingCurve && <BankIcon className="h-4 w-4 mr-2 text-blue-500" />}
              <Link
                href={`https://solscan.io/account/${holder.wallet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                {holder.wallet}
              </Link>
              {holder.isCreator && <span className="ml-1 text-gray-400">(Dev)</span>}
              {holder.isBondingCurve && <span className="ml-1 text-gray-400">(Bonding Curve)</span>}
            </div>
            <span className="text-gray-400">{holder.percentage.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

