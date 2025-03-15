"use server"

import { auth } from "@/auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { z } from "zod"
import {getUserByUsername} from "../lib/user";
const updateProfileSchema = z.object({
  id: z.string(),
  username: z.string().min(5, "Name must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  photo:z.any().optional()
})

export async function updateProfile(data: {
    id: any
    username: any
    description: any
    photo: any
}) {
  try {
    const session = await auth()

    if (!session) {
      return { error: "Not authenticated" }
    }

    // Ensure the user is updating their own profile
    if (session.user.id !== data.id) {
      return { error: "Unauthorized" }
    }

    // Validate input
    const validatedData : any = updateProfileSchema.parse(data)
    
    // Update user
    const client = await clientPromise
    const db = client.db()
    const exitUser=await getUserByUsername(validatedData.username,validatedData.id)
    if(exitUser)
    {
      return { error: "Username is exits!", success:false }
    }
    console.log(validatedData.photo)
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(validatedData.id) }, { $set: { 
        username: validatedData.username,
        description: validatedData.description,
        photo: data.photo
    } })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }

    return { error: "Something went wrong. Please try again." }
  }
}

