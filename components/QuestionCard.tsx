import React from 'react';
import { Question } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  totalQuestions: number;
  currentIndex: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, totalQuestions, currentIndex }) => {
  const Icon = CATEGORY_ICONS[question.category];

  return (
    <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Icon size={120} />
      </div>
      
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-slate-400 text-xs font-mono">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Category Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
        <Icon size={14} />
        {question.category}
      </div>

      {/* Question Text */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
        {question.question}
      </h2>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="
              relative p-6 text-lg font-semibold rounded-xl text-left transition-all duration-200
              bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50
              hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1
              active:scale-95 active:translate-y-0
              group-hover:border-slate-600
            "
          >
            <span className="block text-slate-100">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
