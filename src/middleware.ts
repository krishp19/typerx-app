import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Handle CORS headers
function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export default clerkMiddleware(async (auth, req) => {
  // Handle CORS for API routes
  if (req.url.includes('/api/')) {
    const response = NextResponse.next();
    return addCorsHeaders(response);
  }

  // Define public routes
  const publicRoutes = [
    '/',
    '/arena',
    '/leaderboard',
    '/api/leaderboard',
    '/api/arena',
    '/api/arena/(.*)',
    '/api/leaderboard/(.*)',
    '/api/users/(.*)', // Add users API to public routes
  ];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.endsWith('(.*)')) {
      const baseRoute = route.replace('(.*)', '');
      return req.url.includes(baseRoute);
    }
    return req.url.includes(route);
  });

  // Handle authentication for non-public routes
  if (!isPublicRoute && !req.url.includes('/login')) {
    try {
      await auth.protect();
    } catch {
      const signInUrl = new URL('/login', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

// Define routes to handle
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}; 