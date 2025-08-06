import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { CrosswordClue, CrosswordWord } from '../types/quiz';

interface CrosswordCluesProps {
  clues: CrosswordClue[];
  words: CrosswordWord[];
  foundWords: string[];
}

export function CrosswordClues({ clues, words, foundWords }: CrosswordCluesProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const horizontalClues = clues.filter(clue => clue.direction === 'horizontal');
  const verticalClues = clues.filter(clue => clue.direction === 'vertical');

  const isWordFound = (wordId: string) => {
    return foundWords.includes(wordId);
  };

  const getClueStyle = (wordId: string) => {
    const found = isWordFound(wordId);
    return [
      styles.clueText,
      {
        color: found ? colors.success : colors.text,
        textDecorationLine: found ? 'line-through' : 'none',
        opacity: found ? 0.7 : 1,
      },
    ];
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.primary }]}>
            Horizontal
          </ThemedText>
          {horizontalClues.map((clue) => (
            <View key={clue.id} style={styles.clueContainer}>
              <ThemedText style={[styles.clueNumber, { color: colors.primary }]}>
                {clue.number}.
              </ThemedText>
              <ThemedText style={getClueStyle(clue.wordId)}>
                {clue.definition}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: colors.primary }]}>
            Vertical
          </ThemedText>
          {verticalClues.map((clue) => (
            <View key={clue.id} style={styles.clueContainer}>
              <ThemedText style={[styles.clueNumber, { color: colors.primary }]}>
                {clue.number}.
              </ThemedText>
              <ThemedText style={getClueStyle(clue.wordId)}>
                {clue.definition}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  clueContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  clueNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    minWidth: 25,
  },
  clueText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
}); 