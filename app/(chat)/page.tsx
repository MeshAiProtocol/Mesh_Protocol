import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import { DashboardContent } from '@/components/dashboard-content';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  return <DashboardContent session={session} />;
}
