'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({
  chatId,
  append,
  selectedVisibilityType,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Test APIs',
      label: 'Validate endpoints',
      action: 'Help me test and validate API endpoints with proper request/response handling',
    },
    {
      title: 'Build integrations',
      label: 'Create workflows',
      action: 'Create integration scripts and automation workflows for my application',
    },
    {
      title: 'Optimize data',
      label: 'Analyze queries',
      action: 'Analyze my data structure and help optimize database queries and performance',
    },
    {
      title: 'AI features',
      label: 'Build with Mesh AI',
      action: 'Help me build AI-powered features using the Mesh AI Protocol framework',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full max-w-xl"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left glass-card border-[rgba(216,231,242,0.1)] hover:border-[rgba(216,231,242,0.2)] hover:bg-[rgba(216,231,242,0.05)] rounded-xl px-3 py-2 text-xs flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start transition-all duration-200"
          >
            <span className="font-medium text-white">{suggestedAction.title}</span>
            <span className="text-[rgba(216,231,242,0.6)] text-xs">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);
