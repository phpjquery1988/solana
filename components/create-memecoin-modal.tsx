"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CreateMemecoinModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
}

export function CreateMemecoinModal({ isOpen, onClose, onConnect }: CreateMemecoinModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rocket-kR4ljf1ztjXZyFKpvIxy7OpykUgKo3.png"
            alt="Rocket"
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <DialogDescription className="text-center text-gray-400">
            Please connect your wallet to create a memecoin.
          </DialogDescription>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={onClose} variant="outline" className="border-gray-600 text-black hover:bg-gray-800">
            Cancel
          </Button>
          <Button onClick={onConnect} className="bg-[#0d7f76] hover:bg-[#0d7f76]/80 text-white">
            Connect Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

