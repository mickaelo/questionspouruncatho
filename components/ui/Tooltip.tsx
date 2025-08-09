import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, Pressable, View } from 'react-native';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  trigger?: 'hover' | 'press' | 'focus';
  delay?: number;
  maxWidth?: number;
  disabled?: boolean;
  style?: any;
}

export function Tooltip({
  content,
  children,
  position = 'auto',
  trigger = Platform.OS === 'web' ? 'hover' : 'press',
  delay = 500,
  maxWidth = 250,
  disabled = false,
  style
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, placement: 'top' });
  const [childLayout, setChildLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const childRef = useRef<View>(null);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenDimensions = Dimensions.get('window');

  // Calculer la position optimale du tooltip
  const calculatePosition = (layout: any) => {
    const { x, y, width, height } = layout;
    const tooltipWidth = Math.min(maxWidth, screenDimensions.width * 0.8);
    const tooltipHeight = 40; // Hauteur estimée
    const margin = 8;

    let finalX = x + width / 2 - tooltipWidth / 2;
    let finalY = y - tooltipHeight - margin;
    let placement = 'top';

    // Ajustements selon la position demandée et l'espace disponible
    if (position === 'bottom' || (position === 'auto' && finalY < 20)) {
      finalY = y + height + margin;
      placement = 'bottom';
    }

    if (position === 'left' || (position === 'auto' && finalX < 10)) {
      finalX = x - tooltipWidth - margin;
      finalY = y + height / 2 - tooltipHeight / 2;
      placement = 'left';
    }

    if (position === 'right' || (position === 'auto' && finalX + tooltipWidth > screenDimensions.width - 10)) {
      finalX = x + width + margin;
      finalY = y + height / 2 - tooltipHeight / 2;
      placement = 'right';
    }

    // Ajustements finaux pour rester dans l'écran
    finalX = Math.max(10, Math.min(finalX, screenDimensions.width - tooltipWidth - 10));
    finalY = Math.max(20, Math.min(finalY, screenDimensions.height - tooltipHeight - 20));

    setTooltipPosition({ x: finalX, y: finalY, placement });
  };

  const showTooltip = () => {
    if (disabled || !content) return;
    
    if (childRef.current) {
      childRef.current.measure((x, y, width, height, pageX, pageY) => {
        const layout = { x: pageX, y: pageY, width, height };
        setChildLayout(layout);
        calculatePosition(layout);
        
        setVisible(true);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  };

  const hideTooltip = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  };

  const handlePressIn = () => {
    if (trigger === 'press') {
      timeoutRef.current = setTimeout(showTooltip, delay);
    }
  };

  const handlePressOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (trigger === 'press') {
      hideTooltip();
    }
  };

  const handleHoverIn = () => {
    if (trigger === 'hover' && Platform.OS === 'web') {
      timeoutRef.current = setTimeout(showTooltip, delay);
    }
  };

  const handleHoverOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (trigger === 'hover' && Platform.OS === 'web') {
      hideTooltip();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderTooltip = () => {
    if (!visible) return null;

    const arrowSize = 6;
    const arrowStyle = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid' as const,
    };

    let arrowPositionStyle = {};
    let arrowBorderStyle = {};

    switch (tooltipPosition.placement) {
      case 'top':
        arrowPositionStyle = {
          bottom: -arrowSize,
          left: '50%',
          marginLeft: -arrowSize,
        };
        arrowBorderStyle = {
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: colors.card,
        };
        break;
      case 'bottom':
        arrowPositionStyle = {
          top: -arrowSize,
          left: '50%',
          marginLeft: -arrowSize,
        };
        arrowBorderStyle = {
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: colors.card,
        };
        break;
      case 'left':
        arrowPositionStyle = {
          right: -arrowSize,
          top: '50%',
          marginTop: -arrowSize,
        };
        arrowBorderStyle = {
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: colors.card,
        };
        break;
      case 'right':
        arrowPositionStyle = {
          left: -arrowSize,
          top: '50%',
          marginTop: -arrowSize,
        };
        arrowBorderStyle = {
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: colors.card,
        };
        break;
    }

    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              backgroundColor: colors.card,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              maxWidth: maxWidth,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              borderWidth: 1,
              borderColor: colors.border,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <ThemedText style={{
            fontSize: 14,
            color: colors.text,
            textAlign: 'center',
            lineHeight: 18,
          }}>
            {content}
          </ThemedText>
          
          {/* Flèche */}
          <View style={[arrowStyle, arrowPositionStyle, arrowBorderStyle]} />
        </Animated.View>
      </View>
    );
  };

  return (
    <>
      <Pressable
        ref={childRef}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={Platform.OS === 'web' ? handleHoverIn : undefined}
        onHoverOut={Platform.OS === 'web' ? handleHoverOut : undefined}
        style={style}
      >
        {children}
      </Pressable>
      {renderTooltip()}
    </>
  );
}
