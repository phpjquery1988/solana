declare module "next-auth" {
  interface User {
    id: string
  }

  interface Session {
    user: {
      id: string
      username?: string | null
      description?: string | null
      publicKey?: string | null
    }
  }
}

