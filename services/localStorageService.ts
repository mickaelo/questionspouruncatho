import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface UserPreferences {
  notifications: boolean;
  sound: boolean;
  hapticFeedback: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en';
  difficulty: 'facile' | 'moyen' | 'difficile';
  dailyGoal: number;
  fontSize: 'small' | 'medium' | 'large';
  autoPlay: boolean;
  showHints: boolean;
  enableAnimations: boolean;
}

export interface LocalUserData {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  type?: string;
  emailVerified?: boolean;
  provider?: string;
  isAnonymous: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  totalPoints: number;
  level: number;
  streak: number;
  completedQuizzes: string[];
  unlockedBadges: string[];
  preferences: UserPreferences;
  familyMode: boolean;
  childrenProfiles?: any[];
}

class LocalStorageService {
  private readonly USER_DATA_KEY = '@user_data';
  private readonly ANONYMOUS_USER_KEY = '@anonymous_user';
  private readonly PREFERENCES_KEY = '@user_preferences';

  // Sauvegarder les données utilisateur
  async saveUserData(userData: LocalUserData): Promise<void> {
    try {
      const dataToSave = {
        ...userData,
        createdAt: userData.createdAt.toISOString(),
        lastLoginAt: userData.lastLoginAt.toISOString(),
      };
      await AsyncStorage.setItem(this.USER_DATA_KEY, JSON.stringify(dataToSave));
      console.log('✅ Données utilisateur sauvegardées localement');
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde des données utilisateur:', error);
      throw error;
    }
  }

  // Charger les données utilisateur
  async getUserData(): Promise<LocalUserData | null> {
    try {
      const data = await AsyncStorage.getItem(this.USER_DATA_KEY);
      if (!data) return null;

      const userData = JSON.parse(data);
      return {
        ...userData,
        createdAt: new Date(userData.createdAt),
        lastLoginAt: new Date(userData.lastLoginAt),
      };
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données utilisateur:', error);
      return null;
    }
  }

