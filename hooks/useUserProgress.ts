import { UserProgressData, UserProgressService } from '@/services/userProgressService';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useUserProgress() {
  const { user, isAuthenticated } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streakUpdated, setStreakUpdated] = useState(false);

  // Charger la progression utilisateur
  const loadUserProgress = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      let progress = await UserProgressService.getUserProgress(user.id);
      
      if (!progress) {
        // Initialiser la progression si elle n'existe pas
        progress = await UserProgressService.initializeUserProgress(user.id, user.name);
      }
      
      setUserProgress(progress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement de la progression';
      setError(errorMessage);
      console.error('Erreur lors du chargement de la progression:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, user?.name]);

  // Sauvegarder une tentative de quiz
  const saveQuizAttempt = useCallback(async (
    quizId: string,
    score: number,
    totalPoints: number,
    percentage: number,
    passed: boolean,
    timeSpent: number,
    answers: any[],
    livesUsed: number
  ) => {
    if (!user?.id) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      // Sauvegarder la tentative
      const attemptId = await UserProgressService.saveQuizAttempt({
        userId: user.id,
        quizId,
        score,
        totalPoints,
        percentage,
        passed,
        timeSpent,
        answers,
        completedAt: new Date(),
        livesUsed,
      });

      // Calculer les points gagnés
      const pointsEarned = passed ? score : Math.floor(score * 0.5); // 50% des points si échec

      // Mettre à jour la progression
      const updatedProgress = await UserProgressService.updateProgressAfterQuiz(
        user.id,
        quizId,
        score,
        totalPoints,
        pointsEarned,
        passed
      );

      setUserProgress(updatedProgress);
      return { attemptId, updatedProgress };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [user?.id]);

  // Mettre à jour le streak quotidien
  const updateDailyStreak = useCallback(async () => {
    if (!user?.id || streakUpdated) return;

    try {
      const newStreak = await UserProgressService.updateDailyStreak(user.id);
      
      setUserProgress(prev => prev ? { ...prev, streak: newStreak } : null);
      setStreakUpdated(true);
      
      return newStreak;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du streak:', err);
    }
  }, [user?.id, streakUpdated]);



  // Charger la progression au montage du composant et quand l'utilisateur change
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadUserProgress();
      setStreakUpdated(false); // Reset le flag quand l'utilisateur change
    } else {
      setUserProgress(null);
      setStreakUpdated(false);
    }
  }, [isAuthenticated, user?.id, loadUserProgress]);

  // Mettre à jour le streak quotidien une seule fois au chargement
  useEffect(() => {
    if (isAuthenticated && user?.id && userProgress && !streakUpdated) {
      // Ne mettre à jour le streak qu'une fois que les données sont chargées et qu'il n'a pas déjà été mis à jour
      updateDailyStreak();
    }
  }, [isAuthenticated, user?.id, userProgress, streakUpdated, updateDailyStreak]);

  return {
    userProgress,
    isLoading,
    error,
    saveQuizAttempt,
    updateDailyStreak,
  };
} 