import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Pressable, View } from 'react-native';

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string; // ID de l'élément à cibler
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  highlightTarget?: boolean;
  image?: string;
  action?: 'tap' | 'swipe' | 'scroll' | 'none';
  actionDescription?: string;
}

interface TutorialPopupProps {
  steps: TutorialStep[];
  visible: boolean;
  onComplete: () => void;
  onSkip?: () => void;
  currentStep?: number;
  allowSkip?: boolean;
  overlayOpacity?: number;
}

export function TutorialPopup({
  steps,
  visible,
  onComplete,
  onSkip,
  currentStep = 0,
  allowSkip = true,
  overlayOpacity = 0.8
}: TutorialPopupProps) {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [isVisible, setIsVisible] = useState(visible);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenDimensions = Dimensions.get('window');

  const currentStepData = steps[activeStep];

  useEffect(() => {
    setIsVisible(visible);
    if (visible) {
      setActiveStep(currentStep);
    }
  }, [visible, currentStep]);

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
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, activeStep]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      // Animation vers l'étape suivante
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      setActiveStep(activeStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      // Animation vers l'étape précédente
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      setActiveStep(activeStep - 1);
    }
  };

  const handleComplete = () => {
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
    ]).start(() => {
      setIsVisible(false);
      onComplete();
    });
  };

  const handleSkip = () => {
    if (onSkip) {
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
      ]).start(() => {
        setIsVisible(false);
        onSkip();
      });
    }
  };

  const getActionIcon = () => {
    switch (currentStepData?.action) {
      case 'tap': return 'finger-print-outline';
      case 'swipe': return 'swap-horizontal-outline';
      case 'scroll': return 'scroll-outline';
      default: return null;
    }
  };

  const getPositionStyle = () => {
    const popupWidth = Math.min(screenDimensions.width * 0.9, 400);
    const popupHeight = 280;
    
    let style: any = {
      width: popupWidth,
      minHeight: popupHeight,
    };

    switch (currentStepData?.position) {
      case 'top':
        style = {
          ...style,
          position: 'absolute',
          top: 100,
          left: (screenDimensions.width - popupWidth) / 2,
        };
        break;
      case 'bottom':
        style = {
          ...style,
          position: 'absolute',
          bottom: 100,
          left: (screenDimensions.width - popupWidth) / 2,
        };
        break;
      case 'left':
        style = {
          ...style,
          position: 'absolute',
          left: 20,
          top: (screenDimensions.height - popupHeight) / 2,
        };
        break;
      case 'right':
        style = {
          ...style,
          position: 'absolute',
          right: 20,
          top: (screenDimensions.height - popupHeight) / 2,
        };
        break;
      default: // center
        style = {
          ...style,
          position: 'absolute',
          top: (screenDimensions.height - popupHeight) / 2,
          left: (screenDimensions.width - popupWidth) / 2,
        };
    }

    return style;
  };

  if (!isVisible || !currentStepData) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      {/* Overlay semi-transparent */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          opacity: fadeAnim,
        }}
      >
        {/* Popup principal */}
        <Animated.View
          style={[
            getPositionStyle(),
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ],
            }
          ]}
        >
          <ThemedView
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 10,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {/* Header avec bouton skip */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <View style={{
                backgroundColor: colors.tint,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}>
                <ThemedText style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#fff',
                }}>
                  {activeStep + 1} / {steps.length}
                </ThemedText>
              </View>
              
              {allowSkip && (
                <Pressable
                  onPress={handleSkip}
                  style={{
                    padding: 8,
                  }}
                >
                  <ThemedText style={{
                    fontSize: 14,
                    color: colors.text,
                    opacity: 0.7,
                  }}>
                    Passer
                  </ThemedText>
                </Pressable>
              )}
            </View>

            {/* Icône d'action */}
            {getActionIcon() && (
              <View style={{
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.tint + '20',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Ionicons
                    name={getActionIcon()!}
                    size={28}
                    color={colors.tint}
                  />
                </View>
              </View>
            )}

            {/* Titre */}
            <ThemedText style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 12,
              color: colors.text,
            }}>
              {currentStepData.title}
            </ThemedText>

            {/* Description */}
            <ThemedText style={{
              fontSize: 16,
              lineHeight: 24,
              textAlign: 'center',
              marginBottom: 20,
              color: colors.text,
              opacity: 0.8,
            }}>
              {currentStepData.description}
            </ThemedText>

            {/* Description de l'action */}
            {currentStepData.actionDescription && (
              <View style={{
                backgroundColor: colors.background,
                padding: 12,
                borderRadius: 8,
                marginBottom: 20,
              }}>
                <ThemedText style={{
                  fontSize: 14,
                  textAlign: 'center',
                  color: colors.tint,
                  fontWeight: '500',
                }}>
                  {currentStepData.actionDescription}
                </ThemedText>
              </View>
            )}

            {/* Boutons navigation */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Pressable
                onPress={handlePrevious}
                disabled={activeStep === 0}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                  opacity: activeStep === 0 ? 0.5 : 1,
                }}
              >
                <ThemedText style={{
                  fontSize: 16,
                  color: colors.text,
                  fontWeight: '500',
                }}>
                  Précédent
                </ThemedText>
              </Pressable>

              {/* Indicateurs de progression */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                {steps.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: index === activeStep ? colors.tint : colors.border,
                      marginHorizontal: 4,
                    }}
                  />
                ))}
              </View>

              <Pressable
                onPress={handleNext}
                style={{
                  backgroundColor: colors.tint,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: '600',
                }}>
                  {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                </ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
