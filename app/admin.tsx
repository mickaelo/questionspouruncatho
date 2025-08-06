import { FirebaseDiagnostic } from '@/components/FirebaseDiagnostic';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { showAlert, showConfirmAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AdminScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const {
    questions,
    quizzes,
    statistics,
    isLoading,
    error,
    clearError,
    refreshQuestions,
    refreshQuizzes,
    refreshStatistics,
    deleteAllQuestions,
    deleteAllQuizzes
  } = useQuizAdmin();

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  if (!isAdmin) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingTop: Platform.OS === 'web' ? 20 : insets.top + 20,
              paddingBottom: Platform.OS === 'web' ? 40 : insets.bottom + 20,
            }
          ]}
        >
          <ThemedView style={[styles.errorCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="security" size={48} color={colors.error} />
            <ThemedText type="title" style={[styles.errorTitle, { color: colors.error }]}>
              Accès refusé
            </ThemedText>
            <ThemedText style={[styles.errorDescription, { color: colors.secondary }]}>
              Vous devez être administrateur pour accéder à cette page.
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header fixe */}
      <ThemedView style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              console.log('🔙 Bouton retour pressé (admin principal)');
              try {
                router.back();
              } catch (error) {
                console.error('❌ Erreur lors de la navigation retour:', error);
                router.push('/');
              }
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            <ThemedText style={[styles.backButtonText, { color: colors.primary }]}>
              Retour
            </ThemedText>
          </TouchableOpacity>
          
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Administration
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.refreshButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              refreshQuestions();
              refreshQuizzes();
              refreshStatistics();
            }}
          >
            <MaterialIcons name="refresh" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: Platform.OS === 'web' ? 20 : insets.top + 80,
            paddingBottom: Platform.OS === 'web' ? 40 : insets.bottom + 20,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          {/* Statistiques */}
          <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="analytics" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Statistiques
              </ThemedText>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <MaterialIcons name="quiz" size={24} color={colors.primary} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {quizzes.length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Quiz créés
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="help" size={24} color={colors.warning} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {questions.length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Questions disponibles
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="category" size={24} color={colors.success} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {[...new Set(quizzes.map(q => q.category))].length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Catégories
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          {/* Actions principales */}
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/admin/quiz-management' as any)}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons name="quiz" size={32} color={colors.primary} />
              </View>
              <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                Gestion des Quiz
              </ThemedText>
              <ThemedText style={[styles.actionDescription, { color: colors.secondary }]}>
                Créer, modifier et supprimer des quiz
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/admin/question-management' as any)}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons name="help" size={32} color={colors.warning} />
              </View>
              <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                Gestion des Questions
              </ThemedText>
              <ThemedText style={[styles.actionDescription, { color: colors.secondary }]}>
                Créer et modifier des questions
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => {
                showAlert(
                  'Fonctionnalité à venir',
                  'Les statistiques détaillées seront bientôt disponibles.'
                );
              }}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons name="analytics" size={32} color={colors.success} />
              </View>
              <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                Statistiques Avancées
              </ThemedText>
              <ThemedText style={[styles.actionDescription, { color: colors.secondary }]}>
                Voir les statistiques détaillées
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => {
                showAlert(
                  'Fonctionnalité à venir',
                  'La gestion des utilisateurs sera bientôt disponible.'
                );
              }}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons name="people" size={32} color={colors.error} />
              </View>
              <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                Gestion des Utilisateurs
              </ThemedText>
              <ThemedText style={[styles.actionDescription, { color: colors.secondary }]}>
                Gérer les utilisateurs et permissions
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Actions dangereuses */}
          <ThemedView style={[styles.dangerCard, { backgroundColor: colors.card, borderColor: colors.error }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="warning" size={24} color={colors.error} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.error }]}>
                Actions Dangereuses
              </ThemedText>
            </View>
            
            <View style={styles.dangerActions}>
              <TouchableOpacity
                style={[styles.dangerButton, { backgroundColor: colors.error }]}
                onPress={() => {
                  showConfirmAlert(
                    'Supprimer toutes les questions',
                    'Êtes-vous sûr de vouloir supprimer toutes les questions ? Cette action est irréversible.',
                    async () => {
                      // Logique de suppression
                      console.log('Suppression de toutes les questions');
                    }
                  );
                }}
              >
                <MaterialIcons name="delete-forever" size={16} color={colors.background} />
                <ThemedText style={[styles.dangerButtonText, { color: colors.background }]}>
                  Supprimer toutes les questions
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.dangerButton, { backgroundColor: colors.error }]}
                onPress={() => {
                  showConfirmAlert(
                    'Supprimer tous les quiz',
                    'Êtes-vous sûr de vouloir supprimer tous les quiz ? Cette action est irréversible.',
                    async () => {
                      // Logique de suppression
                      console.log('Suppression de tous les quiz');
                    }
                  );
                }}
              >
                <MaterialIcons name="delete-forever" size={16} color={colors.background} />
                <ThemedText style={[styles.dangerButtonText, { color: colors.background }]}>
                  Supprimer tous les quiz
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>

          {/* Diagnostic Firebase */}
          <ThemedView style={[styles.diagnosticCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="bug-report" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Diagnostic Firebase
              </ThemedText>
            </View>
            <FirebaseDiagnostic />
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  mainContent: {
    gap: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    paddingBottom: Platform.OS === 'android' ? 0 : 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  statsCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
    marginVertical: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    marginBottom: 15,
  },
  actionIcon: {
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 12,
    opacity: 0.8,
  },
  dangerCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
  },
  dangerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  diagnosticCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
  },
  errorCard: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  errorDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 