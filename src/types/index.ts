// Auth Types
export interface User {
  id: string;
  username: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  message: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: AuthResponse) => void;
  logout: () => void;
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  pass_score: number;
}

// Quiz Types
export type QuestionType = 'single' | 'multiple' | 'word_select';

export interface Question {
  id: string;
  quiz_id: string;
  question_type: QuestionType;
  text: string;
  points: number;
  options: {
    text: string;
    choices: string[];
    correct_answer?: string | string[];
  };
  word_select_text?: {
    text: string;
    correct_words?: string[];
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  pass_score: number;
  questions: Question[];
}

export interface QuestionResult {
  question_id: string;
  question_text: string;
  correct: boolean;
  points_earned: number;
  submitted_answer: string | string[];
  correct_answer: string | string[];
  question_choices?: string | string[];
  question_sentence?: string;
}

export interface QuizResultData {
  total_points: number;
  earned_points: number;
  percentage: number;
  passed: boolean;
  results: QuestionResult[];
}

export interface WordSelectQuestionProps {
  questionId: string;
  text: string;
  selectedAnswers: string[];
  onSelect: (questionId: string, word: string) => void;
}

export type QuizAnswers = Record<string, string | string[]>;
