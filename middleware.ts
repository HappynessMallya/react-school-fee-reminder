// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  const token = await getToken({ req });
  
  if (!token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

// Specify the routes where the middleware should run
export const config = {
  matcher: ['/dashboard/:path*'], // Adjust to your dashboard path
};
