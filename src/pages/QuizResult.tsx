import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizResultData } from '../types';

export const QuizResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizResult = location.state as QuizResultData;
  
  const quizId = location.pathname.split('/')[2];

  if (!quizResult || !quizResult.results) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No Result Data Available</h1>
        <button 
          onClick={() => navigate('/lessons')}
          className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
          <div className="text-6xl font-bold mb-4">
            {quizResult.percentage}%
          </div>
          <p className="text-xl mb-2">
            You scored {quizResult.earned_points} out of {quizResult.total_points} points
          </p>
          <p className={`text-lg ${quizResult.passed ? 'text-green-600' : 'text-red-600'}`}>
            {quizResult.passed ? 'Passed!' : 'Not Passed'}
          </p>
        </div>

        <div className="space-y-8">
          {quizResult.results.map((result, index) => (
            <div key={result.question_id} className="border-b pb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium">Question {index + 1}</h3>
                <span className={`px-2 py-1 rounded ${
                  result.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {result.points_earned} points
                </span>
              </div>
              
              <p className="mb-4">{result.question_text}</p>
              
              <div className="space-y-2">
                <p className="font-medium">Your answer:</p>
                <p className={result.correct ? 'text-green-600' : 'text-red-600'}>
                  {Array.isArray(result.submitted_answer) 
                    ? result.submitted_answer.join(', ') 
                    : result.submitted_answer}
                </p>
                
                {!result.correct && (
                  <>
                    <p className="font-medium mt-2">Correct answer:</p>
                    <p className="text-green-600">
                      {Array.isArray(result.correct_answer) 
                        ? result.correct_answer.join(', ') 
                        : result.correct_answer}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/lessons')}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
          >
            Back to Lessons
          </button>
          <button
            onClick={() => navigate(`/quiz/${quizId}`)}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