  // Sauvegarder un utilisateur anonyme
  async saveAnonymousUser(userData: Partial<LocalUserData>): Promise<void> {
    try {
      const anonymousUser: LocalUserData = {
        id: 'anonymous_' + Date.now(),
        name: userData.name || 'Visiteur',
        isAnonymous: true,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        totalPoints: userData.totalPoints || 0,
        level: userData.level || 1,
        streak: userData.streak || 0,
        completedQuizzes: userData.completedQuizzes || [],
        unlockedBadges: userData.unlockedBadges || [],
        preferences: userData.preferences || this.getDefaultPreferences(),
        familyMode: userData.familyMode || false,
        childrenProfiles: userData.childrenProfiles || [],
      };

      await AsyncStorage.setItem(this.ANONYMOUS_USER_KEY, JSON.stringify(anonymousUser));
      console.log('✅ Utilisateur anonyme sauvegardé localement');
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde de l\'utilisateur anonyme:', error);
      throw error;
    }
  }

  // Charger un utilisateur anonyme
  async getAnonymousUser(): Promise<LocalUserData | null> {
    try {
      const data = await AsyncStorage.getItem(this.ANONYMOUS_USER_KEY);
      if (!data) return null;

      const userData = JSON.parse(data);
      return {
        ...userData,
        createdAt: new Date(userData.createdAt),
        lastLoginAt: new Date(userData.lastLoginAt),
      };
    } catch (error) {
      console.error('❌ Erreur lors du chargement de l\'utilisateur anonyme:', error);
      return null;
    }
  }

  // Mettre à jour les préférences
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    try {
      // Charger les données utilisateur actuelles
      let userData = await this.getUserData();
      if (!userData) {
        userData = await this.getAnonymousUser();
      }

      if (userData) {
        // Mettre à jour les préférences
        const updatedPreferences = {
          ...userData.preferences,
          ...preferences,
        };

        // Sauvegarder les nouvelles préférences
        await AsyncStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(updatedPreferences));

        // Mettre à jour les données utilisateur
        const updatedUserData = {
          ...userData,
          preferences: updatedPreferences,
          lastLoginAt: new Date(),
        };

        if (userData.isAnonymous) {
          await this.saveAnonymousUser(updatedUserData);
        } else {
          await this.saveUserData(updatedUserData);
        }

        console.log('✅ Préférences mises à jour:', preferences);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des préférences:', error);
      throw error;
    }
  }

  // Charger les préférences
  async getPreferences(): Promise<UserPreferences | null> {
    try {
      const data = await AsyncStorage.getItem(this.PREFERENCES_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des préférences:', error);
      return null;
    }
  }

  // Mettre à jour les points de l'utilisateur
  async updateUserPoints(points: number): Promise<void> {
    try {
      let userData = await this.getUserData();
      if (!userData) {
        userData = await this.getAnonymousUser();
      }

      if (userData) {
        const updatedUserData = {
          ...userData,
          totalPoints: points,
          lastLoginAt: new Date(),
        };

        if (userData.isAnonymous) {
          await this.saveAnonymousUser(updatedUserData);
        } else {
          await this.saveUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des points:', error);
      throw error;
    }
  }

  // Mettre à jour le niveau de l'utilisateur
  async updateUserLevel(level: number): Promise<void> {
    try {
      let userData = await this.getUserData();
      if (!userData) {
        userData = await this.getAnonymousUser();
      }

      if (userData) {
        const updatedUserData = {
          ...userData,
          level,
          lastLoginAt: new Date(),
        };

        if (userData.isAnonymous) {
          await this.saveAnonymousUser(updatedUserData);
        } else {
          await this.saveUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du niveau:', error);
      throw error;
    }
  }

  // Ajouter un quiz complété
  async addCompletedQuiz(quizId: string): Promise<void> {
    try {
      let userData = await this.getUserData();
      if (!userData) {
        userData = await this.getAnonymousUser();
      }

      if (userData && !userData.completedQuizzes.includes(quizId)) {
        const updatedUserData = {
          ...userData,
          completedQuizzes: [...userData.completedQuizzes, quizId],
          lastLoginAt: new Date(),
        };

        if (userData.isAnonymous) {
          await this.saveAnonymousUser(updatedUserData);
        } else {
          await this.saveUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du quiz complété:', error);
      throw error;
    }
  }

  // Ajouter un badge débloqué
  async addUnlockedBadge(badgeId: string): Promise<void> {
    try {
      let userData = await this.getUserData();
      if (!userData) {
        userData = await this.getAnonymousUser();
      }

      if (userData && !userData.unlockedBadges.includes(badgeId)) {
        const updatedUserData = {
          ...userData,
          unlockedBadges: [...userData.unlockedBadges, badgeId],
          lastLoginAt: new Date(),
        };

        if (userData.isAnonymous) {
          await this.saveAnonymousUser(updatedUserData);
        } else {
          await this.saveUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du badge:', error);
      throw error;
    }
  }

  // Migrer les données anonymes vers un utilisateur connecté
  async migrateAnonymousToUser(userId: string, userData: Partial<LocalUserData>): Promise<void> {
    try {
      const anonymousUser = await this.getAnonymousUser();
      if (anonymousUser) {
        const migratedUserData: LocalUserData = {
          ...anonymousUser,
          ...userData,
          id: userId,
          isAnonymous: false,
          lastLoginAt: new Date(),
        };

        // Sauvegarder l'utilisateur connecté
        await this.saveUserData(migratedUserData);

        // Supprimer les données anonymes
        await AsyncStorage.removeItem(this.ANONYMOUS_USER_KEY);

        console.log('✅ Migration des données anonymes terminée');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la migration des données:', error);
      throw error;
    }
  }

  // Nettoyer toutes les données
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.USER_DATA_KEY,
        this.ANONYMOUS_USER_KEY,
        this.PREFERENCES_KEY,
      ]);
      console.log('✅ Toutes les données locales supprimées');
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage des données:', error);
      throw error;
    }
  }

  // Vérifier si l'utilisateur a des données
  async hasUserData(): Promise<boolean> {
    try {
      const userData = await this.getUserData();
      const anonymousUser = await this.getAnonymousUser();
      return !!(userData || anonymousUser);
    } catch (error) {
      console.error('❌ Erreur lors de la vérification des données utilisateur:', error);
      return false;
    }
  }

  // Obtenir les préférences par défaut
  private getDefaultPreferences(): UserPreferences {
    return {
      notifications: true,
      sound: true,
      hapticFeedback: Platform.OS !== 'web', // Désactiver sur web
      theme: 'auto',
      language: 'fr',
      difficulty: 'moyen',
      dailyGoal: 100,
      fontSize: 'medium',
      autoPlay: false,
      showHints: true,
      enableAnimations: true,
    };
  }

  // Sauvegarder les préférences spécifiques à la plateforme
  async savePlatformSpecificSettings(): Promise<void> {
    try {
      const preferences = await this.getPreferences();
      if (preferences) {
        // Ajuster les paramètres selon la plateforme
        const platformPreferences: Partial<UserPreferences> = {
          hapticFeedback: Platform.OS !== 'web', // Désactiver sur web
        };

        await this.updatePreferences(platformPreferences);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde des paramètres spécifiques à la plateforme:', error);
    }
  }
}

export const localStorageService = new LocalStorageService(); 