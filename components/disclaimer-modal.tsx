"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const DISCLAIMER_COOKIE_NAME = "disclaimer_accepted"
const COOKIE_EXPIRY_DAYS = 90 // 3 months

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasAcceptedDisclaimer = Cookies.get(DISCLAIMER_COOKIE_NAME)
    if (!hasAcceptedDisclaimer) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    Cookies.set(DISCLAIMER_COOKIE_NAME, "true", { expires: COOKIE_EXPIRY_DAYS })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="bg-gray-900 border border-gray-800 max-w-2xl mx-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="mt-4 space-y-4 text-gray-300">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apeordiefull-JV9mgQmol9EUjWePQ81UAGvKGMyFSy.png"
            alt="APE OR DIE Full Logo"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogHeader>
            <DialogTitle className="text-white text-center text-2xl font-bold">Welcome to ApeOrDie.fun</DialogTitle>
          </DialogHeader>
          <div className="text-sm space-y-2">
            <p>
              Trading cryptocurrencies and memecoins involves substantial risk of loss and is not suitable for all
              investors. You must fully understand the risks involved before trading on this platform.
            </p>
            <p>
              The information provided on ApeOrDie.fun does not constitute investment advice, financial advice, trading
              advice, or any other sort of advice. You are solely responsible for your trading decisions and any
              resulting gains or losses.
            </p>
            <p>By using this site, you agree to our:</p>
            <div className="flex justify-center space-x-4">
              <Link href="/terms" className="text-[#0d7f76] hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-[#0d7f76] hover:underline">
                Privacy Policy
              </Link>
              <Link href="/fees" className="text-[#0d7f76] hover:underline">
                Fee Structure
              </Link>
            </div>
          </div>
        </div>
        <Button
          className="mt-6 w-full bg-[rgb(8,91,85)] hover:bg-[#0d7f76] text-white py-3 text-lg font-bold"
          onClick={handleAccept}
        >
          I Understand and Agree
        </Button>
      </DialogContent>
    </Dialog>
  )
}

