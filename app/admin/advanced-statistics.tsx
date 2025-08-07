import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCourseData } from '@/hooks/useCourseData';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { useUserProgress } from '@/hooks/useUserProgress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export default function AdvancedStatisticsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoadingBarContext();
  const {
    questions,
    quizzes,
    statistics,
    isLoading,
    error,
    clearError,
    refreshQuestions,
    refreshQuizzes,
    refreshStatistics
  } = useQuizAdmin();
  
  const { courses } = useCourseData();
  const { userProgress } = useUserProgress();

  const [selectedPeriod, setSelectedPeriod] = useState('all'); // all, week, month, year
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Gérer l'affichage du loading bar global
  useEffect(() => {
    if (isLoading) {
      showLoading({ duration: 1500 });
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const handleBackNavigation = () => {
    try {
      router.back();
    } catch (error) {
      console.error('❌ Erreur avec router.back():', error);
      try {
        router.push('/admin');
      } catch (fallbackError) {
        console.error('❌ Erreur avec fallback navigation:', fallbackError);
        router.push('/');
      }
    }
  };

  // Calculs de statistiques
  const calculateQuizStats = () => {
    const totalQuizzes = quizzes.length;
    const activeQuizzes = quizzes.filter(q => q.isActive !== false).length;
    const categories = [...new Set(quizzes.map(q => q.category))];
    const avgQuestionsPerQuiz = totalQuizzes > 0 ? 
      quizzes.reduce((acc, quiz) => acc + (quiz.questions?.length || 0), 0) / totalQuizzes : 0;
    
    const difficultyDistribution = quizzes.reduce((acc, quiz) => {
      const difficulty = quiz.difficulty || 'moyen';
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: totalQuizzes,
      active: activeQuizzes,
      categories: categories.length,
      avgQuestions: Math.round(avgQuestionsPerQuiz * 10) / 10,
      difficultyDistribution
    };
  };

  const calculateQuestionStats = () => {
    const totalQuestions = questions.length;
    const categories = [...new Set(questions.map(q => q.category))];
    const difficultyDistribution = questions.reduce((acc, question) => {
      acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const levelDistribution = questions.reduce((acc, question) => {
      acc[question.level] = (acc[question.level] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const avgPoints = totalQuestions > 0 ? 
      questions.reduce((acc, q) => acc + q.points, 0) / totalQuestions : 0;

    return {
      total: totalQuestions,
      categories: categories.length,
      difficultyDistribution,
      levelDistribution,
      avgPoints: Math.round(avgPoints * 10) / 10
    };
  };

  const calculateCourseStats = () => {
    const totalCourses = courses.length;
    const activeCourses = courses.filter(c => c.isActive !== false).length;
    const categories = [...new Set(courses.map(c => c.category))];
    
    const levelDistribution = courses.reduce((acc, course) => {
      acc[course.level] = (acc[course.level] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const avgLessonsPerCourse = totalCourses > 0 ? 
      courses.reduce((acc, course) => acc + (course.lessons?.length || 0), 0) / totalCourses : 0;

    return {
      total: totalCourses,
      active: activeCourses,
      categories: categories.length,
      levelDistribution,
      avgLessons: Math.round(avgLessonsPerCourse * 10) / 10
    };
  };

  const calculateUserStats = () => {
    // Statistiques simulées pour les utilisateurs (à adapter selon vos données réelles)
    const totalUsers = 150; // Exemple
    const activeUsers = 89; // Exemple
    const newUsersThisWeek = 12; // Exemple
    const avgSessionDuration = 15; // minutes
    const completionRate = 67; // pourcentage

    return {
      total: totalUsers,
      active: activeUsers,
      newThisWeek: newUsersThisWeek,
      avgSessionDuration,
      completionRate
    };
  };

  const quizStats = calculateQuizStats();
  const questionStats = calculateQuestionStats();
  const courseStats = calculateCourseStats();
  const userStats = calculateUserStats();

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
            onPress={handleBackNavigation}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            <ThemedText style={[styles.backButtonText, { color: colors.primary }]}>
              Retour
            </ThemedText>
          </TouchableOpacity>
          
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Statistiques Avancées
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
          {/* Filtres de période */}
          <ThemedView style={[styles.filtersCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="filter-list" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Filtres
              </ThemedText>
            </View>
            
            <View style={styles.filtersRow}>
              <View style={styles.filterGroup}>
                <ThemedText style={[styles.filterLabel, { color: colors.text }]}>
                  Période
                </ThemedText>
                <View style={styles.filterButtons}>
                  {[
                    { key: 'all', label: 'Tout' },
                    { key: 'week', label: '7 jours' },
                    { key: 'month', label: '30 jours' },
                    { key: 'year', label: '1 an' }
                  ].map((period) => (
                    <TouchableOpacity
                      key={period.key}
                      style={[
                        styles.filterButton,
                        { 
                          backgroundColor: selectedPeriod === period.key ? colors.primary : colors.background,
                          borderColor: colors.border
                        }
                      ]}
                      onPress={() => setSelectedPeriod(period.key)}
                    >
                      <ThemedText style={[
                        styles.filterButtonText, 
                        { color: selectedPeriod === period.key ? colors.background : colors.text }
                      ]}>
                        {period.label}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ThemedView>

          {/* Statistiques des Quiz */}
          <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="quiz" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Statistiques des Quiz
              </ThemedText>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {quizStats.total}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Total Quiz
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.success }]}>
                  {quizStats.active}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Quiz Actifs
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.warning }]}>
                  {quizStats.categories}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Catégories
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.primary }]}>
                  {quizStats.avgQuestions}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Moy. Questions/Quiz
                </ThemedText>
              </View>
            </View>

            {/* Distribution par difficulté */}
            <View style={styles.distributionSection}>
              <ThemedText style={[styles.distributionTitle, { color: colors.text }]}>
                Distribution par difficulté
              </ThemedText>
              <View style={styles.distributionBars}>
                {Object.entries(quizStats.difficultyDistribution).map(([difficulty, count]) => (
                  <View key={difficulty} style={styles.distributionBar}>
                    <View style={styles.barInfo}>
                      <ThemedText style={[styles.barLabel, { color: colors.text }]}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </ThemedText>
                      <ThemedText style={[styles.barValue, { color: colors.secondary }]}>
                        {count}
                      </ThemedText>
                    </View>
                    <View style={[styles.barContainer, { backgroundColor: colors.background }]}>
                      <View 
                        style={[
                          styles.barFill, 
                          { 
                            backgroundColor: getDifficultyColor(difficulty, colors),
                            width: `${(count / quizStats.total) * 100}%`
                          }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ThemedView>

          {/* Statistiques des Questions */}
          <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="help" size={24} color={colors.warning} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Statistiques des Questions
              </ThemedText>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {questionStats.total}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Total Questions
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.success }]}>
                  {questionStats.categories}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Catégories
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.primary }]}>
                  {questionStats.avgPoints}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Moy. Points
                </ThemedText>
              </View>
            </View>

            {/* Distribution par niveau */}
            <View style={styles.distributionSection}>
              <ThemedText style={[styles.distributionTitle, { color: colors.text }]}>
                Distribution par niveau
              </ThemedText>
              <View style={styles.distributionBars}>
                {Object.entries(questionStats.levelDistribution)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([level, count]) => (
                  <View key={level} style={styles.distributionBar}>
                    <View style={styles.barInfo}>
                      <ThemedText style={[styles.barLabel, { color: colors.text }]}>
                        Niveau {level}
                      </ThemedText>
                      <ThemedText style={[styles.barValue, { color: colors.secondary }]}>
                        {count}
                      </ThemedText>
                    </View>
                    <View style={[styles.barContainer, { backgroundColor: colors.background }]}>
                      <View 
                        style={[
                          styles.barFill, 
                          { 
                            backgroundColor: getLevelColor(parseInt(level), colors),
                            width: `${(count / questionStats.total) * 100}%`
                          }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ThemedView>

          {/* Statistiques des Parcours */}
          <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="school" size={24} color={colors.success} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Statistiques des Parcours
              </ThemedText>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {courseStats.total}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Total Parcours
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.success }]}>
                  {courseStats.active}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Parcours Actifs
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.warning }]}>
                  {courseStats.categories}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Catégories
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.primary }]}>
                  {courseStats.avgLessons}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Moy. Leçons/Parcours
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          {/* Statistiques des Utilisateurs */}
          <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="people" size={24} color={colors.error} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Statistiques des Utilisateurs
              </ThemedText>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {userStats.total}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Total Utilisateurs
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.success }]}>
                  {userStats.active}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Utilisateurs Actifs
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.primary }]}>
                  {userStats.newThisWeek}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Nouveaux (7j)
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={[styles.statNumber, { color: colors.warning }]}>
                  {userStats.avgSessionDuration}min
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Durée Moy. Session
                </ThemedText>
              </View>
            </View>

            {/* Taux de complétion */}
            <View style={styles.completionSection}>
              <View style={styles.completionInfo}>
                <ThemedText style={[styles.completionLabel, { color: colors.text }]}>
                  Taux de complétion global
                </ThemedText>
                <ThemedText style={[styles.completionValue, { color: colors.primary }]}>
                  {userStats.completionRate}%
                </ThemedText>
              </View>
              <View style={[styles.completionBar, { backgroundColor: colors.background }]}>
                <View 
                  style={[
                    styles.completionFill, 
                    { 
                      backgroundColor: colors.primary,
                      width: `${userStats.completionRate}%`
                    }
                  ]} 
                />
              </View>
            </View>
          </ThemedView>

          {/* Résumé global */}
          <ThemedView style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="analytics" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Résumé Global
              </ThemedText>
            </View>
            
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <MaterialIcons name="quiz" size={20} color={colors.primary} />
                <ThemedText style={[styles.summaryText, { color: colors.text }]}>
                  {quizStats.total} quiz créés
                </ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="help" size={20} color={colors.warning} />
                <ThemedText style={[styles.summaryText, { color: colors.text }]}>
                  {questionStats.total} questions disponibles
                </ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="school" size={20} color={colors.success} />
                <ThemedText style={[styles.summaryText, { color: colors.text }]}>
                  {courseStats.total} parcours de formation
                </ThemedText>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="people" size={20} color={colors.error} />
                <ThemedText style={[styles.summaryText, { color: colors.text }]}>
                  {userStats.total} utilisateurs inscrits
                </ThemedText>
              </View>
            </View>
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Fonction utilitaire pour obtenir la couleur de difficulté
const getDifficultyColor = (difficulty: string, colors: any) => {
  switch (difficulty) {
    case 'facile':
      return colors.success;
    case 'moyen':
      return colors.warning;
    case 'difficile':
      return colors.error;
    default:
      return colors.primary;
  }
};

// Fonction utilitaire pour obtenir la couleur de niveau
const getLevelColor = (level: number, colors: any) => {
  switch (level) {
    case 1:
      return colors.success;
    case 2:
      return colors.warning;
    case 3:
      return colors.error;
    default:
      return colors.primary;
  }
};

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
  filtersCard: {
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
  filtersRow: {
    gap: 15,
  },
  filterGroup: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    width: screenWidth > 600 ? '22%' : '48%',
    marginVertical: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  distributionSection: {
    marginTop: 15,
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  distributionBars: {
    gap: 8,
  },
  distributionBar: {
    gap: 4,
  },
  barInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  barValue: {
    fontSize: 12,
  },
  barContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionSection: {
    marginTop: 15,
  },
  completionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  completionValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completionBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  completionFill: {
    height: '100%',
    borderRadius: 6,
  },
  summaryCard: {
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
  summaryGrid: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '500',
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
  },
}); 