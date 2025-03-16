
"use server"

import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"
interface Coin {
    creator: string;
    name: string;
    ticker: string;
    image: string;
    description: string;
    telegram: string;
    twitter: string;
    website: string;
    token: string;
    createdAt: Date;
  }
interface ReleaseData {
  publicKey: string;
  name: string;
  symbol: string;
  image: string;
  description: string;
  telegram: string;
  twitter: string;
  website: string;
  token: string;
}
export async function getTokens(id: any) {
    const client = await clientPromise
    const db = client.db()
    return db.collection("tokens").find({})
  }
export async function getTokenById(id: any) {
  const client = await clientPromise
  const db = client.db()
  return db.collection("tokens").find({_id : new ObjectId(id) })
}
export async function getTokenByCreator(creator: any) {
    const client = await clientPromise
    const db = client.db()
    return db.collection("tokens").find({creator : creator })
}

export async function getTokenByName(name: string) {
  const client = await clientPromise
  const db = client.db()
  return db.collection("users").findOne({ name: name})
}

export async function createToken(releaseData:Coin) {
  const client = await clientPromise
  const db = client.db()

  const newCoin= {
    creator: releaseData.creator,
    name: releaseData.name,
    ticker: releaseData.ticker,
    image: releaseData.image,
    description: releaseData.description,
    telegram: releaseData.telegram,
    twitter: releaseData.twitter,
    website: releaseData.website,
    token: releaseData.token,
    createdAt: new Date(),
  };

  const result = await db.collection("tokens").insertOne(newCoin)
  
  return result
}

