import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        role === 'user' 
          ? 'bg-foreground/5 ml-auto max-w-[80%]' 
          : 'bg-primary/10 mr-auto max-w-[80%]'
      }`}
    >
      <p className="text-sm font-medium mb-1">
        {role === 'user' ? 'You' : 'AI Assistant'}
      </p>
      <p className="text-muted-foreground">{content}</p>
    </div>
  );
};