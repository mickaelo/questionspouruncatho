import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { IconSymbol } from './ui/IconSymbol';

interface LivesSystemProps {
  lives: number;
  maxLives: number;
  onLivesDepleted?: () => void;
}

export function LivesSystem({ lives, maxLives, onLivesDepleted }: LivesSystemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const heartScales = Array.from({ length: maxLives }, () => useSharedValue(1));
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    // Animation quand une vie est perdue
    if (lives < maxLives) {
      const lostLifeIndex = maxLives - lives - 1;
      if (lostLifeIndex >= 0 && lostLifeIndex < maxLives) {
        heartScales[lostLifeIndex].value = withSequence(
          withSpring(1.3, { damping: 8, stiffness: 200 }),
          withSpring(0, { damping: 10, stiffness: 200 })
        );
      }
    }

    // Animation quand toutes les vies sont perdues
    if (lives === 0) {
      containerOpacity.value = withSequence(
        withTiming(0.5, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withTiming(0.5, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withTiming(0.5, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withDelay(500, withTiming(0, { duration: 1000 }, () => {
          runOnJS(() => {
            onLivesDepleted?.();
          })();
        }))
      );
    }
  }, [lives]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {Array.from({ length: maxLives }, (_, index) => {
        const isAlive = index < lives;
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: heartScales[index].value }],
        }));

        return (
          <Animated.View key={index} style={[styles.heartContainer, animatedStyle]}>
            <IconSymbol
              name={isAlive ? "heart.fill" : "heart"}
              size={24}
              color={isAlive ? colors.error : colors.text}
            />
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 