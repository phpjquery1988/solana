import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import { getUserByEmail,createUser,getUserById } from "@/lib/user"
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils"
export const { handlers, auth, signIn, signOut } = 
NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  redirect:false,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        publicKey: { label: "pubKey", type: "string" }
      },
      async authorize(credentials) {
        console.log(credentials)
        if (!credentials?.publicKey) {
          console.log("Could not load pubKey");
          return null
        }

        let user:any= await getUserByEmail(credentials.publicKey)
        console.log("user after email")
        if (!user) 
        {
          console.log("Could not load credentials");
          const userData:any={
            publicKey: credentials.publicKey
           }
          user = await  createUser(userData)
          user = await getUserByEmail(credentials.publicKey)
        }
        return {
          id: user._id.toString(),
          publicKey: user?.publicKey,
          username: user?.username,
          description: user?.description,
          photo: user?.photo
        }
      },
    }),
    
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | any }) {
      if (user) {
        token.id = user.id
        token.publicKey = user.publicKey?user.publicKey:''
        token.username = user.username?user?.username:''
        token.description = user.description?user.description:''
        token.photo = user.photo?user.photo:''
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.publicKey = token.publicKey as string;
        session.user.username = token.username as string;
        session.user.description = token.description as string;
        session.user.photo = token.photo as string;
      }
      return session
    },
  },
})

