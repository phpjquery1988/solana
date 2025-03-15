import Link from "next/link"
import { SiteSocialLinks } from "@/components/site-social-links"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
            <p className="text-sm text-gray-400">
              Trading cryptocurrencies carries a high level of risk. Please ensure you understand these risks before
              trading.
            </p>
            <Link href="/disclaimer" className="text-sm text-[#0d7f76] hover:text-[#0d7f76]/80 mt-2 inline-block">
              Read full disclaimer
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">ApeOrDie.fun</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-sm text-gray-400 hover:text-white">
                  Fees
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <SiteSocialLinks />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} APE OR DIE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

