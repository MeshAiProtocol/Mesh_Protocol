'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Code, 
  Workflow, 
  Database, 
  Settings,
  Search,
  Bell,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

const workspaces = [
  { 
    id: 'chat', 
    label: 'AI Chat', 
    icon: MessageSquare, 
    path: '/',
    description: 'Conversational AI interface'
  },
  { 
    id: 'api-test', 
    label: 'API Testing', 
    icon: Code, 
    path: '/api-test',
    description: 'Test and debug APIs'
  },
  { 
    id: 'workflows', 
    label: 'Workflows', 
    icon: Workflow, 
    path: '/workflows',
    description: 'Automation workflows'
  },
  { 
    id: 'data', 
    label: 'Data Hub', 
    icon: Database, 
    path: '/data',
    description: 'Data analysis and visualization'
  }
];

export function TopNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState('');

  const currentWorkspace = workspaces.find(w => 
    w.path === '/' ? pathname === '/' : pathname.startsWith(w.path)
  ) || workspaces[0];

  return (
    <header className="border-b /80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Mesh AI Logo" width={64} height={64} className="rounded-lg" />
          </div>
          
          {/* Workspace Selector */}
          <div className="hidden md:flex items-center gap-1 ml-6 mr-[var(--slider-width,0px)]">
            {workspaces.map((workspace) => {
              const Icon = workspace.icon;
              const isActive = currentWorkspace.id === workspace.id;
              
              return (
                <Button
                  key={workspace.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => router.push(workspace.path)}
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    isActive && "bg-primary text-primary-foreground shadow-sm"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{workspace.label}</span>
                  {workspace.id === 'api-test' && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      New
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Mobile Workspace Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <currentWorkspace.icon className="w-4 h-4 mr-2" />
                {currentWorkspace.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {workspaces.map((workspace) => {
                const Icon = workspace.icon;
                return (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => router.push(workspace.path)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <div>
                      <div>{workspace.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {workspace.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input
              placeholder="Search chats, APIs, workflows..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9 w-64 bg-muted/50"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 