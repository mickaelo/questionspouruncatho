import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring
} from 'react-native-reanimated';

interface ConfettiProps {
  visible: boolean;
  onComplete?: () => void;
}

const ConfettiPiece = ({ delay, color, size, startX }: { 
  delay: number; 
  color: string; 
  size: number;
  startX: number;
}) => {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(startX);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(delay, withSpring(800, { damping: 8, stiffness: 50 }));
    translateX.value = withDelay(delay, withSpring(startX + (Math.random() - 0.5) * 200, { damping: 8, stiffness: 50 }));
    rotation.value = withDelay(delay, withRepeat(
      withSequence(
        withSpring(360, { damping: 10, stiffness: 100 }),
        withSpring(720, { damping: 10, stiffness: 100 }),
        withSpring(1080, { damping: 10, stiffness: 100 })
      ),
      -1,
      false
    ));
    opacity.value = withDelay(delay + 2000, withSpring(0, { damping: 10, stiffness: 100 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        {
          backgroundColor: color,
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
    />
  );
};

export function Confetti({ visible, onComplete }: ConfettiProps) {
  if (!visible) return null;

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: i * 50,
    color: colors[i % colors.length],
    size: Math.random() * 8 + 4,
    startX: Math.random() * 400 - 200,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {confettiPieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          delay={piece.delay}
          color={piece.color}
          size={piece.size}
          startX={piece.startX}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  confettiPiece: {
    position: 'absolute',
    borderRadius: 2,
  },
}); 