import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Quiz } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
      // Essayer d'abord router.back()
      router.back();
    } catch (error) {
      console.error('❌ Erreur avec router.back():', error);
      try {
        // Fallback: navigation explicite
        router.push('/admin');
      } catch (fallbackError) {
        console.error('❌ Erreur avec fallback navigation:', fallbackError);
        // Dernier recours: navigation vers l'accueil
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
              onPress={handleBackNavigation}
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

  const handleDeleteQuiz = (quiz: Quiz) => {
    Alert.alert(
      'Supprimer le quiz',
      `Êtes-vous sûr de vouloir supprimer "${quiz.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: async () => {
            showLoading({ duration: 1000 });
            try {
              await deleteQuiz(quiz.id);
              Alert.alert('Succès', 'Quiz supprimé avec succès');
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer le quiz');
            } finally {
              hideLoading();
            }
          }
        }
      ]
    );
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
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    showLoading({ duration: 1500 });

    try {
      await createQuiz(newQuiz);
      setNewQuiz({ title: '', description: '', category: '', level: 1, questions: [], passingScore: 70 });
      setShowAddForm(false);
      Alert.alert('Succès', 'Quiz créé avec succès');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer le quiz');
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
      
      Alert.alert(
        'Succès', 
        `${selectedQuestions.length} question(s) assignée(s) avec succès au quiz !`
      );
    } catch (error) {
      console.error('❌ Erreur lors de l\'assignation des questions:', error);
      Alert.alert(
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
            onPress={handleBackNavigation}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
            Gestion des Quiz
          </ThemedText>
          
          <TouchableOpacity
            style={styles.syncButton}
            onPress={() => {
              showLoading({ duration: 2000 });
              Promise.all([refreshQuizzes(), refreshQuestions()]).finally(() => {
                hideLoading();
              });
            }}
            disabled={isLoading}
          >
            <MaterialIcons 
              name="sync" 
              size={20} 
              color={isLoading ? colors.border : colors.primary} 
            />
          </TouchableOpacity>
        </ThemedView>

        {/* Barre de recherche */}
        <ThemedView style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <MaterialIcons name="search" size={20} color={colors.text} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text, borderColor: colors.border }]}
            placeholder="Rechercher un quiz..."
            placeholderTextColor={colors.text + '80'}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </ThemedView>

        {/* Bouton Ajouter */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <MaterialIcons name={showAddForm ? 'close' : 'add'} size={20} color={colors.background} />
          <ThemedText style={[styles.addButtonText, { color: colors.background }]}>
            {showAddForm ? 'Annuler' : 'Ajouter un quiz'}
          </ThemedText>
        </TouchableOpacity>

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <ThemedView style={[styles.addForm, { backgroundColor: colors.card }]}>
            <ThemedText type="subtitle" style={[styles.formTitle, { color: colors.text }]}>
              Nouveau Quiz
            </ThemedText>
            
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Titre du quiz"
              placeholderTextColor={colors.text + '80'}
              value={newQuiz.title}
              onChangeText={(text) => setNewQuiz({ ...newQuiz, title: text })}
            />
            
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Description"
              placeholderTextColor={colors.text + '80'}
              value={newQuiz.description}
              onChangeText={(text) => setNewQuiz({ ...newQuiz, description: text })}
              multiline
            />
            
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Catégorie"
              placeholderTextColor={colors.text + '80'}
              value={newQuiz.category}
              onChangeText={(text) => setNewQuiz({ ...newQuiz, category: text })}
            />
            
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder="Niveau (1-10)"
              placeholderTextColor={colors.text + '80'}
              value={newQuiz.level.toString()}
              onChangeText={(text) => setNewQuiz({ ...newQuiz, level: parseInt(text) || 1 })}
              keyboardType="numeric"
            />
            
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.secondary }]}
              onPress={handleAddQuiz}
            >
              <ThemedText style={[styles.saveButtonText, { color: colors.background }]}>
                Créer le quiz
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        {/* Sélecteur de questions */}
        {showQuestionSelector && (
          <ThemedView style={[styles.questionSelector, { backgroundColor: colors.card }]}>
            <View style={styles.selectorHeader}>
              <ThemedText type="subtitle" style={[styles.selectorTitle, { color: colors.text }]}>
                Assigner des questions
              </ThemedText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowQuestionSelector(null);
                  setSelectedQuestions([]);
                }}
              >
                <MaterialIcons name="close" size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
            
            <ThemedText style={[styles.selectorSubtitle, { color: colors.text }]}>
              {selectedQuestions.length} questions sélectionnées
            </ThemedText>
            
            <ScrollView style={styles.questionsList} showsVerticalScrollIndicator={false}>
              {questions.map((question) => (
                <TouchableOpacity
                  key={question.id}
                  style={[
                    styles.questionItem,
                    { 
                      backgroundColor: selectedQuestions.includes(question.id) 
                        ? colors.primary + '20' 
                        : colors.background,
                      borderColor: colors.border
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
                      <ThemedText style={[styles.questionMetaText, { color: colors.secondary }]}>
                        {question.category} • {question.difficulty} • Niveau {question.level}
                      </ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.selectorActions}>
              <TouchableOpacity
                style={[
                  styles.selectorButton, 
                  { 
                    backgroundColor: colors.secondary
                  }
                ]}
                onPress={handleSaveQuestions}
              >
                <ThemedText style={[styles.selectorButtonText, { color: colors.background }]}>
                  Assigner ({selectedQuestions.length})
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        )}

        {/* Liste des quiz */}
        <View style={styles.quizList}>
          {filteredQuizzes.map((quiz) => (
            <ThemedView key={quiz.id} style={[styles.quizCard, { backgroundColor: colors.card }]}>
              <View style={styles.quizInfo}>
                <View style={styles.quizHeader}>
                  <ThemedText type="subtitle" style={[styles.quizTitle, { color: colors.text }]}>
                    {quiz.title}
                  </ThemedText>
                  <View style={styles.quizActions}>
                    <TouchableOpacity
                      style={styles.actionIcon}
                      onPress={() => handleManageQuestions(quiz)}
                    >
                      <MaterialIcons name="assignment" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionIcon}
                      onPress={() => handleEditQuiz(quiz)}
                    >
                      <MaterialIcons name="edit" size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionIcon}
                      onPress={() => handleDeleteQuiz(quiz)}
                    >
                      <MaterialIcons name="delete" size={20} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <ThemedText style={[styles.quizDescription, { color: colors.text }]}>
                  {quiz.description}
                </ThemedText>
                
                <View style={styles.quizMeta}>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="category" size={16} color={colors.secondary} />
                    <ThemedText style={[styles.metaText, { color: colors.text }]}>
                      {quiz.category}
                    </ThemedText>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="star" size={16} color={colors.warning} />
                    <ThemedText style={[styles.metaText, { color: colors.text }]}>
                      Niveau {quiz.level}
                    </ThemedText>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="help" size={16} color={colors.primary} />
                    <ThemedText style={[styles.metaText, { color: colors.text }]}>
                      {quiz.questions?.length || 0} questions
                    </ThemedText>
                  </View>
                </View>
              </View>
            </ThemedView>
          ))}
        </View>

        {filteredQuizzes.length === 0 && (
          <ThemedView style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <MaterialIcons name="quiz" size={48} color={colors.text + '40'} />
            <ThemedText style={[styles.emptyText, { color: colors.text }]}>
              {searchTerm ? 'Aucun quiz trouvé' : 'Aucun quiz disponible'}
            </ThemedText>
          </ThemedView>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
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
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addForm: {
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
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quizList: {
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
  quizInfo: {
    flex: 1,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  quizActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionIcon: {
    padding: 5,
  },
  quizDescription: {
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.8,
  },
  quizMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.7,
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
    opacity: 0.6,
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
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  questionSelector: {
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
  selectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  selectorSubtitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  questionsList: {
    maxHeight: 200, // Limite la hauteur de la liste des questions
    marginBottom: 15,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  questionCheckbox: {
    width: 30,
    alignItems: 'center',
  },
  questionContent: {
    flex: 1,
    marginLeft: 10,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  questionMeta: {
    marginTop: 5,
  },
  questionMetaText: {
    fontSize: 12,
  },
  selectorActions: {
    alignItems: 'center',
  },
  selectorButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectorButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  syncButton: {
    padding: 5,
  },
}); 