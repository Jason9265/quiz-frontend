import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lesson as LessonType } from '../types';

// Mock data - replace with actual API call
const mockLesson: LessonType = {
  id: '6756fbf15f8b1d4eb291bb77',
  title: 'Introduction to React',
  description: 'Learn the basics of React',
};

export const Lesson: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz/${mockLesson.id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4">{mockLesson.title}</h1>
        <p className="text-gray-600 mb-6">{mockLesson.description}</p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
          <p>Lesson content goes here...</p>
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
