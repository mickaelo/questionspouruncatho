import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';

// Composant pour les cartes avec animation d'entrée
interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  style?: any;
  onPress?: () => void;
}

export function AnimatedCard({ children, index = 0, style, onPress }: AnimatedCardProps) {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    const delay = index * 100;
    translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 100 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View style={[style, animatedStyle]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

// Composant pour les boutons avec animation de pression
interface AnimatedButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
}

export function AnimatedButton({ children, onPress, style, disabled = false }: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
    rotation.value = withSequence(
      withTiming(-2, { duration: 100 }),
      withTiming(2, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
    >
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// Composant pour les icônes avec animation de pulsation
interface AnimatedIconProps {
  children: React.ReactNode;
  isActive?: boolean;
  style?: any;
}

export function AnimatedIcon({ children, isActive = false, style }: AnimatedIconProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
      rotation.value = withSequence(
        withTiming(-10, { duration: 150 }),
        withTiming(10, { duration: 150 }),
        withTiming(0, { duration: 150 })
      );
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

// Composant pour les badges avec animation de rebond
interface AnimatedBadgeProps {
  children: React.ReactNode;
  style?: any;
  delay?: number;
}

export function AnimatedBadge({ children, style, delay = 0 }: AnimatedBadgeProps) {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const startDelay = delay * 200;
    scale.value = withDelay(startDelay, withSequence(
      withSpring(1.3, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    ));
    rotation.value = withDelay(startDelay, withSequence(
      withTiming(-15, { duration: 200 }),
      withTiming(15, { duration: 200 }),
      withTiming(0, { duration: 200 })
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

// Composant pour les onglets avec animation de transition
interface AnimatedTabProps {
  children: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
  style?: any;
}

export function AnimatedTab({ children, isActive, onPress, style }: AnimatedTabProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1.05, { damping: 15, stiffness: 200 });
      translateY.value = withSpring(-2, { damping: 15, stiffness: 200 });
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
    }
  }, [isActive]);

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// Composant pour les notifications avec animation d'entrée
interface AnimatedNotificationProps {
  children: React.ReactNode;
  style?: any;
  onAnimationComplete?: () => void;
}

export function AnimatedNotification({ children, style, onAnimationComplete }: AnimatedNotificationProps) {
  const translateX = useSharedValue(-300);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
} 