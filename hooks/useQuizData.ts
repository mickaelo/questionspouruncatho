import { useCallback, useEffect, useState } from 'react';
import { quizService } from '../services/quizService';
import { Question, Quiz } from '../types/quiz';

export interface QuizDataState {
  questions: Question[];
  quizzes: Quiz[];
  statistics: {
    totalQuestions: number;
    totalQuizzes: number;
    questionsByCategory: Record<string, number>;
    questionsByDifficulty: Record<string, number>;
    quizzesByLevel: Record<number, number>;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export interface QuizDataActions {
  // Question retrieval
  getQuestion: (id: string) => Promise<Question | null>;
  refreshQuestions: () => Promise<void>;
  getQuestionsByCategory: (category: string) => Promise<Question[]>;
  getQuestionsByDifficulty: (difficulty: string) => Promise<Question[]>;
  getQuestionsByLevel: (level: number) => Promise<Question[]>;
  
  // Quiz retrieval
  getQuiz: (id: string) => Promise<Quiz | null>;
  refreshQuizzes: () => Promise<void>;
  getQuizzesByCategory: (category: string) => Promise<Quiz[]>;
  getQuizzesByCourse: (courseId: string) => Promise<Quiz[]>;
  getAvailableQuizzes: (userLevel: number) => Promise<Quiz[]>;
  getQuizzesByCategoryAndLevel: (category: string, userLevel: number) => Promise<Quiz[]>;
  
  // Statistics
  refreshStatistics: () => Promise<void>;
  
  // Utility
  clearError: () => void;
}

export const useQuizData = (): QuizDataState & QuizDataActions => {
  const [state, setState] = useState<QuizDataState>({
    questions: [],
    quizzes: [],
    statistics: null,
    isLoading: false,
    error: null
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Ajouter un timeout pour éviter le blocage infini
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout: Firebase connection failed')), 10000);
        });

        const dataPromise = Promise.all([
          quizService.getAllQuestions(),
          quizService.getAllQuizzes(),
          quizService.getQuizStatistics()
        ]);

        const [questions, quizzes, statistics] = await Promise.race([dataPromise, timeoutPromise]) as [any, any, any];

        setState(prev => ({
          ...prev,
          questions,
          quizzes,
          statistics,
          isLoading: false
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
        setLoading(false);
      }
    };

    loadInitialData();
  }, []); // Dépendances vides pour ne s'exécuter qu'une seule fois

  // Question actions
  const getQuestion = useCallback(async (id: string): Promise<Question | null> => {
    try {
      return await quizService.getQuestion(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get question');
      return null;
    }
  }, [setError]);

  const refreshQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const questions = await quizService.getAllQuestions();
      setState(prev => ({ ...prev, questions, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh questions');
      setLoading(false);
    }
  }, [setLoading, setError]);

  const getQuestionsByCategory = useCallback(async (category: string): Promise<Question[]> => {
    try {
      return await quizService.getQuestionsByCategory(category);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get questions by category');
      return [];
    }
  }, [setError]);

  const getQuestionsByDifficulty = useCallback(async (difficulty: string): Promise<Question[]> => {
    try {
      return await quizService.getQuestionsByDifficulty(difficulty);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get questions by difficulty');
      return [];
    }
  }, [setError]);

  const getQuestionsByLevel = useCallback(async (level: number): Promise<Question[]> => {
    try {
      return await quizService.getQuestionsByLevel(level);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get questions by level');
      return [];
    }
  }, [setError]);

  // Quiz actions
  const getQuiz = useCallback(async (id: string): Promise<Quiz | null> => {
    try {
      return await quizService.getQuiz(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quiz');
      return null;
    }
  }, [setError]);

  const refreshQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const quizzes = await quizService.getAllQuizzes();
      setState(prev => ({ ...prev, quizzes, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh quizzes');
      setLoading(false);
    }
  }, [setLoading, setError]);

  const getQuizzesByCategory = useCallback(async (category: string): Promise<Quiz[]> => {
    try {
      return await quizService.getQuizzesByCategory(category);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quizzes by category');
      return [];
    }
  }, [setError]);

  const getQuizzesByCourse = useCallback(async (courseId: string): Promise<Quiz[]> => {
    try {
      return await quizService.getQuizzesByCourse(courseId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quizzes by course');
      return [];
    }
  }, [setError]);

  const getAvailableQuizzes = useCallback(async (userLevel: number): Promise<Quiz[]> => {
    try {
      return await quizService.getAvailableQuizzes(userLevel);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get available quizzes');
      return [];
    }
  }, [setError]);

  const getQuizzesByCategoryAndLevel = useCallback(async (category: string, userLevel: number): Promise<Quiz[]> => {
    try {
      return await quizService.getQuizzesByCategoryAndLevel(category, userLevel);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quizzes by category and level');
      return [];
    }
  }, [setError]);

  // Statistics actions
  const refreshStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const statistics = await quizService.getQuizStatistics();
      setState(prev => ({ ...prev, statistics, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh statistics');
      setLoading(false);
    }
  }, [setLoading, setError]);

  return {
    ...state,
    getQuestion,
    refreshQuestions,
    getQuestionsByCategory,
    getQuestionsByDifficulty,
    getQuestionsByLevel,
    getQuiz,
    refreshQuizzes,
    getQuizzesByCategory,
    getQuizzesByCourse,
    getAvailableQuizzes,
    getQuizzesByCategoryAndLevel,
    refreshStatistics,
    clearError
  };
}; 