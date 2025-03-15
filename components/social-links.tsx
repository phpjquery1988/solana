import Link from "next/link"
import { Twitter, Globe } from "lucide-react"
import { TelegramIcon } from "@/components/icons" // We'll create this custom icon

interface SocialLinksProps {
  links?: {
    telegram?: string
    twitter?: string
    website?: string
  }
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.telegram && (
        <Link
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
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
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
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
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Globe className="h-5 w-5 mr-2" />
          <span>Website</span>
        </Link>
      )}
    </div>
  )
}

