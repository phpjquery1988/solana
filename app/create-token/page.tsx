"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  useWallet,
  useConnection,
  WalletReadyState,
} from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from "next/navigation"
import Link from "next/link"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSession, getSession,signIn, signOut } from "next-auth/react"
import {
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import axios from 'axios';
export default function CreateToken() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    description: "",
    image: null as File | null,
    telegram: "",
    website: "",
    twitter: "",
  })
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const { connected } = useWallet()
  const router = useRouter()
  const { publicKey, sendTransaction,  signTransaction } = useWallet();
  const { connection } = useConnection();
  const [mintAddress, setMintAddress] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [mintAmount, setMintAmount] = useState<number>(0);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  useEffect(() => {
    console.log(session)
    if (!session) {
      router.push("/")
    }
  }, [connected, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaToken) {
      alert("Please complete the captcha")
      return
    }
    // Handle form submission
    console.log(formData, captchaToken)
    // Reset captcha after submission
    captchaRef.current?.resetCaptcha()
    setCaptchaToken(null)
  }

  if (!connected) {
    return null // or a loading spinner
  }

  return (
    <div className="bg-black text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[#0d7f76] hover:text-[#0d7f76]/80 mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="text-4xl font-bold mb-8">Create Your Token</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-[#4fd1c5] mb-2 block">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="ticker" className="text-[#4fd1c5] mb-2 block">
              Ticker
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <Input
                id="ticker"
                value={formData.ticker}
                onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white pl-8"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-[#4fd1c5] mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div>
            <Label className="text-[#4fd1c5] mb-2 block">Image or Video</Label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400 mb-2">Drag and drop an image or video</p>
              <Button variant="outline" className="text-[#4fd1c5] border-[#4fd1c5]">
                Select file
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xl block">Extra Details</Label>

            <div>
              <Label htmlFor="telegram" className="text-gray-400 mb-2 block">
                Telegram link
              </Label>
              <Input
                id="telegram"
                placeholder="(optional)"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="website" className="text-gray-400 mb-2 block">
                Website link
              </Label>
              <Input
                id="website"
                placeholder="(optional)"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="twitter" className="text-gray-400 mb-2 block">
                Twitter or X link
              </Label>
              <Input
                id="twitter"
                placeholder="(optional)"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-4">Tip: Coin data cannot be changed after creation</p>
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
              onVerify={(token) => setCaptchaToken(token)}
              ref={captchaRef}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4"
              disabled={!captchaToken}
            >
              Create Coin
            </Button>
            <p className="text-sm text-gray-400 mt-4 text-center">
              When your coin completes its bonding curve, you receive 0.5 SOL
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

