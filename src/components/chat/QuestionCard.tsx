import React from 'react';

interface QuestionCardProps {
  question: string;
  onClick: (question: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onClick }) => {
  return (
    <button
      onClick={() => onClick(question)}
      className="p-6 text-left transition-colors rounded-xl bg-gradient-to-r from-green-400/70 to-emerald-500/70 hover:from-green-400/80 hover:to-emerald-500/80"
    >
      <p className="mb-4 text-white">{question}</p>
      <div className="w-full py-2 text-center bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">
        Click to Ask AI
      </div>
    </button>
  );
};