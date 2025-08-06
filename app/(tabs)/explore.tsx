import { useQuizDataContext } from '@/components/QuizDataProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { categoryIcons, categoryNames } from '@/data/questions';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CategoriesScreen() {
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  // Check if user is admin
  const isAdmin = isAuthenticated && user?.type?.includes('admin');
  
  // Get user level (default to 1 if not available)
  const userLevel = 1; // TODO: Get from user progress

  // Utiliser le contexte QuizData
  const { quizzes, isLoading, error } = useQuizDataContext();
  
  // État pour stocker le nombre de quiz par catégorie
  const [quizCounts, setQuizCounts] = useState<Record<string, number>>({});

  // Calculer le nombre de quiz par catégorie
  useEffect(() => {
    if (quizzes.length > 0) {
      const counts: Record<string, number> = {};
      
      // Filtrer les quiz selon le niveau utilisateur et le statut admin
      const availableQuizzes = isAdmin 
        ? quizzes 
        : quizzes.filter(quiz => quiz.level <= userLevel);
      
      // Compter les quiz par catégorie
      availableQuizzes.forEach(quiz => {
        const category = quiz.category;
        counts[category] = (counts[category] || 0) + 1;
      });
      
      setQuizCounts(counts);
    }
  }, [quizzes, userLevel, isAdmin]);

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: '/category/[id]',
      params: { id: category }
    });
  };

  const getQuizCount = (category: string) => {
    return quizCounts[category] || 0;
  };

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
        paddingBottom: Platform.OS === 'android' ? 150 : 60, // Espace pour la barre de navigation
      }}
    >
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Toutes les catégories
        </ThemedText>

        <View style={styles.categoriesGrid}>
          {Object.entries(categoryNames).map(([key, name]) => (
            <TouchableOpacity
              key={key}
              style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleCategoryPress(key)}
            >
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(139, 69, 19, 0.1)' }]}>
                <MaterialIcons 
                  name={categoryIcons[key] as any || 'help'} 
                  size={24} 
                  color={colors.primary} 
                />
              </View>
              <ThemedText type="subtitle" style={[styles.categoryName, { color: colors.text }]}>
                {name}
              </ThemedText>
              <ThemedText style={[styles.quizCount, { color: colors.text }]}>
                {getQuizCount(key)} quiz
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Quiz populaires
        </ThemedText>

        {quizzes
          .filter(quiz => isAdmin || quiz.level <= userLevel)
          .slice(0, 3)
          .map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={[styles.popularQuiz, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push({
                pathname: '/quiz/[id]',
                params: { id: quiz.id }
              })}
            >
              <View style={styles.quizInfo}>
                <ThemedText type="subtitle" style={[styles.quizTitle, { color: colors.text }]}>
                  {quiz.title}
                </ThemedText>
                <ThemedText style={[styles.quizDescription, { color: colors.text }]}>
                  {quiz.description}
                </ThemedText>
                <View style={styles.quizMeta}>
                  <ThemedText style={[styles.quizMetaText, { color: colors.primary }]}>
                    {quiz.questions.length} questions
                  </ThemedText>
                  {quiz.timeLimit && (
                    <ThemedText style={[styles.quizMetaText, { color: colors.primary }]}>
                      {quiz.timeLimit} min
                    </ThemedText>
                  )}
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.primary} />
            </TouchableOpacity>
          ))}
      </ThemedView>
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
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  quizCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  popularQuiz: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  quizMetaText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
