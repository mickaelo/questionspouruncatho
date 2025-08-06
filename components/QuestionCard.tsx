import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { Question } from '../types/quiz';
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
  const [sentenceOrder, setSentenceOrder] = useState<number[]>([]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Initialiser l'ordre des phrases si c'est une question de réorganisation
  React.useEffect(() => {
    if (question.questionType === 'sentence-reorder' && question.sentences) {
      // Mélanger les phrases pour créer un ordre aléatoire
      const shuffledOrder = Array.from({ length: question.sentences.length }, (_, i) => i)
        .sort(() => Math.random() - 0.5);
      setSentenceOrder(shuffledOrder);
    }
  }, [question]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    if (question.questionType === 'multiple-choice' && question.multipleCorrectAnswers) {
      // Gestion des questions à choix multiples avec plusieurs réponses
      const newSelectedAnswers = selectedAnswers.includes(answerIndex)
        ? selectedAnswers.filter(id => id !== answerIndex)
        : [...selectedAnswers, answerIndex];
      
      setSelectedAnswers(newSelectedAnswers);
    } else {
      // Gestion des questions à choix unique
      setSelectedAnswers([answerIndex]);
      setAnswered(true);
      
      let isCorrect: boolean;
      if (Array.isArray(question.correctAnswer)) {
        isCorrect = question.correctAnswer.includes(answerIndex);
      } else {
        isCorrect = answerIndex === question.correctAnswer;
      }
      
      // Délai pour montrer la réponse correcte
      setTimeout(() => {
        onAnswer(answerIndex, isCorrect);
        setSelectedAnswers([]);
        setAnswered(false);
      }, 2000);
    }
  };

  const handleMultipleChoiceSubmit = () => {
    if (selectedAnswers.length === 0) return;
    
    setAnswered(true);
    
    let isCorrect: boolean;
    if (Array.isArray(question.correctAnswer)) {
      isCorrect = selectedAnswers.length === question.correctAnswer.length &&
        selectedAnswers.every(answer => (question.correctAnswer as number[]).includes(answer));
    } else {
      isCorrect = selectedAnswers.length === 1 && selectedAnswers[0] === question.correctAnswer;
    }
    
    setTimeout(() => {
      onAnswer(selectedAnswers, isCorrect);
      setSelectedAnswers([]);
      setAnswered(false);
    }, 2000);
  };

  const handleAssociationSelect = (leftId: string, rightId: string) => {
    if (answered) return;
    
    const newSelections = { ...associationSelections };
    if (newSelections[leftId] === rightId) {
      delete newSelections[leftId];
    } else {
      newSelections[leftId] = rightId;
    }
    
    setAssociationSelections(newSelections);
  };

  const handleAssociationSubmit = () => {
    if (Object.keys(associationSelections).length === 0) return;
    
    setAnswered(true);
    
    // Vérifier si toutes les associations sont correctes
    const isCorrect = question.associationPairs?.every(pair => {
      const selectedRight = associationSelections[pair.id];
      return selectedRight === pair.rightItem;
    }) ?? false;
    
    setTimeout(() => {
      const selectedIndices = question.associationPairs?.map((pair, index) => 
        associationSelections[pair.id] ? index : -1
      ).filter(index => index !== -1) ?? [];
      
      onAnswer(selectedIndices, isCorrect);
      setAssociationSelections({});
      setAnswered(false);
    }, 2000);
  };

  const handleSentenceReorderSubmit = () => {
    if (sentenceOrder.length === 0) return;
    
    setAnswered(true);
    
    // Vérifier si l'ordre est correct
    const correctOrder = question.correctOrder || question.correctAnswer as number[];
    const isCorrect = sentenceOrder.length === correctOrder.length &&
      sentenceOrder.every((item, index) => item === correctOrder[index]);
    
    setTimeout(() => {
      onAnswer(sentenceOrder, isCorrect);
      setSentenceOrder([]);
      setAnswered(false);
    }, 2000);
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
      
      {question.multipleCorrectAnswers && selectedAnswers.length > 0 && !answered && (
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleMultipleChoiceSubmit}
        >
          <ThemedText style={[styles.submitButtonText, { color: colors.background }]}>
            Valider ({selectedAnswers.length} sélectionné{selectedAnswers.length > 1 ? 's' : ''})
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAssociationQuestion = () => {
    if (!question.associationPairs) return null;

    return (
      <View style={styles.associationContainer}>
        <View style={styles.associationGrid}>
          {/* Colonne de gauche */}
          <View style={styles.associationColumn}>
            <ThemedText type="subtitle" style={styles.associationColumnTitle}>
              Éléments
            </ThemedText>
            {question.associationPairs.map((pair, index) => (
              <View key={pair.id} style={styles.associationItem}>
                <ThemedText style={styles.associationText}>
                  {pair.leftItem}
                </ThemedText>
              </View>
            ))}
          </View>

          {/* Colonne de droite */}
          <View style={styles.associationColumn}>
            <ThemedText type="subtitle" style={styles.associationColumnTitle}>
              Associations
            </ThemedText>
            {question.associationPairs.map((pair, index) => (
              <TouchableOpacity
                key={pair.id}
                style={[
                  styles.associationItem,
                  { 
                    backgroundColor: associationSelections[pair.id] === pair.rightItem 
                      ? colors.primary 
                      : colors.background,
                    borderColor: colors.border
                  }
                ]}
                onPress={() => handleAssociationSelect(pair.id, pair.rightItem)}
                disabled={answered}
              >
                <ThemedText style={[
                  styles.associationText,
                  { color: associationSelections[pair.id] === pair.rightItem ? colors.background : colors.text }
                ]}>
                  {pair.rightItem}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {Object.keys(associationSelections).length > 0 && !answered && (
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleAssociationSubmit}
          >
            <ThemedText style={[styles.submitButtonText, { color: colors.background }]}>
              Valider les associations
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSentenceReorderQuestion = () => {
    if (!question.sentences || sentenceOrder.length === 0) return null;

    return (
      <View style={styles.sentenceReorderContainer}>
        <ThemedText style={styles.sentenceReorderInstructions}>
          Remettez les phrases dans le bon ordre en utilisant les flèches :
        </ThemedText>
        
        <View style={styles.sentenceList}>
          {sentenceOrder.map((sentenceIndex, index) => (
            <View key={`${sentenceIndex}-${index}`} style={styles.sentenceItemContainer}>
              <View style={[
                styles.sentenceItem,
                { 
                  backgroundColor: colors.background,
                  borderColor: colors.border
                }
              ]}>
                <View style={styles.sentenceNumber}>
                  <ThemedText style={[styles.sentenceNumberText, { color: colors.tint }]}>
                    {index + 1}
                  </ThemedText>
                </View>
                <ThemedText style={[styles.sentenceText, { color: colors.text }]}>
                  {question.sentences![sentenceIndex]}
                </ThemedText>
              </View>
              
              {!answered && (
                <View style={styles.sentenceControls}>
                  {index > 0 && (
                    <TouchableOpacity
                      style={[styles.moveButton, { backgroundColor: colors.primary }]}
                      onPress={() => {
                        const newOrder = [...sentenceOrder];
                        const [movedItem] = newOrder.splice(index, 1);
                        newOrder.splice(index - 1, 0, movedItem);
                        setSentenceOrder(newOrder);
                      }}
                    >
                      <IconSymbol name="chevron.up" size={16} color={colors.background} />
                    </TouchableOpacity>
                  )}
                  {index < sentenceOrder.length - 1 && (
                    <TouchableOpacity
                      style={[styles.moveButton, { backgroundColor: colors.primary }]}
                      onPress={() => {
                        const newOrder = [...sentenceOrder];
                        const [movedItem] = newOrder.splice(index, 1);
                        newOrder.splice(index + 1, 0, movedItem);
                        setSentenceOrder(newOrder);
                      }}
                    >
                      <IconSymbol name="chevron.down" size={16} color={colors.background} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        {!answered && (
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSentenceReorderSubmit}
          >
            <ThemedText style={[styles.submitButtonText, { color: colors.background }]}>
              Valider l'ordre
            </ThemedText>
          </TouchableOpacity>
        )}

        {answered && (
          <View style={styles.correctOrderContainer}>
            <ThemedText type="subtitle" style={styles.correctOrderTitle}>
              Ordre correct :
            </ThemedText>
            {question.correctOrder?.map((sentenceIndex, index) => (
              <View key={index} style={styles.correctOrderItem}>
                <ThemedText style={styles.correctOrderNumber}>
                  {index + 1}.
                </ThemedText>
                <ThemedText style={styles.correctOrderText}>
                  {question.sentences![sentenceIndex]}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header avec progression et timer */}
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

      {/* Question */}
      <ThemedText type="subtitle" style={styles.question}>
        {question.question}
      </ThemedText>

      {/* Rendu conditionnel selon le type de question */}
      {question.questionType === 'association' ? renderAssociationQuestion() :
       question.questionType === 'sentence-reorder' ? renderSentenceReorderQuestion() :
       renderMultipleChoiceQuestion()}

      {/* Explication (visible après réponse) */}
      {answered && (
        <View style={styles.explanationContainer}>
          <ThemedText type="subtitle" style={styles.explanationTitle}>
            Explication
          </ThemedText>
          <ThemedText style={styles.explanation}>
            {question.explanation}
          </ThemedText>
          
          {/* Références */}
          <View style={styles.references}>
            {question.scripture && (
              <View style={styles.reference}>
                <IconSymbol name="book" size={14} color={colors.tint} />
                <ThemedText style={[styles.referenceText, { color: colors.tint }]}>
                  {question.scripture}
                </ThemedText>
              </View>
            )}
            {question.catechism && (
              <View style={styles.reference}>
                <IconSymbol name="doc.text" size={14} color={colors.tint} />
                <ThemedText style={[styles.referenceText, { color: colors.tint }]}>
                  {question.catechism}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  question: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
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
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  explanationTitle: {
    marginBottom: 8,
    color: '#4CAF50',
  },
  explanation: {
    lineHeight: 20,
    marginBottom: 12,
  },
  references: {
    gap: 8,
  },
  reference: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  referenceText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  associationContainer: {
    marginTop: 20,
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
  sentenceReorderContainer: {
    marginTop: 20,
  },
  sentenceReorderInstructions: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  sentenceList: {
    gap: 8,
  },
  sentenceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sentenceItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 56,
  },
  sentenceNumber: {
    width: 30,
    alignItems: 'center',
    marginRight: 10,
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
  sentenceControls: {
    flexDirection: 'row',
    gap: 4,
  },
  moveButton: {
    padding: 8,
    borderRadius: 6,
    minWidth: 32,
    alignItems: 'center',
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
}); 