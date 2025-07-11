import { cookies } from "next/headers";

import { Chat } from "@/components/chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { auth } from "../../(auth)/auth";
import { redirect } from "next/navigation";
import { WorkspacePanel, MultiPanelWorkspace, ResizablePanel, ResizableHandle } from "@/components/workspace-panel";
import { MessageSquare, Brain, Sparkles, Bitcoin, TrendingUp, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ChatPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  const chatModel = modelIdFromCookie?.value || DEFAULT_CHAT_MODEL;

  const headerActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Brain className="size-4 mr-2" />
        Model: {chatModel.includes("crypto") ? "Crypto Expert" : "Crypto Pro"}
      </Button>
      <Button variant="outline" size="sm">
        <Sparkles className="size-4 mr-2" />
        Enhance
      </Button>
    </div>
  );

  return (
    <>
      <MultiPanelWorkspace>
        <ResizablePanel defaultSize={70} minSize={50}>
          <WorkspacePanel title="Crypto AI Chat" subtitle="Specialized cryptocurrency and blockchain assistant" icon={<Bitcoin className="size-4" />} headerActions={headerActions}>
            <Chat key={id} id={id} initialMessages={[]} initialChatModel={chatModel} initialVisibilityType="private" isReadonly={false} session={session} autoResume={false} />
          </WorkspacePanel>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={30} minSize={20} className="hidden md:block">
          <WorkspacePanel title="Crypto Tools & Context" subtitle="Market insights and crypto tools" icon={<TrendingUp className="size-4" />}>
            <div className="p-4 h-full flex flex-col gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Quick Crypto Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Bitcoin className="size-4 mr-2" />
                    New Crypto Chat
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <TrendingUp className="size-4 mr-2" />
                    Market Analysis
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Shield className="size-4 mr-2" />
                    Security Guide
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <DollarSign className="size-4 mr-2" />
                    DeFi Strategies
                  </Button>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="font-medium text-sm">Crypto Insights</h3>
                <div className="text-sm text-muted-foreground">
                  <p>Start chatting to get AI-powered cryptocurrency insights, market analysis, and personalized trading strategies.</p>
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
