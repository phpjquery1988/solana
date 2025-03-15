
"use server"

import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getUserByEmail(pubKey: any) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("users").findOne({publicKey : pubKey })
}

export async function getUserById(id: string) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("users").findOne({ _id: new ObjectId(id) })
}

export async function getUserByUsername(username: string, id:string) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("users").findOne({ username: username ,_id:{$ne:new ObjectId(id)}})
}

export async function createUser(data: {
  username: string
  publicKey: string
  password: string
  description: string
}) {
  const client = await clientPromise
  const db = client.db()

  const hashedPassword = data.password

  const result = await db.collection("users").insertOne({
    username: data.username,
    publicKey: data.publicKey,
    photo: data.publicKey,
    description: data.description,
    createdAt: new Date(),
  })

  return result
}

