import { signIn } from '@/app/(auth)/auth';
import { isDevelopmentEnvironment } from '@/lib/constants';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get('redirectUrl') || '/';
  const isIframe = searchParams.get('iframe') === 'true';

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (token) {
    // If we already have a token, redirect to the original URL or home
    const targetUrl = isIframe ? redirectUrl : '/';
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // For iframe contexts, we need to handle the sign-in differently
  if (isIframe) {
    // Set headers to allow iframe embedding
    const response = NextResponse.next();
    response.headers.delete('X-Frame-Options');
    response.headers.set(
      'Content-Security-Policy',
      "frame-ancestors 'self' *; default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *"
    );
    
    // Sign in as guest with a specific redirect that won't cause loops
    return signIn('guest', { redirect: true, redirectTo: redirectUrl });
  }

  return signIn('guest', { redirect: true, redirectTo: redirectUrl });
}
