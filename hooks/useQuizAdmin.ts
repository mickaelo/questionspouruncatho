import { useCallback, useEffect, useState } from 'react';
import { quizAdminService } from '../services/quizAdminService';
import { Question, Quiz } from '../types/quiz';

export interface QuizAdminState {
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

export interface QuizAdminActions {
  // Question management
  createQuestion: (question: Omit<Question, 'id'>) => Promise<string>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  getQuestion: (id: string) => Promise<Question | null>;
  refreshQuestions: () => Promise<void>;
  getQuestionsByCategory: (category: string) => Promise<Question[]>;
  getQuestionsByDifficulty: (difficulty: string) => Promise<Question[]>;
  
  // Quiz management
  createQuiz: (quiz: Omit<Quiz, 'id'>) => Promise<string>;
  updateQuiz: (id: string, quiz: Partial<Quiz>) => Promise<void>;
  updateQuizQuestions: (id: string, questionIds: string[]) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  getQuiz: (id: string) => Promise<Quiz | null>;
  refreshQuizzes: () => Promise<void>;
  getQuizzesByCategory: (category: string) => Promise<Quiz[]>;
  getQuizzesByLevel: (level: number) => Promise<Quiz[]>;
  
  // Bulk operations
  importQuestionsFromData: (questions: Omit<Question, 'id'>[]) => Promise<string[]>;
  importQuizzesFromData: (quizzes: Omit<Quiz, 'id'>[]) => Promise<string[]>;
  deleteAllQuestions: () => Promise<void>;
  deleteAllQuizzes: () => Promise<void>;
  
  // Statistics
  refreshStatistics: () => Promise<void>;
  
  // Utility
  clearError: () => void;
}

export const useQuizAdmin = (): QuizAdminState & QuizAdminActions => {
  const [state, setState] = useState<QuizAdminState>({
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
        const [questions, quizzes, statistics] = await Promise.all([
          quizAdminService.getAllQuestions(),
          quizAdminService.getAllQuizzes(),
          quizAdminService.getQuizStatistics()
        ]);

        setState(prev => ({
          ...prev,
          questions,
          quizzes,
          statistics,
          isLoading: false
        }));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load data');
        setLoading(false);
      }
    };

    loadInitialData();
  }, [setLoading, setError]);

  // Question management
  const createQuestion = useCallback(async (question: Omit<Question, 'id'>): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const id = await quizAdminService.createQuestion(question);
      await refreshQuestions();
      return id;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create question');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const updateQuestion = useCallback(async (id: string, question: Partial<Question>): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.updateQuestion(id, question);
      await refreshQuestions();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update question');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteQuestion = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.deleteQuestion(id);
      await refreshQuestions();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete question');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const getQuestion = useCallback(async (id: string): Promise<Question | null> => {
    setError(null);
    
    try {
      return await quizAdminService.getQuestion(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get question');
      throw error;
    }
  }, [setError]);

  const refreshQuestions = useCallback(async (): Promise<void> => {
    setError(null);
    
    try {
      const questions = await quizAdminService.getAllQuestions();
      setState(prev => ({ ...prev, questions }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh questions');
      throw error;
    }
  }, [setError]);

  const getQuestionsByCategory = useCallback(async (category: string): Promise<Question[]> => {
    setError(null);
    
    try {
      return await quizAdminService.getQuestionsByCategory(category);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get questions by category');
      throw error;
    }
  }, [setError]);

  const getQuestionsByDifficulty = useCallback(async (difficulty: string): Promise<Question[]> => {
    setError(null);
    
    try {
      return await quizAdminService.getQuestionsByDifficulty(difficulty);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get questions by difficulty');
      throw error;
    }
  }, [setError]);

  // Quiz management
  const createQuiz = useCallback(async (quiz: Omit<Quiz, 'id'>): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const id = await quizAdminService.createQuiz(quiz);
      await refreshQuizzes();
      return id;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const updateQuiz = useCallback(async (id: string, quiz: Partial<Quiz>): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.updateQuiz(id, quiz);
      await refreshQuizzes();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const updateQuizQuestions = useCallback(async (id: string, questionIds: string[]): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.updateQuizQuestions(id, questionIds);
      await refreshQuizzes();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update quiz questions');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteQuiz = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.deleteQuiz(id);
      await refreshQuizzes();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete quiz');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const getQuiz = useCallback(async (id: string): Promise<Quiz | null> => {
    setError(null);
    
    try {
      return await quizAdminService.getQuiz(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quiz');
      throw error;
    }
  }, [setError]);

  const refreshQuizzes = useCallback(async (): Promise<void> => {
    setError(null);
    
    try {
      const quizzes = await quizAdminService.getAllQuizzes();
      setState(prev => ({ ...prev, quizzes }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh quizzes');
      throw error;
    }
  }, [setError]);

  const getQuizzesByCategory = useCallback(async (category: string): Promise<Quiz[]> => {
    setError(null);
    
    try {
      return await quizAdminService.getQuizzesByCategory(category);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quizzes by category');
      throw error;
    }
  }, [setError]);

  const getQuizzesByLevel = useCallback(async (level: number): Promise<Quiz[]> => {
    setError(null);
    
    try {
      return await quizAdminService.getQuizzesByLevel(level);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get quizzes by level');
      throw error;
    }
  }, [setError]);

  // Bulk operations
  const importQuestionsFromData = useCallback(async (questions: Omit<Question, 'id'>[]): Promise<string[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const ids = await quizAdminService.importQuestionsFromData(questions);
      await refreshQuestions();
      await refreshStatistics();
      return ids;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import questions');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const importQuizzesFromData = useCallback(async (quizzes: Omit<Quiz, 'id'>[]): Promise<string[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const ids = await quizAdminService.importQuizzesFromData(quizzes);
      await refreshQuizzes();
      await refreshStatistics();
      return ids;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import quizzes');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteAllQuestions = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.deleteAllQuestions();
      await refreshQuestions();
      await refreshStatistics();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete all questions');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const deleteAllQuizzes = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await quizAdminService.deleteAllQuizzes();
      await refreshQuizzes();
      await refreshStatistics();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete all quizzes');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  // Statistics
  const refreshStatistics = useCallback(async (): Promise<void> => {
    setError(null);
    
    try {
      const statistics = await quizAdminService.getQuizStatistics();
      setState(prev => ({ ...prev, statistics }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh statistics');
      throw error;
    }
  }, [setError]);

  return {
    ...state,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    refreshQuestions,
    getQuestionsByCategory,
    getQuestionsByDifficulty,
    createQuiz,
    updateQuiz,
    updateQuizQuestions,
    deleteQuiz,
    getQuiz,
    refreshQuizzes,
    getQuizzesByCategory,
    getQuizzesByLevel,
    importQuestionsFromData,
    importQuizzesFromData,
    deleteAllQuestions,
    deleteAllQuizzes,
    refreshStatistics,
    clearError
  };
}; 