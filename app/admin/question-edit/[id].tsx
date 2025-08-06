import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Question } from '@/types/quiz';
import { showAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [newSentence, setNewSentence] = useState('');
  const [newAssociationPair, setNewAssociationPair] = useState({ leftItem: '', rightItem: '' });

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const isNewQuestion = id === 'new';

  const handleBackNavigation = () => {
    if (hasChanges) {
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
          reference: foundQuestion.reference,
          sentences: foundQuestion.sentences ? [...foundQuestion.sentences] : [],
          correctOrder: foundQuestion.correctOrder ? [...foundQuestion.correctOrder] : [],
          associationPairs: foundQuestion.associationPairs ? [...foundQuestion.associationPairs] : [],
          multipleCorrectAnswers: foundQuestion.multipleCorrectAnswers
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
        reference: '',
        sentences: [],
        correctOrder: [],
        associationPairs: [],
        multipleCorrectAnswers: false
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
        editedQuestion.questionType !== question.questionType ||
        JSON.stringify(editedQuestion.options) !== JSON.stringify(question.options) ||
        JSON.stringify(editedQuestion.sentences) !== JSON.stringify(question.sentences) ||
        JSON.stringify(editedQuestion.associationPairs) !== JSON.stringify(question.associationPairs);

      setHasChanges(!!hasQuestionChanges);
    } else if (isNewQuestion) {
      const hasNewQuestionChanges = 
        editedQuestion.question !== '' ||
        editedQuestion.category !== '' ||
        editedQuestion.explanation !== '' ||
        editedQuestion.author !== '' ||
        editedQuestion.reference !== '' ||
        (editedQuestion.options && editedQuestion.options.length > 0) ||
        (editedQuestion.sentences && editedQuestion.sentences.length > 0) ||
        (editedQuestion.associationPairs && editedQuestion.associationPairs.length > 0);

      setHasChanges(!!hasNewQuestionChanges);
    }
  }, [question, editedQuestion, isNewQuestion]);

  const handleSave = async () => {
   

  

    setIsSaving(true);
    try {
      if (isNewQuestion) {
        console.log(editedQuestion)
        const questionData: Omit<Question, 'id'> = {
          question: editedQuestion.question!,
          category: editedQuestion.category!,
          difficulty: editedQuestion.difficulty || 'moyen',
          level: editedQuestion.level || 1,
          points: editedQuestion.points || 10,
          explanation: editedQuestion.explanation || '',
          options: editedQuestion.options || [],
          correctAnswer: editedQuestion.correctAnswer || 0,
          questionType: editedQuestion.questionType || 'multiple-choice',
          author: editedQuestion.author || '',
          reference: editedQuestion.reference || '',
          sentences: editedQuestion.sentences || [],
          correctOrder: editedQuestion.correctOrder || [],
          associationPairs: editedQuestion.associationPairs || [],
          multipleCorrectAnswers: editedQuestion.multipleCorrectAnswers || false
        };

        console.log('🔄 Création de la question:', questionData);
        const questionId = await createQuestion(questionData);
        console.log('✅ Question créée avec succès, ID:', questionId);
        showAlert('Succès', 'Question créée avec succès');
      } else if (question) {
        console.log('🔄 Mise à jour de la question:', question.id, editedQuestion);
        await updateQuestion(question.id, editedQuestion);
        console.log('✅ Question mise à jour avec succès');
        showAlert('Succès', 'Question mise à jour avec succès');
      }
      router.back();
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      showAlert('Erreur', 'Impossible de sauvegarder la question. Vérifiez votre connexion Firebase.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setEditedQuestion({
        ...editedQuestion,
        options: [...(editedQuestion.options || []), newOption.trim()]
      });
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...(editedQuestion.options || [])];
    updatedOptions.splice(index, 1);
    setEditedQuestion({ ...editedQuestion, options: updatedOptions });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const updatedOptions = [...(editedQuestion.options || [])];
    updatedOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: updatedOptions });
  };

  const handleAddSentence = () => {
    if (newSentence.trim()) {
      const updatedSentences = [...(editedQuestion.sentences || []), newSentence.trim()];
      setEditedQuestion({
        ...editedQuestion,
        sentences: updatedSentences,
        correctOrder: Array.from({ length: updatedSentences.length }, (_, i) => i)
      });
      setNewSentence('');
    }
  };

  const handleRemoveSentence = (index: number) => {
    const updatedSentences = [...(editedQuestion.sentences || [])];
    updatedSentences.splice(index, 1);
    
    // Mettre à jour l'ordre correct
    const updatedCorrectOrder = (editedQuestion.correctOrder || [])
      .filter(orderIndex => orderIndex !== index)
      .map(orderIndex => orderIndex > index ? orderIndex - 1 : orderIndex);
    
    setEditedQuestion({ 
      ...editedQuestion, 
      sentences: updatedSentences,
      correctOrder: updatedCorrectOrder
    });
  };

  const handleUpdateSentence = (index: number, value: string) => {
    const updatedSentences = [...(editedQuestion.sentences || [])];
    updatedSentences[index] = value;
    setEditedQuestion({ ...editedQuestion, sentences: updatedSentences });
  };

  const handleMoveSentence = (fromIndex: number, toIndex: number) => {
    const updatedSentences = [...(editedQuestion.sentences || [])];
    const [movedSentence] = updatedSentences.splice(fromIndex, 1);
    updatedSentences.splice(toIndex, 0, movedSentence);
    
    // Mettre à jour l'ordre correct
    const updatedCorrectOrder = [...(editedQuestion.correctOrder || [])];
    const movedOrderIndex = updatedCorrectOrder.indexOf(fromIndex);
    if (movedOrderIndex !== -1) {
      updatedCorrectOrder.splice(movedOrderIndex, 1);
      updatedCorrectOrder.splice(toIndex, 0, fromIndex);
    }
    
    setEditedQuestion({ 
      ...editedQuestion, 
      sentences: updatedSentences,
      correctOrder: updatedCorrectOrder
    });
  };

  // Fonctions pour gérer les paires d'association
  const handleAddAssociationPair = () => {
    if (newAssociationPair.leftItem.trim() && newAssociationPair.rightItem.trim()) {
      const newPair = {
        id: `pair_${Date.now()}`,
        leftItem: newAssociationPair.leftItem.trim(),
        rightItem: newAssociationPair.rightItem.trim(),
        isCorrect: true
      };
      
      const updatedPairs = [...(editedQuestion.associationPairs || []), newPair];
      setEditedQuestion({
        ...editedQuestion,
        associationPairs: updatedPairs
      });
      
      setNewAssociationPair({ leftItem: '', rightItem: '' });
    }
  };

  const handleRemoveAssociationPair = (index: number) => {
    const updatedPairs = [...(editedQuestion.associationPairs || [])];
    updatedPairs.splice(index, 1);
    setEditedQuestion({ ...editedQuestion, associationPairs: updatedPairs });
  };

  const handleUpdateAssociationPair = (index: number, field: 'leftItem' | 'rightItem', value: string) => {
    const updatedPairs = [...(editedQuestion.associationPairs || [])];
    updatedPairs[index] = { ...updatedPairs[index], [field]: value };
    setEditedQuestion({ ...editedQuestion, associationPairs: updatedPairs });
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

              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Type de question
                </ThemedText>
                <View style={styles.questionTypeButtons}>
                  {['multiple-choice', 'association', 'sentence-reorder'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.questionTypeButton,
                        { 
                          backgroundColor: editedQuestion.questionType === type ? colors.primary : colors.background,
                          borderColor: colors.border
                        }
                      ]}
                      onPress={() => setEditedQuestion({ ...editedQuestion, questionType: type as any })}
                    >
                      <ThemedText style={[styles.questionTypeButtonText, { color: editedQuestion.questionType === type ? colors.background : colors.text }]}>
                        {type === 'multiple-choice' ? 'Choix multiple' : 
                         type === 'association' ? 'Association' : 
                         'Réorganisation'}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ThemedView>

          {/* Options */}
          {editedQuestion.questionType === 'multiple-choice' && (
            <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="list" size={24} color={colors.primary} />
                <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                  Options
                </ThemedText>
              </View>
              
              <View style={styles.optionsContainer}>
                {(editedQuestion.options || []).map((option, index) => (
                  <View key={index} style={styles.optionRow}>
                    <TextInput
                      style={[styles.optionInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                      placeholder={`Option ${index + 1}`}
                      placeholderTextColor={colors.text + '80'}
                      value={option}
                      onChangeText={(text) => handleUpdateOption(index, text)}
                    />
                    <TouchableOpacity
                      style={[styles.removeButton, { backgroundColor: colors.error }]}
                      onPress={() => handleRemoveOption(index)}
                    >
                      <MaterialIcons name="delete" size={16} color={colors.background} />
                    </TouchableOpacity>
                  </View>
                ))}
                
                <View style={styles.addOptionRow}>
                  <TextInput
                    style={[styles.optionInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Nouvelle option..."
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
          )}

          {/* Phrases pour réorganisation */}
          {editedQuestion.questionType === 'sentence-reorder' && (
            <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="sort" size={24} color={colors.primary} />
                <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                  Phrases à réorganiser
                </ThemedText>
              </View>
              
              <View style={styles.sentencesContainer}>
                {(editedQuestion.sentences || []).map((sentence, index) => (
                  <View key={index} style={styles.sentenceRow}>
                    <View style={styles.sentenceNumber}>
                      <ThemedText style={[styles.sentenceNumberText, { color: colors.tint }]}>
                        {index + 1}
                      </ThemedText>
                    </View>
                    <TextInput
                      style={[styles.sentenceInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                      placeholder={`Phrase ${index + 1}`}
                      placeholderTextColor={colors.text + '80'}
                      value={sentence}
                      onChangeText={(text) => handleUpdateSentence(index, text)}
                      multiline
                    />
                    <View style={styles.sentenceControls}>
                      {index > 0 && (
                        <TouchableOpacity
                          style={[styles.moveButton, { backgroundColor: colors.primary }]}
                          onPress={() => handleMoveSentence(index, index - 1)}
                        >
                          <MaterialIcons name="keyboard-arrow-up" size={16} color={colors.background} />
                        </TouchableOpacity>
                      )}
                      {index < (editedQuestion.sentences?.length || 0) - 1 && (
                        <TouchableOpacity
                          style={[styles.moveButton, { backgroundColor: colors.primary }]}
                          onPress={() => handleMoveSentence(index, index + 1)}
                        >
                          <MaterialIcons name="keyboard-arrow-down" size={16} color={colors.background} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={[styles.removeButton, { backgroundColor: colors.error }]}
                        onPress={() => handleRemoveSentence(index)}
                      >
                        <MaterialIcons name="delete" size={16} color={colors.background} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                
                <View style={styles.addSentenceRow}>
                  <TextInput
                    style={[styles.sentenceInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                    placeholder="Nouvelle phrase..."
                    placeholderTextColor={colors.text + '80'}
                    value={newSentence}
                    onChangeText={setNewSentence}
                    multiline
                  />
                  <TouchableOpacity
                    style={[styles.addSentenceButton, { backgroundColor: colors.primary }]}
                    onPress={handleAddSentence}
                  >
                    <MaterialIcons name="add" size={16} color={colors.background} />
                  </TouchableOpacity>
                </View>
              </View>
            </ThemedView>
          )}

          {/* Paires d'association */}
          {editedQuestion.questionType === 'association' && (
            <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="link" size={24} color={colors.primary} />
                <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                  Paires d'association
                </ThemedText>
              </View>
              
              <View style={styles.associationContainer}>
                {(editedQuestion.associationPairs || []).map((pair, index) => (
                  <View key={pair.id || index} style={styles.associationRow}>
                    <View style={styles.associationPair}>
                      <TextInput
                        style={[styles.associationInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                        placeholder="Élément de gauche"
                        placeholderTextColor={colors.text + '80'}
                        value={pair.leftItem}
                        onChangeText={(text) => handleUpdateAssociationPair(index, 'leftItem', text)}
                      />
                      <MaterialIcons name="arrow-forward" size={20} color={colors.primary} />
                      <TextInput
                        style={[styles.associationInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                        placeholder="Élément de droite"
                        placeholderTextColor={colors.text + '80'}
                        value={pair.rightItem}
                        onChangeText={(text) => handleUpdateAssociationPair(index, 'rightItem', text)}
                      />
                    </View>
                    <TouchableOpacity
                      style={[styles.removeButton, { backgroundColor: colors.error }]}
                      onPress={() => handleRemoveAssociationPair(index)}
                    >
                      <MaterialIcons name="delete" size={16} color={colors.background} />
                    </TouchableOpacity>
                  </View>
                ))}
                
                <View style={styles.addAssociationRow}>
                  <View style={styles.associationPair}>
                    <TextInput
                      style={[styles.associationInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                      placeholder="Nouvel élément de gauche"
                      placeholderTextColor={colors.text + '80'}
                      value={newAssociationPair.leftItem}
                      onChangeText={(text) => setNewAssociationPair({ ...newAssociationPair, leftItem: text })}
                    />
                    <MaterialIcons name="arrow-forward" size={20} color={colors.primary} />
                    <TextInput
                      style={[styles.associationInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                      placeholder="Nouvel élément de droite"
                      placeholderTextColor={colors.text + '80'}
                      value={newAssociationPair.rightItem}
                      onChangeText={(text) => setNewAssociationPair({ ...newAssociationPair, rightItem: text })}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.addAssociationButton, { backgroundColor: colors.primary }]}
                    onPress={handleAddAssociationPair}
                  >
                    <MaterialIcons name="add" size={16} color={colors.background} />
                  </TouchableOpacity>
                </View>
              </View>
            </ThemedView>
          )}

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
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  },
  errorDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  backLink: {
    fontSize: 16,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  formGrid: {
    gap: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formGroup: {
    flex: 1,
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
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
    borderRadius: 6,
  },
  addOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  addOptionButton: {
    padding: 12,
    borderRadius: 8,
  },
  sentencesContainer: {
    gap: 12,
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  sentenceNumber: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  sentenceNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sentenceInput: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  sentenceControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  moveButton: {
    padding: 8,
    borderRadius: 6,
  },
  addSentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  addSentenceButton: {
    padding: 12,
    borderRadius: 8,
  },
  associationContainer: {
    gap: 12,
  },
  associationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  associationPair: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  associationInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addAssociationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  addAssociationButton: {
    padding: 12,
    borderRadius: 8,
  },
  questionTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  questionTypeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  questionTypeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 