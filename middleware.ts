import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { guestRegex, isDevelopmentEnvironment } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check if the request is from an iframe
  const referer = request.headers.get('referer');
  const isIframe = request.headers.get('sec-fetch-dest') === 'iframe' ||
                   request.headers.get('sec-fetch-mode') === 'navigate' ||
                   (referer && new URL(referer).origin !== new URL(request.url).origin);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    // If it's an iframe context, handle authentication differently to prevent loops
    if (isIframe) {
      // For iframe context, automatically sign in as guest without redirect
      const guestSignInUrl = new URL('/api/auth/guest', request.url);
      guestSignInUrl.searchParams.set('redirectUrl', request.url);
      guestSignInUrl.searchParams.set('iframe', 'true');
      
      return NextResponse.redirect(guestSignInUrl);
    }
    
    const redirectUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url),
    );
  }

  const isGuest = guestRegex.test(token?.email ?? '');

  if (token && !isGuest && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Add headers to allow iframe embedding
  const response = NextResponse.next();
  
  // Remove X-Frame-Options to allow iframe embedding
  response.headers.delete('X-Frame-Options');
  
  // Set Content Security Policy to allow iframe embedding
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' *; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *"
  );

  return response;
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/api/:path*',
    '/login',
    '/register',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
