import { QuizCard } from '@/components/QuizCard';
import { useQuizDataContext } from '@/components/QuizDataProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { categoryIcons, categoryNames } from '@/data/questions';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Quiz } from '@/types/quiz';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { getQuizzesByCategory, quizzes, isLoading, error } = useQuizDataContext();
  
  // Check if user is admin
  const isAdmin = isAuthenticated && user?.type?.includes('admin');
  
  // Get user level (default to 1 if not available)
  const userLevel = 1; // TODO: Get from user progress

  const categoryName = categoryNames[id] || 'Catégorie';
  const categoryIcon = categoryIcons[id] || 'questionmark';
  
  // État pour les quiz de la catégorie
  const [categoryQuizzes, setCategoryQuizzes] = useState<Quiz[]>([]);

  // Charger les quiz de la catégorie dynamiquement
  useEffect(() => {
    const loadCategoryQuizzes = async () => {
      if (id) {
        const quizzes = await getQuizzesByCategory(id);
        // Filtrer par niveau utilisateur
        const filteredQuizzes = quizzes.filter(q => q.level <= userLevel);
        setCategoryQuizzes(filteredQuizzes);
      }
    };
    loadCategoryQuizzes();
  }, [id, userLevel, getQuizzesByCategory]);

  const handleQuizPress = (quiz: Quiz) => {
    router.push({
      pathname: '/quiz/[id]',
      params: { id: quiz.id }
    });
  };

  const getCategoryDescription = (categoryId: string) => {
    const descriptions: Record<string, string> = {
      'dogmes': 'Explorez les fondements de la foi catholique et les vérités révélées par Dieu.',
      'sacrements': 'Découvrez les sept sacrements de l\'Église et leur signification spirituelle.',
      'liturgie': 'Apprenez les rites, cérémonies et célébrations de l\'Église catholique.',
      'saintes-ecritures': 'Plongez dans la Bible et les textes sacrés de la tradition chrétienne.',
      'morale': 'Étudiez l\'enseignement moral de l\'Église et les principes éthiques catholiques.',
      'histoire-eglise': 'Retracez l\'histoire de l\'Église catholique à travers les siècles.',
      'saints': 'Découvrez la vie et l\'œuvre des saints et saintes de l\'Église.',
      'prieres': 'Apprenez les prières traditionnelles et la spiritualité catholique.'
    };
    return descriptions[categoryId] || 'Explorez cette catégorie de la théologie catholique.';
  };

  // Obtenir les quiz recommandés depuis le contexte
  const getRecommendedQuizzes = () => {
    const availableQuizzes = isAdmin 
      ? quizzes 
      : quizzes.filter(quiz => quiz.level <= userLevel);
    
    return availableQuizzes
      .filter(quiz => quiz.category !== id)
      .slice(0, 2);
  };

  return (
    <ScrollView style={styles.container}>

      <ThemedView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <ThemedText style={styles.statNumber}>{categoryQuizzes.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Quiz disponibles</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <ThemedText style={styles.statNumber}>
              {categoryQuizzes.reduce((total, quiz) => total + (quiz.questions?.length || 0), 0)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Questions totales</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <ThemedText style={styles.statNumber}>
              {Math.round(categoryQuizzes.reduce((total, quiz) => total + (quiz.timeLimit || 0), 0) / categoryQuizzes.length)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Min. moyennes</ThemedText>
          </View>
        </View>

        <View style={styles.quizzesSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Quiz de cette catégorie
          </ThemedText>
          
          {categoryQuizzes.length > 0 ? (
            categoryQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onPress={handleQuizPress}
              />
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <IconSymbol name="tray" size={48} color={colors.tint} />
              <ThemedText type="subtitle" style={styles.emptyTitle}>
                Aucun quiz disponible
              </ThemedText>
              <ThemedText style={styles.emptyDescription}>
                Les quiz pour cette catégorie seront bientôt disponibles.
              </ThemedText>
            </View>
          )}
        </View>

        {/* Quiz recommandés d'autres catégories */}
        <View style={styles.recommendationsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Quiz recommandés
          </ThemedText>
          
          {getRecommendedQuizzes().map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={[styles.recommendationCard, { backgroundColor: colors.background, borderColor: colors.border }]}
              onPress={() => handleQuizPress(quiz)}
            >
              <View style={styles.recommendationContent}>
                <ThemedText type="subtitle" style={styles.recommendationTitle}>
                  {quiz.title}
                </ThemedText>
                <ThemedText style={styles.recommendationDescription}>
                  {quiz.description}
                </ThemedText>
                <View style={styles.recommendationMeta}>
                  <ThemedText style={styles.recommendationMetaText}>
                    {categoryNames[quiz.category]}
                  </ThemedText>
                  <ThemedText style={styles.recommendationMetaText}>
                    • {quiz.questions?.length || 0} questions
                  </ThemedText>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.tint} />
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  quizzesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    gap: 12,
  },
  emptyTitle: {
    marginBottom: 4,
  },
  emptyDescription: {
    textAlign: 'center',
    opacity: 0.7,
  },
  recommendationsSection: {
    marginBottom: 20,
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  recommendationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationMetaText: {
    fontSize: 12,
    opacity: 0.6,
  },
}); 