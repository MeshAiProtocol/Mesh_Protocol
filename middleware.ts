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

  // Check if the request is coming from an iframe context
  const isIframe = request.headers.get('sec-fetch-dest') === 'iframe' ||
                   request.headers.get('sec-fetch-site') === 'cross-site' ||
                   request.headers.get('referer');

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (!token) {
    // If accessed via iframe and no token, return a simple page instead of redirecting
    if (isIframe) {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authentication Required</title>
            <style>
              body { 
                font-family: system-ui, sans-serif; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100vh; 
                margin: 0; 
                background: #f5f5f5; 
              }
              .container { text-align: center; padding: 2rem; }
              .btn { 
                background: #0070f3; 
                color: white; 
                padding: 0.5rem 1rem; 
                border: none; 
                border-radius: 0.25rem; 
                text-decoration: none; 
                display: inline-block; 
                margin-top: 1rem; 
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Authentication Required</h2>
              <p>This application requires authentication.</p>
              <a href="${request.url}" target="_blank" class="btn">Open in New Tab</a>
            </div>
          </body>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      });
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

  return NextResponse.next();
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
