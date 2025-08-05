import { useCallback } from 'react';
import { useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';

export const useAnimations = () => {
  const createFadeInAnimation = useCallback((delay = 0) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    const startAnimation = () => {
      opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
      translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
    };

    return { opacity, translateY, startAnimation };
  }, []);

  const createScaleAnimation = useCallback(() => {
    const scale = useSharedValue(1);

    const pressIn = () => {
      scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
    };

    const pressOut = () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    };

    const bounce = () => {
      scale.value = withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    };

    return { scale, pressIn, pressOut, bounce };
  }, []);

  const createRotationAnimation = useCallback(() => {
    const rotation = useSharedValue(0);

    const rotate = (degrees: number = 360) => {
      rotation.value = withSpring(degrees, { damping: 10, stiffness: 100 });
    };

    const wiggle = () => {
      rotation.value = withSequence(
        withSpring(-10, { duration: 100 }),
        withSpring(10, { duration: 100 }),
        withSpring(0, { duration: 100 })
      );
    };

    const reset = () => {
      rotation.value = withSpring(0, { damping: 10, stiffness: 100 });
    };

    return { rotation, rotate, wiggle, reset };
  }, []);

  const createSlideAnimation = useCallback((direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const getInitialValue = () => {
      switch (direction) {
        case 'left': return 100;
        case 'right': return -100;
        case 'up': return 50;
        case 'down': return -50;
        default: return 0;
      }
    };

    const initialValue = getInitialValue();

    if (direction === 'left' || direction === 'right') {
      translateX.value = initialValue;
    } else {
      translateY.value = initialValue;
    }

    const slideIn = (delay = 0) => {
      if (direction === 'left' || direction === 'right') {
        translateX.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
      } else {
        translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 100 }));
      }
    };

    const slideOut = (delay = 0) => {
      if (direction === 'left' || direction === 'right') {
        translateX.value = withDelay(delay, withSpring(initialValue, { damping: 15, stiffness: 100 }));
      } else {
        translateY.value = withDelay(delay, withSpring(initialValue, { damping: 15, stiffness: 100 }));
      }
    };

    return { translateX, translateY, slideIn, slideOut };
  }, []);

  const createPulseAnimation = useCallback(() => {
    const scale = useSharedValue(1);

    const pulse = () => {
      scale.value = withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    };

    const continuousPulse = () => {
      scale.value = withSequence(
        withSpring(1.05, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 }),
        withSpring(1.05, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    };

    return { scale, pulse, continuousPulse };
  }, []);

  const createShakeAnimation = useCallback(() => {
    const translateX = useSharedValue(0);

    const shake = () => {
      translateX.value = withSequence(
        withSpring(-10, { duration: 50 }),
        withSpring(10, { duration: 50 }),
        withSpring(-10, { duration: 50 }),
        withSpring(10, { duration: 50 }),
        withSpring(0, { duration: 50 })
      );
    };

    return { translateX, shake };
  }, []);

  return {
    createFadeInAnimation,
    createScaleAnimation,
    createRotationAnimation,
    createSlideAnimation,
    createPulseAnimation,
    createShakeAnimation,
  };
}; 