import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Question, QuizData } from '../types';


export const Quiz: React.FC = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (quizId) {
          const quizData = await api.getQuiz(quizId);
          setQuiz(quizData);
        }
      } catch (error) {
        console.error('Failed to load quiz:', error);
      } finally {
        setLoading(false);
      }
      
    };

    loadQuiz();
  }, [quizId]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!quiz || quiz.questions.length === 0) {
    return <div className="text-center p-8">Quiz not found or no questions available</div>;
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const result = await api.submitQuiz(quizId!, answers);
      navigate(`/quiz/${quizId}/result`, {
        state: {
          score: result.earned_points,
          totalPoints: result.total_points,
          passScore: quiz.pass_score,
          passed: result.passed,
          percentage: result.percentage
        }
      });
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  const currentQ = quiz.questions[currentQuestionIndex];

  if (!currentQ) {
    return <div className="text-center p-8">Question not found</div>;
  }

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
        <div className="mb-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
        <h2 className="text-xl font-semibold mb-6">{currentQ.text}</h2>
        <div className="space-y-4">
          {currentQ.question_type === 'word_select' ? (
            <div>
              <p>{currentQ.word_select_text?.text}</p>
              <input 
                type="text"
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                className="mt-4 w-full p-2 border rounded"
                placeholder="Type your answer here"
              />
            </div>
          ) : (
            currentQ.options.choices.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option)}
                className={`w-full p-4 text-left rounded-lg border ${
                  answers[currentQ.id] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                {option}
              </button>
            ))
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
