import Link from "next/link"
import { Twitter } from "lucide-react"
import { TelegramIcon, InstagramIcon, TikTokIcon } from "@/components/icons"

export function SiteSocialLinks() {
  return (
    <div className="flex space-x-4">
      <Link
        href="https://t.me/apeordie"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <TelegramIcon className="h-5 w-5" />
      </Link>
      <Link
        href="https://instagram.com/apeordie"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <InstagramIcon className="h-5 w-5" />
      </Link>
      <Link
        href="https://tiktok.com/@apeordie"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <TikTokIcon className="h-5 w-5" />
      </Link>
      <Link
        href="https://twitter.com/apeordie"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <Twitter className="h-5 w-5" />
      </Link>
    </div>
  )
}

