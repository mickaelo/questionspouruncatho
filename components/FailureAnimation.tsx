import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface FailureAnimationProps {
  visible: boolean;
  onAnimationComplete?: () => void;
}

export function FailureAnimation({ visible, onAnimationComplete }: FailureAnimationProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animation d'entrée
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 300 });

      // Animation de secousse
      shakeX.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 100 }),
          withTiming(10, { duration: 100 }),
          withTiming(-10, { duration: 100 }),
          withTiming(10, { duration: 100 }),
          withTiming(-5, { duration: 100 }),
          withTiming(5, { duration: 100 }),
          withTiming(0, { duration: 100 })
        ),
        3,
        false
      );

      // Animation de rotation
      rotation.value = withSequence(
        withTiming(-15, { duration: 200 }),
        withTiming(15, { duration: 200 }),
        withTiming(-10, { duration: 200 }),
        withTiming(10, { duration: 200 }),
        withTiming(0, { duration: 200 })
      );

      // Animation de sortie après 3 secondes
      setTimeout(() => {
        scale.value = withSpring(0, { damping: 15, stiffness: 100 });
        opacity.value = withTiming(0, { duration: 500 }, () => {
          runOnJS(() => {
            onAnimationComplete?.();
          })();
        });
      }, 3000);
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: shakeX.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={[styles.content, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <IconSymbol
          name="xmark.circle.fill"
          size={64}
          color={colors.error}
        />
        <ThemedText style={[styles.title, { color: colors.text }]}>
          Échec !
        </ThemedText>
        <ThemedText style={[styles.message, { color: colors.text }]}>
          Vous avez perdu toutes vos vies
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.text }]}>
          Retour à l'accueil...
        </ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    fontStyle: 'italic',
  },
}); 