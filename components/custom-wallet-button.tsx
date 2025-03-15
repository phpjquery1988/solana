"use client"

import { useState, useEffect, useCallback } from "react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { toast } from 'react-toastify';
import { signOut } from "@/actions/auth-actions"
import { useRouter } from "next/navigation"
export function CustomWalletButton() {
  const { setVisible } = useWalletModal()
  const { wallet, connect, connecting, connected, publicKey, disconnect } = useWallet()
  const [buttonText, setButtonText] = useState("Connect wallet")
  const router = useRouter()
  useEffect(() => {
    if (connected && publicKey) {
      
      setButtonText(`${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`)
    } else {
      setButtonText("Connect wallet")
    }
  }, [connected, publicKey])
  const ConfirmToast = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
    <div>
      <p>Are you sure Logout?</p>
      <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" onClick={onConfirm} style={{ marginRight: 10 }}>Yes</button>
      <button className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={onCancel}>No</button>
    </div>
  );
  async function handleConfirm ()  {
      await disconnect()
      toast.success("Logout successfully!");
      await signOut()
      router.push("/")
      router.refresh()
  };
  const showConfirmation = () => {
    toast.info(
      <ConfirmToast 
        onConfirm={() => {
          handleConfirm();
          toast.dismiss();
        }}
        onCancel={() => toast.dismiss()}
      />,
      { autoClose: false, closeOnClick: false, position: "top-center"}
    );
  };
  const handleClick = useCallback(async () => {
    if (connected) {
      showConfirmation();
    } else if (wallet) {
      try {
        await connect()
        console.log("connected wallet...")
      } catch (error) {
        toast('Please connect your wallet to use the app.',{
          type:'error',
          autoClose: 3000,
        });
        console.error("Failed to connect:", error)
        setVisible(true)
      }
    } else {
      setVisible(true)
    }
  }, [connected, wallet, connect, disconnect, setVisible])

  return (
    <Button
      onClick={handleClick}
      disabled={connecting}
      className="bg-[rgb(8,91,85)] hover:bg-[#0d7f76] text-[rgb(231,231,231)] border border-[#0d7f76] font-medium px-6 py-2 rounded-md text-sm"
    >
      {connecting ? "Connecting..." : buttonText}
    </Button>
  )
}

