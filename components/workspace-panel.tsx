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
      "flex flex-col h-full overflow-hidden workspace-panel",
      className
    )}>
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-muted/20 to-muted/10">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted border border-border/50">
              {icon}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-lg">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          {headerActions}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted/50">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect">
              <DropdownMenuItem>
                <Maximize2 className="w-4 h-4 mr-2" />
                Maximize
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Minimize2 className="w-4 h-4 mr-2" />
                Minimize
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
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
        className="h-full rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl"
      >
        {children}
      </ResizablePanelGroup>
    </div>
  );
}

export { ResizablePanel, ResizableHandle }; 