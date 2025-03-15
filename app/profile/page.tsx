"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CoinCard } from "@/components/coin-card"
import { generateMemecoins, type Memecoin } from "@/utils/generateMemecoins"
import { useWallet } from "@solana/wallet-adapter-react"
import { useSession, getSession,signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from 'next/link';
import { Edit } from 'lucide-react'; 
export default function ProfilePage() {
  const [userTokens, setUserTokens] = useState<Memecoin[]>([])
  const { wallet, connect, connecting, connected, publicKey, disconnect } = useWallet()
  const router = useRouter()
  const [userdata, setUserdata] = useState<any>([])
  const { data: session, status } = useSession();
  const [walletText, setWalletText] = useState("Connecting..")
  useEffect(() => {
    async function getUserData() {
          const userdbdata:any= await getSession()
          setUserdata(userdbdata)
          if (!userdata) {
            router.push("/")
          }
    }
    if (connected && publicKey) {
      
      setWalletText(`${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`)
    }
    getUserData()
     
    // In a real app, we'd fetch the user's tokens from an API
    setUserTokens(generateMemecoins(5))
  }, [connected,router])
  const gotoProfile = () => {
    router.push("/account-update")
  }
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile <Edit onClick={gotoProfile} className="mr-1 cursor-pointer" size={20} />
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
          <p>Wallet Address: {walletText}</p>
          <p>KYC Status: {userdata.verified?'Verified':'Not Verified'}</p>
          <p>Account Type: {userdata.verified?userdata.verified:'Standard'}</p>
          {!userdata.verified && userdata.verified!='Standard' && (
              <Button className="mt-4 bg-[#0d7f76] hover:bg-[#0d7f76]/80">Upgrade to Pro</Button>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">My Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userTokens.map((token, index) => (
              <CoinCard key={index} {...token} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <p>No recent activity to display.</p>
        </div>
      </div>
    </div>
  )
}

