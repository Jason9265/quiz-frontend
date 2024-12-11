import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { LessonsList } from './pages/LessonsList';
import { Lesson } from './pages/Lesson';
import { QuizPage } from './pages/QuizPage';
import { QuizResult } from './pages/QuizResult';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './pages/Register';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/lessons" element={<ProtectedRoute><LessonsList /></ProtectedRoute>} />
              <Route path="/lessons/:lessonId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
              <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
              <Route path="/quiz/:quizId/result" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={<Navigate to="/lessons" replace />} />
            </Routes>
          </main>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;