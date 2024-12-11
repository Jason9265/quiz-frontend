import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { QuizHistoryItem } from '../types';

export const QuizHistory: React.FC = () => {
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const data = await api.getQuizHistory(JSON.parse(localStorage.getItem('user') || '{}').username);
        const sortedData = data.sort((a: QuizHistoryItem, b: QuizHistoryItem) => 
          new Date(b.quiz_time).getTime() - new Date(a.quiz_time).getTime()
        );
        setHistory(sortedData);
      } catch (err) {
        setError('Failed to load quiz history');
        console.error('Error loading quiz history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, []);

  const paginatedHistory = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading quiz history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz History</h1>
      
      {history.length === 0 ? (
        <div className="text-gray-600">No quiz attempts yet.</div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedHistory.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600">
                      Completed: {new Date(item.quiz_time).toLocaleDateString() + ' ' + new Date(item.quiz_time).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      item.passed ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.percentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.earned_points} / {item.total_points} points
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.passed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.passed ? 'Passed' : 'Failed'}
                  </span>
                  <button
                    onClick={() => navigate(`/quiz/${item.quiz_id}/result`, {
                        state: {
                          quiz_id: item.quiz_id,
                          total_points: item.total_points,
                          earned_points: item.earned_points,
                          percentage: item.percentage,
                          passed: item.passed,
                          results: item.results
                        }
                      })
                    }
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {history.length > itemsPerPage && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {Math.ceil(history.length / itemsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(history.length / itemsPerPage), p + 1))}
                disabled={currentPage >= Math.ceil(history.length / itemsPerPage)}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}; 