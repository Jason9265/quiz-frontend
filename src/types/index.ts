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
export interface Question {
  id: string;
  quiz_id: string;
  question_type: string;
  text: string;
  points: number;
  options: {
    choices: string[];
    correct_answer?: string | string[];
  };
  word_select_text?: {
    text: string;
    correct_words?: string[];
  };
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  pass_score: number;
  questions: Question[];
}

export interface QuizResult {
  total_points: number;
  earned_points: number;
  percentage: number;
  passed: boolean;
  results: {
    question_id: string;
    correct: boolean;
    points_earned: number;
  }[];
}
