import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Quiz, Question } from '../types';
import { SingleSelectQuestion } from '../components/SingleSelectQuestion';
import { MultiSelectQuestion } from '../components/MultiSelectQuestion';
import { WordSelectQuestion } from '../components/WordSelectQuestion';

export const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (quizId) {
          const quizData = await api.getQuiz(quizId);
          setQuiz(quizData);
          
          // Initialize answers for all questions
          const initialAnswers: Record<string, string | string[]> = {};
          quizData.questions.forEach((question: Question) => {
            if (question.question_type === 'single') {
              initialAnswers[question.id] = '';
            } else {
              initialAnswers[question.id] = [];
            }
          });
          setAnswers(initialAnswers);
        }
      } catch (error) {
        console.error('Failed to load quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const handleSingleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer || '' }));
  };

  const handleMultipleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => {
      const currentAnswers = Array.isArray(prev[questionId]) ? prev[questionId] as string[] : [];
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter(a => a !== answer)
        : [...currentAnswers, answer];
      return { ...prev, [questionId]: updatedAnswers };
    });
  };

  const handleWordSelect = (questionId: string, word: string) => {
    setAnswers(prev => {
      const currentAnswers = Array.isArray(prev[questionId]) ? prev[questionId] as string[] : [];
      return {
        ...prev,
        [questionId]: currentAnswers.includes(word)
          ? currentAnswers.filter(w => w !== word)
          : [...currentAnswers, word]
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await api.submitQuiz(quizId!, answers, quiz?.title || '');
      
      navigate(`/quiz/${quizId}/result`, {
        state: {
          quiz_id: result.quiz_id,
          total_points: result.total_points,
          earned_points: result.earned_points,
          percentage: result.percentage,
          passed: result.passed,
          results: result.results
        }
      });
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!quiz || quiz.questions.length === 0) {
    return <div className="text-center p-8">Quiz not found or no questions available</div>;
  }

  const currentQ = quiz.questions[currentQuestionIndex];

  const renderQuestion = (question: Question) => {
    switch (question.question_type) {
      case 'single':
        return (
          <SingleSelectQuestion
            questionId={question.id}
            choices={question.options.choices}
            selectedAnswer={answers[question.id] as string}
            onSelect={handleSingleAnswer}
          />
        );

      case 'multiple':
        return (
          <MultiSelectQuestion
            questionId={question.id}
            choices={question.options.choices}
            selectedAnswers={answers[question.id] as string[] || []}
            onSelect={handleMultipleAnswer}
          />
        );

      case 'word_select':
        return (
          <WordSelectQuestion
            questionId={question.id}
            text={question.options.text || ''}
            selectedAnswers={answers[question.id] as string[] || []}
            onSelect={handleWordSelect}
          />
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
        <div className="mb-4 text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
        <h2 className="text-xl font-semibold mb-6">{currentQ.text}</h2>
        
        {renderQuestion(currentQ)}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
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
