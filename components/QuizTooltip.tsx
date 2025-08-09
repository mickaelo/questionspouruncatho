import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

interface QuizTooltipProps {
  visible: boolean;
  quizTitle: string;
  elementType: 'church' | 'pilgrim' | 'footprint';
  onAccess: () => void;
  onClose: () => void;
  isCompleted?: boolean;
}

export function QuizTooltip({
  visible,
  quizTitle,
  elementType,
  onAccess,
  onClose,
  isCompleted = false
}: QuizTooltipProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Configuration des couleurs selon le type et l'état
  const getTypeColors = () => {
    if (isCompleted) {
      return {
        background: `${colors.primary}15`,
        border: colors.primary,
        text: colors.text,
        buttonBackground: colors.primary,
        buttonText: '#fff'
      };
    }

    switch (elementType) {
      case 'pilgrim':
        return {
          background: '#E3F2FD',
          border: '#2196F3',
          text: '#1565C0',
          buttonBackground: '#2196F3',
          buttonText: '#fff'
        };
      case 'footprint':
        return {
          background: '#FFF3E0',
          border: '#FF9800',
          text: '#E65100',
          buttonBackground: '#FF9800',
          buttonText: '#fff'
        };
      case 'church':
        return {
          background: '#E8F5E8',
          border: '#4CAF50',
          text: '#2E7D32',
          buttonBackground: '#4CAF50',
          buttonText: '#fff'
        };
      default:
        return {
          background: colors.card,
          border: colors.border,
          text: colors.text,
          buttonBackground: colors.primary,
          buttonText: '#fff'
        };
    }
  };

  const typeColors = getTypeColors();

  // Icône selon le type d'élément
  const getElementIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (elementType) {
      case 'pilgrim': return 'person-outline';
      case 'footprint': return 'footsteps-outline';
      case 'church': return 'business-outline';
      default: return 'school-outline';
    }
  };

  useEffect(() => {
    if (visible) {
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animation de sortie
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible && fadeAnim._value === 0) {
    return null;
  }

  return (
    <>
      {/* Backdrop pour fermer la tooltip */}
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        pointerEvents={visible ? 'auto' : 'none'}
      />
      
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <ThemedView
          style={[
            styles.tooltip,
            {
              backgroundColor: typeColors.background,
              borderColor: typeColors.border,
            }
          ]}
        >
          {/* Header avec icône et bouton fermer */}
          <ThemedView style={styles.header}>
            <Ionicons
              name={getElementIcon()}
              size={20}
              color={typeColors.buttonBackground}
              style={styles.headerIcon}
            />
            
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close"
                size={18}
                color={typeColors.text}
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Titre du quiz */}
          <ThemedText
            style={[
              styles.title,
              { color: typeColors.text }
            ]}
          >
            {quizTitle}
          </ThemedText>

          {/* Badge de statut */}
          {isCompleted && (
            <ThemedView style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Ionicons name="checkmark" size={12} color="#fff" />
              <ThemedText style={styles.badgeText}>Terminé</ThemedText>
            </ThemedView>
          )}

          {/* Bouton d'accès */}
          <TouchableOpacity
            onPress={onAccess}
            style={[
              styles.accessButton,
              { backgroundColor: typeColors.buttonBackground }
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCompleted ? "refresh" : "play"}
              size={16}
              color={typeColors.buttonText}
              style={styles.buttonIcon}
            />
            <ThemedText
              style={[
                styles.buttonText,
                { color: typeColors.buttonText }
              ]}
            >
              {isCompleted ? "Refaire" : "Commencer"}
            </ThemedText>
          </TouchableOpacity>

          {/* Flèche pointant vers le SVG */}
          <ThemedView
            style={[
              styles.arrow,
              { borderRightColor: typeColors.border }
            ]}
          />
        </ThemedView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    left: 100, // Positionné à droite du cercle
    top: 10,
    zIndex: 1000,
    maxWidth: 220,
  },
  tooltip: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  headerIcon: {
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  accessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  arrow: {
    position: 'absolute',
    left: -6,
    top: 30,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});
