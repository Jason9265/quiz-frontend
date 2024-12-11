import React from 'react';
import { WordSelectQuestionProps } from '../types';

export const WordSelectQuestion: React.FC<WordSelectQuestionProps> = ({ 
  questionId, 
  text, 
  selectedAnswers = [], 
  onSelect 
}) => {
  // Split text and clean words of punctuation
  const wordsWithPunctuation = text.split(' ');
  const cleanWord = (word: string) => word.replace(/[.,;!?]$/, '');

  return (
    <div>
      <div className="mb-4 text-sm font-medium text-gray-500">
        Question Type: Word Selection (Click words to select/deselect)
      </div>
      <div className="space-x-2 leading-relaxed">
        {wordsWithPunctuation.map((wordWithPunct, index) => {
          const word = cleanWord(wordWithPunct);
          const punctuation = wordWithPunct.slice(word.length);
          
          return (
            <span key={index}>
              <button
                onClick={() => onSelect(questionId, word)}
                className={`inline-block px-1 rounded ${
                  selectedAnswers.includes(word)
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {word}
              </button>
              {punctuation}
            </span>
          );
        })}
      </div>
    </div>
  );
}; 