import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { writeFile, unlink } from "fs/promises"
import path from "path"
import { z } from "zod"
import { mkdir } from "fs/promises"
import {getUserByUsername} from "@/lib/user";
const updateProfileSchema = z.object({
  id: z.string(),
  username: z.string().min(5, "Name must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  photo:z.any().optional()
})
// Helper function to save uploaded file
async function saveFile(file: File, userId: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), "public/uploads/users")
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    console.error("Error creating directory:", error)
  }

  // Create a unique filename
  const filename = `${userId}-${Date.now()}${path.extname(file.name)}`
  const filepath = path.join(uploadDir, filename)

  await writeFile(filepath, buffer)
  return `/uploads/users/${filename}` // Return the public URL
}

// Helper function to delete file
async function deleteFile(filepath: string) {
  try {
    // Remove the leading slash and 'public' from the path
    const fullPath = path.join(process.cwd(), "public", filepath)
    await unlink(fullPath)
  } catch (error) {
    console.error("Error deleting file:", error)
  }
}
export async function GET(request: NextRequest) {
  
 
  return NextResponse.json({ error: "User not found" }, { status: 200 })
}
export async function POST(request: NextRequest) {
  
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    return NextResponse.json({ error: "User not found" }, { status: 200 })
  }
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Parse the multipart form data
    const formData = await request.formData()
    const data:any= 
    {
        id:formData.get("id") as string,
        username:formData.get("username") as string,
        description:formData.get("description") as string,
        photo:formData.get("photo") as File | null
    }
    if (session.user.id !== data.id) {
        return { error: "Unauthorized" }
    }
    
    // Validate input
    const validatedData : any = updateProfileSchema.parse(data)
     

    const client = await clientPromise
    const db = client.db()
    
    // Get the current user to check if they have an existing profile image
    const user = await db.collection("users").findOne({
      _id: new ObjectId(session.user.id),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const exitUser=await getUserByUsername(validatedData.username,validatedData.id)
    if(exitUser)
    {
          return NextResponse.json ({ error: "Username is exits!", success:false })
    }
    const updateData: Record<string, any> = {  }

    // Handle profile image
    if (data && data.photo instanceof File) {
      // If there's an existing image, delete it
      if (user.photo) {
        await deleteFile(user.photo)
      }
  
      // Save the new image
      const imagePath = await saveFile(data.photo, session.user.id)
      updateData.photo = imagePath
    } 
    updateData.username = data.username;
    updateData.description = data.description;
    // Update the user in the database
    const result = await db.collection("users").updateOne({ _id: new ObjectId(session.user.id) }, { $set: updateData })
    const userData = await db.collection("users").findOne({
        _id: new ObjectId(session.user.id),
      })
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ data:userData, success: true, message: "Profile updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

