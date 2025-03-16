declare module "next-auth" {
  interface User {
      id: string
      username?: string | null
      photo?: string | null
      description?: string | null
      publicKey?: string | null
  }

  interface Session {
    user: {
      id: string
      username?: string | null
      photo?: string | null
      description?: string | null
      publicKey?: string | null
    }
  }
}

