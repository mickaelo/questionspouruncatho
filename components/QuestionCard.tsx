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
  onAnswer: (selectedAnswer: number, isCorrect: boolean) => void;
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const isCorrect = answerIndex === question.correctAnswer;
    
    // Délai pour montrer la réponse correcte
    setTimeout(() => {
      onAnswer(answerIndex, isCorrect);
      setSelectedAnswer(null);
      setAnswered(false);
    }, 2000);
  };

  const getOptionStyle = (index: number) => {
    if (!answered) {
      return [
        styles.option,
        { backgroundColor: colors.background, borderColor: colors.border }
      ];
    }

    if (index === question.correctAnswer) {
      return [
        styles.option,
        styles.correctAnswer,
        { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
      ];
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
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
      return { color: colors.text };
    }

    if (index === question.correctAnswer) {
      return { color: '#FFFFFF' };
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return { color: '#FFFFFF' };
    }

    return { color: colors.text, opacity: 0.6 };
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

      {/* Options */}
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
            {answered && index === question.correctAnswer && (
              <IconSymbol 
                name="checkmark.circle.fill" 
                size={20} 
                color="#FFFFFF" 
                style={styles.answerIcon}
              />
            )}
            {answered && index === selectedAnswer && index !== question.correctAnswer && (
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
    gap: 6,
  },
  timer: {
    fontSize: 14,
    fontWeight: '600',
  },
  question: {
    fontSize: 18,
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  correctAnswer: {
    borderColor: '#4CAF50',
  },
  wrongAnswer: {
    borderColor: '#F44336',
  },
  answerIcon: {
    marginLeft: 8,
  },
  explanationContainer: {
    padding: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  explanationTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4CAF50',
  },
  explanation: {
    fontSize: 14,
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
}); 