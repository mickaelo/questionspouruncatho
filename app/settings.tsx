import { CORSErrorModal } from '@/components/CORSErrorModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSettings } from '@/hooks/useSettings';
import { showAlert, showConfirmAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const { user, isAuthenticated, logout } = useAuth();
  
  // Utiliser le hook de paramètres
  const {
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
    updateSetting,
    handleNotificationsChange,
    handleHapticFeedbackChange,
    resetSettings,
    testSettings,
  } = useSettings();
  
  const [showCORSError, setShowCORSError] = useState(false);
  const [corsErrorMessage, setCorsErrorMessage] = useState('');

  // Gérer le changement de mode familial
  const handleFamilyModeChange = async (value: boolean) => {
    try {
      // TODO: Implémenter la mise à jour du mode familial
      console.log('Mode familial changé:', value);
    } catch (error) {
      console.error('Erreur lors du changement de mode familial:', error);
      showAlert('Erreur', 'Impossible de modifier le mode familial');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.loadingText, { color: colors.text }]}>
          Chargement des paramètres...
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
        }
      ]}
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 150 : 60,
      }}
    >
      {/* Paramètres de l'application */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Paramètres de l'application
        </ThemedText>

        <View style={styles.settingsList}>
          {/* Notifications */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Notifications
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Recevoir des rappels pour les quiz et défis
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={handleNotificationsChange}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          {/* Sons */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="volume-up" size={20} color={colors.secondary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Sons
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Activer les effets sonores
                </ThemedText>
              </View>
            </View>
            <Switch
              value={sound}
              onValueChange={(value) => updateSetting('sound', value)}
              trackColor={{ false: colors.border, true: colors.secondary }}
              thumbColor={colors.background}
            />
          </View>

          {/* Retour haptique - seulement sur mobile */}
          {Platform.OS !== 'web' && (
            <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.settingInfo}>
                <MaterialIcons name="vibration" size={20} color={colors.warning} />
                <View style={styles.settingText}>
                  <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                    Retour haptique
                  </ThemedText>
                  <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                    Vibrations lors des interactions
                  </ThemedText>
                </View>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={handleHapticFeedbackChange}
                trackColor={{ false: colors.border, true: colors.warning }}
                thumbColor={colors.background}
              />
            </View>
          )}

          {/* Mode familial */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="family-restroom" size={20} color={colors.success} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Mode familial
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Gérer les profils des enfants
                </ThemedText>
              </View>
            </View>
            <Switch
              value={familyMode}
              onValueChange={handleFamilyModeChange}
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.background}
            />
          </View>

          {/* Taille de police */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="format-size" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Taille de police
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Ajuster la taille du texte
                </ThemedText>
              </View>
            </View>
            <View style={styles.fontSizeSelector}>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.fontSizeOption,
                    fontSize === size && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => updateSetting('fontSize', size)}
                >
                  <ThemedText 
                    style={[
                      styles.fontSizeText,
                      { color: fontSize === size ? colors.background : colors.text }
                    ]}
                  >
                    {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Auto-play */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="play-circle-outline" size={20} color={colors.secondary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Lecture automatique
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Lancer automatiquement les médias
                </ThemedText>
              </View>
            </View>
            <Switch
              value={autoPlay}
              onValueChange={(value) => updateSetting('autoPlay', value)}
              trackColor={{ false: colors.border, true: colors.secondary }}
              thumbColor={colors.background}
            />
          </View>

          {/* Afficher les indices */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="lightbulb-outline" size={20} color={colors.warning} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Afficher les indices
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Montrer des indices pendant les quiz
                </ThemedText>
              </View>
            </View>
            <Switch
              value={showHints}
              onValueChange={(value) => updateSetting('showHints', value)}
              trackColor={{ false: colors.border, true: colors.warning }}
              thumbColor={colors.background}
            />
          </View>

          {/* Animations */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="animation" size={20} color={colors.success} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Animations
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Activer les animations de l'interface
                </ThemedText>
              </View>
            </View>
            <Switch
              value={enableAnimations}
              onValueChange={(value) => updateSetting('enableAnimations', value)}
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.background}
            />
          </View>
        </View>
      </ThemedView>

      {/* Paramètres de jeu */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Paramètres de jeu
        </ThemedText>

        <View style={styles.settingsList}>
          {/* Difficulté */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="speed" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Difficulté
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Niveau de difficulté des quiz
                </ThemedText>
              </View>
            </View>
            <View style={styles.difficultySelector}>
              {(['facile', 'moyen', 'difficile'] as const).map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyOption,
                    difficulty === level && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => updateSetting('difficulty', level)}
                >
                  <ThemedText 
                    style={[
                      styles.difficultyText,
                      { color: difficulty === level ? colors.background : colors.text }
                    ]}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Objectif quotidien */}
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="flag" size={20} color={colors.secondary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Objectif quotidien
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Points à gagner par jour
                </ThemedText>
              </View>
            </View>
            <View style={styles.dailyGoalSelector}>
              {[50, 100, 150, 200].map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.dailyGoalOption,
                    dailyGoal === goal && { backgroundColor: colors.secondary }
                  ]}
                  onPress={() => updateSetting('dailyGoal', goal)}
                >
                  <ThemedText 
                    style={[
                      styles.dailyGoalText,
                      { color: dailyGoal === goal ? colors.background : colors.text }
                    ]}
                  >
                    {goal}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ThemedView>

      {/* Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Actions
        </ThemedText>

        <View style={styles.actionsList}>
          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={testSettings}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="play-arrow" size={20} color={colors.primary} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Tester les paramètres
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Tester le son et les vibrations
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {
              // TODO: Implémenter la page d'édition de profil
              showAlert('Éditer le profil', 'Page d\'édition de profil - À implémenter');
            }}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="edit" size={20} color={colors.primary} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Éditer le profil
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Modifier vos informations personnelles
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {
              // TODO: Implémenter l'export des données
              showAlert('Exporter les données', 'Page d\'export des données - À implémenter');
            }}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="download" size={20} color={colors.primary} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Exporter mes données
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Télécharger vos données personnelles
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {
              showConfirmAlert(
                'Réinitialiser les paramètres',
                'Êtes-vous sûr de vouloir réinitialiser tous les paramètres aux valeurs par défaut ?',
                async () => {
                  try {
                    await resetSettings();
                    showAlert('Succès', 'Paramètres réinitialisés avec succès');
                  } catch (error) {
                    console.error('Erreur lors de la réinitialisation:', error);
                    showAlert('Erreur', 'Impossible de réinitialiser les paramètres');
                  }
                }
              );
            }}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="restore" size={20} color={colors.warning} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Réinitialiser les paramètres
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Restaurer les paramètres par défaut
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.warning} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {
              // TODO: Implémenter la page d'aide
              showAlert('Aide et support', 'Page d\'aide et support - À implémenter');
            }}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="help" size={20} color={colors.primary} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Aide et support
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Centre d'aide et contact
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => {
              // TODO: Implémenter la page à propos
              showAlert('À propos', 'Page à propos - À implémenter');
            }}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="info" size={20} color={colors.primary} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  À propos
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Informations sur l'application
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Déconnexion */}
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={() => {
            showConfirmAlert(
              'Déconnexion',
              'Êtes-vous sûr de vouloir vous déconnecter ?',
              async () => {
                try {
                  await logout();
                  router.replace('/auth/login');
                } catch (error) {
                  console.error('❌ Erreur lors de la déconnexion:', error);
                  showAlert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
                }
              }
            );
          }}
        >
          <MaterialIcons name="logout" size={20} color={colors.background} />
          <ThemedText style={[styles.logoutText, { color: colors.background }]}>
            Se déconnecter
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Modal d'erreur CORS */}
      <CORSErrorModal
        visible={showCORSError}
        onClose={() => setShowCORSError(false)}
        errorMessage={corsErrorMessage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  fontSizeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  fontSizeOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  fontSizeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  difficultySelector: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dailyGoalSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  dailyGoalOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dailyGoalText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionsList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 