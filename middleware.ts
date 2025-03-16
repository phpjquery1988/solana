import { NextResponse } from 'next/server';

export function middleware(req:any) {
  const url = req.nextUrl.clone();
  const sessionToken = req.cookies.get('authjs.session-token'); // Replace with your actual token/cookie handling logic

  

  // Protected pages (require logged-in user)
  if (['/profile', '/create-token','/account-update'].includes(url.pathname)) {
    if (!sessionToken) {
      url.pathname = '/'; // Redirect to auth page if not logged in
      return NextResponse.redirect(url);
    }
  }

  // API accessible by guest users
  if (url.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // API requiring a valid session
  if (['/api/profile', '/api/create-token', '/api/connect-wallet' , '/api/mint-token', '/api/token'].includes(url.pathname)) {
    if (!sessionToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  // Default: Allow all other requests
  return NextResponse.next();
}

// Specify the matching routes for the middleware
export const config = {
  matcher: [
    '/', // Home page
    '/about', // About page
    '/profile', // Profile page
    '/create-token', // Token page
    '/update-account', // Token page
    '/api/auth/:path*', // API accessible by guest
    '/api/create-token', 
    '/api/profile', // API requiring session
    '/api/connect-wallet', // API requiring session
    '/api/mint-token',
    '/api/token',
  ],
};
