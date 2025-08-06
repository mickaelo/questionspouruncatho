import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Quiz } from '@/types/quiz';
import { showAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QuizManagementScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoadingBarContext();
  const {
    quizzes,
    questions,
    isLoading,
    error,
    clearError,
    refreshQuizzes,
    refreshQuestions,
    deleteQuiz,
    updateQuiz,
    createQuiz,
    updateQuizQuestions
  } = useQuizAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showQuestionSelector, setShowQuestionSelector] = useState<string | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isAssigningQuestions, setIsAssigningQuestions] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    category: '',
    level: 1,
    questions: [] as any[],
    passingScore: 70
  });

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
    console.log('🔙 Navigation de retour demandée (quiz management)');
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

  // Filtrer les quiz selon le terme de recherche
  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDeleteQuiz = async (quiz: Quiz) => {

    showLoading({ duration: 1000 });
    try {
      await deleteQuiz(quiz.id);
      showAlert('Succès', 'Quiz supprimé avec succès');
    } catch (error) {
      showAlert('Erreur', 'Impossible de supprimer le quiz');
    } finally {
      hideLoading();
    }
  };

  const handleEditQuiz = (quiz: Quiz) => {
    console.log('📝 Navigation vers la page d\'édition du quiz:', quiz.title);
    router.push({
      pathname: '/admin/quiz-edit/[id]',
      params: { id: quiz.id }
    });
  };

  const handleAddQuiz = async () => {
    if (!newQuiz.title || !newQuiz.description || !newQuiz.category) {
      showAlert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    showLoading({ duration: 1500 });

    try {
      await createQuiz(newQuiz);
      setNewQuiz({ title: '', description: '', category: '', level: 1, questions: [], passingScore: 70 });
      setShowAddForm(false);
      showAlert('Succès', 'Quiz créé avec succès');
    } catch (error) {
      showAlert('Erreur', 'Impossible de créer le quiz');
    } finally {
      hideLoading();
    }
  };

  const handleManageQuestions = (quiz: Quiz) => {
    console.log('📝 Ouverture du sélecteur de questions pour:', quiz.title);

    // Extraire les IDs des questions actuelles du quiz
    const questionIds = quiz.questions.map(q => {
      if (typeof q === 'string') return q;
      if (typeof q === 'object' && q.id) return q.id;
      return null;
    }).filter(id => id !== null) as string[];

    console.log('📋 Questions actuelles du quiz:', questionIds);

    setSelectedQuestions(questionIds);
    setShowQuestionSelector(quiz.id);
  };

  const handleSaveQuestions = async () => {
    if (!showQuestionSelector) return;

    setIsAssigningQuestions(true);
    showLoading({ duration: 2000 });

    try {
      console.log('🔄 Assignation des questions en cours...', {
        quizId: showQuestionSelector,
        questionIds: selectedQuestions,
        count: selectedQuestions.length
      });

      await updateQuizQuestions(showQuestionSelector, selectedQuestions);

      console.log('✅ Questions assignées avec succès à Firebase');

      // Rafraîchir les données pour voir les changements immédiatement
      await refreshQuizzes();

      setShowQuestionSelector(null);
      setSelectedQuestions([]);

      showAlert(
        'Succès',
        `${selectedQuestions.length} question(s) assignée(s) avec succès au quiz !`
      );
    } catch (error) {
      console.error('❌ Erreur lors de l\'assignation des questions:', error);
      showAlert(
        'Erreur',
        'Impossible d\'assigner les questions. Vérifiez votre connexion Firebase.'
      );
    } finally {
      setIsAssigningQuestions(false);
      hideLoading();
    }
  };

  const toggleQuestionSelection = (questionId: string) => {
    setSelectedQuestions(prev => {
      const newSelection = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];

      console.log('🔄 Sélection mise à jour:', {
        questionId,
        action: prev.includes(questionId) ? 'désélectionnée' : 'sélectionnée',
        totalSelected: newSelection.length
      });

      return newSelection;
    });
  };

  const getQuestionById = (questionId: string) => {
    return questions.find(q => q.id === questionId);
  };

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
            Gestion des Quiz
          </ThemedText>

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/admin/quiz-create')}
          >
            <MaterialIcons name="add" size={20} color={colors.background} />
            <ThemedText style={[styles.addButtonText, { color: colors.background }]}>
              Nouveau Quiz
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

          {/* Barre de recherche */}
          <ThemedView style={[styles.searchCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color={colors.secondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.text, backgroundColor: colors.background }]}
                placeholder="Rechercher des quiz..."
                placeholderTextColor={colors.text + '80'}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
          </ThemedView>

          {/* Liste des quiz */}
          <View style={styles.quizGrid}>
            {filteredQuizzes.map((quiz) => (
              <ThemedView key={quiz.id} style={[styles.quizCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.quizHeader}>
                  <View style={styles.quizTitleContainer}>
                    <ThemedText style={[styles.quizTitle, { color: colors.text }]}>
                      {quiz.title}
                    </ThemedText>
                    <View style={[styles.quizBadge, { backgroundColor: colors.primary }]}>
                      <ThemedText style={[styles.quizBadgeText, { color: colors.background }]}>
                        Niveau {quiz.level}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.quizActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.primary }]}
                      onPress={() => router.push(`/admin/quiz-edit/${quiz.id}` as any)}
                    >
                      <MaterialIcons name="edit" size={16} color={colors.background} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.error }]}
                      onPress={async () => await handleDeleteQuiz(quiz)}
                    >
                      <MaterialIcons name="delete" size={16} color={colors.background} />
                    </TouchableOpacity>
                  </View>
                </View>

                <ThemedText style={[styles.quizDescription, { color: colors.secondary }]}>
                  {quiz.description}
                </ThemedText>

                <View style={styles.quizMeta}>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="category" size={14} color={colors.secondary} />
                    <ThemedText style={[styles.metaText, { color: colors.secondary }]}>
                      {quiz.category}
                    </ThemedText>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="help" size={14} color={colors.primary} />
                    <ThemedText style={[styles.metaText, { color: colors.secondary }]}>
                      {quiz.questions?.length || 0} questions
                    </ThemedText>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="check-circle" size={14} color={colors.success} />
                    <ThemedText style={[styles.metaText, { color: colors.secondary }]}>
                      {quiz.passingScore}% pour réussir
                    </ThemedText>
                  </View>
                </View>
              </ThemedView>
            ))}
          </View>

          {filteredQuizzes.length === 0 && (
            <ThemedView style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <MaterialIcons name="quiz" size={48} color={colors.secondary} />
              <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
                Aucun quiz trouvé
              </ThemedText>
              <ThemedText style={[styles.emptyDescription, { color: colors.secondary }]}>
                {searchTerm ? 'Aucun quiz ne correspond à votre recherche.' : 'Commencez par créer votre premier quiz.'}
              </ThemedText>
            </ThemedView>
          )}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  searchCard: {
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  quizGrid: {
    gap: 15,
  },
  quizCard: {
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
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  quizTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quizBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  quizBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quizActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
  quizDescription: {
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.7,
  },
  quizMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  emptyCard: {
    padding: 40,
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
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
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
  actionCard: {
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
    alignItems: 'center',
    marginVertical: 10,
  },
  actionIcon: {
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
}); 