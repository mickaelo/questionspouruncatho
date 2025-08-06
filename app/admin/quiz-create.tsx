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

export default function QuizCreateScreen() {
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
    createQuiz
  } = useQuizAdmin();

  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    category: '',
    level: 1,
    passingScore: 70,
    timeLimit: undefined as number | undefined
  });

  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const handleBackNavigation = () => {
    if (newQuiz.title || newQuiz.description || selectedQuestions.length > 0) {
      showAlert(
        'Changements non sauvegardés',
        'Voulez-vous vraiment quitter sans sauvegarder ?',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Quitter', onPress: () => router.back() }
        ]
      );
    } else {
      router.back();
    }
  };

  // Gérer l'affichage du loading bar global
  useEffect(() => {
    if (isLoading) {
      showLoading({ duration: 1500 });
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  const handleCreateQuiz = async () => {
    if (!newQuiz.title || !newQuiz.description || !newQuiz.category) {
      showAlert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (selectedQuestions.length === 0) {
      showAlert('Erreur', 'Veuillez sélectionner au moins une question');
      return;
    }

    setIsCreating(true);
    showLoading({ duration: 2000 });

    try {
      const quizData: Omit<Quiz, 'id'> = {
        title: newQuiz.title,
        description: newQuiz.description,
        category: newQuiz.category,
        level: newQuiz.level,
        questions: [], // Sera rempli par le service
        questionIds: selectedQuestions,
        passingScore: newQuiz.passingScore,
        timeLimit: newQuiz.timeLimit
      };

      await createQuiz(quizData);
      
      showAlert(
        'Succès', 
        `Quiz "${newQuiz.title}" créé avec succès avec ${selectedQuestions.length} question(s) !`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/admin/quiz-management')
          }
        ]
      );
    } catch (error) {
      console.error('❌ Erreur lors de la création du quiz:', error);
      showAlert(
        'Erreur', 
        'Impossible de créer le quiz. Vérifiez votre connexion Firebase.'
      );
    } finally {
      setIsCreating(false);
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

  const selectAllQuestions = () => {
    setSelectedQuestions(filteredQuestions.map(q => q.id));
  };

  const deselectAllQuestions = () => {
    setSelectedQuestions([]);
  };

  // Filtrer les questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || question.category === filterCategory;
    const matchesDifficulty = !filterDifficulty || question.difficulty === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
            Créer un Quiz
          </ThemedText>
          
          <TouchableOpacity
            style={[
              styles.createButton,
              { 
                backgroundColor: (newQuiz.title && newQuiz.description && newQuiz.category && selectedQuestions.length > 0) 
                  ? colors.primary 
                  : colors.border,
                opacity: (newQuiz.title && newQuiz.description && newQuiz.category && selectedQuestions.length > 0) ? 1 : 0.5
              }
            ]}
            onPress={handleCreateQuiz}
            disabled={!newQuiz.title || !newQuiz.description || !newQuiz.category || selectedQuestions.length === 0 || isCreating}
          >
            {isCreating ? (
              <View style={styles.loadingContainer}>
                <MaterialIcons name="sync" size={16} color={colors.background} />
                <ThemedText style={[styles.createButtonText, { color: colors.background }]}>
                  Création...
                </ThemedText>
              </View>
            ) : (
              <>
                <MaterialIcons name="add" size={16} color={colors.background} />
                <ThemedText style={[styles.createButtonText, { color: colors.background }]}>
                  Créer
                </ThemedText>
              </>
            )}
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
          {/* Informations du quiz */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="edit" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Informations du Quiz
              </ThemedText>
            </View>
            
            <View style={styles.formGrid}>
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Titre du quiz *
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Titre du quiz"
                  placeholderTextColor={colors.text + '80'}
                  value={newQuiz.title}
                  onChangeText={(text) => setNewQuiz({ ...newQuiz, title: text })}
                />
              </View>
              
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Description *
                </ThemedText>
                <TextInput
                  style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Description du quiz"
                  placeholderTextColor={colors.text + '80'}
                  value={newQuiz.description}
                  onChangeText={(text) => setNewQuiz({ ...newQuiz, description: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Catégorie *
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Catégorie"
                    placeholderTextColor={colors.text + '80'}
                    value={newQuiz.category}
                    onChangeText={(text) => setNewQuiz({ ...newQuiz, category: text })}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Niveau
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Niveau (1-10)"
                    placeholderTextColor={colors.text + '80'}
                    value={newQuiz.level.toString()}
                    onChangeText={(text) => setNewQuiz({ ...newQuiz, level: parseInt(text) || 1 })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              
              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Score de passage (%)
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Score de passage (%)"
                    placeholderTextColor={colors.text + '80'}
                    value={newQuiz.passingScore.toString()}
                    onChangeText={(text) => setNewQuiz({ ...newQuiz, passingScore: parseInt(text) || 70 })}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Limite de temps (min)
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Optionnel"
                    placeholderTextColor={colors.text + '80'}
                    value={newQuiz.timeLimit?.toString() || ''}
                    onChangeText={(text) => setNewQuiz({ ...newQuiz, timeLimit: text ? parseInt(text) : undefined })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </ThemedView>

          {/* Filtres pour les questions */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="search" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Questions Disponibles
              </ThemedText>
              <View style={styles.questionCountBadge}>
                <ThemedText style={[styles.questionCountText, { color: colors.background }]}>
                  {selectedQuestions.length} / {questions.length}
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.searchSection}>
              <TextInput
                style={[styles.searchInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                placeholder="Rechercher des questions..."
                placeholderTextColor={colors.text + '80'}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              
              <View style={styles.filterRow}>
                <TextInput
                  style={[styles.filterInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Filtrer par catégorie"
                  placeholderTextColor={colors.text + '80'}
                  value={filterCategory}
                  onChangeText={setFilterCategory}
                />
                <TouchableOpacity
                  style={[styles.clearFilterButton, { backgroundColor: colors.secondary }]}
                  onPress={() => setFilterCategory('')}
                >
                  <MaterialIcons name="clear" size={16} color={colors.background} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.filterRow}>
                <TextInput
                  style={[styles.filterInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Filtrer par difficulté"
                  placeholderTextColor={colors.text + '80'}
                  value={filterDifficulty}
                  onChangeText={setFilterDifficulty}
                />
                <TouchableOpacity
                  style={[styles.clearFilterButton, { backgroundColor: colors.secondary }]}
                  onPress={() => setFilterDifficulty('')}
                >
                  <MaterialIcons name="clear" size={16} color={colors.background} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                  onPress={selectAllQuestions}
                >
                  <MaterialIcons name="select-all" size={16} color={colors.background} />
                  <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
                    Tout sélectionner
                  </ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.error }]}
                  onPress={deselectAllQuestions}
                >
                  <MaterialIcons name="clear-all" size={16} color={colors.background} />
                  <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
                    Tout désélectionner
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>

          {/* Liste des questions */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="quiz" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Questions Sélectionnées
              </ThemedText>
            </View>
            
            <ScrollView style={styles.questionsList} showsVerticalScrollIndicator={false}>
              {filteredQuestions.length === 0 ? (
                <View style={styles.emptyState}>
                  <MaterialIcons name="search-off" size={48} color={colors.secondary} />
                  <ThemedText style={[styles.emptyStateText, { color: colors.secondary }]}>
                    Aucune question trouvée
                  </ThemedText>
                </View>
              ) : (
                filteredQuestions.map((question) => (
                  <TouchableOpacity
                    key={question.id}
                    style={[
                      styles.questionItem,
                      { 
                        backgroundColor: selectedQuestions.includes(question.id) 
                          ? colors.primary + '20' 
                          : colors.background,
                        borderColor: selectedQuestions.includes(question.id) ? colors.primary : colors.border
                      }
                    ]}
                    onPress={() => toggleQuestionSelection(question.id)}
                  >
                    <View style={styles.questionCheckbox}>
                      <MaterialIcons
                        name={selectedQuestions.includes(question.id) ? 'check-box' : 'check-box-outline-blank'}
                        size={20}
                        color={selectedQuestions.includes(question.id) ? colors.primary : colors.text}
                      />
                    </View>
                    <View style={styles.questionContent}>
                      <ThemedText style={[styles.questionText, { color: colors.text }]}>
                        {question.question}
                      </ThemedText>
                      <View style={styles.questionMeta}>
                        <View style={[styles.metaBadge, { backgroundColor: colors.primary }]}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            {question.category}
                          </ThemedText>
                        </View>
                        <View style={[styles.metaBadge, { backgroundColor: colors.warning }]}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            {question.difficulty}
                          </ThemedText>
                        </View>
                        <View style={[styles.metaBadge, { backgroundColor: colors.success }]}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            Niveau {question.level}
                          </ThemedText>
                        </View>
                        <View style={[styles.metaBadge, { backgroundColor: colors.secondary }]}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            {question.points} pts
                          </ThemedText>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </ThemedView>

          {/* Aperçu du quiz */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="preview" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Aperçu du Quiz
              </ThemedText>
            </View>
            
            <View style={[styles.preview, { borderColor: colors.border }]}>
              <ThemedText style={[styles.previewTitle, { color: colors.primary }]}>
                {newQuiz.title || 'Titre du quiz'}
              </ThemedText>
              <ThemedText style={[styles.previewDescription, { color: colors.text }]}>
                {newQuiz.description || 'Description du quiz'}
              </ThemedText>
              <View style={styles.previewMeta}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="category" size={16} color={colors.secondary} />
                  <ThemedText style={[styles.metaText, { color: colors.text }]}>
                    {newQuiz.category || 'Catégorie'}
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="star" size={16} color={colors.warning} />
                  <ThemedText style={[styles.metaText, { color: colors.text }]}>
                    Niveau {newQuiz.level}
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="help" size={16} color={colors.primary} />
                  <ThemedText style={[styles.metaText, { color: colors.text }]}>
                    {selectedQuestions.length} questions
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="check-circle" size={16} color={colors.success} />
                  <ThemedText style={[styles.metaText, { color: colors.text }]}>
                    {newQuiz.passingScore}% pour réussir
                  </ThemedText>
                </View>
                {newQuiz.timeLimit && (
                  <View style={styles.metaItem}>
                    <MaterialIcons name="schedule" size={16} color={colors.warning} />
                    <ThemedText style={[styles.metaText, { color: colors.text }]}>
                      {newQuiz.timeLimit} min
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  card: {
    borderRadius: 12,
    padding: 20,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  formGrid: {
    gap: 16,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    paddingTop: 10,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  questionCountBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  questionCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchSection: {
    gap: 12,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  clearFilterButton: {
    padding: 8,
    borderRadius: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  questionsList: {
    maxHeight: 400,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  questionCheckbox: {
    marginRight: 12,
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  metaBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  preview: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  previewMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
}); 