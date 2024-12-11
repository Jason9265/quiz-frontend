import React from 'react';

interface SingleSelectQuestionProps {
  questionId: string;
  choices: string[];
  selectedAnswer: string;
  onSelect: (questionId: string, answer: string) => void;
}

export const SingleSelectQuestion: React.FC<SingleSelectQuestionProps> = ({ questionId, choices, selectedAnswer, onSelect }) => {
  return (
    <div>
      <div className="mb-4 text-sm font-medium text-gray-500">
        Question Type: Single Choice
      </div>
      <div className="space-y-4">
        {choices.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(questionId, option)}
            className={`w-full p-4 text-left rounded-lg border ${
              selectedAnswer === option
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