import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../types';

const mockLessons: Lesson[] = [
  {
    id: '6756fbf15f8b1d4eb291bb77',
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    quizId: '6756fbf15f8b1d4eb291bb77'
  },
];

export const LessonsList: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lessons</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockLessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lessons/${lesson.id}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-4">{lesson.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}; 