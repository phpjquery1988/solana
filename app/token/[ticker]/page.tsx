"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ThumbsUp, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { TradingViewChart } from "@/components/trading-view-chart"
import { BuySellForm } from "@/components/buy-sell-form"
import { CommentThread } from "@/components/comment-thread"
import { RecentTrades } from "@/components/recent-trades"
import { TopHolders } from "@/components/top-holders"
import { TokenSocialLinks } from "@/components/token-social-links"
import { TokenInfo } from "@/components/token-info"
import { useSession, getSession,signIn, signOut } from "next-auth/react"
interface TokenData {
  name: string
  ticker: string
  description: string
  devWallet: string
  devCountry: string
  marketCap: number
  price: number
  bondingProgress: number
  totalSupply: number
  badges: {
    pro?: boolean
    kyc?: boolean
    trending?: number
  }
  reactions: {
    hearts: number
    likes: number
  }
  socialLinks: {
    telegram?: string
    twitter?: string
    website?: string
  }
}

export default function TokenPage({ params }: { params: { ticker: string } }) {
  const [token, setToken] = useState<TokenData | null>(null)
  const [userReactions, setUserReactions] = useState({ heart: false, like: false })
  const { data: session, status } = useSession();
  useEffect(() => {
    // In a real app, fetch token data from your API using the ticker
    const mockToken = {
      name: "OFFICIAL TRUMP",
      ticker: params.ticker,
      description: "The official meme token for true believers",
      devWallet: "8xJ4...9kL2",
      devCountry: "United States",
      marketCap: 16007445.27,
      price: 0.00042,
      bondingProgress: 87,
      totalSupply: 1000000000,
      badges: {
        pro: true,
        kyc: true,
        trending: 100,
      },
      reactions: {
        hearts: 1234,
        likes: 567,
      },
      socialLinks: {
        telegram: "https://t.me/officialtrump",
        twitter: "https://twitter.com/officialtrump",
        website: "https://trump.token",
      },
    }
    setToken(mockToken)
  }, [params.ticker])

  const handleReaction = (type: "heart" | "like") => {
    setUserReactions((prev) => {
      const newState = { ...prev, [type]: !prev[type] }
      // In a real app, send this to your API
      return newState
    })
  }

  if (!token) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Token Header */}
        <div className="bg-gray-900 rounded-lg relative shadow-custom mb-8">
          <div className="p-6 flex items-start gap-6">
            <Image
              src={`/placeholder.svg?height=120&width=120&text=${token.name.slice(0, 2)}`}
              alt={token.name}
              width={120}
              height={120}
              className="rounded-lg"
            />
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{token.name}</h1>
                <span className="text-xl text-gray-400">${token.ticker}</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-2xl">{token.description}</p>
              {/* Badges */}
              {(token.badges.pro || token.badges.kyc || token.badges.trending) && (
                <div className="flex items-center gap-2 mb-4">
                  {token.badges.pro && (
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro-l3lp6HwVkqZeyLaP3hOs2OsQZrIhPn.png"
                      alt="PRO"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  )}
                  {token.badges.kyc && (
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kyc-2z7NiPxdnMqGBBLbmPzFVf0wlctgWB.png"
                      alt="KYC Verified"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  )}
                  {token.badges.trending && (
                    <div className="flex items-center gap-1 bg-[#0D7F76] px-2 py-1 rounded-full">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trending-RYH7VJOaxQGST6lLAteqRSYtLOm5Ra.png"
                        alt="Trending"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      <span className="text-xs text-white">
                        x<b>{token.badges.trending}</b>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-sm text-gray-400">Dev Wallet</p>
                <Link
                  href={`https://solscan.io/account/${token.devWallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-white hover:text-gray-300"
                >
                  {token.devWallet}
                </Link>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Country</p>
                <p>{token.devCountry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart and Tabs */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800 p-4">
              <TradingViewChart address={params.ticker} />
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="w-full bg-gray-800">
                  <TabsTrigger value="comments" className="flex-1">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="trades" className="flex-1">
                    Recent Trades
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="comments" className="mt-4">
                  <CommentThread address={params.ticker} />
                </TabsContent>
                <TabsContent value="trades" className="mt-4">
                  <RecentTrades address={params.ticker} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Stacked Info Cards */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800 p-4">
              <BuySellForm token={token} />
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <h3 className="text-lg font-semibold mb-4 text-white">Social Links & Reactions</h3>
              <div className="space-y-4">
                <TokenSocialLinks links={token.socialLinks} />
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleReaction("heart")}
                    className={`flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded ${
                      userReactions.heart ? "text-red-500" : "text-gray-400"
                    } hover:text-red-500 transition-colors`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>{token.reactions.hearts}</span>
                  </button>
                  <button
                    onClick={() => handleReaction("like")}
                    className={`flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded ${
                      userReactions.like ? "text-blue-500" : "text-gray-400"
                    } hover:text-blue-500 transition-colors`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{token.reactions.likes}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded text-gray-400 hover:text-white transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <TokenInfo token={token} />
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <TopHolders address={params.ticker} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

