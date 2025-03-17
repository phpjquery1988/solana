"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useWallet } from "@solana/wallet-adapter-react"
import { signIn } from "@/actions/auth-actions"
import { AlertCircle } from "lucide-react"
import { updateProfile } from "@/actions/profile-actions"
import { useSession, getSession } from "next-auth/react"
import { toast } from 'react-toastify';
interface AccountSetupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountSetupModal({ isOpen, onClose }: AccountSetupModalProps) {
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const router = useRouter()
  
  
  const { connected, publicKey,wallet } = useWallet()
  const callbackUrl ="/profile"
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, update } = useSession();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const session = await getSession();
    if(!session)
    {
      router.push("/")
      return;
    }
    // Here you would typically send this data to your backend
    const pubKey:any = publicKey?publicKey.toBase58():'';
    console.log("Account created:", { username, description, photo:photo ,pubKey})
    try {
     
    let id:any=session?.user?.id;
    const formData = new FormData()
    formData.append("id", id)
    formData.append("username", username)
    formData.append("description", description)
    if (photo) formData.append("photo", photo)

    
    const resultapi:any =await fetch('/api/profile', { method: 'PUT', body: formData }) 
            console.log(resultapi)
              if (!resultapi.ok) {
                const errorData = await resultapi.json(); // Parse error response
                setError(errorData.error || 'An error occurred.');
                setIsLoading(false);
                return;
              }
              // router.push(callbackUrl)
              // router.refresh()
              const result:any= await resultapi.json();
              console.log(result)
              toast.success(result.message);
              await update({ ...session, user: { ...session?.user, photo: result.data.photo, username: result.data.username, description:result.data.description } });
      onClose()
    } catch (error) {
      console.error("Sign in error:", error)
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
    
  }

  const handleSkip = () => {
    //localStorage.setItem("accountSetupComplete", "true")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Set Up Your Account</DialogTitle>
        </DialogHeader>
        {error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-[#4fd1c5] mb-2 block">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-[#4fd1c5] mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="photo" className="text-[#4fd1c5] mb-2 block">
              Profile Photo
            </Label>
            <Input
              id="photo"
              type="file"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="bg-gray-800 border-gray-700 text-white"
              accept="image/*"
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <Button type="button" onClick={handleSkip} variant="outline" className="flex-1 text-black">
              Skip
            </Button>
            <Button type="submit" className="flex-1 bg-[#0d7f76] hover:bg-[#0d7f76]/80 text-white">
             Update Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

