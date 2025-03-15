"use server"

import { createUser, getUserByEmail } from "@/lib/user"
import { z } from "zod"
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/auth"



export async function signIn(data: {
  pubKey: any
}) {
  try {
  const result:any=  await nextAuthSignIn("credentials", {
     redirect: false,
     publicKey: data.pubKey
    })

    return { success: true , result:result }
  } catch (error: any) {
    console.error("Sign in error:", error)
    return { success:false,error: "Invalid Wallet token" }
  }
}

export async function signOut() {
  try {
    await nextAuthSignOut()
    localStorage.clear();
    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error: "Failed to sign out" }
  }
}

