export interface Lesson {
    id: string;
    title: string;
    description: string;
    quizId: string;
  }
  
  export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface Quiz {
    id: string;
    lessonId: string;
    questions: Question[];
  }
  
  export interface QuizResult {
    quizId: string;
    score: number;
    totalQuestions: number;
    answers: Record<string, number>;
  }