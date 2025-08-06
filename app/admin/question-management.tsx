import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Question } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QuestionManagementScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoadingBarContext();
  const {
    questions,
    isLoading,
    error,
    clearError,
    refreshQuestions,
    deleteQuestion
  } = useQuizAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

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

  // Filtrer les questions selon les critères
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || question.category === filterCategory;
    const matchesDifficulty = !filterDifficulty || question.difficulty === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleDeleteQuestion = (question: Question) => {
    Alert.alert(
      'Supprimer la question',
      `Êtes-vous sûr de vouloir supprimer cette question ?\n\n"${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}"`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: async () => {
            showLoading({ duration: 1000 });
            try {
              await deleteQuestion(question.id);
              Alert.alert('Succès', 'Question supprimée avec succès');
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer la question');
            } finally {
              hideLoading();
            }
          }
        }
      ]
    );
  };

  const handleEditQuestion = (question: Question) => {
    console.log(question)
    router.push(`/admin/question-edit/${question.id}` as any);
  };

  const handleCreateQuestion = () => {
    router.push('/admin/question-edit/new' as any);
  };

  // Obtenir les catégories et difficultés uniques
  const categories = [...new Set(questions.map(q => q.category))].sort();
  const difficulties = ['facile', 'moyen', 'difficile'];

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
            Gestion des Questions
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleCreateQuestion}
          >
            <MaterialIcons name="add" size={20} color={colors.background} />
            <ThemedText style={[styles.addButtonText, { color: colors.background }]}>
              Nouvelle Question
            </ThemedText>
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
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <MaterialIcons name="help" size={24} color={colors.primary} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {questions.length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Questions créées
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="category" size={24} color={colors.warning} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {categories.length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Catégories
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="star" size={24} color={colors.success} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {questions.filter(q => q.difficulty === 'difficile').length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Questions difficiles
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          {/* Filtres */}
          <ThemedView style={[styles.filtersCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="filter-list" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Filtres
              </ThemedText>
            </View>
            
            <View style={styles.filtersGrid}>
              <View style={styles.filterGroup}>
                <ThemedText style={[styles.filterLabel, { color: colors.text }]}>
                  Recherche
                </ThemedText>
                <TextInput
                  style={[styles.searchInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Rechercher des questions..."
                  placeholderTextColor={colors.text + '80'}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </View>
              
              <View style={styles.filterGroup}>
                <ThemedText style={[styles.filterLabel, { color: colors.text }]}>
                  Catégorie
                </ThemedText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                  <TouchableOpacity
                    style={[
                      styles.filterChip,
                      { 
                        backgroundColor: !filterCategory ? colors.primary : colors.background,
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => setFilterCategory('')}
                  >
                    <ThemedText style={[styles.filterChipText, { color: !filterCategory ? colors.background : colors.text }]}>
                      Toutes
                    </ThemedText>
                  </TouchableOpacity>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.filterChip,
                        { 
                          backgroundColor: filterCategory === category ? colors.primary : colors.background,
                          borderColor: colors.border
                        }
                      ]}
                      onPress={() => setFilterCategory(category)}
                    >
                      <ThemedText style={[styles.filterChipText, { color: filterCategory === category ? colors.background : colors.text }]}>
                        {category}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.filterGroup}>
                <ThemedText style={[styles.filterLabel, { color: colors.text }]}>
                  Difficulté
                </ThemedText>
                <View style={styles.difficultyFilters}>
                  {difficulties.map((difficulty) => (
                    <TouchableOpacity
                      key={difficulty}
                      style={[
                        styles.filterChip,
                        { 
                          backgroundColor: filterDifficulty === difficulty ? colors.primary : colors.background,
                          borderColor: colors.border
                        }
                      ]}
                      onPress={() => setFilterDifficulty(filterDifficulty === difficulty ? '' : difficulty)}
                    >
                      <ThemedText style={[styles.filterChipText, { color: filterDifficulty === difficulty ? colors.background : colors.text }]}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ThemedView>

          {/* Liste des questions */}
          <View style={styles.questionsGrid}>
            {filteredQuestions.map((question) => (
              <ThemedView key={question.id} style={[styles.questionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.questionHeader}>
                  <View style={styles.questionTitleContainer}>
                    <ThemedText style={[styles.questionTitle, { color: colors.text }]} numberOfLines={2}>
                      {question.question}
                    </ThemedText>
                    <View style={[styles.questionBadge, { backgroundColor: getDifficultyColor(question.difficulty, colors) }]}>
                      <ThemedText style={[styles.questionBadgeText, { color: colors.background }]}>
                        {question.difficulty}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.questionActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.primary }]}
                      onPress={() => handleEditQuestion(question)}
                    >
                      <MaterialIcons name="edit" size={16} color={colors.background} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.error }]}
                      onPress={() => handleDeleteQuestion(question)}
                    >
                      <MaterialIcons name="delete" size={16} color={colors.background} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.questionMeta}>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="category" size={14} color={colors.secondary} />
                    <ThemedText style={[styles.metaText, { color: colors.secondary }]}>
                      {question.category}
                    </ThemedText>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="star" size={14} color={colors.warning} />
                    <ThemedText style={[styles.metaText, { color: colors.secondary }]}>
                      Niveau {question.level}
                    </ThemedText>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="points" size={14} color={colors.success} />
                    <ThemedText style={[styles.metaText, { color: colors.secondary }]}>
                      {question.points} pts
                    </ThemedText>
                  </View>
                </View>
                
                <ThemedText style={[styles.questionExplanation, { color: colors.secondary }]} numberOfLines={2}>
                  {question.explanation}
                </ThemedText>
              </ThemedView>
            ))}
          </View>

          {filteredQuestions.length === 0 && (
            <ThemedView style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <MaterialIcons name="help" size={48} color={colors.secondary} />
              <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
                Aucune question trouvée
              </ThemedText>
              <ThemedText style={[styles.emptyDescription, { color: colors.secondary }]}>
                {searchTerm || filterCategory || filterDifficulty 
                  ? 'Aucune question ne correspond à vos critères de recherche.' 
                  : 'Commencez par créer votre première question.'}
              </ThemedText>
            </ThemedView>
          )}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    margin: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
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
  filtersGrid: {
    gap: 15,
  },
  filterGroup: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  difficultyFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  questionsGrid: {
    gap: 15,
  },
  questionCard: {
    padding: 16,
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  questionTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  questionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  questionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  questionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
  },
  questionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  questionExplanation: {
    fontSize: 12,
    opacity: 0.7,
  },
  emptyCard: {
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
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
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