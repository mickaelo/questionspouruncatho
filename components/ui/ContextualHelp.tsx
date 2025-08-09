import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

export interface ContextualTip {
  id: string;
  message: string;
  trigger: 'idle' | 'stuck' | 'error' | 'success' | 'manual';
  conditions?: {
    minIdleTime?: number; // en millisecondes
    maxAttempts?: number;
    errorCount?: number;
    successStreak?: number;
    userLevel?: number;
    questionsAnswered?: number;
  };
  priority?: 'low' | 'medium' | 'high';
  autoHide?: boolean;
  autoHideDelay?: number;
  action?: {
    text: string;
    onPress: () => void;
  };
}

interface ContextualHelpProps {
  tips: ContextualTip[];
  userContext?: {
    level?: number;
    questionsAnswered?: number;
    errors?: number;
    successStreak?: number;
    attempts?: number;
    lastActivity?: Date;
  };
  onTipShown?: (tip: ContextualTip) => void;
  onTipDismissed?: (tip: ContextualTip) => void;
  style?: any;
}

export function ContextualHelp({
  tips,
  userContext,
  onTipShown,
  onTipDismissed,
  style
}: ContextualHelpProps) {
  const [activeTip, setActiveTip] = useState<ContextualTip | null>(null);
  const [shownTips, setShownTips] = useState<Set<string>>(new Set());
  const [idleTime, setIdleTime] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const lastActivity = useRef(Date.now());
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Détecter l'inactivité
  const resetIdleTimer = useCallback(() => {
    lastActivity.current = Date.now();
    setIdleTime(0);
    
    if (idleTimer.current) {
      clearInterval(idleTimer.current);
    }
    
    idleTimer.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - lastActivity.current;
      setIdleTime(elapsed);
    }, 1000);
  }, []);

  // Évaluer les tips contextuels
  const evaluateTips = useCallback(() => {
    if (activeTip) return; // Une tip est déjà affichée

    // Trier les tips par priorité
    const sortedTips = tips
      .filter(tip => !shownTips.has(tip.id))
      .sort((a, b) => {
        const priority = { high: 3, medium: 2, low: 1 };
        return priority[b.priority || 'medium'] - priority[a.priority || 'medium'];
      });

    for (const tip of sortedTips) {
      if (shouldShowTip(tip)) {
        showTip(tip);
        break;
      }
    }
  }, [activeTip, shownTips, tips, userContext, idleTime]);

  // Détermine si une tip doit être affichée
  const shouldShowTip = (tip: ContextualTip): boolean => {
    const conditions = tip.conditions || {};
    
    switch (tip.trigger) {
      case 'idle':
        return idleTime >= (conditions.minIdleTime || 30000); // 30 secondes par défaut
      
      case 'stuck':
        return (userContext?.attempts || 0) >= (conditions.maxAttempts || 3);
      
      case 'error':
        return (userContext?.errors || 0) >= (conditions.errorCount || 2);
      
      case 'success':
        return (userContext?.successStreak || 0) >= (conditions.successStreak || 3);
      
      case 'manual':
        return false; // Doit être déclenchée manuellement
      
      default:
        return false;
    }
  };

  // Afficher une tip
  const showTip = (tip: ContextualTip) => {
    setActiveTip(tip);
    setShownTips(prev => new Set(prev).add(tip.id));
    
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-hide si activé
    if (tip.autoHide) {
      setTimeout(() => {
        hideTip();
      }, tip.autoHideDelay || 5000);
    }

    if (onTipShown) {
      onTipShown(tip);
    }
  };

  // Cacher la tip actuelle
  const hideTip = () => {
    if (!activeTip) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onTipDismissed && activeTip) {
        onTipDismissed(activeTip);
      }
      setActiveTip(null);
    });
  };

  // Déclencher manuellement une tip
  const triggerTip = (tipId: string) => {
    const tip = tips.find(t => t.id === tipId);
    if (tip && !activeTip) {
      showTip(tip);
    }
  };

  // Réinitialiser les tips affichées
  const resetShownTips = () => {
    setShownTips(new Set());
  };

  useEffect(() => {
    resetIdleTimer();
    
    return () => {
      if (idleTimer.current) {
        clearInterval(idleTimer.current);
      }
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    evaluateTips();
  }, [evaluateTips]);

  // Exposer les méthodes via ref si nécessaire
  React.useImperativeHandle(React.createRef(), () => ({
    triggerTip,
    hideTip,
    resetShownTips,
    resetIdleTimer,
  }));

  if (!activeTip) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 120,
          left: 16,
          right: 16,
          zIndex: 1000,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        style
      ]}
      pointerEvents="auto"
    >
      <ThemedView
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'flex-start',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        {/* Icône */}
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.tint + '20',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <Ionicons
            name="help-circle-outline"
            size={18}
            color={colors.tint}
          />
        </View>

        {/* Contenu */}
        <View style={{ flex: 1 }}>
          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: colors.text,
              marginBottom: activeTip.action ? 12 : 0,
            }}
          >
            {activeTip.message}
          </ThemedText>

          {/* Bouton d'action optionnel */}
          {activeTip.action && (
            <Pressable
              onPress={() => {
                activeTip.action?.onPress();
                hideTip();
              }}
              style={{
                backgroundColor: colors.tint,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
                alignSelf: 'flex-start',
              }}
            >
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: '#fff',
                }}
              >
                {activeTip.action.text}
              </ThemedText>
            </Pressable>
          )}
        </View>

        {/* Bouton fermer */}
        <Pressable
          onPress={hideTip}
          style={{
            padding: 4,
            marginLeft: 8,
          }}
        >
          <Ionicons
            name="close"
            size={16}
            color={colors.text}
            style={{ opacity: 0.6 }}
          />
        </Pressable>
      </ThemedView>
    </Animated.View>
  );
}

// Hook pour utiliser le système d'aide contextuel
export function useContextualHelp() {
  const [userContext, setUserContext] = useState({
    level: 1,
    questionsAnswered: 0,
    errors: 0,
    successStreak: 0,
    attempts: 0,
    lastActivity: new Date(),
  });

  const updateContext = (updates: Partial<typeof userContext>) => {
    setUserContext(prev => ({
      ...prev,
      ...updates,
      lastActivity: new Date(),
    }));
  };

  const incrementErrors = () => {
    setUserContext(prev => ({
      ...prev,
      errors: prev.errors + 1,
      successStreak: 0,
      lastActivity: new Date(),
    }));
  };

  const incrementSuccess = () => {
    setUserContext(prev => ({
      ...prev,
      successStreak: prev.successStreak + 1,
      questionsAnswered: prev.questionsAnswered + 1,
      errors: 0,
      lastActivity: new Date(),
    }));
  };

  const incrementAttempts = () => {
    setUserContext(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      lastActivity: new Date(),
    }));
  };

  const resetContext = () => {
    setUserContext({
      level: 1,
      questionsAnswered: 0,
      errors: 0,
      successStreak: 0,
      attempts: 0,
      lastActivity: new Date(),
    });
  };

  return {
    userContext,
    updateContext,
    incrementErrors,
    incrementSuccess,
    incrementAttempts,
    resetContext,
  };
}
