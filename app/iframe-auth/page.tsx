'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function IframeAuthPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const redirectUrl = searchParams.get('redirectUrl') || '/';

  useEffect(() => {
    if (status === 'authenticated') {
      // If already authenticated, redirect to the target URL
      window.location.href = redirectUrl;
      return;
    }

    if (status === 'unauthenticated' && !isAuthenticating) {
      setIsAuthenticating(true);
      // Automatically sign in as guest when this page loads
      signIn('guest', { 
        redirect: false, // Don't redirect automatically, we'll handle it
        callbackUrl: redirectUrl 
      }).then((result) => {
        if (result?.ok) {
          // Authentication successful, redirect to target URL
          window.location.href = redirectUrl;
        } else {
          console.error('Authentication failed:', result?.error);
          setIsAuthenticating(false);
        }
      }).catch((error) => {
        console.error('Authentication error:', error);
        setIsAuthenticating(false);
      });
    }
  }, [status, redirectUrl, isAuthenticating]);

  if (status === 'loading' || isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up iframe access...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we authenticate you as a guest user.</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' && !isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Authentication failed. Please refresh the page to try again.
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return null;
} 