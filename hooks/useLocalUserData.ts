import { localStorageService, LocalUserData } from '@/services/localStorageService';
import { useCallback, useEffect, useState } from 'react';

export function useLocalUserData() {
  const [userData, setUserData] = useState<LocalUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données utilisateur au démarrage
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('📖 Chargement des données utilisateur locales...');
      
      // Essayer de charger un utilisateur connecté d'abord
      let data = await localStorageService.getUserData();
      
      // Si pas d'utilisateur connecté, essayer un utilisateur anonyme
      if (!data) {
        data = await localStorageService.getAnonymousUser();
      }
      
      setUserData(data);
      console.log('✅ Données utilisateur locales chargées:', data ? data.name : 'Aucune');
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données utilisateur:', error);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mettre à jour les points de l'utilisateur
  const updatePoints = useCallback(async (points: number) => {
    try {
      await localStorageService.updateUserPoints(points);
      await loadUserData(); // Recharger les données
      console.log('✅ Points mis à jour:', points);
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des points:', error);
    }
  }, [loadUserData]);

  // Mettre à jour le niveau de l'utilisateur
  const updateLevel = useCallback(async (level: number) => {
    try {
      await localStorageService.updateUserLevel(level);
      await loadUserData(); // Recharger les données
      console.log('✅ Niveau mis à jour:', level);
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du niveau:', error);
    }
  }, [loadUserData]);

  // Ajouter un quiz complété
  const addCompletedQuiz = useCallback(async (quizId: string) => {
    try {
      await localStorageService.addCompletedQuiz(quizId);
      await loadUserData(); // Recharger les données
      console.log('✅ Quiz complété ajouté:', quizId);
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du quiz complété:', error);
    }
  }, [loadUserData]);

  // Ajouter un badge débloqué
  const addUnlockedBadge = useCallback(async (badgeId: string) => {
    try {
      await localStorageService.addUnlockedBadge(badgeId);
      await loadUserData(); // Recharger les données
      console.log('✅ Badge débloqué ajouté:', badgeId);
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du badge:', error);
    }
  }, [loadUserData]);

  // Mettre à jour les préférences
  const updatePreferences = useCallback(async (preferences: Partial<LocalUserData['preferences']>) => {
    try {
      await localStorageService.updatePreferences(preferences);
      await loadUserData(); // Recharger les données
      console.log('✅ Préférences mises à jour:', preferences);
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des préférences:', error);
    }
  }, [loadUserData]);

  // Sauvegarder un utilisateur anonyme
  const saveAnonymousUser = useCallback(async (userData: Partial<LocalUserData>) => {
    try {
      await localStorageService.saveAnonymousUser(userData);
      await loadUserData(); // Recharger les données
      console.log('✅ Utilisateur anonyme sauvegardé');
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde de l\'utilisateur anonyme:', error);
    }
  }, [loadUserData]);

  // Sauvegarder un utilisateur connecté
  const saveUserData = useCallback(async (userData: LocalUserData) => {
    try {
      await localStorageService.saveUserData(userData);
      await loadUserData(); // Recharger les données
      console.log('✅ Données utilisateur sauvegardées');
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde des données utilisateur:', error);
    }
  }, [loadUserData]);

  // Migrer les données anonymes vers un utilisateur connecté
  const migrateAnonymousToUser = useCallback(async (userId: string, userData: Partial<LocalUserData>) => {
    try {
      await localStorageService.migrateAnonymousToUser(userId, userData);
      await loadUserData(); // Recharger les données
      console.log('✅ Migration des données anonymes terminée');
    } catch (error) {
      console.error('❌ Erreur lors de la migration des données:', error);
    }
  }, [loadUserData]);

  // Nettoyer toutes les données
  const clearAllData = useCallback(async () => {
    try {
      await localStorageService.clearAllData();
      setUserData(null);
      console.log('✅ Toutes les données locales supprimées');
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage des données:', error);
    }
  }, []);

  // Vérifier si l'utilisateur a des données
  const hasUserData = useCallback(async () => {
    return await localStorageService.hasUserData();
  }, []);

  return {
    userData,
    isLoading,
    loadUserData,
    updatePoints,
    updateLevel,
    addCompletedQuiz,
    addUnlockedBadge,
    updatePreferences,
    saveAnonymousUser,
    saveUserData,
    migrateAnonymousToUser,
    clearAllData,
    hasUserData,
  };
} 