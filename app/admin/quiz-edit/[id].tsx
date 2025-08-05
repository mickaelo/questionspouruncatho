import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Quiz } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QuizEditScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const {
    quizzes,
    questions,
    isLoading,
    error,
    clearError,
    refreshQuizzes,
    refreshQuestions,
    updateQuiz,
    updateQuizQuestions
  } = useQuizAdmin();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [editedQuiz, setEditedQuiz] = useState<Partial<Quiz>>({});
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const handleBackNavigation = () => {
    if (hasChanges) {
      Alert.alert(
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

  // Charger le quiz à éditer
  useEffect(() => {
    if (id && quizzes.length > 0) {
      const foundQuiz = quizzes.find(q => q.id === id);
      console.log(foundQuiz)
      if (foundQuiz) {
        setQuiz(foundQuiz);
        setEditedQuiz({
          title: foundQuiz.title,
          description: foundQuiz.description,
          category: foundQuiz.category,
          level: foundQuiz.level,
          passingScore: foundQuiz.passingScore
        });
        
        // Extraire les IDs des questions actuelles
        let questionIds: string[] = [];
        
        // Vérifier d'abord s'il y a un tableau questionIds
        if (foundQuiz.questionIds && Array.isArray(foundQuiz.questionIds)) {
          questionIds = foundQuiz.questionIds;
        } else if (foundQuiz.questions && Array.isArray(foundQuiz.questions)) {
          // Fallback: extraire les IDs du tableau questions
          questionIds = foundQuiz.questions.map(q => {
            if (typeof q === 'string') return q;
            if (typeof q === 'object' && q.id) return q.id;
            return null;
          }).filter(id => id !== null) as string[];
        }
        
        setSelectedQuestions(questionIds);
        console.log('📋 Quiz chargé:', foundQuiz.title, 'avec', questionIds.length, 'questions');
      }
    }
  }, [id, quizzes]);

  // Détecter les changements
  useEffect(() => {
    if (quiz) {
      const hasQuizChanges = 
        editedQuiz.title !== quiz.title ||
        editedQuiz.description !== quiz.description ||
        editedQuiz.category !== quiz.category ||
        editedQuiz.level !== quiz.level ||
        editedQuiz.passingScore !== quiz.passingScore;

      // Obtenir les IDs actuels des questions
      let currentQuestionIds: string[] = [];
      if (quiz.questionIds && Array.isArray(quiz.questionIds)) {
        currentQuestionIds = quiz.questionIds;
      } else if (quiz.questions && Array.isArray(quiz.questions)) {
        currentQuestionIds = quiz.questions.map(q => {
          if (typeof q === 'string') return q;
          if (typeof q === 'object' && q.id) return q.id;
          return null;
        }).filter(id => id !== null) as string[];
      }

      const hasQuestionChanges = 
        selectedQuestions.length !== currentQuestionIds.length ||
        !selectedQuestions.every(id => currentQuestionIds.includes(id)) ||
        !currentQuestionIds.every(id => selectedQuestions.includes(id));

      setHasChanges(hasQuizChanges || hasQuestionChanges);
    }
  }, [quiz, editedQuiz, selectedQuestions]);

  const handleSave = async () => {
    if (!quiz || !hasChanges) return;

    setIsSaving(true);
    try {
      // Mettre à jour les propriétés du quiz si elles ont changé
      const quizUpdates: Partial<Quiz> = {};
      let hasQuizUpdates = false;

      if (editedQuiz.title !== quiz.title) {
        quizUpdates.title = editedQuiz.title;
        hasQuizUpdates = true;
      }
      if (editedQuiz.description !== quiz.description) {
        quizUpdates.description = editedQuiz.description;
        hasQuizUpdates = true;
      }
      if (editedQuiz.category !== quiz.category) {
        quizUpdates.category = editedQuiz.category;
        hasQuizUpdates = true;
      }
      if (editedQuiz.level !== quiz.level) {
        quizUpdates.level = editedQuiz.level;
        hasQuizUpdates = true;
      }
      if (editedQuiz.passingScore !== quiz.passingScore) {
        quizUpdates.passingScore = editedQuiz.passingScore;
        hasQuizUpdates = true;
      }

      // Sauvegarder les changements du quiz
      if (hasQuizUpdates) {
        await updateQuiz(quiz.id, quizUpdates);
      }

      // Sauvegarder les changements des questions
      let currentQuestionIds: string[] = [];
      if (quiz.questionIds && Array.isArray(quiz.questionIds)) {
        currentQuestionIds = quiz.questionIds;
      } else if (quiz.questions && Array.isArray(quiz.questions)) {
        currentQuestionIds = quiz.questions.map(q => {
          if (typeof q === 'string') return q;
          if (typeof q === 'object' && q.id) return q.id;
          return null;
        }).filter(id => id !== null) as string[];
      }

      if (selectedQuestions.length !== currentQuestionIds.length ||
          !selectedQuestions.every(id => currentQuestionIds.includes(id))) {
        await updateQuizQuestions(quiz.id, selectedQuestions);
      }

      setHasChanges(false);
      Alert.alert('Succès', 'Quiz mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le quiz');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleQuestionSelection = (questionId: string) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const selectAllQuestions = () => {
    setSelectedQuestions(filteredQuestions.map(q => q.id));
  };

  const deselectAllQuestions = () => {
    setSelectedQuestions([]);
  };

  const getQuestionById = (questionId: string) => {
    return questions.find(q => q.id === questionId);
  };

  // Filtrer les questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || question.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtenir les catégories uniques
  const categories = [...new Set(questions.map(q => q.category))].sort();

  if (!isAdmin) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContainer}>
          <MaterialIcons name="security" size={48} color={colors.error} />
          <ThemedText style={[styles.errorText, { color: colors.text }]}>
            Accès refusé
          </ThemedText>
          <ThemedText style={[styles.errorDescription, { color: colors.secondary }]}>
            Vous devez être administrateur pour accéder à cette page.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContainer}>
          <MaterialIcons name="sync" size={48} color={colors.primary} />
          <ThemedText style={[styles.loadingText, { color: colors.text }]}>
            Chargement...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (!quiz) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContainer}>
          <MaterialIcons name="error" size={48} color={colors.error} />
          <ThemedText style={[styles.errorText, { color: colors.text }]}>
            Quiz non trouvé
          </ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText style={[styles.backLink, { color: colors.primary }]}>
              Retour
            </ThemedText>
          </TouchableOpacity>
        </View>
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
            Éditer le Quiz
          </ThemedText>
          
          <TouchableOpacity
            style={[
              styles.saveButton,
              { 
                backgroundColor: hasChanges ? colors.primary : colors.border,
                opacity: hasChanges ? 1 : 0.5
              }
            ]}
            onPress={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <View style={styles.loadingContainer}>
                <MaterialIcons name="sync" size={16} color={colors.background} />
                <ThemedText style={[styles.saveButtonText, { color: colors.background }]}>
                  Sauvegarde...
                </ThemedText>
              </View>
            ) : (
              <>
                <MaterialIcons name="save" size={16} color={colors.background} />
                <ThemedText style={[styles.saveButtonText, { color: colors.background }]}>
                  Sauvegarder
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
                  Titre du quiz
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Titre du quiz"
                  placeholderTextColor={colors.text + '80'}
                  value={editedQuiz.title || ''}
                  onChangeText={(text) => setEditedQuiz({ ...editedQuiz, title: text })}
                />
              </View>
              
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Description
                </ThemedText>
                <TextInput
                  style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Description du quiz"
                  placeholderTextColor={colors.text + '80'}
                  value={editedQuiz.description || ''}
                  onChangeText={(text) => setEditedQuiz({ ...editedQuiz, description: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Catégorie
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Catégorie"
                    placeholderTextColor={colors.text + '80'}
                    value={editedQuiz.category || ''}
                    onChangeText={(text) => setEditedQuiz({ ...editedQuiz, category: text })}
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
                    value={editedQuiz.level?.toString() || ''}
                    onChangeText={(text) => setEditedQuiz({ ...editedQuiz, level: parseInt(text) || 1 })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Score de passage (%)
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Score de passage (%)"
                  placeholderTextColor={colors.text + '80'}
                  value={editedQuiz.passingScore?.toString() || ''}
                  onChangeText={(text) => setEditedQuiz({ ...editedQuiz, passingScore: parseInt(text) || 70 })}
                  keyboardType="numeric"
                />
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

          {/* Gestion des questions */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="quiz" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Questions Assignées
              </ThemedText>
              <View style={styles.questionCountBadge}>
                <ThemedText style={[styles.questionCountText, { color: colors.background }]}>
                  {selectedQuestions.length} / {questions.length}
                </ThemedText>
              </View>
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
                        <View style={styles.metaBadge}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            {question.category}
                          </ThemedText>
                        </View>
                        <View style={styles.metaBadge}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            {question.difficulty}
                          </ThemedText>
                        </View>
                        <View style={styles.metaBadge}>
                          <ThemedText style={[styles.metaBadgeText, { color: colors.background }]}>
                            Niveau {question.level}
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
                {editedQuiz.title || 'Titre du quiz'}
              </ThemedText>
              <ThemedText style={[styles.previewDescription, { color: colors.text }]}>
                {editedQuiz.description || 'Description du quiz'}
              </ThemedText>
              <View style={styles.previewMeta}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="category" size={16} color={colors.secondary} />
                  <ThemedText style={[styles.metaText, { color: colors.text }]}>
                    {editedQuiz.category || 'Catégorie'}
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="star" size={16} color={colors.warning} />
                  <ThemedText style={[styles.metaText, { color: colors.text }]}>
                    Niveau {editedQuiz.level || 1}
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
                    {editedQuiz.passingScore || 70}% pour réussir
                  </ThemedText>
                </View>
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  },
  metaBadge: {
    backgroundColor: '#e0e0e0',
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  backLink: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    textDecorationLine: 'underline',
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