import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface SuccessNotificationProps {
  visible: boolean;
  title: string;
  message: string;
  onHide?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export function SuccessNotification({ 
  visible, 
  title, 
  message, 
  onHide, 
  autoHide = true, 
  duration = 3000 
}: SuccessNotificationProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const translateY = useSharedValue(-100);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const iconScale = useSharedValue(0);
  const iconRotation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 300 });
      
      // Animation de l'icône
      iconScale.value = withDelay(200, withSequence(
        withSpring(1.3, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      ));
      iconRotation.value = withDelay(200, withSequence(
        withSpring(-15, { duration: 150 }),
        withSpring(15, { duration: 150 }),
        withSpring(0, { duration: 150 })
      ));

      if (autoHide) {
        setTimeout(() => {
          hideNotification();
        }, duration);
      }
    } else {
      hideNotification();
    }
  }, [visible]);

  const hideNotification = () => {
    translateY.value = withSpring(-100, { damping: 15, stiffness: 100 });
    scale.value = withSpring(0.8, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(() => {
        setIsVisible(false);
        onHide?.();
      })();
    });
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotation.value}deg` },
    ],
  }));

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={[styles.notification, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
        </Animated.View>
        <View style={styles.content}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            {title}
          </ThemedText>
          <ThemedText style={[styles.message, { color: colors.text }]}>
            {message}
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
}); 