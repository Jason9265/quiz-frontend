import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const QuizResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalPoints, passScore } = location.state || { 
    score: 0, 
    totalPoints: 0,
    passScore: 0 
  };

  const percentage = Math.round((score / totalPoints) * 100);
  const passed = score >= passScore;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
        <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {percentage}%
        </div>
        <p className="text-xl mb-2">
          You scored {score} out of {totalPoints} points
        </p>
        <p className="text-lg mb-6 text-gray-600">
          {passed ? 'Congratulations! You passed!' : 'Keep practicing!'}
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/lessons')}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
          >
            Back to Lessons
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
