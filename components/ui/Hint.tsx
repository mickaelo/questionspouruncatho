import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable } from 'react-native';

interface HintProps {
  message: string;
  type?: 'info' | 'tip' | 'warning' | 'success';
  icon?: keyof typeof Ionicons.glyphMap;
  visible?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
  onDismiss?: () => void;
  position?: 'top' | 'bottom' | 'center';
  style?: any;
}

export function Hint({
  message,
  type = 'info',
  icon,
  visible = true,
  autoHide = false,
  autoHideDelay = 3000,
  onDismiss,
  position = 'bottom',
  style
}: HintProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
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
          iconColor: colors.text
        };
    }
  };

  const typeColors = getTypeColors();

  // Icône par défaut selon le type
  const getDefaultIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'tip': return 'bulb-outline';
      case 'warning': return 'warning-outline';
      case 'success': return 'checkmark-circle-outline';
      default: return 'information-circle-outline';
    }
  };

  const displayIcon = icon || getDefaultIcon();

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
        Animated.spring(slideAnim, {
          toValue: 0,
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
        Animated.timing(slideAnim, {
          toValue: position === 'top' ? -50 : 50,
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

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return {
          position: 'absolute' as const,
          top: 60,
          left: 16,
          right: 16,
          zIndex: 1000,
        };
      case 'center':
        return {
          position: 'absolute' as const,
          top: '50%',
          left: 16,
          right: 16,
          marginTop: -30,
          zIndex: 1000,
        };
      default: // bottom
        return {
          position: 'absolute' as const,
          bottom: Platform.OS === 'web' ? 20 : 100,
          left: 16,
          right: 16,
          zIndex: 1000,
        };
    }
  };

  if (!isVisible && fadeAnim._value === 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        getPositionStyle(),
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        style
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <ThemedView
        style={{
          backgroundColor: typeColors.background,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: typeColors.border,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Ionicons
          name={displayIcon}
          size={24}
          color={typeColors.iconColor}
          style={{ marginRight: 12 }}
        />
        
        <ThemedText
          style={{
            flex: 1,
            fontSize: 14,
            lineHeight: 20,
            color: typeColors.text,
          }}
        >
          {message}
        </ThemedText>

        {onDismiss && (
          <Pressable
            onPress={hideHint}
            style={{
              padding: 4,
              marginLeft: 8,
            }}
          >
            <Ionicons
              name="close"
              size={18}
              color={typeColors.iconColor}
            />
          </Pressable>
        )}
      </ThemedView>
    </Animated.View>
  );
}

// Hook pour gérer les hints globalement
export function useHint() {
  const [hints, setHints] = useState<Array<{
    id: string;
    message: string;
    type?: 'info' | 'tip' | 'warning' | 'success';
    autoHide?: boolean;
    autoHideDelay?: number;
    position?: 'top' | 'bottom' | 'center';
  }>>([]);

  const showHint = (
    message: string,
    options?: {
      type?: 'info' | 'tip' | 'warning' | 'success';
      autoHide?: boolean;
      autoHideDelay?: number;
      position?: 'top' | 'bottom' | 'center';
    }
  ) => {
    const id = Date.now().toString();
    const newHint = {
      id,
      message,
      ...options,
    };

    setHints(prev => [...prev, newHint]);

    // Auto-remove si autoHide est activé
    if (options?.autoHide !== false) {
      setTimeout(() => {
        hideHint(id);
      }, options?.autoHideDelay || 3000);
    }

    return id;
  };

  const hideHint = (id: string) => {
    setHints(prev => prev.filter(hint => hint.id !== id));
  };

  const hideAllHints = () => {
    setHints([]);
  };

  return {
    hints,
    showHint,
    hideHint,
    hideAllHints,
  };
}
