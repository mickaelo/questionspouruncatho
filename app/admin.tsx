import { FirebaseDiagnostic } from '@/components/FirebaseDiagnostic';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
              paddingTop: Platform.OS === 'android' ? insets.top : 20,
              paddingBottom: Platform.OS === 'android' ? insets.bottom : 20,
            }
          ]}
        >
          <ThemedView style={[styles.errorCard, { backgroundColor: colors.card }]}>
            <MaterialIcons name="security" size={48} color={colors.error} />
            <ThemedText type="title" style={[styles.errorTitle, { color: colors.error }]}>
              Accès refusé
            </ThemedText>
            <ThemedText style={[styles.errorText, { color: colors.text }]}>
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </ThemedText>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                console.log('🔙 Bouton retour pressé (accès refusé admin)');
                try {
                  router.back();
                } catch (error) {
                  console.error('❌ Erreur lors de la navigation retour:', error);
                  router.push('/');
                }
              }}
            >
              <ThemedText style={[styles.backButtonText, { color: colors.background }]}>
                Retour
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: Platform.OS === 'android' ? insets.top : 20,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 20,
          }
        ]}
      >
        {/* Header */}
        <ThemedView style={[styles.header, { backgroundColor: colors.card }]}>
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
          </TouchableOpacity>
          
          <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
            Administration
          </ThemedText>
        </ThemedView>

        {/* Statistiques */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
              Statistiques
            </ThemedText>
            <TouchableOpacity onPress={() => {
              refreshQuestions();
              refreshQuizzes();
              refreshStatistics();
            }} disabled={isLoading}>
              <MaterialIcons name="refresh" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          {statistics ? (
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <MaterialIcons name="quiz" size={24} color={colors.primary} />
                <ThemedText style={[styles.statValue, { color: colors.text }]}>
                  {statistics.totalQuizzes}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.text }]}>
                  Quiz
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="help" size={24} color={colors.secondary} />
                <ThemedText style={[styles.statValue, { color: colors.text }]}>
                  {statistics.totalQuestions}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.text }]}>
                  Questions
                </ThemedText>
              </View>
            </View>
          ) : (
            <ThemedText style={[styles.description, { color: colors.text }]}>
              Aucune statistique disponible
            </ThemedText>
          )}
        </ThemedView>

        {/* Gestion des Questions */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Gestion des Questions
          </ThemedText>
          <ThemedText style={[styles.description, { color: colors.text }]}>
            {questions.length} questions disponibles
          </ThemedText>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.warning }]}
              onPress={() => {
                Alert.alert(
                  'Supprimer toutes les questions',
                  'Êtes-vous sûr de vouloir supprimer toutes les questions ?',
                  [
                    { text: 'Annuler', style: 'cancel' },
                    { 
                      text: 'Supprimer', 
                      style: 'destructive',
                      onPress: () => deleteAllQuestions()
                    }
                  ]
                );
              }}
            >
              <MaterialIcons name="delete-sweep" size={20} color={colors.background} />
              <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
                Tout supprimer
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Gestion des Quiz */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Gestion des Quiz
          </ThemedText>
          <ThemedText style={[styles.description, { color: colors.text }]}>
            {quizzes.length} quiz disponibles
          </ThemedText>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/admin/quiz-management')}
            >
              <MaterialIcons name="list" size={20} color={colors.background} />
              <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
                Gérer les quiz
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.warning }]}
              onPress={() => {
                Alert.alert(
                  'Supprimer tous les quiz',
                  'Êtes-vous sûr de vouloir supprimer tous les quiz ?',
                  [
                    { text: 'Annuler', style: 'cancel' },
                    { 
                      text: 'Supprimer', 
                      style: 'destructive',
                      onPress: () => deleteAllQuizzes()
                    }
                  ]
                );
              }}
            >
              <MaterialIcons name="delete-sweep" size={20} color={colors.background} />
              <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
                Tout supprimer
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Diagnostic Firebase */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Diagnostic Firebase
          </ThemedText>
          <ThemedText style={[styles.description, { color: colors.text }]}>
            Utilisez ce diagnostic pour identifier les problèmes de connectivité avec Firebase.
          </ThemedText>
          <FirebaseDiagnostic />
        </ThemedView>

        {/* Gestion des utilisateurs */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Gestion des utilisateurs
          </ThemedText>
          <ThemedText style={[styles.description, { color: colors.text }]}>
            Fonctionnalités d'administration des utilisateurs à venir...
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
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
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    width: '45%', // Adjust as needed for spacing
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  errorCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
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
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 