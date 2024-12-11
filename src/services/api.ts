import { LoginCredentials, AuthResponse, Quiz, QuizResult } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async getAllQuizzes() {
    const response = await fetch(`${BASE_URL}/quizzes/`);
    if (!response.ok) throw new Error('Failed to fetch quizzes');
    return response.json();
  },

  async getQuiz(quizId: string) {
    const response = await fetch(`${BASE_URL}/quizzes/${quizId}/attempt/`);
    if (!response.ok) throw new Error('Failed to fetch quiz');
    return response.json();
  },

  async submitQuiz(quizId: string, answers: Record<string, string>) {
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      question_id: questionId,
      answer: answer
    }));

    const response = await fetch(`${BASE_URL}/quizzes/${quizId}/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers: formattedAnswers
      })
    });

    if (!response.ok) throw new Error('Failed to submit quiz');
    return response.json();
  },

  async register(data: { username: string; password: string }) {
    const response = await fetch(`${BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    return response.json();
  },

  async login(data: { username: string; password: string }) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log('Login Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Login failed');
      }

      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};
