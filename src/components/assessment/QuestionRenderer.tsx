'use client';

import React from 'react';
import { Question } from '../../types/assessment';

interface QuestionRendererProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswer: (answer: string) => void;
}

export function QuestionRenderer({ question, selectedAnswer, onAnswer }: QuestionRendererProps) {
  // A generic renderer. For MVP we use multiple choice for all, but this is where we'd add 
  // branching logic for different formats (e.g. if format === 'shape_rotation' show images)
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {question.dimension}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Format: {question.format}
        </span>
      </div>

      <h3 className="text-xl font-medium text-gray-800 leading-relaxed">
        {question.text}
      </h3>

      <div className="space-y-3 pt-4">
        {question.options?.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={idx}
              onClick={() => onAnswer(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-indigo-500' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
                </div>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
