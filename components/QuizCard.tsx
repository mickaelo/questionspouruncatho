import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { categoryIcons, categoryNames } from '../data/questions';
import { useColorScheme } from '../hooks/useColorScheme';
import { Quiz } from '../types/quiz';
import { AnimatedBadge, AnimatedCard } from './AnimatedComponents';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface QuizCardProps {
  quiz: Quiz;
  onPress: (quiz: Quiz) => void;
  completed?: boolean;
  score?: number;
  index?: number;
}

export function QuizCard({ quiz, onPress, completed, score, index = 0 }: QuizCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return colors.success;
      case 'moyen': return colors.warning;
      case 'difficile': return colors.error;
      default: return colors.text;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'Facile';
      case 'moyen': return 'Moyen';
      case 'difficile': return 'Difficile';
      default: return difficulty;
    }
  };

  return (
    <AnimatedCard
      index={index}
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        }
      ]}
      onPress={() => onPress(quiz)}
    >
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <MaterialIcons 
            name={categoryIcons[quiz.category] as any || 'help'} 
            size={20} 
            color={colors.primary} 
          />
          <ThemedText style={[styles.category, { color: colors.primary }]}>
            {categoryNames[quiz.category]}
          </ThemedText>
        </View>
        {completed && (
          <AnimatedBadge style={styles.completedBadge} delay={index}>
            <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
            <ThemedText style={[styles.score, { color: colors.success }]}>
              {score}%
            </ThemedText>
          </AnimatedBadge>
        )}
      </View>

      <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
        {quiz.title}
      </ThemedText>

      <ThemedText style={[styles.description, { color: colors.text }]}>
        {quiz.description}
      </ThemedText>

      <View style={styles.footer}>
        <View style={styles.stats}>
          <ThemedText style={[styles.stat, { color: colors.text }]}>
            {quiz.questions?.length || 0} questions
          </ThemedText>
          {quiz.timeLimit && (
            <ThemedText style={[styles.stat, { color: colors.text }]}>
              {quiz.timeLimit} min
            </ThemedText>
          )}
        </View>

        <View style={styles.difficultyContainer}>
          <View 
            style={[
              styles.difficultyDot, 
              { backgroundColor: getDifficultyColor(quiz.questions?.[0]?.difficulty || 'moyen') }
            ]} 
          />
          <ThemedText style={[styles.difficulty, { color: colors.text }]}>
            {getDifficultyText(quiz.questions?.[0]?.difficulty || 'moyen')}
          </ThemedText>
        </View>
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 139, 34, 0.1)',
  },
  score: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    marginBottom: 8,
    fontSize: 18,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '500',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  difficulty: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 