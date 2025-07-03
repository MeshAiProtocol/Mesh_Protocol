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

  if (pathname.startsWith('/api/auth') || pathname.startsWith('/iframe-auth')) {
    return NextResponse.next();
  }

  // Enhanced iframe detection
  const referer = request.headers.get('referer');
  const secFetchDest = request.headers.get('sec-fetch-dest');
  const secFetchSite = request.headers.get('sec-fetch-site');
  const forceIframe = request.nextUrl.searchParams.has('iframe') || 
                      request.nextUrl.searchParams.get('mode') === 'iframe';
  
  // Check if request is coming from an iframe context
  const isIframe = forceIframe ||
                   secFetchDest === 'iframe' ||
                   secFetchSite === 'cross-site' ||
                   (referer && 
                    referer !== request.url && 
                    !referer.includes(new URL(request.url).hostname) &&
                    new URL(referer).hostname !== new URL(request.url).hostname);

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    // For iframe contexts, redirect to special iframe auth page
    if (isIframe) {
      const iframeAuthUrl = new URL('/iframe-auth', request.url);
      iframeAuthUrl.searchParams.set('redirectUrl', request.url);
      return NextResponse.redirect(iframeAuthUrl);
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

  // Add headers to allow iframe embedding for all authenticated requests
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
    '/iframe-auth',

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
