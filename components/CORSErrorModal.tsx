import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { IconSymbol } from './ui/IconSymbol';
import { getCORSSuggestions } from '../config/web';

interface CORSErrorModalProps {
  visible: boolean;
  onClose: () => void;
  errorMessage?: string;
}

export function CORSErrorModal({ visible, onClose, errorMessage }: CORSErrorModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const suggestions = getCORSSuggestions();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={styles.header}>
            <IconSymbol name="exclamationmark.triangle.fill" size={32} color={colors.error} />
            <ThemedText style={[styles.title, { color: colors.text }]}>
              Erreur de politique CORS
            </ThemedText>
          </View>

          {/* Error Message */}
          {errorMessage && (
            <ThemedText style={[styles.errorMessage, { color: colors.text }]}>
              {errorMessage}
            </ThemedText>
          )}

          {/* Suggestions */}
          <View style={styles.suggestionsContainer}>
            <ThemedText style={[styles.suggestionsTitle, { color: colors.text }]}>
              Solutions suggérées :
            </ThemedText>
            <ScrollView style={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <ThemedText style={[styles.suggestionText, { color: colors.text }]}>
                    {suggestion}
                  </ThemedText>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: colors.tint }]}
            onPress={onClose}
          >
            <ThemedText style={[styles.closeButtonText, { color: colors.background }]}>
              Fermer
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  suggestionsContainer: {
    marginBottom: 24,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  suggestionText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 