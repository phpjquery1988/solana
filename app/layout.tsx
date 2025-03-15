import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SolanaWalletProvider } from "@/components/solana-wallet-provider"
import { ToastContainer } from 'react-toastify';
import  SessionProvider  from "./providers"
const inter = Inter({ subsets: ["latin"] })
// import  SessionProvider  from "./providers";
export const metadata: Metadata = {
  title: "APE OR DIE",
  description: "Cryptocurrency and Memecoin Platform",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
        <SolanaWalletProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SolanaWalletProvider>
        </SessionProvider>
        <ToastContainer />
      
      </body>
    </html>
  )
}



import './globals.css'