import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface LoadingBarProps {
  visible: boolean;
  height?: number;
  color?: string;
  duration?: number;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  visible,
  height = 3,
  color,
  duration = 2000
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const progressAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const barColor = color || colors.primary;

  useEffect(() => {
    if (visible) {
      // Faire apparaître la barre
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();

      // Animer la progression
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      // Faire disparaître la barre
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, duration, progressAnim, opacityAnim]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            backgroundColor: barColor,
            height,
            opacity: opacityAnim,
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: 'transparent',
  },
  progressBar: {
    borderRadius: 0,
  },
}); 