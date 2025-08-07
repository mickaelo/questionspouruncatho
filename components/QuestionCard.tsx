import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { Question } from '../types/quiz';
import { CrosswordClues } from './CrosswordClues';
import { CrosswordGrid } from './CrosswordGrid';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedAnswer: number | number[], isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining?: number;
}

export function QuestionCard({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  timeRemaining
}: QuestionCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [associationSelections, setAssociationSelections] = useState<{ [key: string]: string }>({});
  const [selectedLeftItem, setSelectedLeftItem] = useState<string | null>(null);
  const [sentenceOrder, setSentenceOrder] = useState<number[]>([]);
  const [showExplanationPopup, setShowExplanationPopup] = useState(false);
  const [showSkipPopup, setShowSkipPopup] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [crosswordGrid, setCrosswordGrid] = useState<{ [key: string]: any }>({});
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastSelectedAnswers, setLastSelectedAnswers] = useState<number[]>([]);
  const [lastAssociationSelections, setLastAssociationSelections] = useState<{ [key: string]: string }>({});
  const [lastSentenceOrder, setLastSentenceOrder] = useState<number[]>([]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  // Couleurs pour différencier les associations
  const associationColors = [
    '#FF6B6B', // Rouge
    '#4ECDC4', // Turquoise
    '#45B7D1', // Bleu
    '#96CEB4', // Vert
    '#FFEAA7', // Jaune
    '#DDA0DD', // Prune
    '#98D8C8', // Vert menthe
    '#F7DC6F', // Jaune doré
    '#BB8FCE', // Violet
    '#85C1E9', // Bleu ciel
  ];

  // Fonction pour obtenir la couleur d'une association
  const getAssociationColor = (leftId: string) => {
    const associationEntries = Object.entries(associationSelections);
    const index = associationEntries.findIndex(([key]) => key === leftId);
    if (index !== -1) {
      return associationColors[index % associationColors.length];
    }
    return colors.primary;
  };

  // Fonction pour obtenir la couleur d'un élément de droite
  const getRightItemColor = (rightItem: string) => {
    const associationEntries = Object.entries(associationSelections);
    const index = associationEntries.findIndex(([key, value]) => value === rightItem);
    if (index !== -1) {
      return associationColors[index % associationColors.length];
    }
    return colors.primary;
  };

  // Fonction pour obtenir la couleur du texte (blanc ou noir selon la couleur de fond)
  const getTextColor = (backgroundColor: string) => {
    // Convertir la couleur hex en RGB pour calculer la luminosité
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // Fonction pour passer une question
  const handleSkipQuestion = () => {
    setSkipped(true);
    setShowSkipPopup(true);
  };

  // Fonction pour obtenir la bonne réponse selon le type de question
  const getCorrectAnswer = () => {
    switch (question.questionType) {
      case 'multiple-choice':
        console.log(question)

        if (Array.isArray(question.correctAnswer)) {
          return question.correctAnswer.map((index: number) => question.options?.[index] || '').filter(Boolean);
        } else if (typeof question.correctAnswer === 'number') {
          return [question.options?.[question.correctAnswer] || ''];
        } else {
          return [];
        }
      case 'association':
        return question.associationPairs?.filter(pair => pair.isCorrect).map(pair => `${pair.leftItem} - ${pair.rightItem}`) || [];
      case 'sentence-reorder':
        return question.sentences?.map((_, index) => question.sentences?.[index] || '').filter(Boolean) || [];
      case 'crossword':
        return question.crosswordData?.words?.map(word => word.word) || [];
      default:
        return [];
    }
  };

  // Fonction pour gérer les mots trouvés dans les mots fléchés
  const handleWordFound = (wordId: string, word: string) => {
    if (!foundWords.includes(wordId)) {
      const newFoundWords = [...foundWords, wordId];
      setFoundWords(newFoundWords);

      // Vérifier si tous les mots sont trouvés
      if (question.crosswordData?.words && newFoundWords.length === question.crosswordData.words.length) {
        handleCrosswordComplete();
      }
    }
  };

  // Fonction pour gérer la completion des mots fléchés
  const handleCrosswordComplete = () => {
    setAnswered(true);
    setShowExplanationPopup(true);

    setTimeout(() => {
      const isCorrect = foundWords.length === (question.crosswordData?.words?.length || 0);
      onAnswer(foundWords.map((_, index) => index), isCorrect);
    }, 2000);
  };

  // Fonction pour gérer les changements de cellules dans les mots fléchés
  const handleCellChange = (row: number, col: number, letter: string) => {
    if (!question.crosswordData?.grid) return;

    const cellKey = `${row},${col}`;
    const newGrid = { ...question.crosswordData.grid };
    if (newGrid[cellKey]) {
      newGrid[cellKey].letter = letter;
      setCrosswordGrid(newGrid);
    }
  };

  // Fonction pour rendre les boutons de validation
  const renderValidationButton = () => {
    if (answered) return null;

    const validationButtons = [];

    // Bouton de validation selon le type de question
    switch (question.questionType) {
      case 'multiple-choice':
        if (selectedAnswers.length > 0) {
          validationButtons.push(
            <TouchableOpacity
              key="validate"
              style={[styles.validationButton, { backgroundColor: colors.primary }]}
              onPress={handleMultipleChoiceSubmit}
            >
              <ThemedText style={[styles.validationButtonText, { color: colors.background }]}>
                Valider ({selectedAnswers.length} sélectionné{selectedAnswers.length > 1 ? 's' : ''})
              </ThemedText>
            </TouchableOpacity>
          );
        }
        break;

      case 'association':
        if (Object.keys(associationSelections).length > 0) {
          validationButtons.push(
            <TouchableOpacity
              key="validate"
              style={[styles.validationButton, { backgroundColor: colors.primary }]}
              onPress={handleAssociationSubmit}
            >
              <ThemedText style={[styles.validationButtonText, { color: colors.background }]}>
                Valider ({Object.keys(associationSelections).length}/{question.associationPairs?.length || 0})
              </ThemedText>
            </TouchableOpacity>
          );
        }
        break;

      case 'sentence-reorder':
        validationButtons.push(
          <TouchableOpacity
            key="validate"
            style={[styles.validationButton, { backgroundColor: colors.primary }]}
            onPress={handleSentenceReorderSubmit}
          >
            <ThemedText style={[styles.validationButtonText, { color: colors.background }]}>
              Valider
            </ThemedText>
          </TouchableOpacity>
        );
        break;

      default:
        break;
    }

    // Ajouter le bouton "Passer" pour tous les types de questions
    validationButtons.push(
      <TouchableOpacity
        key="skip"
        style={[styles.skipButton, { backgroundColor: colors.secondary }]}
        onPress={handleSkipQuestion}
      >
        <ThemedText style={[styles.skipButtonText, { color: colors.background }]}>
          Passer
        </ThemedText>
      </TouchableOpacity>
    );

    return validationButtons.length > 0 ? (
      <View style={styles.validationButtonsContainer}>
        {validationButtons}
      </View>
    ) : null;
  };

  // Initialiser l'ordre des phrases si c'est une question de réorganisation
  React.useEffect(() => {
    if (question.questionType === 'sentence-reorder' && question.sentences) {
      // Mélanger les phrases pour créer un ordre aléatoire
      const shuffledOrder = Array.from({ length: question.sentences.length }, (_, i) => i)
        .sort(() => Math.random() - 0.5);
      setSentenceOrder(shuffledOrder);
      console.log('🎲 Ordre initial des phrases:', shuffledOrder);
    }

    // Réinitialiser les sélections pour les questions d'association
    if (question.questionType === 'association') {
      setAssociationSelections({});
      setSelectedLeftItem(null);
    }
  }, [question]);

  // Log des changements de sentenceOrder
  React.useEffect(() => {
    if (question.questionType === 'sentence-reorder' && sentenceOrder.length > 0) {
      console.log('📝 SentenceOrder mis à jour:', sentenceOrder);
    }
  }, [sentenceOrder, question.questionType]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;

    if (question.questionType === 'multiple-choice') {
      // Pour toutes les questions à choix multiples, permettre la sélection multiple
      const newSelectedAnswers = selectedAnswers.includes(answerIndex)
        ? selectedAnswers.filter(id => id !== answerIndex)
        : [...selectedAnswers, answerIndex];

      setSelectedAnswers(newSelectedAnswers);
    } else {
      // Gestion des autres types de questions (association, sentence-reorder, etc.)
      setSelectedAnswers([answerIndex]);
      setAnswered(true);

      let isCorrect: boolean;
      if (Array.isArray(question.correctAnswer)) {
        isCorrect = question.correctAnswer.includes(answerIndex);
      } else {
        isCorrect = answerIndex === question.correctAnswer;
      }

      setLastAnswerCorrect(isCorrect);
      setLastSelectedAnswers([answerIndex]);
      setShowExplanationPopup(true);
    }
  };

  const handleMultipleChoiceSubmit = () => {
    if (selectedAnswers.length === 0) return;

    setAnswered(true);

    let isCorrect: boolean;
    if (Array.isArray(question.correctAnswer)) {
      // Question avec plusieurs réponses correctes
      isCorrect = selectedAnswers.length === question.correctAnswer.length &&
        selectedAnswers.every(answer => (question.correctAnswer as number[]).includes(answer));
    } else {
      // Question avec une seule réponse correcte
      isCorrect = selectedAnswers.length === 1 && selectedAnswers[0] === question.correctAnswer;
    }

    setLastAnswerCorrect(isCorrect);
    setLastSelectedAnswers([...selectedAnswers]);
    setShowExplanationPopup(true);
  };

  const handleAssociationSelect = (leftId: string, rightId: string) => {
    if (answered) return;

    console.log('🔗 Association sélectionnée:', { leftId, rightId, currentSelections: associationSelections, selectedLeftItem });

    // Si on clique sur un élément de gauche
    if (leftId && !rightId) {
      if (selectedLeftItem === leftId) {
        setSelectedLeftItem(null);
        console.log('🔗 Élément de gauche désélectionné:', leftId);
      } else {
        setSelectedLeftItem(leftId);
        console.log('🔗 Élément de gauche sélectionné:', leftId);
      }
      return;
    }

    // Si on clique sur un élément de droite et qu'un élément de gauche est sélectionné
    if (selectedLeftItem && rightId) {
      const newSelections = { ...associationSelections };

      // Vérifier si cette association existe déjà
      const existingAssociation = Object.entries(newSelections).find(([key, value]) => value === rightId);

      if (existingAssociation) {
        // Si l'élément de droite est déjà associé à un autre élément de gauche, supprimer cette association
        delete newSelections[existingAssociation[0]];
      }

      // Vérifier si l'élément de gauche sélectionné a déjà une association
      if (newSelections[selectedLeftItem] === rightId) {
        // Si c'est la même association, la supprimer
        delete newSelections[selectedLeftItem];
        console.log('🔗 Association désélectionnée:', selectedLeftItem, '->', rightId);
      } else {
        // Créer la nouvelle association
        newSelections[selectedLeftItem] = rightId;
        console.log('🔗 Association créée:', selectedLeftItem, '->', rightId);
      }

      setAssociationSelections(newSelections);
      setSelectedLeftItem(null); // Réinitialiser la sélection de gauche
    }
  };

  const handleAssociationSubmit = () => {
    if (Object.keys(associationSelections).length === 0) return;

    setAnswered(true);

    // Vérifier si toutes les associations SÉLECTIONNÉES sont correctes
    // Pour chaque association sélectionnée, vérifier si elle correspond à une paire correcte
    const isCorrect = Object.entries(associationSelections).every(([leftId, rightId]) => {
      // Trouver la paire correspondante dans question.associationPairs
      const pair = question.associationPairs?.find(p => p.id === leftId);
      if (!pair) return false;

      // Vérifier si l'association sélectionnée correspond à la paire correcte
      return pair.rightItem === rightId && pair.isCorrect;
    });

    console.log('🔗 Validation des associations:', {
      associations: Object.entries(associationSelections).map(([leftId, rightId]) => {
        const pair = question.associationPairs?.find(p => p.id === leftId);
        return {
          leftId,
          rightId,
          leftItem: pair?.leftItem,
          expectedRightItem: pair?.rightItem,
          isCorrect: pair?.rightItem === rightId && pair?.isCorrect
        };
      }),
      isCorrect
    });
    setLastAnswerCorrect(isCorrect);
    setLastAssociationSelections({ ...associationSelections });
    setShowExplanationPopup(true);
  };

  const handleSentenceReorderSubmit = () => {
    if (sentenceOrder.length === 0) return;

    setAnswered(true);

    // Vérifier si l'ordre est correct (doit être 0, 1, 2, 3, ...)
    const isCorrect = sentenceOrder.every((sentenceIndex, index) => sentenceIndex === index);
    setLastAnswerCorrect(isCorrect);
    setLastSentenceOrder([...sentenceOrder]);
    setShowExplanationPopup(true);
  };

  const getOptionStyle = (index: number) => {
    if (!answered) {
      const isSelected = selectedAnswers.includes(index);
      return [
        styles.option,
        {
          backgroundColor: isSelected ? colors.primary : colors.background,
          borderColor: isSelected ? colors.primary : colors.border
        }
      ];
    }

    let isCorrect: boolean;
    if (Array.isArray(question.correctAnswer)) {
      isCorrect = (question.correctAnswer as number[]).includes(index);
    } else {
      isCorrect = index === question.correctAnswer;
    }

    if (isCorrect) {
      return [
        styles.option,
        styles.correctAnswer,
        { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
      ];
    }

    if (selectedAnswers.includes(index) && !isCorrect) {
      return [
        styles.option,
        styles.wrongAnswer,
        { backgroundColor: '#F44336', borderColor: '#F44336' }
      ];
    }

    return [
      styles.option,
      { backgroundColor: colors.background, borderColor: colors.border, opacity: 0.6 }
    ];
  };

  const getOptionTextStyle = (index: number) => {
    if (!answered) {
      const isSelected = selectedAnswers.includes(index);
      return { color: isSelected ? colors.background : colors.text };
    }

    let isCorrect: boolean;
    if (Array.isArray(question.correctAnswer)) {
      isCorrect = (question.correctAnswer as number[]).includes(index);
    } else {
      isCorrect = index === question.correctAnswer;
    }

    if (isCorrect) {
      return { color: '#FFFFFF' };
    }

    if (selectedAnswers.includes(index) && !isCorrect) {
      return { color: '#FFFFFF' };
    }

    return { color: colors.text, opacity: 0.6 };
  };

  const renderMultipleChoiceQuestion = () => (
    <View style={styles.optionsContainer}>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(index)}
          onPress={() => handleAnswerSelect(index)}
          disabled={answered}
          activeOpacity={0.7}
        >
          <ThemedText style={getOptionTextStyle(index)}>
            {option}
          </ThemedText>
          {answered && Array.isArray(question.correctAnswer) && question.correctAnswer.includes(index) && (
            <IconSymbol
              name="checkmark.circle.fill"
              size={20}
              color="#FFFFFF"
              style={styles.answerIcon}
            />
          )}
          {answered && selectedAnswers.includes(index) && !Array.isArray(question.correctAnswer) && index !== question.correctAnswer && (
            <IconSymbol
              name="xmark.circle.fill"
              size={20}
              color="#FFFFFF"
              style={styles.answerIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAssociationQuestion = () => {
    if (!question.associationPairs) return null;

    return (
      <View style={styles.associationContainer}>
        <ThemedText style={[styles.associationInstructions, { color: colors.secondary }]}>
          {selectedLeftItem
            ? 'Maintenant cliquez sur l\'association correspondante à droite'
            : 'Cliquez sur un élément de gauche pour commencer l\'association'
          }
        </ThemedText>

        <View style={styles.associationGrid}>
          {/* Colonne de gauche */}
          <View style={styles.associationColumn}>
            <ThemedText type="subtitle" style={styles.associationColumnTitle}>
              Éléments
            </ThemedText>
            {question.associationPairs.map((pair, index) => {
              const isSelected = selectedLeftItem === pair.id;
              const hasAssociation = associationSelections[pair.id];
              const associationColor = hasAssociation ? getAssociationColor(pair.id) : colors.primary;

              return (
                <TouchableOpacity
                  key={pair.id}
                  style={[
                    styles.associationItem,
                    {
                      backgroundColor: isSelected
                        ? colors.warning
                        : hasAssociation
                          ? associationColor
                          : colors.background,
                      borderColor: isSelected
                        ? colors.warning
                        : hasAssociation
                          ? associationColor
                          : colors.border,
                      borderWidth: (isSelected || hasAssociation) ? 2 : 1,
                    }
                  ]}
                  onPress={() => handleAssociationSelect(pair.id, '')}
                  disabled={answered}
                  activeOpacity={0.7}
                >
                  <ThemedText style={[
                    styles.associationText,
                    { color: (isSelected || hasAssociation) ? getTextColor(isSelected ? colors.warning : associationColor) : colors.text }
                  ]}>
                    {pair.leftItem}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Colonne de droite */}
          <View style={styles.associationColumn}>
            <ThemedText type="subtitle" style={styles.associationColumnTitle}>
              Associations
            </ThemedText>
            {question.associationPairs.map((pair, index) => {
              const isSelected = Object.values(associationSelections).includes(pair.rightItem);
              const associationColor = isSelected ? getRightItemColor(pair.rightItem) : colors.primary;

              return (
                <TouchableOpacity
                  key={pair.id}
                  style={[
                    styles.associationItem,
                    {
                      backgroundColor: isSelected
                        ? associationColor
                        : colors.background,
                      borderColor: isSelected
                        ? associationColor
                        : colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    }
                  ]}
                  onPress={() => selectedLeftItem && handleAssociationSelect('', pair.rightItem)}
                  disabled={answered || !selectedLeftItem}
                  activeOpacity={selectedLeftItem ? 0.7 : 1}
                >
                  <ThemedText style={[
                    styles.associationText,
                    { color: isSelected ? getTextColor(associationColor) : colors.text }
                  ]}>
                    {pair.rightItem}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  // Composant pour les phrases avec chevrons de réorganisation
  const SentenceReorderItem = ({ sentenceIndex, index, onMove }: {
    sentenceIndex: number;
    index: number;
    onMove: (fromIndex: number, toIndex: number) => void;
  }) => {
    const canMoveUp = index > 0;
    const canMoveDown = index < sentenceOrder.length - 1;

    const handleMoveUp = () => {
      if (canMoveUp) {
        onMove(index, index - 1);
      }
    };

    const handleMoveDown = () => {
      if (canMoveDown) {
        onMove(index, index + 1);
      }
    };

    return (
      <View style={[styles.sentenceReorderItem, {
        backgroundColor: colors.background,
        borderColor: colors.border
      }]}>
        <View style={styles.sentenceContent}>
          <View style={styles.sentenceNumber}>
            <ThemedText style={[styles.sentenceNumberText, { color: colors.tint }]}>
              {index + 1}
            </ThemedText>
          </View>
          <ThemedText style={[styles.sentenceText, { color: colors.text, flex: 1 }]}>
            {question.sentences![sentenceIndex]}
          </ThemedText>
        </View>

        <View style={styles.sentenceActions}>
          <TouchableOpacity
            style={[
              styles.chevronButton,
              {
                backgroundColor: canMoveUp ? colors.tint : colors.border,
                ...(Platform.OS === 'web' ? {
                  boxShadow: canMoveUp ? `0 2px 4px ${colors.tint}` : `0 2px 4px ${colors.border}`
                } : {
                  shadowColor: canMoveUp ? colors.tint : colors.border,
                }),
              },
              !canMoveUp && styles.chevronButtonDisabled
            ]}
            onPress={handleMoveUp}
            disabled={!canMoveUp}
          >
            <IconSymbol
              name="chevron.up"
              size={16}
              color={canMoveUp ? colors.background : colors.secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.chevronButton,
              {
                backgroundColor: canMoveDown ? colors.tint : colors.border,
                ...(Platform.OS === 'web' ? {
                  boxShadow: canMoveDown ? `0 2px 4px ${colors.tint}` : `0 2px 4px ${colors.border}`
                } : {
                  shadowColor: canMoveDown ? colors.tint : colors.border,
                }),
              },
              !canMoveDown && styles.chevronButtonDisabled
            ]}
            onPress={handleMoveDown}
            disabled={!canMoveDown}
          >
            <IconSymbol
              name="chevron.down"
              size={16}
              color={canMoveDown ? colors.background : colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleSentenceMove = (fromIndex: number, toIndex: number) => {
    console.log('🔄 handleSentenceMove appelé:', { fromIndex, toIndex, currentOrder: sentenceOrder });

    if (fromIndex === toIndex) {
      console.log('🔄 Même index, pas de changement');
      return;
    }

    if (fromIndex < 0 || fromIndex >= sentenceOrder.length || toIndex < 0 || toIndex >= sentenceOrder.length) {
      console.error('🔄 Index invalides:', { fromIndex, toIndex, length: sentenceOrder.length });
      return;
    }

    const newOrder = [...sentenceOrder];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);

    console.log('🔄 Nouvel ordre:', {
      movedItem,
      fromIndex,
      toIndex,
      oldOrder: sentenceOrder,
      newOrder
    });

    setSentenceOrder(newOrder);
  };

  const renderSentenceReorderQuestion = () => {
    if (!question.sentences || question.sentences.length === 0) {
      return (
        <View style={styles.errorContainer}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Aucune phrase à réorganiser disponible.
          </ThemedText>
        </View>
      );
    }

    // Initialiser l'ordre des phrases si pas encore fait
    if (sentenceOrder.length === 0) {
      const shuffledOrder = Array.from({ length: question.sentences.length }, (_, i) => i);
      setSentenceOrder(shuffledOrder);
    }

    return (
      <View style={styles.sentenceReorderContainer}>
        <ThemedText style={[styles.instructions, { color: colors.secondary }]}>
          Utilisez les chevrons pour réorganiser les phrases dans le bon ordre
        </ThemedText>

        {sentenceOrder.map((sentenceIndex, index) => (
          <SentenceReorderItem
            key={index}
            sentenceIndex={sentenceIndex}
            index={index}
            onMove={handleSentenceMove}
          />
        ))}
      </View>
    );
  };

  const renderCrosswordQuestion = () => {
    if (!question.crosswordData) {
      return (
        <View style={styles.errorContainer}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Données de mots fléchés non disponibles.
          </ThemedText>
        </View>
      );
    }

    const { grid, words, clues, gridSize } = question.crosswordData;

    return (
      <View style={styles.crosswordContainer}>
        <ThemedText style={[styles.instructions, { color: colors.secondary }]}>
          Complétez les mots fléchés en utilisant les définitions ci-dessous
        </ThemedText>

        <CrosswordGrid
          grid={grid}
          gridSize={gridSize}
          words={words}
          clues={clues}
          onWordFound={handleWordFound}
          onCellChange={handleCellChange}
          isEditable={!answered}
        />

        <View style={styles.cluesContainer}>
          <CrosswordClues
            clues={clues}
            words={words}
            foundWords={foundWords}
          />
        </View>
      </View>
    );
  };

  const ExplanationFooter = () => {
    if (!showExplanationPopup) return null;

    return (
      <View style={[styles.explanationFooter, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <View style={styles.explanationHeader}>
          <ThemedText type="subtitle" style={[styles.explanationTitle, { color: colors.text }]}>
            Explication
          </ThemedText>
        </View>

        <ScrollView style={styles.explanationContent} showsVerticalScrollIndicator={true}>
          <ThemedText style={[styles.explanationText, { color: colors.text }]}>
            {question.explanation}
          </ThemedText>

          {/* Références */}
          <View style={styles.explanationReferences}>
            {question.scripture && (
              <View style={styles.explanationReference}>
                <IconSymbol name="book" size={16} color={colors.tint} />
                <ThemedText style={[styles.explanationReferenceText, { color: colors.tint }]}>
                  {question.scripture}
                </ThemedText>
              </View>
            )}
            {question.catechism && (
              <View style={styles.explanationReference}>
                <IconSymbol name="doc.text" size={16} color={colors.tint} />
                <ThemedText style={[styles.explanationReferenceText, { color: colors.tint }]}>
                  {question.catechism}
                </ThemedText>
              </View>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.explanationContinueButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            setShowExplanationPopup(false);

            // Gérer les différents types de questions
            if (question.questionType === 'association') {
              const selectedIndices = question.associationPairs?.map((pair, index) =>
                lastAssociationSelections[pair.id] ? index : -1
              ).filter(index => index !== -1) ?? [];
              onAnswer(selectedIndices, lastAnswerCorrect);
              setAssociationSelections({});
            } else if (question.questionType === 'sentence-reorder') {
              onAnswer(lastSentenceOrder, lastAnswerCorrect);
              setSentenceOrder([]);
            } else {
              onAnswer(lastSelectedAnswers, lastAnswerCorrect);
              setSelectedAnswers([]);
            }

            setAnswered(false);
          }}
        >
          <ThemedText style={[styles.explanationContinueButtonText, { color: colors.background }]}>
            Continuer
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  // Composant footer pour afficher la bonne réponse quand une question est passée
  const SkipFooter = () => {
    if (!showSkipPopup) return null;

    const correctAnswers = getCorrectAnswer();
    return (
      <View style={[styles.explanationFooter, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <View style={styles.explanationHeader}>
          <ThemedText type="subtitle" style={[styles.explanationTitle, { color: colors.text }]}>
            Bonne réponse
          </ThemedText>
        </View>

        <ScrollView style={styles.explanationContent} showsVerticalScrollIndicator={true}>
          {/* Bonne réponse */}
          <View style={styles.correctAnswerSection}>
            {correctAnswers.map((answer, index) => (
              <View key={index} style={styles.correctAnswerItem}>
                <ThemedText style={[styles.correctAnswerText, { color: colors.success }]}>
                  • {answer}
                </ThemedText>
              </View>
            ))}
          </View>

          {/* Explication */}
          {question.explanation && (
            <View style={styles.explanationSection}>
              <ThemedText style={[styles.explanationTitle, { color: colors.text }]}>
                Explication :
              </ThemedText>
              <ThemedText style={[styles.explanationText, { color: colors.text }]}>
                {question.explanation}
              </ThemedText>
            </View>
          )}

          {/* Références */}
          <View style={styles.explanationReferences}>
            {question.scripture && (
              <View style={styles.explanationReference}>
                <IconSymbol name="book" size={16} color={colors.tint} />
                <ThemedText style={[styles.explanationReferenceText, { color: colors.tint }]}>
                  {question.scripture}
                </ThemedText>
              </View>
            )}
            {question.catechism && (
              <View style={styles.explanationReference}>
                <IconSymbol name="doc.text" size={16} color={colors.tint} />
                <ThemedText style={[styles.explanationReferenceText, { color: colors.tint }]}>
                  {question.catechism}
                </ThemedText>
              </View>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.explanationContinueButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            setShowSkipPopup(false)
            onAnswer([], false);
          }}
        >
          <ThemedText style={[styles.explanationContinueButtonText, { color: colors.background }]}>
            Continuer
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingLeft: Math.max(insets.left, 16),
          paddingRight: Math.max(insets.right, 16),
        }
      ]}
    >
      {/* Header avec progression et timer - Fixe en haut */}
      <View style={styles.header}>
        <ThemedText style={styles.progress}>
          Question {questionNumber} sur {totalQuestions}
        </ThemedText>
        {timeRemaining !== undefined && (
          <View style={styles.timerContainer}>
            <IconSymbol name="clock" size={16} color={colors.tint} />
            <ThemedText style={[styles.timer, { color: colors.tint }]}>
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Question - Fixe */}
      <ThemedText type="subtitle" style={styles.question}>
        {question.question}
      </ThemedText>

      {/* Réponses scrollables */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <View style={styles.contentWrapper}>
          {/* Rendu conditionnel selon le type de question */}
          {question.questionType === 'association' ? renderAssociationQuestion() :
            question.questionType === 'sentence-reorder' ? renderSentenceReorderQuestion() :
              question.questionType === 'crossword' ? renderCrosswordQuestion() :
                renderMultipleChoiceQuestion()}
        </View>
      </ScrollView>

      {/* Boutons de validation - Fixes en bas */}
      <View style={styles.validationButtonContainer}>
        {renderValidationButton()}
      </View>
      <ExplanationFooter />
      <SkipFooter />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espace pour les boutons de validation
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  progress: {
    fontSize: 14,
    opacity: 0.7,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timer: {
    fontSize: 14,
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 12,
    width: '100%',
    maxWidth: 500,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 56,
    justifyContent: 'center',
  },
  correctAnswer: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  answerIcon: {
    position: 'absolute',
    right: 12,
  },
  associationContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
  },
  associationInstructions: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  associationGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  associationColumn: {
    flex: 1,
  },
  associationColumnTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  associationItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    }),
  },
  associationText: {
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  validationButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 3.84px rgba(0, 0, 0, 0.25)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }),
  },
  validationButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sentenceReorderContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
  },
  sentenceList: {
    gap: 8,
  },
  draggableSentence: {
    marginBottom: 8,
  },
  sentenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 60,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  sentenceNumber: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  sentenceNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sentenceText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  dragHandle: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  correctOrderContainer: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  correctOrderTitle: {
    marginBottom: 8,
    color: '#4CAF50',
  },
  correctOrderItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  correctOrderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    minWidth: 20,
  },
  correctOrderText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  colorLegend: {
    marginTop: 15,
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
  },
  validationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  correctAnswerSection: {
    marginBottom: 20,
  },
  correctAnswerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correctAnswerItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 5,
  },
  correctAnswerText: {
    fontSize: 14,
  },
  explanationSection: {
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorContainer: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  crosswordContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
  },
  instructions: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cluesContainer: {
    marginTop: 20,
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 3.84px rgba(0, 0, 0, 0.25)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }),
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  validationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  sentenceReorderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  sentenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  sentenceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chevronButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    }),
  },
  chevronButtonDisabled: {
    opacity: 0.3,
  },

  explanationFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  explanationHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  explanationContent: {
    paddingBottom: 15,
  },
  explanationText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  explanationReferences: {
    gap: 8,
  },
  explanationReference: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  explanationReferenceText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  explanationContinueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  explanationContinueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 