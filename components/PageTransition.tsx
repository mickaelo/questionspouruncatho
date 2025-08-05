import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

interface PageTransitionProps {
  children: React.ReactNode;
  style?: any;
}

export function PageTransition({ children, style }: PageTransitionProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withDelay(100, withTiming(1, { 
      duration: 600,
      easing: Easing.out(Easing.cubic)
    }));
    translateY.value = withDelay(100, withTiming(0, { 
      duration: 600,
      easing: Easing.out(Easing.cubic)
    }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 