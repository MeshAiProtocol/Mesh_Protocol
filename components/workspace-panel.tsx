'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { 
  Maximize2, 
  Minimize2, 
  MoreHorizontal,
  X
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface WorkspacePanelProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  isResizable?: boolean;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

export function WorkspacePanel({
  title,
  subtitle,
  icon,
  children,
  className,
  headerActions,
  isResizable = false,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
}: WorkspacePanelProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full overflow-hidden glass-card",
      className
    )}>
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4  bg-gradient-to-r from-[rgba(216,231,242,0.05)] to-[rgba(216,231,242,0.02)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(216,231,242,0.1)] border border-[rgba(216,231,242,0.15)] backdrop-blur-sm">
              {icon}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-lg text-white">{title}</h2>
            {subtitle && (
              <p className="text-sm text-[rgba(216,231,242,0.7)]">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {headerActions}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-[rgba(216,231,242,0.1)] border border-[rgba(216,231,242,0.1)]">
                <MoreHorizontal className="w-4 h-4 text-[rgba(216,231,242,0.8)]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-[rgba(216,231,242,0.1)]">
              <DropdownMenuItem className="hover:bg-[rgba(216,231,242,0.1)]">
                <Maximize2 className="w-4 h-4 mr-2" />
                Maximize
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[rgba(216,231,242,0.1)]">
                <Minimize2 className="w-4 h-4 mr-2" />
                Minimize
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive hover:bg-[rgba(239,68,68,0.1)]">
                <X className="w-4 h-4 mr-2" />
                Close
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden custom-scrollbar">
        {children}
      </div>
    </Card>
  );
}

interface MultiPanelWorkspaceProps {
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function MultiPanelWorkspace({
  children,
  className,
  orientation = 'horizontal'
}: MultiPanelWorkspaceProps) {
  return (
    <div className={cn("h-full p-4 workspace-container", className)}>
      <ResizablePanelGroup 
        direction={orientation}
        className="h-full rounded-2xl  bg-[rgba(8,8,8,0.3)] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        {children}
      </ResizablePanelGroup>
    </div>
  );
}

export { ResizablePanel, ResizableHandle }; 