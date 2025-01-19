import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  // Block direct access to /api/romannumeral
  if (url.pathname.startsWith('/api/romannumeral')) {
    return NextResponse.redirect(new URL('/404', req.url)); // Redirect to a 404 page
  }

  return NextResponse.next(); // Allow other requests
}

export const config = {
  matcher: ['/api/romannumeral'], // Only apply middleware to this route
};
