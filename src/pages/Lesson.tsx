import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Quiz } from '../types';

export const Lesson: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (lessonId) {
          const quizData = await api.getQuiz(lessonId);
          setLesson(quizData);
        }
      } catch (err) {
        setError('Failed to load lesson');
        console.error('Error loading lesson:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const startQuiz = () => {
    if (lesson?.id) {
      navigate(`/quiz/${lesson.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading lesson...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error || 'Lesson not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quiz Information</h2>
          <p className="text-gray-600">
            This lesson includes a quiz with {lesson.questions.length} questions.
            Pass score: {lesson.pass_score}%
          </p>
        </div>
        <button 
          onClick={startQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};
