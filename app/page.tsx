"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CoinCard } from "@/components/coin-card"
import { generateMemecoins, sortMemecoins, type Memecoin } from "@/utils/generateMemecoins"
import { DisclaimerModal } from "@/components/disclaimer-modal"

function SectionContainer({ title, coins }: { title: string; coins: Memecoin[] }) {
  return (
    <div className="mt-8 mb-12">
      <h2 className="text-center text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {coins.map((coin, index) => (
          <div key={index} className="h-full">
            <CoinCard {...coin} />
          </div>
        ))}
      </div>
      <div className="text-right px-4 mt-4">
        <Button variant="link" className="text-sm text-gray-400 hover:text-white">
          Next page &gt;&gt;
        </Button>
      </div>
    </div>
  )
}

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const trendingCoins = generateMemecoins(6, true)
  const featuredCoins = sortMemecoins(generateMemecoins(12), "featured")
  const topGraduatedCoins = sortMemecoins(generateMemecoins(6), "topGraduated")
  const highMarketCapCoins = sortMemecoins(generateMemecoins(6), "highMarketCap")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by token contract address"
            className="w-full bg-gray-800/50 rounded-md py-2 pl-10 pr-4 text-sm border border-gray-700 focus:border-[#0d7f76] focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        </div>
      </div>

      {/* Tags and Sort Options */}
      <div className="px-4 py-2 flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-400">trending:</span>
        {[
          "reserve",
          "dog",
          "strategic",
          "cat",
          "solana",
          "ai",
          "china",
          "baby",
          "bitcoin",
          "trump",
          "pepe",
          "oscar",
        ].map((tag) => (
          <span
            key={tag}
            className="bg-[#0d7f76]/20 text-[#e7e7e7] px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-[#0d7f76]/30"
          >
            {tag}
          </span>
        ))}

        <div className="ml-auto flex items-center gap-2 text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800">
              <span>Sort by: Bump order</span>
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Bump order</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Latest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800">
              <span>Order: Desc</span>
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Desc</DropdownMenuItem>
              <DropdownMenuItem>Asc</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sections */}
      <SectionContainer title="Trending" coins={trendingCoins} />
      <SectionContainer title="Featured" coins={featuredCoins} />
      <SectionContainer title="Top Graduated" coins={topGraduatedCoins} />
      <SectionContainer title="High Market Cap" coins={highMarketCapCoins} />

      {/* Disclaimer Modal */}
      <DisclaimerModal />
    </div>
  )
}

