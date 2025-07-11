'use server';

import { generateText, type UIMessage } from 'ai';
import { cookies } from 'next/headers';
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import type { VisibilityType } from '@/components/visibility-selector';
import { myProvider } from '@/lib/ai/providers';

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  try {
    console.log('[Title Generation] Generating title for message:', message.content);
    
    const { text: title } = await generateText({
      model: myProvider.languageModel('title-model'),
      system: `Generate a short, descriptive title (max 80 characters) based on the user's first message. 
      Make it clear and specific to their question or topic. 
      Do not use quotes, colons, or generic phrases like "Simple Greeting".
      Examples:
      - User asks about Bitcoin price → "Bitcoin Price Inquiry"
      - User asks about crypto trading → "Crypto Trading Discussion"
      - User asks about coding help → "Programming Help Request"`,
      prompt: message.content || JSON.stringify(message),
    });

    console.log('[Title Generation] Generated title:', title);
    
    // Fallback if title is too generic or empty
    if (!title || title.trim().length === 0 || title.toLowerCase().includes('simple greeting') || title.toLowerCase().includes('test title')) {
      const fallbackTitle = message.content 
        ? `Chat: ${message.content.slice(0, 50)}${message.content.length > 50 ? '...' : ''}`
        : `New Chat ${new Date().toLocaleDateString()}`;
      
      console.log('[Title Generation] Using fallback title:', fallbackTitle);
      return fallbackTitle;
    }

    return title;
  } catch (error) {
    console.error('[Title Generation] Error generating title:', error);
    // Fallback title based on message content
    const fallbackTitle = message.content 
      ? `Chat: ${message.content.slice(0, 50)}${message.content.length > 50 ? '...' : ''}`
      : `New Chat ${new Date().toLocaleDateString()}`;
    
    console.log('[Title Generation] Using error fallback title:', fallbackTitle);
    return fallbackTitle;
  }
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
