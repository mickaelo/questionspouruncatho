
import { QuizCard } from '@/components/QuizCard';
import { useQuizDataContext } from '@/components/QuizDataProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import { Quiz } from '@/types/quiz';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, isAuthenticated } = useAuth();
  const { userProgress, isLoading: userProgressLoading, error: userProgressError } = useUserProgress();
  const { getAvailableQuizzes, isLoading: quizLoading, error: quizError } = useQuizDataContext();

  // Check if user is admin
  const isAdmin = isAuthenticated && user?.type?.includes('admin');
  
  // Get user level from progress or default to 1
  const userLevel = userProgress?.level || 1;

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';

  // État pour les quiz disponibles
  const [availableQuizzes, setAvailableQuizzes] = React.useState<Quiz[]>([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Log de débogage
  console.log('🏠 HomeScreen rendu:', { 
    isAuthenticated, 
    userLevel, 
    colorScheme, 
    isWeb,
    userProgressLoading,
    quizLoading,
    hasError
  });

  // Charger les quiz disponibles
  useEffect(() => {
    const loadAvailableQuizzes = async () => {
      setIsLoadingQuizzes(true);
      setHasError(false);
      try {
        const quizzes = await getAvailableQuizzes(userLevel);
        setAvailableQuizzes(quizzes);
        console.log('✅ Quiz chargés:', quizzes.length);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des quiz:', error);
        setHasError(true);
        // Utiliser des données par défaut en cas d'erreur
        setAvailableQuizzes([]);
      } finally {
        setIsLoadingQuizzes(false);
      }
    };

    loadAvailableQuizzes();
  }, [getAvailableQuizzes, userLevel]);

  const handleQuizPress = (quiz: Quiz) => {
    router.push({
      pathname: '/quiz/[id]',
      params: { id: quiz.id }
    });
  };

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Débutant';
    if (level < 10) return 'Initié';
    if (level < 15) return 'Adepte';
    if (level < 20) return 'Expert';
    return 'Maître Théologien';
  };

  // Données par défaut si userProgress n'est pas encore chargé
  const defaultProgress = {
    totalPoints: 0,
    level: 1,
    streak: 0,
    completedQuizzes: [] as string[]
  };

  const progress = userProgress || defaultProgress;
  const insets = useSafeAreaInsets();
  return (
    <ScrollView 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
          // Ajouter un padding à droite sur le web pour compenser la largeur du menu de gauche
          paddingRight: Platform.OS === 'web' ? '15%' : 0,
          paddingLeft: Platform.OS === 'web' ? '15%' : 0,
        }
      ]}
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 150 : 60, // Espace pour la barre de navigation
      }}
    >
      {/* Layout en deux colonnes sur le web uniquement */}
      {isWeb ? (
        <View style={styles.webLayout}>
          {/* Colonne de gauche - Quiz */}
          <View style={styles.leftColumn}>
            {/* Section Quiz disponibles */}
            <ThemedView style={styles.section}>
              {availableQuizzes.length > 0 ? (
                availableQuizzes.map((quiz: Quiz, index: number) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onPress={handleQuizPress}
                    completed={progress.completedQuizzes.includes(quiz.id)}
                    score={progress.completedQuizzes.includes(quiz.id) ? 85 : undefined}
                    index={index}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <IconSymbol name="questionmark.circle" size={48} color={colors.text} />
                  <ThemedText style={[styles.emptyText, { color: colors.text }]}>
                    Aucun quiz disponible pour votre niveau
                  </ThemedText>
                </View>
              )}
            </ThemedView>
          </View>

          {/* Colonne de droite - Progression (uniquement sur le web) */}
          <View style={styles.rightColumn}>
            <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <ThemedText type="subtitle" style={[styles.progressCardTitle, { color: colors.text }]}>
                Votre progression
              </ThemedText>
              
              <View style={styles.userInfo}>
                <ThemedText style={[styles.level, { color: colors.primary }]}>
                  {getLevelTitle(progress.level)} - Niveau {progress.level}
                </ThemedText>
                
                {/* Barre de progression vers le prochain niveau */}
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[
                        styles.progressBarFill, 
                        { 
                          width: `${Math.min((progress.totalPoints % 1000) / 10, 100)}%`,
                          backgroundColor: colors.primary 
                        }
                      ]} 
                    />
                  </View>
                  <ThemedText style={[styles.progressText, { color: colors.text }]}>
                    {progress.totalPoints % 1000}/1000 points vers le niveau {progress.level + 1}
                  </ThemedText>
                </View>
              </View>
            </ThemedView>

            {/* Section Défis quotidiens */}
            <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 }]}>
              <ThemedText type="subtitle" style={[styles.progressCardTitle, { color: colors.text }]}>
                Défi du jour
              </ThemedText>

              <TouchableOpacity
                style={[styles.dailyChallenge, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push('/explore')}
              >
                <View style={styles.challengeContent}>
                  <IconSymbol name="target" size={24} color={colors.primary} />
                  <View style={styles.challengeText}>
                    <ThemedText type="subtitle" style={{ color: colors.text }}>Quiz sur les Saints</ThemedText>
                    <ThemedText style={[styles.challengeDescription, { color: colors.text }]}>
                      Testez vos connaissances sur les saints de l'Église catholique
                    </ThemedText>
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.primary} />
              </TouchableOpacity>
            </ThemedView>
          </View>
        </View>
      ) : (
        /* Layout mobile - Structure originale */
        <View>
          {/* Header avec progression utilisateur (mobile uniquement) */}
          <ThemedView style={[
            styles.header, 
            { 
              backgroundColor: colors.card, 
              borderColor: colors.border,
              marginTop: Platform.OS === 'android' ? 0 : 16, // Pas de marge en haut sur Android
            }
          ]}>
            <View style={styles.userInfo}>
              <ThemedText style={[styles.level, { color: colors.primary }]}>
                {getLevelTitle(progress.level)} - Niveau {progress.level}
              </ThemedText>
              
              {/* Barre de progression vers le prochain niveau */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: `${Math.min((progress.totalPoints % 1000) / 10, 100)}%`,
                        backgroundColor: colors.primary 
                      }
                    ]} 
                  />
                </View>
                <ThemedText style={[styles.progressText, { color: colors.text }]}>
                  {progress.totalPoints % 1000}/1000 points vers le niveau {progress.level + 1}
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          {/* Section Quiz disponibles */}
          <ThemedView style={styles.section}>
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz: Quiz, index: number) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onPress={handleQuizPress}
                  completed={progress.completedQuizzes.includes(quiz.id)}
                  score={progress.completedQuizzes.includes(quiz.id) ? 85 : undefined}
                  index={index}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <IconSymbol name="questionmark.circle" size={48} color={colors.text} />
                <ThemedText style={[styles.emptyText, { color: colors.text }]}>
                  Aucun quiz disponible pour votre niveau
                </ThemedText>
              </View>
            )}
          </ThemedView>

          {/* Section Défis quotidiens */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
              Défi du jour
            </ThemedText>

            <TouchableOpacity
              style={[styles.dailyChallenge, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/explore')}
            >
              <View style={styles.challengeContent}>
                <IconSymbol name="target" size={24} color={colors.primary} />
                <View style={styles.challengeText}>
                  <ThemedText type="subtitle" style={{ color: colors.text }}>Quiz sur les Saints</ThemedText>
                  <ThemedText style={[styles.challengeDescription, { color: colors.text }]}>
                    Testez vos connaissances sur les saints de l'Église catholique
                  </ThemedText>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.primary} />
            </TouchableOpacity>
          </ThemedView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    padding: 20,
    paddingTop: 40,
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    margin: Platform.OS === 'android' ? 0 : 16, // Pas de marge sur Android
    marginTop: Platform.OS === 'android' ? 0 : 0, // En haut de l'écran sur Android
    borderRadius: Platform.OS === 'android' ? 0 : 16, // Pas de border radius sur Android
    borderWidth: Platform.OS === 'android' ? 0 : 1, // Pas de bordure sur Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  userInfo: {
    marginBottom: 16,
  },
  greeting: {
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  dailyChallenge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  challengeText: {
    marginLeft: 12,
    flex: 1,
  },
  challengeDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  progressCard: {
    padding: 20,
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
  progressCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBarContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.7,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  welcomeContainer: {
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
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
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    opacity: 0.8,
  },
  webLayout: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 16,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 16,
  },

});
