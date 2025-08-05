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

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const handleBackNavigation = () => {
    console.log('🔙 Navigation de retour demandée');
    try {
      // Essayer d'abord router.back()
      router.back();
    } catch (error) {
      console.error('❌ Erreur avec router.back():', error);
      try {
        // Fallback: navigation explicite
        router.push('/admin/quiz-management');
      } catch (fallbackError) {
        console.error('❌ Erreur avec fallback navigation:', fallbackError);
        // Dernier recours: navigation vers admin
        router.push('/admin');
      }
    }
  };

  // Charger le quiz à éditer
  useEffect(() => {
    if (id && quizzes.length > 0) {
      const foundQuiz = quizzes.find(q => q.id === id);
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
        const questionIds = foundQuiz.questions.map(q => {
          if (typeof q === 'string') return q;
          if (typeof q === 'object' && q.id) return q.id;
          return null;
        }).filter(id => id !== null) as string[];
        
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

      const currentQuestionIds = quiz.questions.map(q => {
        if (typeof q === 'string') return q;
        if (typeof q === 'object' && q.id) return q.id;
        return null;
      }).filter(id => id !== null) as string[];

      const hasQuestionChanges = 
        selectedQuestions.length !== currentQuestionIds.length ||
        !selectedQuestions.every(id => currentQuestionIds.includes(id));

      setHasChanges(hasQuizChanges || hasQuestionChanges);
    }
  }, [editedQuiz, selectedQuestions, quiz]);

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

  if (isLoading || !quiz) {
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
          <ThemedView style={[styles.loadingCard, { backgroundColor: colors.card }]}>
            <MaterialIcons name="error" size={48} color={colors.error} />
            <ThemedText type="title" style={[styles.loadingTitle, { color: colors.error }]}>
              Quiz non trouvé
            </ThemedText>
            <ThemedText style={[styles.loadingText, { color: colors.text }]}>
              Le quiz demandé n'existe pas ou a été supprimé.
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }

  const handleSave = async () => {
    if (!quiz || !hasChanges) return;

    setIsSaving(true);
    
    try {
      console.log('🔄 Sauvegarde du quiz en cours...', {
        quizId: quiz.id,
        changes: editedQuiz,
        questionCount: selectedQuestions.length
      });

      // Mettre à jour les propriétés du quiz
      if (editedQuiz.title || editedQuiz.description || editedQuiz.category || editedQuiz.level !== undefined || editedQuiz.passingScore !== undefined) {
        await updateQuiz(quiz.id, editedQuiz);
        console.log('✅ Propriétés du quiz mises à jour');
      }

      // Mettre à jour les questions assignées
      const currentQuestionIds = quiz.questions.map(q => {
        if (typeof q === 'string') return q;
        if (typeof q === 'object' && q.id) return q.id;
        return null;
      }).filter(id => id !== null) as string[];

      if (selectedQuestions.length !== currentQuestionIds.length || 
          !selectedQuestions.every(id => currentQuestionIds.includes(id))) {
        await updateQuizQuestions(quiz.id, selectedQuestions);
        console.log('✅ Questions assignées mises à jour');
      }

      // Rafraîchir les données
      await refreshQuizzes();
      
      console.log('✅ Quiz mis à jour avec succès dans Firebase');
      
      Alert.alert(
        'Succès', 
        'Quiz mis à jour avec succès !',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      Alert.alert(
        'Erreur', 
        'Impossible de sauvegarder le quiz. Vérifiez votre connexion Firebase.'
      );
    } finally {
      setIsSaving(false);
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
              <ThemedText style={[styles.saveButtonText, { color: colors.background }]}>
                Sauvegarder
              </ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>

        {/* Informations du quiz */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Informations du Quiz
          </ThemedText>
          
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Titre du quiz"
            placeholderTextColor={colors.text + '80'}
            value={editedQuiz.title || ''}
            onChangeText={(text) => setEditedQuiz({ ...editedQuiz, title: text })}
          />
          
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Description"
            placeholderTextColor={colors.text + '80'}
            value={editedQuiz.description || ''}
            onChangeText={(text) => setEditedQuiz({ ...editedQuiz, description: text })}
            multiline
            numberOfLines={3}
          />
          
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Catégorie"
            placeholderTextColor={colors.text + '80'}
            value={editedQuiz.category || ''}
            onChangeText={(text) => setEditedQuiz({ ...editedQuiz, category: text })}
          />
          
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                placeholder="Niveau (1-10)"
                placeholderTextColor={colors.text + '80'}
                value={editedQuiz.level?.toString() || ''}
                onChangeText={(text) => setEditedQuiz({ ...editedQuiz, level: parseInt(text) || 1 })}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                placeholder="Score de passage (%)"
                placeholderTextColor={colors.text + '80'}
                value={editedQuiz.passingScore?.toString() || ''}
                onChangeText={(text) => setEditedQuiz({ ...editedQuiz, passingScore: parseInt(text) || 70 })}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ThemedView>

        {/* Gestion des questions */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
              Questions Assignées
            </ThemedText>
            <ThemedText style={[styles.questionCount, { color: colors.secondary }]}>
              {selectedQuestions.length} sélectionnée(s)
            </ThemedText>
          </View>
          
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
        </ThemedView>

        {/* Aperçu du quiz */}
        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Aperçu du Quiz
          </ThemedText>
          
          <View style={styles.preview}>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  questionsList: {
    maxHeight: 300,
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
  preview: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.8,
  },
  previewMeta: {
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
  loadingCard: {
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
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
}); 