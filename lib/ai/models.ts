export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Mesh AI Crypto',
    description: 'Specialized crypto and blockchain expert model',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Mesh AI Crypto Pro',
    description: 'Advanced crypto analysis with deep reasoning',
  },
];
