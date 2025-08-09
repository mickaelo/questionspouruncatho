import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface SpiritualPathHintProps {
  message: string;
  type?: 'info' | 'tip' | 'warning' | 'success';
  visible?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
  onDismiss?: () => void;
  elementType: 'church' | 'pilgrim' | 'footprint';
}

export function SpiritualPathHint({
  message,
  type = 'info',
  visible = true,
  autoHide = true,
  autoHideDelay = 2000,
  onDismiss,
  elementType
}: SpiritualPathHintProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Configuration des couleurs selon le type
  const getTypeColors = () => {
    switch (type) {
      case 'tip':
        return {
          background: '#E3F2FD',
          border: '#2196F3',
          text: '#1565C0',
          iconColor: '#2196F3'
        };
      case 'warning':
        return {
          background: '#FFF3E0',
          border: '#FF9800',
          text: '#E65100',
          iconColor: '#FF9800'
        };
      case 'success':
        return {
          background: '#E8F5E8',
          border: '#4CAF50',
          text: '#2E7D32',
          iconColor: '#4CAF50'
        };
      default: // info
        return {
          background: colors.card,
          border: colors.border,
          text: colors.text,
          iconColor: colors.primary
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
      default: return 'information-circle-outline';
    }
  };

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (isVisible) {
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide si activé
      if (autoHide) {
        timeoutRef.current = setTimeout(() => {
          hideHint();
        }, autoHideDelay);
      }
    } else {
      // Animation de sortie
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const hideHint = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(onDismiss, 200); // Attendre la fin de l'animation
    }
  };

  if (!isVisible && fadeAnim._value === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <ThemedView
        style={[
          styles.hintBox,
          {
            backgroundColor: typeColors.background,
            borderColor: typeColors.border,
          }
        ]}
      >
        
        <ThemedText
          style={[
            styles.message,
            { color: typeColors.text }
          ]}
        >
          {message}
        </ThemedText>

        {/* Petite flèche pointant vers le SVG */}
        <ThemedView
          style={[
            styles.arrow,
            { borderRightColor: typeColors.border  }
          ]}
        />
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 100, // Positionné à droite du cercle (80px + 20px de marge)
    top: 0,
    zIndex: 1000,
    maxWidth: 200,
  },
  hintBox: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    marginRight: 6,
  },
  message: {
    flex: 1,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
  },
  arrow: {
    position: 'absolute',
    left: -6,
    top: '50%',
    marginTop: -3,
    width: 0,
    height: 0,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});
