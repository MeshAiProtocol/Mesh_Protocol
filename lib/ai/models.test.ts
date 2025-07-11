import { simulateReadableStream } from 'ai';
import { MockLanguageModelV1 } from 'ai/test';
import { getResponseChunksByPrompt } from '@/tests/prompts/utils';

export const chatModel = new MockLanguageModelV1({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: 'stop',
    usage: { promptTokens: 10, completionTokens: 20 },
    text: `Hello, world!`,
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});

export const reasoningModel = new MockLanguageModelV1({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: 'stop',
    usage: { promptTokens: 10, completionTokens: 20 },
    text: `Hello, world!`,
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt, true),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});

export const titleModel = new MockLanguageModelV1({
  doGenerate: async ({ prompt }: any) => {
    // Generate a more realistic title based on the prompt content
    let generatedTitle = 'Chat Conversation';
    
    if (typeof prompt === 'string') {
      const content = prompt.toLowerCase();
      if (content.includes('bitcoin') || content.includes('crypto')) {
        generatedTitle = 'Cryptocurrency Discussion';
      } else if (content.includes('code') || content.includes('programming')) {
        generatedTitle = 'Programming Help';
      } else if (content.includes('api') || content.includes('test')) {
        generatedTitle = 'API Development Chat';
      } else if (content.includes('price') || content.includes('market')) {
        generatedTitle = 'Market Analysis';
      } else {
        // Extract first few words for a more dynamic title
        const words = content.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').slice(0, 3);
        if (words.length > 0) {
          generatedTitle = words.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Discussion';
        }
      }
    }
    
    return {
      rawCall: { rawPrompt: null, rawSettings: {} },
      finishReason: 'stop',
      usage: { promptTokens: 10, completionTokens: 20 },
      text: generatedTitle,
    };
  },
  doStream: async ({ prompt }: any) => {
    // Generate the same dynamic title for streaming
    let generatedTitle = 'Chat Conversation';
    
    if (typeof prompt === 'string') {
      const content = prompt.toLowerCase();
      if (content.includes('bitcoin') || content.includes('crypto')) {
        generatedTitle = 'Cryptocurrency Discussion';
      } else if (content.includes('code') || content.includes('programming')) {
        generatedTitle = 'Programming Help';
      } else if (content.includes('api') || content.includes('test')) {
        generatedTitle = 'API Development Chat';
      } else if (content.includes('price') || content.includes('market')) {
        generatedTitle = 'Market Analysis';
      } else {
        const words = content.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').slice(0, 3);
        if (words.length > 0) {
          generatedTitle = words.map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Discussion';
        }
      }
    }
    
    return {
      stream: simulateReadableStream({
        chunkDelayInMs: 500,
        initialDelayInMs: 1000,
        chunks: [
          { type: 'text-delta', textDelta: generatedTitle },
          {
            type: 'finish',
            finishReason: 'stop',
            logprobs: undefined,
            usage: { completionTokens: 10, promptTokens: 3 },
          },
        ],
      }),
      rawCall: { rawPrompt: null, rawSettings: {} },
    };
  },
});

export const artifactModel = new MockLanguageModelV1({
  doGenerate: async () => ({
    rawCall: { rawPrompt: null, rawSettings: {} },
    finishReason: 'stop',
    usage: { promptTokens: 10, completionTokens: 20 },
    text: `Hello, world!`,
  }),
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 50,
      initialDelayInMs: 100,
      chunks: getResponseChunksByPrompt(prompt),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});
