// pages/api/create-coin.ts
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest, NextResponse } from "next/server"
import { getTokenByCreator , getTokenByName, getTokenById , createToken } from "@/lib/token";
import { auth } from "@/auth"
import path from "path"
import { z } from "zod"
import { mkdir } from "fs/promises"
import { writeFile, unlink } from "fs/promises"

const updateProfileSchema = z.object({
  creator: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  ticker: z.number().min(0.0001, "Ticker must be at least 0.1"),
  image:z.any().optional(),
  description:z.string().min(10, "Description must be at least 10 characters"),
  token:z.string().min(10, "Description must be at least 10 characters"),
  telegram:z.any().optional(),
  twitter:z.any().optional(),
  website:z.any().optional(),
})
async function saveFile(file: File, userId: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), "public/uploads/token")
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    console.error("Error creating directory:", error)
  }

  // Create a unique filename
  const filename = `${userId}-${Date.now()}${path.extname(file.name)}`
  const filepath = path.join(uploadDir, filename)

  await writeFile(filepath, buffer)
  return `/uploads/token/${filename}` // Return the public URL
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
export async function POST(request: NextRequest) 
{
  try {
      const session = await auth()
      
          if (!session || !session.user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
          }
      
          // Parse the multipart form data
          const formData = await request.formData()
          const data:any= 
          {
              name:formData.get("name") as string,
              creator:formData.get("creator") as string,
              image:formData.get("image") as File | null,
              description:formData.get("id") as string,
              ticker:formData.get("ticker") as string,
              telegram:formData.get("creator") as string,
              twitter:formData.get("twitter") as string,
              website:formData.get("website") as string,
              token:formData.get("token") as string,
              createdAt:new Date(),
              
          }
      // Validate input
      const validatedData : any = updateProfileSchema.parse(data)
      if (session.user.id !== data.id) {
              return { error: "Unauthorized" }
      }
       const exitUser=await getTokenByName(data.name)
       if(exitUser)
       {
             return NextResponse.json ({ error: "Token name is exits!", success:false })
       }
       const newToken:any=await createToken(data);
       let tokenData:any=null;
       if (newToken && newToken.insertedId) {
        const insertedId = newToken.insertedId;
        console.log("Inserted ID:", insertedId);
        tokenData=await getTokenById(insertedId.toString());
      } else {
        return NextResponse.json ({ error: "Failed to insert document or no insertedId found.", success:false })
      }
       
       return NextResponse.json({ data:tokenData, success: true, message: "Profile updated successfully" }, { status: 200 })
      } catch (error) {
        console.error("Token created error:", error)
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
      }
  }