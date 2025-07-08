'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { History, Plus } from 'lucide-react';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0 w-64 p-4 pr-0">
      <SidebarHeader className="border-b border-[rgba(216,231,242,0.1)] bg-[rgba(216,231,242,0.02)] backdrop-blur-sm">
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center px-2 py-1">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[rgba(216,231,242,0.7)]" />
              <span className="font-medium text-sm text-white">Recent Activity</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-[rgba(216,231,242,0.1)] border border-[rgba(216,231,242,0.1)]"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push('/');
                    router.refresh();
                  }}
                >
                  <Plus className="w-4 h-4 text-[rgba(216,231,242,0.8)]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end" className="glass-card border-[rgba(216,231,242,0.1)]">New Chat</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2 custom-scrollbar">
        <SidebarHistory user={user} />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[rgba(216,231,242,0.1)] bg-[rgba(216,231,242,0.02)] backdrop-blur-sm p-2">
        {user && <SidebarUserNav user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
