import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';

export interface HUDMessageConfig {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'points' | 'achievement' | 'streak';
  icon?: keyof typeof Ionicons.glyphMap;
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-top' | 'center-bottom';
  style?: 'compact' | 'normal' | 'expanded';
  value?: number; // Pour afficher des points, niveaux, etc.
  prefix?: string; // Ex: "+", "Niveau ", etc.
  suffix?: string; // Ex: " pts", " XP", etc.
  color?: string;
  backgroundColor?: string;
  animation?: 'slide' | 'fade' | 'bounce' | 'pulse';
}

interface HUDMessageProps {
  config: HUDMessageConfig;
  visible: boolean;
  onComplete?: () => void;
}

export function HUDMessage({
  config,
  visible,
  onComplete
}: HUDMessageProps) {
  const [isVisible, setIsVisible] = useState(visible);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Configuration des couleurs et icônes selon le type
  const getTypeConfig = () => {
    switch (config.type) {
      case 'success':
        return {
          backgroundColor: '#4CAF50',
          textColor: '#fff',
          iconColor: '#fff',
          defaultIcon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap
        };
      case 'warning':
        return {
          backgroundColor: '#FF9800',
          textColor: '#fff',
          iconColor: '#fff',
          defaultIcon: 'warning' as keyof typeof Ionicons.glyphMap
        };
      case 'error':
        return {
          backgroundColor: '#F44336',
          textColor: '#fff',
          iconColor: '#fff',
          defaultIcon: 'close-circle' as keyof typeof Ionicons.glyphMap
        };
      case 'points':
        return {
          backgroundColor: '#FFD700',
          textColor: '#333',
          iconColor: '#333',
          defaultIcon: 'star' as keyof typeof Ionicons.glyphMap
        };
      case 'achievement':
        return {
          backgroundColor: '#9C27B0',
          textColor: '#fff',
          iconColor: '#fff',
          defaultIcon: 'trophy' as keyof typeof Ionicons.glyphMap
        };
      case 'streak':
        return {
          backgroundColor: '#FF5722',
          textColor: '#fff',
          iconColor: '#fff',
          defaultIcon: 'flame' as keyof typeof Ionicons.glyphMap
        };
      default: // info
        return {
          backgroundColor: colors.tint,
          textColor: '#fff',
          iconColor: '#fff',
          defaultIcon: 'information-circle' as keyof typeof Ionicons.glyphMap
        };
    }
  };

  const typeConfig = getTypeConfig();

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (isVisible) {
      // Animation d'entrée
      const animations = [];
      
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      );

      switch (config.animation) {
        case 'slide':
          animations.push(
            Animated.spring(slideAnim, {
              toValue: 0,
              tension: 100,
              friction: 8,
              useNativeDriver: true,
            })
          );
          break;
        case 'bounce':
          animations.push(
            Animated.sequence([
              Animated.spring(scaleAnim, {
                toValue: 1.2,
                tension: 200,
                friction: 4,
                useNativeDriver: true,
              }),
              Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 200,
                friction: 8,
                useNativeDriver: true,
              }),
            ])
          );
          break;
        case 'pulse':
          scaleAnim.setValue(1);
          animations.push(
            Animated.loop(
              Animated.sequence([
                Animated.timing(pulseAnim, {
                  toValue: 1.1,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
              { iterations: 2 }
            )
          );
          break;
        default: // fade
          scaleAnim.setValue(1);
          break;
      }

      Animated.parallel(animations).start();

      // Auto-dismiss
      if (config.duration !== 0) {
        setTimeout(() => {
          handleComplete();
        }, config.duration || 3000);
      }
    }
  }, [isVisible]);

  const handleComplete = () => {
    // Animation de sortie
    const animations = [
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ];

    switch (config.animation) {
      case 'slide':
        animations.push(
          Animated.timing(slideAnim, {
            toValue: -50,
            duration: 200,
            useNativeDriver: true,
          })
        );
        break;
      case 'bounce':
      case 'pulse':
        animations.push(
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
          })
        );
        break;
    }

    Animated.parallel(animations).start(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    });
  };

  const getPositionStyle = () => {
    const margin = 16;
    
    switch (config.position) {
      case 'top-left':
        return {
          position: 'absolute' as const,
          top: margin + 40, // Compte pour la status bar
          left: margin,
        };
      case 'top-right':
        return {
          position: 'absolute' as const,
          top: margin + 40,
          right: margin,
        };
      case 'bottom-left':
        return {
          position: 'absolute' as const,
          bottom: margin + 80, // Compte pour la tab bar
          left: margin,
        };
      case 'bottom-right':
        return {
          position: 'absolute' as const,
          bottom: margin + 80,
          right: margin,
        };
      case 'center-top':
        return {
          position: 'absolute' as const,
          top: margin + 40,
          left: '50%' as any,
          transform: [{ translateX: -100 }], // Approximation pour centrer
        };
      case 'center-bottom':
        return {
          position: 'absolute' as const,
          bottom: margin + 80,
          left: '50%' as any,
          transform: [{ translateX: -100 }],
        };
      default:
        return {
          position: 'absolute' as const,
          bottom: margin + 80,
          left: margin,
        };
    }
  };

  const getContentTransform = () => {
    const transforms = [];

    switch (config.animation) {
      case 'slide':
        transforms.push({ translateY: slideAnim });
        break;
      case 'bounce':
        transforms.push({ scale: scaleAnim });
        break;
      case 'pulse':
        transforms.push({ scale: pulseAnim });
        break;
    }

    return transforms;
  };

  const getStyleSize = () => {
    switch (config.style) {
      case 'compact':
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          minHeight: 24,
        };
      case 'expanded':
        return {
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderRadius: 16,
          minHeight: 48,
        };
      default: // normal
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 14,
          minHeight: 32,
        };
    }
  };

  const getFontSize = () => {
    switch (config.style) {
      case 'compact': return 12;
      case 'expanded': return 16;
      default: return 14;
    }
  };

  const getIconSize = () => {
    switch (config.style) {
      case 'compact': return 16;
      case 'expanded': return 24;
      default: return 18;
    }
  };

  if (!isVisible) {
    return null;
  }

  // Construire le texte affiché
  const displayText = config.value !== undefined 
    ? `${config.prefix || ''}${config.value}${config.suffix || ''}`
    : config.message;

  return (
    <Animated.View
      style={[
        getPositionStyle(),
        {
          opacity: fadeAnim,
          transform: getContentTransform(),
          zIndex: 1000,
          pointerEvents: 'none',
        }
      ]}
    >
      <View
        style={[
          getStyleSize(),
          {
            backgroundColor: config.backgroundColor || typeConfig.backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }
        ]}
      >
        {/* Icône */}
        {(config.icon || typeConfig.defaultIcon) && (
          <Ionicons
            name={config.icon || typeConfig.defaultIcon}
            size={getIconSize()}
            color={config.color || typeConfig.iconColor}
            style={{
              marginRight: config.style === 'compact' ? 4 : 8,
            }}
          />
        )}

        {/* Texte */}
        <Text
          style={{
            fontSize: getFontSize(),
            fontWeight: '600',
            color: config.color || typeConfig.textColor,
          }}
        >
          {displayText}
        </Text>
      </View>
    </Animated.View>
  );
}

