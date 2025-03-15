// pages/api/create-coin.ts
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import { type NextRequest, NextResponse } from "next/server"
const uri: string = process.env.MONGODB_URI || "";

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

interface CreateCoinRequest extends NextApiRequest {
  body: {
    userWallet: string;
    walletToCopy: string;
    amount: number;
    tradeType: string;
    followSettings: any; // You might want to define a more specific type
    tradeSettings: any; // You might want to define a more specific type
    releaseData: ReleaseData;
  };
}

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

export async function POST(request: NextRequest) 
{
    const releaseData:any= {};
    const newCoin: Coin = {
      creator: releaseData.publicKey,
      name: releaseData.name,
      ticker: releaseData.symbol,
      image: releaseData.image,
      description: releaseData.description,
      telegram: releaseData.telegram,
      twitter: releaseData.twitter,
      website: releaseData.website,
      token: releaseData.token,
      createdAt: new Date(),
    };

    try {
      await db.collection("coins").insertOne(newCoin);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error("Error inserting coin:", error);
      res.status(500).json({ error: 'Failed to create coin' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}