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
      title: 'Test API endpoints',
      label: 'and validate responses',
      action: 'Help me test and validate API endpoints with proper request/response handling',
    },
    {
      title: 'Generate integration',
      label: 'scripts and workflows',
      action: 'Create integration scripts and automation workflows for my application',
    },
    {
      title: 'Analyze data structure',
      label: 'and optimize queries',
      action: 'Analyze my data structure and help optimize database queries and performance',
    },
    {
      title: 'Build AI-powered',
      label: 'application features',
      action: 'Help me build AI-powered features using the Mesh AI Protocol framework',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-3 w-full max-w-2xl"
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
            className="text-left border-2 border-dashed border-border/50 hover:border-primary/50 rounded-xl px-4 py-4 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start hover:bg-primary/5 transition-all duration-200"
          >
            <span className="font-semibold text-foreground">{suggestedAction.title}</span>
            <span className="text-muted-foreground text-xs">
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
