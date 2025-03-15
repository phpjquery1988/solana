"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useSession, getSession } from "next-auth/react"
import { CustomWalletButton } from "@/components/custom-wallet-button"
import { SiteSocialLinks } from "@/components/site-social-links"
import { CreateMemecoinModal } from "@/components/create-memecoin-modal"
import { AccountSetupModal } from "@/components/account-setup-modal"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { toast } from 'react-toastify';
import { signIn } from "@/actions/auth-actions"
export  function Navigation() {
  const { connected, publicKey,wallet } = useWallet()
  const [showCreateMemecoinModal, setShowCreateMemecoinModal] = useState(false)
  const [showAccountSetupModal, setShowAccountSetupModal] = useState(false)
  const router = useRouter()
  const { setVisible } = useWalletModal()
  const { data: session, status } = useSession();
  useEffect(() => {
    async function handleSignIn() {
      try {
        if (connected && publicKey) {
            const result = await signIn({pubKey:publicKey?publicKey.toBase58():''});
            console.log("Sign-in result:", result);
            const session = await getSession();
            console.log(session)
            const user:any= session?.user;
            if (!user) {
              setShowAccountSetupModal(true)
            }
            else if(!user.username || user.username=='')
            {
              setShowAccountSetupModal(true)
             }
           
        }
      } catch (error) {
        console.error("Sign-in error:", error);
      }
    }
      
      handleSignIn();
    
  }, [connected, publicKey])

  const handleCreateMemecoin = () => {
    if (connected && session) {
      router.push("/create-token")
    } else {
      setShowCreateMemecoinModal(true)
    }
  }

  const handleConnectWallet = () => {
    setShowCreateMemecoinModal(false)
    setVisible(true)
    setTimeout(() => {
      if(wallet?.readyState==="NotDetected") {
        toast.error("Please connect your wallet to use the app.");
      }
    },500)
  }
  const handleConnectLeftWallet = () => {
    setVisible(true)
    setTimeout(() => {
      if(wallet?.readyState==="NotDetected") {
        toast.error("Please connect your wallet to use the app.");
      }
    },500)
  }
  const handleCloseAccountSetupModal = () => {
    setShowAccountSetupModal(false)
  }

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="w-24 flex-shrink-0 flex items-center gap-4">
        <Link href="/how-it-works" className="text-sm hover:text-gray-300 whitespace-nowrap">
          How It Works
        </Link>
        <SiteSocialLinks />
      </div>

      <div className="flex flex-col items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apeordielogo-hAOysEJl6xiWvG9ezOwx9q7cu4SLfo.png"
            alt="APE OR DIE"
            width={400}
            height={120}
            className="h-24 w-auto"
          />
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-[#0d7f76]/20 text-[#e7e7e7] px-3 py-1 rounded-full flex items-center gap-1">
            <span className="h-2 w-2 bg-[#0d7f76] rounded-full"></span>
            <span>Solana</span>
          </div>
          <CustomWalletButton />
        </div>
        <Button
          variant="outline"
          onClick={handleCreateMemecoin}
          className="bg-transparent border border-[#0d7f76] text-[#e7e7e7] hover:bg-[#0d7f76]/10 mt-2"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rocket-kR4ljf1ztjXZyFKpvIxy7OpykUgKo3.png"
            alt="Rocket"
            width={24}
            height={24}
            className="h-6 w-6 mr-2"
          />
          Create New Memecoin
        </Button>
      </div>

      <div className="w-24 flex-shrink-0 flex justify-end">
        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
          {connected ? (
            <Link href="/profile" className="hover:text-gray-300">
              My Profile
            </Link>
          ) : (
            <Link href="#" onClick={() => handleConnectLeftWallet()} className="text-white hover:text-gray-300">
              Connect Wallet
            </Link>
          )}
          <span className="text-gray-500">|</span>
          <Link href="/advertise" className="hover:text-gray-300">
            Advertise
          </Link>
        </div>
      </div>

      <CreateMemecoinModal
        isOpen={showCreateMemecoinModal}
        onClose={() => setShowCreateMemecoinModal(false)}
        onConnect={handleConnectWallet}
      />

      <AccountSetupModal isOpen={showAccountSetupModal} onClose={handleCloseAccountSetupModal} />
    </header>
  )
}

