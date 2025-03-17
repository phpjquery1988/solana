"use client"
import {  useEffect, useRef } from "react"
import type React from "react"
import { useSession, getSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { toast } from 'react-toastify';
export default function AccountUpdatePage() {
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [prvImg, setPrvImg] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const { publicKey } = useWallet()
  const router = useRouter()
  const { connected } = useWallet()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, update } = useSession();
  useEffect(() => {
    async function getUserData() {
      const userdata:any= await getSession()
      if (!userdata) {
        router.push("/")
      }
      setUsername(userdata?.user.username)
      setDescription(userdata?.user.description)
      setPrvImg(userdata?.user.photo)
    }
       getUserData()
      
    }, [connected, router])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     const session = await getSession();
    if (!publicKey) return

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
          
        } catch (error) {
          console.error("Sign in error:", error)
          setError("Something went wrong. Please try again.")
          setIsLoading(false)
        }

    
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Set Up Your Account</h1>
         {error && (
                     <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
                       <AlertCircle className="h-4 w-4" />
                       <p>{error}</p>
                     </div>
                   )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="text-[#4fd1c5] mb-2 block">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
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
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
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
              className="bg-gray-900 border-gray-700 text-white"
              accept="image/*"
            />
            {prvImg && (
              <img
                src={prvImg}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <Button type="submit" className="w-full bg-[#0d7f76] hover:bg-[#0d7f76]/80 text-white">
            Update Account
          </Button>
        </form>
      </div>
    </div>
  )
}

