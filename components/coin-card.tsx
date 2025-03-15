import Link from "next/link"
import Image from "next/image"
import type { Memecoin } from "@/utils/generateMemecoins"

function truncateDescription(description: string, maxLength = 120): string {
  if (description.length <= maxLength) return description
  return description.slice(0, maxLength).trim() + "..."
}

export function CoinCard({ name, ticker, description, marketCap, badges, logoSrc }: Memecoin) {
  const badgeCount = Object.values(badges).filter(Boolean).length

  const formattedMarketCap = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(marketCap)

  const truncatedDescription = truncateDescription(description)

  return (
    <Link href={`/token/${ticker}`} className="block">
      <div className="bg-gray-900 rounded-lg relative shadow-custom hover:bg-gray-800 transition-colors h-full">
        {/* Badges */}
        {badgeCount > 0 && (
          <div
            className="absolute bg-[#0D7F76] px-4 py-2 rounded-lg flex items-center gap-2 shadow-badge"
            style={{
              top: "-8px",
              right: "-8px",
              zIndex: 10,
            }}
          >
            {badges.pro && (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro-l3lp6HwVkqZeyLaP3hOs2OsQZrIhPn.png"
                alt="PRO"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            )}
            {badges.pro && badgeCount > 1 && <div className="w-[1px] h-4 bg-[#075D57]" />}
            {badges.kyc && (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kyc-2z7NiPxdnMqGBBLbmPzFVf0wlctgWB.png"
                alt="KYC Verified"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            )}
            {badges.kyc && badges.trending && <div className="w-[1px] h-4 bg-[#075D57]" />}
            {badges.trending && (
              <div className="flex items-center gap-1 text-white">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trending-RYH7VJOaxQGST6lLAteqRSYtLOm5Ra.png"
                  alt="Trending"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <span className="text-xs">
                  x<b>{badges.trending}</b>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Card content */}
        <div className="p-4 flex gap-3 h-full">
          <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center">
            <Image src={logoSrc || "/placeholder.svg"} alt={name} width={64} height={64} className="h-16 w-16" />
          </div>

          <div className="flex flex-col justify-between flex-grow overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg truncate">{name}</h3>
                <span className="text-xs text-gray-400 flex-shrink-0">${ticker}</span>
              </div>

              <p className="text-sm text-gray-300 mb-2">{truncatedDescription}</p>
            </div>

            <p className="text-sm text-gray-400">
              Market Cap: <span className="text-white">{formattedMarketCap}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

