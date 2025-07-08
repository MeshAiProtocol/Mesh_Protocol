import { cookies } from 'next/headers';
import Script from 'next/script';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TopNavigation } from '@/components/top-navigation';
import { auth } from '../(auth)/auth';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <div className="flex flex-col h-screen overflow-hidden">
        <TopNavigation />
        <div className="flex flex-1 overflow-hidden">
          <SidebarProvider defaultOpen={!isCollapsed}>
            <AppSidebar user={session?.user} />
            <SidebarInset className="h-full flex-1 overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
}
