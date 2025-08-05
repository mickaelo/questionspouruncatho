import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Question } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function QuestionEditScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const {
    questions,
    isLoading,
    error,
    clearError,
    refreshQuestions,
    createQuestion,
    updateQuestion
  } = useQuizAdmin();

  const [question, setQuestion] = useState<Question | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<Partial<Question>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [newOption, setNewOption] = useState('');

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const isNewQuestion = id === 'new';

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

  // Charger la question à éditer
  useEffect(() => {
    if (!isNewQuestion && id && questions.length > 0) {
      const foundQuestion = questions.find(q => q.id === id);
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setEditedQuestion({
          question: foundQuestion.question,
          category: foundQuestion.category,
          difficulty: foundQuestion.difficulty,
          level: foundQuestion.level,
          points: foundQuestion.points,
          explanation: foundQuestion.explanation,
          options: [...foundQuestion.options],
          correctAnswer: foundQuestion.correctAnswer,
          questionType: foundQuestion.questionType,
          author: foundQuestion.author,
          reference: foundQuestion.reference
        });
      }
    } else if (isNewQuestion) {
      // Initialiser une nouvelle question
      setEditedQuestion({
        question: '',
        category: '',
        difficulty: 'moyen',
        level: 1,
        points: 10,
        explanation: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        questionType: 'multiple-choice',
        author: '',
        reference: ''
      });
    }
  }, [id, questions, isNewQuestion]);

  // Détecter les changements
  useEffect(() => {
    if (question && !isNewQuestion) {
      const hasQuestionChanges = 
        editedQuestion.question !== question.question ||
        editedQuestion.category !== question.category ||
        editedQuestion.difficulty !== question.difficulty ||
        editedQuestion.level !== question.level ||
        editedQuestion.points !== question.points ||
        editedQuestion.explanation !== question.explanation ||
        editedQuestion.correctAnswer !== question.correctAnswer ||
        editedQuestion.author !== question.author ||
        editedQuestion.reference !== question.reference ||
        JSON.stringify(editedQuestion.options) !== JSON.stringify(question.options);

      setHasChanges(hasQuestionChanges);
    } else if (isNewQuestion) {
      const hasNewQuestionChanges = 
        editedQuestion.question !== '' ||
        editedQuestion.category !== '' ||
        editedQuestion.explanation !== '' ||
        editedQuestion.author !== '' ||
        editedQuestion.reference !== '';

      setHasChanges(hasNewQuestionChanges);
    }
  }, [question, editedQuestion, isNewQuestion]);

  const handleSave = async () => {
    if (!editedQuestion.question || !editedQuestion.category) {
      Alert.alert('Erreur', 'Veuillez remplir au moins la question et la catégorie');
      return;
    }

    if (!editedQuestion.options || editedQuestion.options.length < 2) {
      Alert.alert('Erreur', 'Veuillez ajouter au moins 2 options');
      return;
    }

    if (editedQuestion.options.some(option => !option.trim())) {
      Alert.alert('Erreur', 'Veuillez remplir toutes les options');
      return;
    }

    setIsSaving(true);
    try {
      if (isNewQuestion) {
        await createQuestion(editedQuestion as Omit<Question, 'id'>);
        Alert.alert('Succès', 'Question créée avec succès');
      } else if (question) {
        await updateQuestion(question.id, editedQuestion);
        Alert.alert('Succès', 'Question mise à jour avec succès');
      }
      router.back();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder la question');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setEditedQuestion(prev => ({
        ...prev,
        options: [...(prev.options || []), newOption.trim()]
      }));
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    if (editedQuestion.options && editedQuestion.options.length > 2) {
      const newOptions = [...editedQuestion.options];
      newOptions.splice(index, 1);
      
      // Ajuster la réponse correcte si nécessaire
      let newCorrectAnswer = editedQuestion.correctAnswer || 0;
      if (index === newCorrectAnswer) {
        newCorrectAnswer = 0;
      } else if (index < newCorrectAnswer) {
        newCorrectAnswer--;
      }
      
      setEditedQuestion(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: newCorrectAnswer
      }));
    } else {
      Alert.alert('Erreur', 'Une question doit avoir au moins 2 options');
    }
  };

  const handleUpdateOption = (index: number, value: string) => {
    if (editedQuestion.options) {
      const newOptions = [...editedQuestion.options];
      newOptions[index] = value;
      setEditedQuestion(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

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

  if (!isNewQuestion && !question) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContainer}>
          <MaterialIcons name="error" size={48} color={colors.error} />
          <ThemedText style={[styles.errorText, { color: colors.text }]}>
            Question non trouvée
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
            {isNewQuestion ? 'Nouvelle Question' : 'Éditer la Question'}
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
          {/* Informations de base */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="edit" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Informations de base
              </ThemedText>
            </View>
            
            <View style={styles.formGrid}>
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Question *
                </ThemedText>
                <TextInput
                  style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Entrez votre question..."
                  placeholderTextColor={colors.text + '80'}
                  value={editedQuestion.question || ''}
                  onChangeText={(text) => setEditedQuestion({ ...editedQuestion, question: text })}
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
                    value={editedQuestion.category || ''}
                    onChangeText={(text) => setEditedQuestion({ ...editedQuestion, category: text })}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Difficulté
                  </ThemedText>
                  <View style={styles.difficultyButtons}>
                    {['facile', 'moyen', 'difficile'].map((difficulty) => (
                      <TouchableOpacity
                        key={difficulty}
                        style={[
                          styles.difficultyButton,
                          { 
                            backgroundColor: editedQuestion.difficulty === difficulty ? colors.primary : colors.background,
                            borderColor: colors.border
                          }
                        ]}
                        onPress={() => setEditedQuestion({ ...editedQuestion, difficulty: difficulty as any })}
                      >
                        <ThemedText style={[styles.difficultyButtonText, { color: editedQuestion.difficulty === difficulty ? colors.background : colors.text }]}>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              
              <View style={styles.formRow}>
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Niveau
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Niveau (1-10)"
                    placeholderTextColor={colors.text + '80'}
                    value={editedQuestion.level?.toString() || ''}
                    onChangeText={(text) => setEditedQuestion({ ...editedQuestion, level: parseInt(text) || 1 })}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <ThemedText style={[styles.label, { color: colors.text }]}>
                    Points
                  </ThemedText>
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Points"
                    placeholderTextColor={colors.text + '80'}
                    value={editedQuestion.points?.toString() || ''}
                    onChangeText={(text) => setEditedQuestion({ ...editedQuestion, points: parseInt(text) || 10 })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </ThemedView>

          {/* Options */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="list" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Options de réponse
              </ThemedText>
            </View>
            
            <View style={styles.optionsContainer}>
              {editedQuestion.options?.map((option, index) => (
                <View key={index} style={styles.optionItem}>
                  <TouchableOpacity
                    style={[
                      styles.optionRadio,
                      { 
                        backgroundColor: editedQuestion.correctAnswer === index ? colors.primary : colors.background,
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => setEditedQuestion({ ...editedQuestion, correctAnswer: index })}
                  >
                    {editedQuestion.correctAnswer === index && (
                      <MaterialIcons name="check" size={16} color={colors.background} />
                    )}
                  </TouchableOpacity>
                  
                  <TextInput
                    style={[styles.optionInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder={`Option ${index + 1}`}
                    placeholderTextColor={colors.text + '80'}
                    value={option}
                    onChangeText={(text) => handleUpdateOption(index, text)}
                  />
                  
                  {editedQuestion.options && editedQuestion.options.length > 2 && (
                    <TouchableOpacity
                      style={[styles.removeOptionButton, { backgroundColor: colors.error }]}
                      onPress={() => handleRemoveOption(index)}
                    >
                      <MaterialIcons name="close" size={16} color={colors.background} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              
              <View style={styles.addOptionContainer}>
                <TextInput
                  style={[styles.addOptionInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Nouvelle option"
                  placeholderTextColor={colors.text + '80'}
                  value={newOption}
                  onChangeText={setNewOption}
                />
                <TouchableOpacity
                  style={[styles.addOptionButton, { backgroundColor: colors.primary }]}
                  onPress={handleAddOption}
                >
                  <MaterialIcons name="add" size={16} color={colors.background} />
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>

          {/* Explication */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="info" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Explication
              </ThemedText>
            </View>
            
            <TextInput
              style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
              placeholder="Explication de la réponse correcte..."
              placeholderTextColor={colors.text + '80'}
              value={editedQuestion.explanation || ''}
              onChangeText={(text) => setEditedQuestion({ ...editedQuestion, explanation: text })}
              multiline
              numberOfLines={4}
            />
          </ThemedView>

          {/* Métadonnées */}
          <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="settings" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Métadonnées
              </ThemedText>
            </View>
            
            <View style={styles.formGrid}>
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Auteur
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Auteur de la question"
                  placeholderTextColor={colors.text + '80'}
                  value={editedQuestion.author || ''}
                  onChangeText={(text) => setEditedQuestion({ ...editedQuestion, author: text })}
                />
              </View>
              
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Référence
                </ThemedText>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  placeholder="Référence bibliographique"
                  placeholderTextColor={colors.text + '80'}
                  value={editedQuestion.reference || ''}
                  onChangeText={(text) => setEditedQuestion({ ...editedQuestion, reference: text })}
                />
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
  },
  backButtonText: {
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
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    marginLeft: 10,
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
  difficultyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  difficultyButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  removeOptionButton: {
    padding: 8,
    borderRadius: 6,
  },
  addOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  addOptionInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addOptionButton: {
    padding: 12,
    borderRadius: 8,
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
}); 