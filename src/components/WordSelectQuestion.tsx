import React from 'react';

interface WordSelectQuestionProps {
  questionId: string;
  text: string;
  selectedAnswer: string;
  onSelect: (questionId: string, answer: string) => void;
}

export const WordSelectQuestion: React.FC<WordSelectQuestionProps> = ({ questionId, text, selectedAnswer, onSelect }) => {
  return (
    <div>
      <div className="mb-4 text-sm font-medium text-gray-500">
        Question Type: Word Selection
      </div>
      <p className="mb-4">{text}</p>
      <input 
        type="text"
        value={selectedAnswer}
        onChange={(e) => onSelect(questionId, e.target.value)}
        className="w-full p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder="Type the missing word(s)"
      />
    </div>
  );
}; 