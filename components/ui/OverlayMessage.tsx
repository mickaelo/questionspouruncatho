import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Pressable, View } from 'react-native';

export interface OverlayMessageConfig {
  id: string;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  icon?: keyof typeof Ionicons.glyphMap;
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
  backdrop?: boolean;
  backdropOpacity?: number;
  dismissible?: boolean;
  actions?: Array<{
    text: string;
    onPress: () => void;
    style?: 'default' | 'primary' | 'danger';
  }>;
  customContent?: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'bounce';
}

interface OverlayMessageProps {
  config: OverlayMessageConfig;
  visible: boolean;
  onDismiss: () => void;
}

export function OverlayMessage({
  config,
  visible,
  onDismiss
}: OverlayMessageProps) {
  const [isVisible, setIsVisible] = useState(visible);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenDimensions = Dimensions.get('window');

  // Configuration des couleurs selon le type
  const getTypeConfig = () => {
    switch (config.type) {
      case 'success':
        return {
          background: '#E8F5E8',
          border: '#4CAF50',
          iconColor: '#4CAF50',
          titleColor: '#2E7D32',
          defaultIcon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap
        };
      case 'warning':
        return {
          background: '#FFF3E0',
          border: '#FF9800',
          iconColor: '#FF9800',
          titleColor: '#E65100',
          defaultIcon: 'warning' as keyof typeof Ionicons.glyphMap
        };
      case 'error':
        return {
          background: '#FFEBEE',
          border: '#F44336',
          iconColor: '#F44336',
          titleColor: '#C62828',
          defaultIcon: 'close-circle' as keyof typeof Ionicons.glyphMap
        };
      case 'achievement':
        return {
          background: '#F3E5F5',
          border: '#9C27B0',
          iconColor: '#9C27B0',
          titleColor: '#6A1B9A',
          defaultIcon: 'trophy' as keyof typeof Ionicons.glyphMap
        };
      default: // info
        return {
          background: colors.card,
          border: colors.border,
          iconColor: colors.tint,
          titleColor: colors.text,
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
        case 'scale':
          animations.push(
            Animated.spring(scaleAnim, {
              toValue: 1,
              tension: 300,
              friction: 20,
              useNativeDriver: true,
            })
          );
          break;
        case 'bounce':
          animations.push(
            Animated.sequence([
              Animated.spring(bounceAnim, {
                toValue: 1.2,
                tension: 200,
                friction: 3,
                useNativeDriver: true,
              }),
              Animated.spring(bounceAnim, {
                toValue: 1,
                tension: 200,
                friction: 8,
                useNativeDriver: true,
              }),
            ])
          );
          break;
        default: // fade
          break;
      }

      Animated.parallel(animations).start();

      // Auto-dismiss si duration spécifiée
      if (config.duration && config.duration > 0) {
        setTimeout(() => {
          handleDismiss();
        }, config.duration);
      }
    }
  }, [isVisible]);

  const handleDismiss = () => {
    if (!config.dismissible && !config.duration) return;

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
            toValue: config.position === 'top' ? -100 : 100,
            duration: 200,
            useNativeDriver: true,
          })
        );
        break;
      case 'scale':
        animations.push(
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
          })
        );
        break;
      case 'bounce':
        animations.push(
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          })
        );
        break;
    }

    Animated.parallel(animations).start(() => {
      setIsVisible(false);
      onDismiss();
    });
  };

  const getContentTransform = () => {
    const transforms = [];

    switch (config.animation) {
      case 'slide':
        transforms.push({ translateY: slideAnim });
        break;
      case 'scale':
        transforms.push({ scale: scaleAnim });
        break;
      case 'bounce':
        transforms.push({ scale: bounceAnim });
        break;
    }

    return transforms;
  };

  const getPositionStyle = () => {
    const margin = 20;
    const maxWidth = Math.min(screenDimensions.width - margin * 2, 400);

    switch (config.position) {
      case 'top':
        return {
          position: 'absolute' as const,
          top: 60,
          left: margin,
          right: margin,
          maxWidth,
          alignSelf: 'center' as const,
        };
      case 'bottom':
        return {
          position: 'absolute' as const,
          bottom: 60,
          left: margin,
          right: margin,
          maxWidth,
          alignSelf: 'center' as const,
        };
      default: // center
        return {
          position: 'absolute' as const,
          top: '50%',
          left: margin,
          right: margin,
          maxWidth,
          alignSelf: 'center' as const,
          marginTop: -100, // Approximation pour centrer
        };
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      {/* Backdrop */}
      {config.backdrop && (
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: `rgba(0, 0, 0, ${config.backdropOpacity || 0.5})`,
            opacity: fadeAnim,
          }}
        >
          {config.dismissible && (
            <Pressable
              style={{ flex: 1 }}
              onPress={handleDismiss}
            />
          )}
        </Animated.View>
      )}

      {/* Message content */}
      <Animated.View
        style={[
          getPositionStyle(),
          {
            opacity: fadeAnim,
            transform: getContentTransform(),
            pointerEvents: 'auto',
          }
        ]}
      >
        <ThemedView
          style={{
            backgroundColor: typeConfig.background,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: typeConfig.border,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {/* Header avec icône et titre */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: config.title || config.customContent ? 16 : 0,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: typeConfig.iconColor + '20',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: config.title ? 16 : 0,
              }}
            >
              <Ionicons
                name={config.icon || typeConfig.defaultIcon}
                size={24}
                color={typeConfig.iconColor}
              />
            </View>

            {config.title && (
              <View style={{ flex: 1 }}>
                <ThemedText
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: typeConfig.titleColor,
                  }}
                >
                  {config.title}
                </ThemedText>
              </View>
            )}

            {config.dismissible && (
              <Pressable
                onPress={handleDismiss}
                style={{
                  padding: 8,
                  marginLeft: 8,
                }}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={colors.text}
                  style={{ opacity: 0.6 }}
                />
              </Pressable>
            )}
          </View>

          {/* Contenu personnalisé ou message */}
          {config.customContent ? (
            config.customContent
          ) : (
            <ThemedText
              style={{
                fontSize: 16,
                lineHeight: 24,
                color: colors.text,
                textAlign: config.title ? 'left' : 'center',
                marginBottom: config.actions?.length ? 20 : 0,
              }}
            >
              {config.message}
            </ThemedText>
          )}

          {/* Actions */}
          {config.actions && config.actions.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 12,
              }}
            >
              {config.actions.map((action, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    action.onPress();
                    handleDismiss();
                  }}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor:
                      action.style === 'primary'
                        ? typeConfig.iconColor
                        : action.style === 'danger'
                        ? '#F44336'
                        : 'transparent',
                    borderWidth: action.style === 'default' ? 1 : 0,
                    borderColor: colors.border,
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color:
                        action.style === 'primary' || action.style === 'danger'
                          ? '#fff'
                          : colors.text,
                    }}
                  >
                    {action.text}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          )}
        </ThemedView>
      </Animated.View>
    </Modal>
  );
}
