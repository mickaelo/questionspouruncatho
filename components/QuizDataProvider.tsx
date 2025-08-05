import React, { createContext, useContext } from 'react';
import { useQuizData } from '../hooks/useQuizData';
import { Question, Quiz } from '../types/quiz';

interface QuizDataContextType {
  // État des données
  questions: Question[];
  quizzes: Quiz[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  getQuiz: (id: string) => Promise<Quiz | null>;
  getQuizzesByCategory: (category: string) => Promise<Quiz[]>;
  getAvailableQuizzes: (userLevel: number) => Promise<Quiz[]>;
  refreshData: () => Promise<void>;
  clearError: () => void;
}

const QuizDataContext = createContext<QuizDataContextType | undefined>(undefined);

interface QuizDataProviderProps {
  children: React.ReactNode;
}

export const QuizDataProvider: React.FC<QuizDataProviderProps> = ({ children }) => {
  const quizData = useQuizData();

  const contextValue: QuizDataContextType = {
    questions: quizData.questions,
    quizzes: quizData.quizzes,
    isLoading: quizData.isLoading,
    error: quizData.error,
    getQuiz: quizData.getQuiz,
    getQuizzesByCategory: quizData.getQuizzesByCategory,
    getAvailableQuizzes: quizData.getAvailableQuizzes,
    refreshData: quizData.refreshQuizzes,
    clearError: quizData.clearError,
  };

  return (
    <QuizDataContext.Provider value={contextValue}>
      {children}
    </QuizDataContext.Provider>
  );
};

export const useQuizDataContext = (): QuizDataContextType => {
  const context = useContext(QuizDataContext);
  if (context === undefined) {
    throw new Error('useQuizDataContext must be used within a QuizDataProvider');
  }
  return context;
}; 