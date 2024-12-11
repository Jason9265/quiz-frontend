import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="h-14" />
      <header className="fixed top-0 left-0 right-0 h-14 bg-black z-50">
        <div className="container mx-auto h-full px-4">
          <div className="flex items-center h-full">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Quiz App" 
                className="h-[50px] w-auto max-h-12"
              />
            </Link>
            
            <div className="flex items-center gap-4 ml-auto">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-semibold cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    JD
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                      <Link 
                        to="/quiz-history" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Quiz History
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-transparent text-white hover:bg-white/10">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-white text-black hover:bg-white/90">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}; 