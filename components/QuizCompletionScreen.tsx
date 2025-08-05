import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { Confetti } from './Confetti';

interface QuizCompletionScreenProps {
  visible: boolean;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  quizTitle: string;
  onViewDetails: () => void;
  onGoHome: () => void;
  onRetry: () => void;
}

export function QuizCompletionScreen({
  visible,
  score,
  totalPoints,
  percentage,
  passed,
  quizTitle,
  onViewDetails,
  onGoHome,
  onRetry,
}: QuizCompletionScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const containerOpacity = useSharedValue(0);
  const containerScale = useSharedValue(0.8);
  const titleScale = useSharedValue(0);
  const scoreScale = useSharedValue(0);
  const buttonsScale = useSharedValue(0);
  const confettiVisible = useSharedValue(false);

  useEffect(() => {
    if (visible) {
      // Start confetti
      confettiVisible.value = true;

      // Animate container
      containerOpacity.value = withTiming(1, { duration: 500 });
      containerScale.value = withSpring(1, { damping: 15, stiffness: 100 });

      // Animate title
      titleScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 150 }));

      // Animate score with bounce effect
      scoreScale.value = withDelay(600, withSequence(
        withSpring(1.2, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 150 })
      ));

      // Animate buttons
      buttonsScale.value = withDelay(900, withSpring(1, { damping: 15, stiffness: 100 }));
    } else {
      containerOpacity.value = withTiming(0, { duration: 300 });
      containerScale.value = withTiming(0.8, { duration: 300 });
      confettiVisible.value = false;
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ scale: containerScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonsScale.value }],
  }));

  if (!visible) return null;

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: '#4CAF50', icon: 'star.fill' };
    if (percentage >= 80) return { grade: 'A', color: '#8BC34A', icon: 'star.fill' };
    if (percentage >= 70) return { grade: 'B', color: '#FFC107', icon: 'star' };
    if (percentage >= 60) return { grade: 'C', color: '#FF9800', icon: 'star' };
    return { grade: 'D', color: '#F44336', icon: 'xmark.circle' };
  };

  const gradeInfo = getGrade(percentage);

  return (
    <Animated.View style={[styles.overlay, containerStyle]}>
      <Confetti visible={confettiVisible.value} />
      
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header with icon */}
        <Animated.View style={[styles.header, titleStyle]}>
          <View style={[styles.iconContainer, { backgroundColor: passed ? colors.success : colors.error }]}>
            <IconSymbol
              name={passed ? 'checkmark.circle.fill' : 'xmark.circle.fill'}
              size={48}
              color="white"
            />
          </View>
          
          <ThemedText style={[styles.title, { color: colors.text }]}>
            {passed ? 'Félicitations !' : 'Quiz terminé'}
          </ThemedText>
          
          <ThemedText style={[styles.subtitle, { color: colors.text }]}>
            {quizTitle}
          </ThemedText>
        </Animated.View>

        {/* Score section */}
        <Animated.View style={[styles.scoreSection, scoreStyle]}>
          <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.scoreRow}>
              <ThemedText style={[styles.scoreLabel, { color: colors.text }]}>
                Score obtenu
              </ThemedText>
              <ThemedText style={[styles.scoreValue, { color: colors.text }]}>
                {score}/{totalPoints}
              </ThemedText>
            </View>
            
            <View style={styles.percentageRow}>
              <ThemedText style={[styles.percentageLabel, { color: colors.text }]}>
                Pourcentage
              </ThemedText>
              <ThemedText style={[styles.percentageValue, { color: gradeInfo.color }]}>
                {percentage}%
              </ThemedText>
            </View>

            <View style={styles.gradeRow}>
              <IconSymbol name={gradeInfo.icon} size={24} color={gradeInfo.color} />
              <ThemedText style={[styles.gradeText, { color: gradeInfo.color }]}>
                Note : {gradeInfo.grade}
              </ThemedText>
            </View>
          </View>
        </Animated.View>

        {/* Result message */}
        <View style={styles.messageContainer}>
          <ThemedText style={[styles.message, { color: colors.text }]}>
            {passed 
              ? 'Excellent travail ! Vous avez réussi ce quiz avec brio. Continuez à vous former pour approfondir vos connaissances.'
              : 'Bien essayé ! Continuez à vous entraîner pour améliorer vos résultats. La persévérance est la clé du succès.'
            }
          </ThemedText>
        </View>

        {/* Action buttons */}
        <Animated.View style={[styles.buttonsContainer, buttonsStyle]}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, { backgroundColor: colors.tint }]}
            onPress={onViewDetails}
          >
            <IconSymbol name="doc.text" size={20} color="white" />
            <ThemedText style={styles.buttonText}>Voir les détails</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, { borderColor: colors.border }]}
            onPress={onRetry}
          >
            <IconSymbol name="arrow.clockwise" size={20} color={colors.text} />
            <ThemedText style={[styles.buttonText, { color: colors.text }]}>Recommencer</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, { borderColor: colors.border }]}
            onPress={onGoHome}
          >
            <IconSymbol name="house" size={20} color={colors.text} />
            <ThemedText style={[styles.buttonText, { color: colors.text }]}>Retour à l'accueil</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  scoreSection: {
    marginBottom: 24,
  },
  scoreCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  percentageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  percentageLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  percentageValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  gradeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 