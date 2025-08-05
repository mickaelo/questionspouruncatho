import { FailureAnimation } from '@/components/FailureAnimation';
import { QuestionCard } from '@/components/QuestionCard';
import { QuizCompletionScreen } from '@/components/QuizCompletionScreen';
import { useQuizDataContext } from '@/components/QuizDataProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLives } from '@/hooks/useLives';
import { useUserProgress } from '@/hooks/useUserProgress';
import { Answer, Quiz } from '@/types/quiz';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function QuizScreen() {
  // Tous les hooks doivent être appelés en premier, avant toute logique conditionnelle
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(undefined);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showFailureAnimation, setShowFailureAnimation] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [completionData, setCompletionData] = useState({
    score: 0,
    totalPoints: 0,
    percentage: 0,
    passed: false,
  });

  const { lives, loseLife, isGameOver } = useLives({
    onLivesDepleted: () => setShowFailureAnimation(true)
  });

  const { saveQuizAttempt } = useUserProgress();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { showLoading, hideLoading } = useLoadingBarContext();
  const { getQuiz, isLoading, error } = useQuizDataContext();

  // État pour le quiz
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  console.log(quiz);

  // Gérer l'affichage du loading bar global
  useEffect(() => {
    if (isLoading) {
      showLoading({ duration: 1500 });
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  // Charger le quiz dynamiquement
  useEffect(() => {
    const loadQuiz = async () => {
      if (id) {
        const quizData = await getQuiz(id);
        setQuiz(quizData);
      }
    };
    loadQuiz();
  }, [id, getQuiz]);

  // Tous les useEffect doivent être définis avant les returns conditionnels
  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60); // Convertir en secondes
      setStartTime(new Date());
    }
  }, [quiz?.timeLimit]);

  useEffect(() => {
    if (timeRemaining !== undefined && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Gérer le cas où le quiz n'est pas encore chargé
  if (!quiz) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.errorText, { color: colors.error }]}>
          Quiz non trouvé
        </ThemedText>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.tint }]}
          onPress={() => {
            router.replace(`/quiz/${id}`);
          }}
        >
          <ThemedText style={[styles.retryButtonText, { color: 'white' }]}>
            Retour à l'accueil
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.errorText, { color: colors.error }]}>
          Erreur: {error}
        </ThemedText>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: colors.tint }]}
          onPress={() => {
            // Recharger la page
            router.replace(`/quiz/${id}`);
          }}
        >
          <ThemedText style={[styles.retryButtonText, { color: 'white' }]}>
            Réessayer
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleTimeUp = () => {
    // Perdre une vie quand le temps est écoulé
    loseLife();

    // Si le jeu n'est pas terminé, passer à la question suivante
    if (!isGameOver) {
      setTimeout(() => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setStartTime(new Date());
          setTimeRemaining(quiz.timeLimit ? quiz.timeLimit * 60 : undefined);
        } else {
          completeQuiz();
        }
      }, 1000);
    }
  };

  const handleAnswer = (selectedAnswer: number, isCorrect: boolean) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0
    };

    setAnswers(prev => [...prev, answer]);

    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points);
    } else {
      // Perdre une vie si la réponse est incorrecte
      loseLife();
    }

    // Passer à la question suivante après un délai
    if (currentQuestionIndex < quiz.questions.length - 1 && !isGameOver) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStartTime(new Date());
    } else if (!isGameOver) {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    setQuizCompleted(true);

    setCompletionData({
      score,
      totalPoints,
      percentage,
      passed,
    });

    // Calculer le temps total passé
    const totalTimeSpent = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
    const livesUsed = 3 - lives; // Nombre de vies utilisées

    // Sauvegarder la progression dans Firebase
    try {
      await saveQuizAttempt(
        quiz.id,
        score,
        totalPoints,
        percentage,
        passed,
        totalTimeSpent,
        answers,
        livesUsed
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression:', error);
      Alert.alert(
        'Erreur de sauvegarde',
        'Votre progression n\'a pas pu être sauvegardée. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    }

    setShowCompletionScreen(true);
  };

  const handleExit = () => {
    Alert.alert(
      'Quitter le quiz ?',
      'Votre progression sera perdue.',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Quitter',
          style: 'destructive',
          onPress: () => router.back()
        }
      ]
    );
  };

  const handleLivesDepleted = () => {
    // Cette fonction sera appelée quand l'animation d'échec est terminée
    router.replace('/');
  };

  const handleViewDetails = () => {
    setShowCompletionScreen(false);
    router.push({
      pathname: '/quiz-result',
      params: {
        quizId: quiz.id,
        score: completionData.score.toString(),
        totalPoints: completionData.totalPoints.toString(),
        percentage: completionData.percentage.toString(),
        passed: completionData.passed.toString()
      }
    });
  };

  const handleGoHome = () => {
    setShowCompletionScreen(false);
    router.replace('/');
  };

  const handleRetry = () => {
    setShowCompletionScreen(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setStartTime(new Date());
    setTimeRemaining(quiz.timeLimit ? quiz.timeLimit * 60 : undefined);
  };

  if (!currentQuestion) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Quiz non trouvé</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header avec navigation et timer */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
          <IconSymbol name="xmark" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Titre du quiz */}
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.quizTitle, { color: colors.text }]}>
            {quiz.title}
          </ThemedText>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                  backgroundColor: colors.tint
                }
              ]}
            />
          </View>
          <ThemedText style={styles.progressText}>
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </ThemedText>
        </View>

        <View style={styles.headerRight}>
          {/* Affichage des vies */}
          <View style={styles.livesContainer}>
            <IconSymbol name="heart.fill" size={16} color={colors.error} />
            <ThemedText style={[styles.livesText, { color: colors.text }]}>
              {lives}
            </ThemedText>
          </View>

          {timeRemaining !== undefined && (
            <View style={styles.timerContainer}>
              <IconSymbol name="clock" size={20} color={colors.tint} />
              <ThemedText style={[styles.timer, { color: colors.tint }]}>
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      {/* Question actuelle */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        timeRemaining={timeRemaining}
      />

      {/* Score actuel */}
      <View style={styles.scoreContainer}>
        <ThemedText style={styles.scoreText}>
          Score actuel : {score} points
        </ThemedText>
      </View>

      {/* Animation d'échec */}
      <FailureAnimation
        visible={showFailureAnimation}
        onAnimationComplete={handleLivesDepleted}
      />

      {/* Écran de félicitations et récompense */}
      <QuizCompletionScreen
        visible={showCompletionScreen}
        score={completionData.score}
        totalPoints={completionData.totalPoints}
        percentage={completionData.percentage}
        passed={completionData.passed}
        quizTitle={quiz.title}
        onViewDetails={handleViewDetails}
        onGoHome={handleGoHome}
        onRetry={handleRetry}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  exitButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  livesText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timer: {
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    padding: 16,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  loadingSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.7,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 