import React from 'react';

interface MultiSelectQuestionProps {
  questionId: string;
  choices: string[];
  selectedAnswers: string[];
  onSelect: (questionId: string, answer: string) => void;
}

export const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({ questionId, choices, selectedAnswers, onSelect }) => {
  return (
    <div>
      <div className="mb-4 text-sm font-medium text-gray-500">
        Question Type: Multiple Choice (Select all that apply)
      </div>
      <div className="space-y-4">
        {choices.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(questionId, option)}
            className={`w-full p-4 text-left rounded-lg border ${
              selectedAnswers.includes(option)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}; 