import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { CrosswordCell, CrosswordWord, CrosswordClue } from '../types/quiz';

interface CrosswordGridProps {
  grid: { [key: string]: CrosswordCell };
  gridSize: { rows: number; cols: number };
  words: CrosswordWord[];
  clues: CrosswordClue[];
  onWordFound?: (wordId: string, word: string) => void;
  onCellChange?: (row: number, col: number, letter: string) => void;
  isEditable?: boolean;
}

const CELL_SIZE = Math.min(Dimensions.get('window').width / 10, 35);

export function CrosswordGrid({
  grid,
  gridSize,
  words,
  clues,
  onWordFound,
  onCellChange,
  isEditable = true,
}: CrosswordGridProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const handleCellPress = (row: number, col: number) => {
    if (!isEditable) return;
    
    const cellKey = `${row},${col}`;
    const cell = grid[cellKey];
    if (!cell || cell.isBlack) return;

    setSelectedCell({ row, col });
  };

  const handleLetterInput = (letter: string) => {
    if (!selectedCell || !isEditable) return;

    const { row, col } = selectedCell;
    const cellKey = `${row},${col}`;
    const cell = grid[cellKey];
    
    if (!cell || cell.isBlack) return;

    // Mettre à jour la cellule
    cell.letter = letter.toUpperCase();
    onCellChange?.(row, col, letter.toUpperCase());

    // Vérifier si un mot est completé
    checkWordCompletion(row, col);

    // Passer à la cellule suivante
    moveToNextCell(row, col);
  };

  const moveToNextCell = (row: number, col: number) => {
    // Logique pour passer à la cellule suivante
    // Pour l'instant, on reste sur la même cellule
  };

  const checkWordCompletion = (row: number, col: number) => {
    const cellKey = `${row},${col}`;
    const cell = grid[cellKey];
    if (!cell) return;
    
    // Vérifier tous les mots qui passent par cette cellule
    cell.wordIds.forEach(wordId => {
      const word = words.find(w => w.id === wordId);
      if (!word) return;

      const wordLetters = getWordLetters(word);
      if (wordLetters.join('') === word.word) {
        onWordFound?.(wordId, word.word);
      }
    });
  };

  const getWordLetters = (word: CrosswordWord): string[] => {
    const letters: string[] = [];
    const { row: startRow, col: startCol, direction, length } = word;

    for (let i = 0; i < length; i++) {
      const row = direction === 'horizontal' ? startRow : startRow + i;
      const col = direction === 'horizontal' ? startCol + i : startCol;
      const cellKey = `${row},${col}`;
      const cell = grid[cellKey];
      letters.push(cell?.letter || '');
    }

    return letters;
  };

  const getCellStyle = (row: number, col: number) => {
    const cellKey = `${row},${col}`;
    const cell = grid[cellKey];
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    
    if (!cell) {
      return [
        styles.cell,
        {
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ];
    }
    
    return [
      styles.cell,
      {
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: cell.isBlack ? colors.text : colors.background,
        borderColor: isSelected ? colors.primary : colors.border,
        borderWidth: isSelected ? 2 : 1,
      },
    ];
  };

  const getNumberStyle = (cell: CrosswordCell) => {
    return [
      styles.cellNumber,
      {
        color: colors.text,
        fontSize: CELL_SIZE * 0.2,
      },
    ];
  };

  const getLetterStyle = (cell: CrosswordCell) => {
    return [
      styles.cellLetter,
      {
        color: colors.text,
        fontSize: CELL_SIZE * 0.4,
      },
    ];
  };

  const renderCell = (row: number, col: number) => {
    const cellKey = `${row},${col}`;
    const cell = grid[cellKey];

    return (
      <TouchableOpacity
        key={cellKey}
        style={getCellStyle(row, col)}
        onPress={() => handleCellPress(row, col)}
        disabled={!isEditable || !cell || cell.isBlack}
      >
        {cell?.number && cell.number !== null && (
          <ThemedText style={getNumberStyle(cell)}>
            {cell.number}
          </ThemedText>
        )}
        {cell?.letter && (
          <ThemedText style={getLetterStyle(cell)}>
            {cell.letter}
          </ThemedText>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: gridSize.rows }, (_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: gridSize.cols }, (_, colIndex) => 
              renderCell(rowIndex, colIndex)
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  grid: {
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cellNumber: {
    position: 'absolute',
    top: 1,
    left: 1,
    fontWeight: 'bold',
  },
  cellLetter: {
    fontWeight: 'bold',
  },
}); 