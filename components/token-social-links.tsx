import Link from "next/link"
import { Twitter, Globe } from "lucide-react"
import { TelegramIcon } from "@/components/icons"

interface TokenSocialLinksProps {
  links?: {
    telegram?: string
    twitter?: string
    website?: string
  }
}

export function TokenSocialLinks({ links }: TokenSocialLinksProps) {
  if (!links) {
    return null
  }

  return (
    <div className="flex justify-between w-full">
      {links.telegram && (
        <Link
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded inline-flex items-center justify-center text-sm"
        >
          <TelegramIcon className="h-5 w-5 mr-2" />
          <span>Telegram</span>
        </Link>
      )}
      {links.twitter && (
        <Link
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded inline-flex items-center justify-center text-sm"
        >
          <Twitter className="h-5 w-5 mr-2" />
          <span>Twitter</span>
        </Link>
      )}
      {links.website && (
        <Link
          href={links.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded inline-flex items-center justify-center text-sm"
        >
          <Globe className="h-5 w-5 mr-2" />
          <span>Website</span>
        </Link>
      )}
    </div>
  )
}

