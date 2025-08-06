import { useCallback, useEffect, useState } from 'react';
import { courseService } from '../services/courseService';
import { Course } from '../types/quiz';

export interface CourseAdminState {
  courses: Course[];
  statistics: {
    totalCourses: number;
    coursesByDifficulty: Record<number, number>;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export interface CourseAdminActions {
  // Course retrieval
  getCourse: (id: string) => Promise<Course | null>;
  refreshCourses: () => Promise<void>;
  
  // Course management
  createCourse: (course: Omit<Course, 'id'>) => Promise<string>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  
  // Statistics
  refreshStatistics: () => Promise<void>;
  
  // Utility
  clearError: () => void;
}

export const useCourseAdmin = (): CourseAdminState & CourseAdminActions => {
  const [state, setState] = useState<CourseAdminState>({
    courses: [],
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
          courseService.getAllCourses(),
          // courseService.getCourseStatistics()
        ]);

        const [courses, statistics] = await Promise.race([dataPromise, timeoutPromise]) as [any, any];

        setState(prev => ({
          ...prev,
          courses,
          statistics: { totalCourses: courses.length, coursesByDifficulty: {} },
          isLoading: false
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des courses:', error);
        setError(error instanceof Error ? error.message : 'Failed to load courses');
        setLoading(false);
      }
    };

    loadInitialData();
  }, []); // Dépendances vides pour ne s'exécuter qu'une seule fois

  // Course actions
  const getCourse = useCallback(async (id: string): Promise<Course | null> => {
    try {
      return await courseService.getCourse(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get course');
      return null;
    }
  }, [setError]);

  const refreshCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const courses = await courseService.getAllCourses();
      setState(prev => ({ ...prev, courses, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh courses');
      setLoading(false);
    }
  }, [setLoading, setError]);

  const createCourse = useCallback(async (course: Omit<Course, 'id'>): Promise<string> => {
    try {
      const id = await courseService.createCourse(course);
      await refreshCourses(); // Rafraîchir la liste
      return id;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create course');
      throw error;
    }
  }, [refreshCourses, setError]);

  const updateCourse = useCallback(async (id: string, course: Partial<Course>): Promise<void> => {
    try {
      await courseService.updateCourse(id, course);
      await refreshCourses(); // Rafraîchir la liste
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update course');
      throw error;
    }
  }, [refreshCourses, setError]);

  const deleteCourse = useCallback(async (id: string): Promise<void> => {
    try {
      await courseService.deleteCourse(id);
      await refreshCourses(); // Rafraîchir la liste
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete course');
      throw error;
    }
  }, [refreshCourses, setError]);

  const refreshStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const courses = await courseService.getAllCourses();
      const statistics = { totalCourses: courses.length, coursesByDifficulty: {} };
      setState(prev => ({ ...prev, statistics, isLoading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh statistics');
      setLoading(false);
    }
  }, [setLoading, setError]);

  return {
    ...state,
    getCourse,
    refreshCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    refreshStatistics,
    clearError,
  };
}; 