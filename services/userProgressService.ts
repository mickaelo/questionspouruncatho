import { db } from '@/config/firebase';
import {
  Answer,
  FidelityScore,
  FormationProgress,
  MonthlyStats,
  WeeklyStats
} from '@/types/quiz';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpent: number; // en secondes
  answers: Answer[];
  completedAt: Date;
  livesUsed: number;
}

export interface UserProgressData {
  userId: string;
  totalPoints: number;
  level: number;
  streak: number;
  completedQuizzes: string[];
  currentChallenges: string[];
  weeklyStats: WeeklyStats;
  monthlyStats: MonthlyStats;
  formationProgress: FormationProgress;
  fidelityScore: FidelityScore;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UserProgressService {
  // Récupérer la progression d'un utilisateur
  static async getUserProgress(userId: string): Promise<UserProgressData | null> {
    try {
      const userProgressDoc = await getDoc(doc(db, 'userProgress', userId));
      
      if (userProgressDoc.exists()) {
        const data = userProgressDoc.data();
        return {
          ...data,
          weeklyStats: {
            ...data.weeklyStats,
            weekStart: data.weeklyStats.weekStart.toDate(),
          },
          monthlyStats: {
            ...data.monthlyStats,
          },
          formationProgress: {
            ...data.formationProgress,
            levelStartDate: data.formationProgress.levelStartDate.toDate(),
            estimatedCompletionDate: data.formationProgress.estimatedCompletionDate?.toDate(),
          },
          fidelityScore: {
            ...data.fidelityScore,
            lastUpdated: data.fidelityScore.lastUpdated.toDate(),
          },
          lastActivity: data.lastActivity.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as UserProgressData;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression:', error);
      return null;
    }
  }

  // Créer ou initialiser la progression d'un utilisateur
  static async initializeUserProgress(userId: string, userName: string): Promise<UserProgressData> {
    try {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay()); // Début de la semaine (dimanche)
      weekStart.setHours(0, 0, 0, 0);

      const initialProgress: UserProgressData = {
        userId,
        totalPoints: 0,
        level: 1,
        streak: 0,
        completedQuizzes: [],
        currentChallenges: [],
        weeklyStats: {
          weekStart,
          pointsEarned: 0,
          quizzesCompleted: 0,
          prayersCount: 0,
          readingMinutes: 0,
          challengesCompleted: 0,
        },
        monthlyStats: {
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          pointsEarned: 0,
          quizzesCompleted: 0,
          prayersCount: 0,
          readingMinutes: 0,
          challengesCompleted: 0,
          badgesUnlocked: 0,
        },
        formationProgress: {
          currentLevel: 1,
          levelProgress: 0,
          completedLevels: [],
          levelRequirements: [
            { type: 'points', value: 100 },
            { type: 'quizzes', value: 5 },
          ],
          nextLevelRequirements: [
            { type: 'points', value: 250 },
            { type: 'quizzes', value: 10 },
          ],
          levelStartDate: now,
        },
        fidelityScore: {
          prayerScore: 0,
          readingScore: 0,
          quizScore: 0,
          totalScore: 0,
          lastUpdated: now,
        },
        lastActivity: now,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(doc(db, 'userProgress', userId), {
        ...initialProgress,
        weeklyStats: {
          ...initialProgress.weeklyStats,
          weekStart: Timestamp.fromDate(initialProgress.weeklyStats.weekStart),
        },
        formationProgress: {
          ...initialProgress.formationProgress,
          levelStartDate: Timestamp.fromDate(initialProgress.formationProgress.levelStartDate),
        },
        fidelityScore: {
          ...initialProgress.fidelityScore,
          lastUpdated: Timestamp.fromDate(initialProgress.fidelityScore.lastUpdated),
        },
        lastActivity: Timestamp.fromDate(initialProgress.lastActivity),
        createdAt: Timestamp.fromDate(initialProgress.createdAt),
        updatedAt: Timestamp.fromDate(initialProgress.updatedAt),
      });

      return initialProgress;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la progression:', error);
      throw new Error('Impossible d\'initialiser la progression utilisateur');
    }
  }

  // Enregistrer une tentative de quiz
  static async saveQuizAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<string> {
    try {
      const attemptData = {
        ...attempt,
        completedAt: Timestamp.fromDate(attempt.completedAt),
      };

      const docRef = await addDoc(collection(db, 'quizAttempts'), attemptData);
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la tentative:', error);
      throw new Error('Impossible d\'enregistrer la tentative de quiz');
    }
  }

  // Mettre à jour la progression après un quiz
  static async updateProgressAfterQuiz(
    userId: string, 
    quizId: string, 
    score: number, 
    totalPoints: number, 
    pointsEarned: number,
    passed: boolean
  ): Promise<UserProgressData> {
    try {
      const userProgressRef = doc(db, 'userProgress', userId);
      const userProgressDoc = await getDoc(userProgressRef);
      
      let currentProgress: UserProgressData;
      
      if (userProgressDoc.exists()) {
        const data = userProgressDoc.data();
        currentProgress = {
          ...data,
          weeklyStats: {
            ...data.weeklyStats,
            weekStart: data.weeklyStats.weekStart.toDate(),
          },
          formationProgress: {
            ...data.formationProgress,
            levelStartDate: data.formationProgress.levelStartDate.toDate(),
            estimatedCompletionDate: data.formationProgress.estimatedCompletionDate?.toDate(),
          },
          fidelityScore: {
            ...data.fidelityScore,
            lastUpdated: data.fidelityScore.lastUpdated.toDate(),
          },
          lastActivity: data.lastActivity.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as UserProgressData;
      } else {
        throw new Error('Progression utilisateur non trouvée');
      }

      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);

      // Mettre à jour les statistiques
      const updatedProgress = {
        ...currentProgress,
        totalPoints: currentProgress.totalPoints + pointsEarned,
        completedQuizzes: passed 
          ? [...new Set([...currentProgress.completedQuizzes, quizId])]
          : currentProgress.completedQuizzes,
        weeklyStats: {
          ...currentProgress.weeklyStats,
          pointsEarned: currentProgress.weeklyStats.pointsEarned + pointsEarned,
          quizzesCompleted: currentProgress.weeklyStats.quizzesCompleted + 1,
        },
        monthlyStats: {
          ...currentProgress.monthlyStats,
          pointsEarned: currentProgress.monthlyStats.pointsEarned + pointsEarned,
          quizzesCompleted: currentProgress.monthlyStats.quizzesCompleted + 1,
        },
        fidelityScore: {
          ...currentProgress.fidelityScore,
          quizScore: Math.min(100, currentProgress.fidelityScore.quizScore + (passed ? 10 : 5)),
          totalScore: Math.min(100, (currentProgress.fidelityScore.prayerScore + 
                                   currentProgress.fidelityScore.readingScore + 
                                   (currentProgress.fidelityScore.quizScore + (passed ? 10 : 5))) / 3),
          lastUpdated: now,
        },
        lastActivity: now,
        updatedAt: now,
      };

      // Vérifier si l'utilisateur peut passer au niveau suivant
      const newLevel = this.calculateLevel(updatedProgress.totalPoints);
      if (newLevel > updatedProgress.level) {
        updatedProgress.level = newLevel;
        updatedProgress.formationProgress.currentLevel = newLevel;
        updatedProgress.formationProgress.completedLevels.push(updatedProgress.level - 1);
        updatedProgress.formationProgress.levelStartDate = now;
        updatedProgress.formationProgress.levelProgress = 0;
        
        // Mettre à jour les exigences pour le prochain niveau
        updatedProgress.formationProgress.levelRequirements = this.getLevelRequirements(newLevel);
        updatedProgress.formationProgress.nextLevelRequirements = this.getLevelRequirements(newLevel + 1);
      }

      // Calculer la progression dans le niveau actuel
      updatedProgress.formationProgress.levelProgress = this.calculateLevelProgress(
        updatedProgress.totalPoints,
        updatedProgress.level
      );

      // Mettre à jour dans Firestore
      await updateDoc(userProgressRef, {
        ...updatedProgress,
        weeklyStats: {
          ...updatedProgress.weeklyStats,
          weekStart: Timestamp.fromDate(updatedProgress.weeklyStats.weekStart),
        },
        formationProgress: {
          ...updatedProgress.formationProgress,
          levelStartDate: Timestamp.fromDate(updatedProgress.formationProgress.levelStartDate),
          estimatedCompletionDate: updatedProgress.formationProgress.estimatedCompletionDate 
            ? Timestamp.fromDate(updatedProgress.formationProgress.estimatedCompletionDate)
            : null,
        },
        fidelityScore: {
          ...updatedProgress.fidelityScore,
          lastUpdated: Timestamp.fromDate(updatedProgress.fidelityScore.lastUpdated),
        },
        lastActivity: Timestamp.fromDate(updatedProgress.lastActivity),
        updatedAt: Timestamp.fromDate(updatedProgress.updatedAt),
      });

      return updatedProgress;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la progression:', error);
      throw new Error('Impossible de mettre à jour la progression');
    }
  }

  // Calculer le niveau basé sur les points totaux
  private static calculateLevel(totalPoints: number): number {
    if (totalPoints < 100) return 1;
    if (totalPoints < 250) return 2;
    if (totalPoints < 500) return 3;
    if (totalPoints < 1000) return 4;
    return 5;
  }

  // Calculer la progression dans le niveau actuel (0-100%)
  private static calculateLevelProgress(totalPoints: number, currentLevel: number): number {
    const levelThresholds = [0, 100, 250, 500, 1000, 2000];
    const currentThreshold = levelThresholds[currentLevel - 1] || 0;
    const nextThreshold = levelThresholds[currentLevel] || 2000;
    
    const progressInLevel = totalPoints - currentThreshold;
    const levelRange = nextThreshold - currentThreshold;
    
    return Math.min(100, Math.max(0, (progressInLevel / levelRange) * 100));
  }

  // Obtenir les exigences pour un niveau donné
  private static getLevelRequirements(level: number) {
    const requirements = {
      1: [
        { type: 'points' as const, value: 100 },
        { type: 'quizzes' as const, value: 5 },
      ],
      2: [
        { type: 'points' as const, value: 250 },
        { type: 'quizzes' as const, value: 10 },
      ],
      3: [
        { type: 'points' as const, value: 500 },
        { type: 'quizzes' as const, value: 20 },
      ],
      4: [
        { type: 'points' as const, value: 1000 },
        { type: 'quizzes' as const, value: 35 },
      ],
      5: [
        { type: 'points' as const, value: 2000 },
        { type: 'quizzes' as const, value: 50 },
      ],
    };

    return requirements[level as keyof typeof requirements] || requirements[1];
  }



  // Mettre à jour le streak quotidien
  static async updateDailyStreak(userId: string): Promise<number> {
    try {
      const userProgressRef = doc(db, 'userProgress', userId);
      const userProgressDoc = await getDoc(userProgressRef);
      
      if (!userProgressDoc.exists()) {
        throw new Error('Progression utilisateur non trouvée');
      }

      const data = userProgressDoc.data();
      const lastActivity = data.lastActivity.toDate();
      const now = new Date();
      
      // Vérifier si c'est le même jour ou le jour suivant
      const lastActivityDate = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate());
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dayDifference = Math.floor((today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24));

      let newStreak = data.streak || 0;
      let shouldUpdate = false;
      
      if (dayDifference === 0) {
        // Même jour, pas de changement
        return newStreak;
      } else if (dayDifference === 1) {
        // Jour suivant, incrémenter le streak
        newStreak += 1;
        shouldUpdate = true;
      } else {
        // Plus d'un jour de différence, reset le streak
        newStreak = 1;
        shouldUpdate = true;
      }

      // Ne mettre à jour que si le streak a changé
      if (shouldUpdate) {
        await updateDoc(userProgressRef, {
          streak: newStreak,
          lastActivity: Timestamp.fromDate(now),
          updatedAt: Timestamp.fromDate(now),
        });
      }

      return newStreak;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du streak:', error);
      return 0;
    }
  }

  // Récupérer les tentatives de quiz d'un utilisateur
  static async getQuizAttempts(userId: string, quizId?: string): Promise<QuizAttempt[]> {
    try {
      const { collection, query, where, getDocs, orderBy, limit } = await import('firebase/firestore');
      
      let q = query(collection(db, 'quizAttempts'), where('userId', '==', userId));
      
      if (quizId) {
        q = query(q, where('quizId', '==', quizId));
      }
      
      q = query(q, orderBy('completedAt', 'desc'), limit(10));
      
      const querySnapshot = await getDocs(q);
      const attempts: QuizAttempt[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        attempts.push({
          id: doc.id,
          userId: data.userId,
          quizId: data.quizId,
          score: data.score,
          totalPoints: data.totalPoints,
          percentage: data.percentage,
          passed: data.passed,
          timeSpent: data.timeSpent,
          answers: data.answers || [],
          completedAt: data.completedAt.toDate(),
          livesUsed: data.livesUsed || 0,
        });
      });
      
      return attempts;
    } catch (error) {
      console.error('Erreur lors de la récupération des tentatives de quiz:', error);
      return [];
    }
  }

  // Récupérer la dernière tentative d'un quiz spécifique
  static async getLatestQuizAttempt(userId: string, quizId: string): Promise<QuizAttempt | null> {
    try {
      const attempts = await this.getQuizAttempts(userId, quizId);
      return attempts.length > 0 ? attempts[0] : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière tentative:', error);
      return null;
    }
  }

  // Récupérer les quiz les plus populaires (par nombre de tentatives)
  static async getMostPopularQuizzes(limit: number = 5): Promise<{ quizId: string, count: number }[]> {
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const attemptsSnapshot = await getDocs(collection(db, 'quizAttempts'));
      const countMap: Record<string, number> = {};
      attemptsSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.quizId) {
          countMap[data.quizId] = (countMap[data.quizId] || 0) + 1;
        }
      });
      // Convertir en tableau et trier
      const sorted = Object.entries(countMap)
        .map(([quizId, count]) => ({ quizId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
      return sorted;
    } catch (error) {
      console.error('Erreur lors de la récupération des quiz populaires:', error);
      return [];
    }
  }
} 