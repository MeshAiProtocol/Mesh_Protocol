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
    <Sidebar className="group-data-[side=left]:border-r-0 w-64">
      <SidebarHeader className="border-b border-border/50">
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center px-2 py-1">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">Recent Activity</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push('/');
                    router.refresh();
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">New Chat</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarHistory user={user} />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 p-2">
        {user && <SidebarUserNav user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