// Hook pour gérer multiple HUD messages
export function useHUDMessages() {
  const [messages, setMessages] = useState<Array<HUDMessageConfig & { visible: boolean }>>([]);

  const showMessage = (config: Omit<HUDMessageConfig, 'id'>) => {
    const id = Date.now().toString();
    const newMessage = {
      ...config,
      id,
      visible: true,
    };

    setMessages(prev => [...prev, newMessage]);

    // Auto-remove après la durée spécifiée
    setTimeout(() => {
      removeMessage(id);
    }, config.duration || 3000);

    return id;
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const clearAllMessages = () => {
    setMessages([]);
  };

  // Méthodes de convenance
  const showPoints = (points: number, position?: HUDMessageConfig['position']) => {
    return showMessage({
      type: 'points',
      value: points,
      prefix: '+',
      suffix: ' pts',
      position: position || 'top-right',
      animation: 'bounce',
      duration: 2000,
    });
  };

  const showAchievement = (title: string, position?: HUDMessageConfig['position']) => {
    return showMessage({
      type: 'achievement',
      message: title,
      position: position || 'center-top',
      animation: 'pulse',
      duration: 3000,
      style: 'expanded',
    });
  };

  const showStreak = (streak: number, position?: HUDMessageConfig['position']) => {
    return showMessage({
      type: 'streak',
      value: streak,
      prefix: 'Série de ',
      suffix: ' !',
      position: position || 'top-left',
      animation: 'bounce',
      duration: 2500,
    });
  };

  return {
    messages,
    showMessage,
    removeMessage,
    clearAllMessages,
    showPoints,
    showAchievement,
    showStreak,
  };
}
