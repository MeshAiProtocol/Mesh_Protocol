import { cookies } from 'next/headers';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import { ApiTestWorkspace } from '@/components/api-test-workspace';

export default async function ApiTestPage() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  return <ApiTestWorkspace session={session} />;
} 