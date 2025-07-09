 import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import { WorkspacePanel, MultiPanelWorkspace, ResizablePanel, ResizableHandle } from '@/components/workspace-panel';
import { MessageSquare, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  const chatModel = modelIdFromCookie?.value || DEFAULT_CHAT_MODEL;

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Brain className="w-4 h-4 mr-2" />
        Model: {chatModel}
      </Button>
      <Button variant="outline" size="sm">
        <Sparkles className="w-4 h-4 mr-2" />
        Enhance
      </Button>
    </div>
  );

  return (
    <>
      <MultiPanelWorkspace>
        <ResizablePanel defaultSize={70} minSize={50}>
          <WorkspacePanel
            title="AI Conversation"
            subtitle="Intelligent chat with advanced reasoning"
            icon={<MessageSquare className="w-4 h-4" />}
            headerActions={headerActions}
          >
            <Chat
              key={id}
              id={id}
              initialMessages={[]}
              initialChatModel={chatModel}
              initialVisibilityType="private"
              isReadonly={false}
              session={session}
              autoResume={false}
            />
          </WorkspacePanel>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={30} minSize={20}  className='hidden md:block'>
          <WorkspacePanel
            title="Context & Tools"
            subtitle="Additional context and AI tools"
           
            icon={<Brain className="w-4 h-4" />}
          >
            <div className="p-4 h-full flex flex-col gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    New Chat
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Switch Model
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enhance Response
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="font-medium text-sm">AI Insights</h3>
                <div className="text-sm text-muted-foreground">
                  <p>No active conversation insights yet. Start chatting to see AI-powered suggestions and context.</p>
                </div>
              </div>
            </div>
          </WorkspacePanel>
        </ResizablePanel>
      </MultiPanelWorkspace>
      
      <DataStreamHandler id={id} />
    </>
  );
}
