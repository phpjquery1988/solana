import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./auth"

export async function middleware(request: NextRequest) {
  const session = await auth()
  console.log(session)
  // Define protected routes
  const protectedPaths = ["/profile", "/create-token"]
  const path = request.nextUrl.pathname
  console.log(path)
  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(
    (protectedPath) => path === protectedPath || path.startsWith(`${protectedPath}/`),
  )

  // If the path is protected and the user is not authenticated, redirect to login
  if (isProtectedPath && !session) {
    const loginUrl = new URL("/", request.url)
    loginUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(loginUrl)
  }

  // If the user is authenticated and trying to access login/register, redirect to profile
  if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profileme/:path*", "/dashboard/:path*", "/login", "/register"],
}