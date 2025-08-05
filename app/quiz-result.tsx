import { useQuizDataContext } from '@/components/QuizDataProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Quiz } from '@/types/quiz';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function QuizResultScreen() {
  const params = useLocalSearchParams<{
    quizId: string;
    score: string;
    totalPoints: string;
    percentage: string;
    passed: string;
  }>();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { getQuiz } = useQuizDataContext();
  const { showLoading, hideLoading } = useLoadingBarContext();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le quiz dynamiquement
  useEffect(() => {
    const loadQuiz = async () => {
      if (params.quizId) {
        setIsLoading(true);
        showLoading({ duration: 1500 });
        
        try {
          const quizData = await getQuiz(params.quizId);
          setQuiz(quizData);
        } catch (error) {
          console.error('Erreur lors du chargement du quiz:', error);
        } finally {
          setIsLoading(false);
          hideLoading();
        }
      } else {
        setIsLoading(false);
        hideLoading();
      }
    };
    loadQuiz();
  }, [params.quizId, getQuiz, showLoading, hideLoading]);

  const score = parseInt(params.score || '0');
  const totalPoints = parseInt(params.totalPoints || '0');
  const percentage = parseInt(params.percentage || '0');
  const passed = params.passed === 'true';

  const getResultMessage = () => {
    if (percentage >= 90) return 'Excellent ! Vous maîtrisez parfaitement ce sujet.';
    if (percentage >= 80) return 'Très bien ! Vous avez une bonne compréhension.';
    if (percentage >= 70) return 'Bien ! Continuez à vous améliorer.';
    if (percentage >= 60) return 'Pas mal ! Quelques révisions s\'imposent.';
    return 'Continuez à vous entraîner pour progresser.';
  };

  const getBadge = () => {
    if (percentage >= 90) return { name: 'Expert', icon: 'star.fill' as const, color: '#FFD700' };
    if (percentage >= 80) return { name: 'Adepte', icon: 'medal.fill' as const, color: '#C0C0C0' };
    if (percentage >= 70) return { name: 'Initié', icon: 'trophy.fill' as const, color: '#CD7F32' };
    return { name: 'Débutant', icon: 'person.fill' as const, color: '#4CAF50' };
  };

  const badge = getBadge();

  // Gérer le cas où le quiz est en cours de chargement
  if (isLoading) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText style={[styles.loadingText, { color: colors.text }]}>
            Chargement du quiz...
          </ThemedText>
        </ThemedView>
      </ScrollView>
    );
  }

  // Gérer le cas où le quiz n'est pas trouvé
  if (!quiz) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText style={[styles.loadingText, { color: colors.error }]}>
            Quiz non trouvé
          </ThemedText>
          <TouchableOpacity 
            style={[styles.errorButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/')}
          >
            <ThemedText style={[styles.errorButtonText, { color: colors.background }]}>
              Retour à l'accueil
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* Header avec résultat principal */}
        <View style={styles.header}>
          <View style={styles.resultCircle}>
            <ThemedText type="title" style={styles.percentage}>
              {percentage}%
            </ThemedText>
            <ThemedText style={styles.scoreText}>
              {score}/{totalPoints} points
            </ThemedText>
          </View>
          
          <ThemedText type="title" style={styles.resultTitle}>
            {passed ? 'Félicitations !' : 'Quiz terminé'}
          </ThemedText>
          
          <ThemedText style={styles.resultMessage}>
            {getResultMessage()}
          </ThemedText>
        </View>

        {/* Badge obtenu */}
        <View style={[styles.badgeContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <IconSymbol name={badge.icon} size={32} color={badge.color} />
          <ThemedText type="subtitle" style={styles.badgeName}>
            {badge.name}
          </ThemedText>
          <ThemedText style={styles.badgeDescription}>
            Vous avez obtenu le badge {badge.name} pour ce quiz !
          </ThemedText>
        </View>

        {/* Statistiques détaillées */}
        <View style={[styles.statsContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <ThemedText type="subtitle" style={styles.statsTitle}>
            Statistiques
          </ThemedText>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <IconSymbol name="target" size={20} color={colors.tint} />
              <ThemedText style={styles.statLabel}>Précision</ThemedText>
              <ThemedText style={styles.statValue}>{percentage}%</ThemedText>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="star.fill" size={20} color="#FFD700" />
              <ThemedText style={styles.statLabel}>Points gagnés</ThemedText>
              <ThemedText style={styles.statValue}>+{score}</ThemedText>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#4CAF50" />
              <ThemedText style={styles.statLabel}>Réussite</ThemedText>
              <ThemedText style={styles.statValue}>{passed ? 'Oui' : 'Non'}</ThemedText>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="clock" size={20} color={colors.tint} />
              <ThemedText style={styles.statLabel}>Temps moyen</ThemedText>
              <ThemedText style={styles.statValue}>~30s</ThemedText>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.tint }]}
            onPress={() => router.push({
              pathname: '/quiz/[id]',
              params: { id: params.quizId }
            })}
          >
            <IconSymbol name="arrow.clockwise" size={20} color="#FFFFFF" />
            <ThemedText style={[styles.actionButtonText, { color: '#FFFFFF' }]}>
              Recommencer
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={() => router.push('/')}
          >
            <IconSymbol name="house.fill" size={20} color={colors.tint} />
            <ThemedText style={[styles.actionButtonText, { color: colors.tint }]}>
              Accueil
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  percentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreText: {
    fontSize: 12,
    opacity: 0.7,
  },
  resultTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  resultMessage: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
  },
  badgeContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeName: {
    marginTop: 8,
    marginBottom: 4,
  },
  badgeDescription: {
    textAlign: 'center',
    opacity: 0.7,
  },
  statsContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 24,
  },
  statsTitle: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 