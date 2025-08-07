import { UserPreferences } from '@/services/localStorageService';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useLocalUserData } from './useLocalUserData';

export function useSettings() {
  const { userData: localUserData, updatePreferences, isLoading } = useLocalUserData();
  
  // États locaux pour les paramètres
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(Platform.OS !== 'web');
  const [familyMode, setFamilyMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [autoPlay, setAutoPlay] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [difficulty, setDifficulty] = useState<'facile' | 'moyen' | 'difficile'>('moyen');
  const [dailyGoal, setDailyGoal] = useState(100);

  // Charger les préférences au démarrage
  useEffect(() => {
    if (localUserData?.preferences) {
      const prefs = localUserData.preferences;
      setNotifications(prefs.notifications);
      setSound(prefs.sound);
      setHapticFeedback(prefs.hapticFeedback);
      setFamilyMode(localUserData.familyMode || false);
      setFontSize(prefs.fontSize || 'medium');
      setAutoPlay(prefs.autoPlay || false);
      setShowHints(prefs.showHints !== false);
      setEnableAnimations(prefs.enableAnimations !== false);
      setDifficulty(prefs.difficulty || 'moyen');
      setDailyGoal(prefs.dailyGoal || 100);
    }
  }, [localUserData]);

  // Fonction générique pour mettre à jour un paramètre
  const updateSetting = useCallback(async <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
    showHapticFeedback = true
  ) => {
    try {
      // Mettre à jour l'état local
      switch (key) {
        case 'notifications':
          setNotifications(value as boolean);
          break;
        case 'sound':
          setSound(value as boolean);
          break;
        case 'hapticFeedback':
          setHapticFeedback(value as boolean);
          break;
        case 'fontSize':
          setFontSize(value as 'small' | 'medium' | 'large');
          break;
        case 'autoPlay':
          setAutoPlay(value as boolean);
          break;
        case 'showHints':
          setShowHints(value as boolean);
          break;
        case 'enableAnimations':
          setEnableAnimations(value as boolean);
          break;
        case 'difficulty':
          setDifficulty(value as 'facile' | 'moyen' | 'difficile');
          break;
        case 'dailyGoal':
          setDailyGoal(value as number);
          break;
      }

      // Sauvegarder dans le stockage local
      await updatePreferences({ [key]: value });

      // Retour haptique si activé
      if (showHapticFeedback && hapticFeedback && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de ${key}:`, error);
      throw error;
    }
  }, [updatePreferences, hapticFeedback]);

  // Gérer le changement de notifications avec permission
  const handleNotificationsChange = useCallback(async (value: boolean) => {
    try {
      if (value && Platform.OS !== 'web') {
        // Demander la permission pour les notifications
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission refusée',
            'Les notifications ne peuvent pas être activées sans permission.',
            [{ text: 'OK' }]
          );
          return;
        }
      }
      
      await updateSetting('notifications', value);
    } catch (error) {
      console.error('Erreur lors du changement de notifications:', error);
      throw error;
    }
  }, [updateSetting]);

  // Gérer le changement de retour haptique avec test
  const handleHapticFeedbackChange = useCallback(async (value: boolean) => {
    try {
      await updateSetting('hapticFeedback', value, false);
      
      // Tester le retour haptique si activé
      if (value && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      console.error('Erreur lors du changement de retour haptique:', error);
      throw error;
    }
  }, [updateSetting]);

  // Réinitialiser tous les paramètres
  const resetSettings = useCallback(async () => {
    try {
      const defaultPreferences: UserPreferences = {
        notifications: true,
        sound: true,
        hapticFeedback: Platform.OS !== 'web',
        theme: 'auto',
        language: 'fr',
        difficulty: 'moyen',
        dailyGoal: 100,
        fontSize: 'medium',
        autoPlay: false,
        showHints: true,
        enableAnimations: true,
      };

      await updatePreferences(defaultPreferences);
      
      // Mettre à jour tous les états locaux
      setNotifications(defaultPreferences.notifications);
      setSound(defaultPreferences.sound);
      setHapticFeedback(defaultPreferences.hapticFeedback);
      setFontSize(defaultPreferences.fontSize);
      setAutoPlay(defaultPreferences.autoPlay);
      setShowHints(defaultPreferences.showHints);
      setEnableAnimations(defaultPreferences.enableAnimations);
      setDifficulty(defaultPreferences.difficulty);
      setDailyGoal(defaultPreferences.dailyGoal);

      // Retour haptique de succès
      if (defaultPreferences.hapticFeedback && Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  }, [updatePreferences]);

  // Tester les paramètres
  const testSettings = useCallback(() => {
    if (sound && Platform.OS !== 'web') {
      // TODO: Jouer un son de test
      console.log('🔊 Test audio');
    }
    
    if (hapticFeedback && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [sound, hapticFeedback]);

  return {
    // États
    notifications,
    sound,
    hapticFeedback,
    familyMode,
    fontSize,
    autoPlay,
    showHints,
    enableAnimations,
    difficulty,
    dailyGoal,
    isLoading,
    
    // Actions
    updateSetting,
    handleNotificationsChange,
    handleHapticFeedbackChange,
    resetSettings,
    testSettings,
    
    // Getters pour les valeurs actuelles
    getCurrentPreferences: () => ({
      notifications,
      sound,
      hapticFeedback,
      familyMode,
      fontSize,
      autoPlay,
      showHints,
      enableAnimations,
      difficulty,
      dailyGoal,
    }),
  };
} 