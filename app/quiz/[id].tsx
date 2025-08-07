import { FailureAnimation } from '@/components/FailureAnimation';
import { GlobalLoadingBar } from '@/components/GlobalLoadingBar';
import { QuestionCard } from '@/components/QuestionCard';
import { QuizCompletionScreen } from '@/components/QuizCompletionScreen';
import { useQuizDataContext } from '@/components/QuizDataProvider';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLives } from '@/hooks/useLives';
import { useUserProgress } from '@/hooks/useUserProgress';
import { Answer, Quiz } from '@/types/quiz';
import { showAlert, showConfirmAlert } from '@/utils/alert';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuizScreen() {
  // Tous les hooks doivent être appelés en premier, avant toute logique conditionnelle
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(undefined);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showFailureAnimation, setShowFailureAnimation] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [isCompletingQuiz, setIsCompletingQuiz] = useState(false);
  const [completionData, setCompletionData] = useState({
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
  console.log(totalPoints)

  // Surveiller isGameOver pour lancer completeQuiz automatiquement
  useEffect(() => {
    if (!isGameOver && quizCompleted) {
      completeQuiz();
    }
  }, [isGameOver, quizCompleted]);
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
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <GlobalLoadingBar />
        </View>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <ThemedText style={[styles.backButtonText, { color: colors.text }]}>
            Retour
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
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

  const handleAnswer = (selectedAnswer: number | number[], isCorrect: boolean) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer: Array.isArray(selectedAnswer) ? selectedAnswer[0] : selectedAnswer, // Garder la compatibilité avec l'interface existante
      isCorrect,
      timeSpent: startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0
    };

    setAnswers(prev => [...prev, answer]);

    if (isCorrect) {
      console.log(totalPoints)
      setTotalPoints(prev => prev + currentQuestion.points);
    } else {
      // Perdre une vie si la réponse est incorrecte
      loseLife();
    }

    // Passer à la question suivante après un délai
    if (currentQuestionIndex < quiz.questions.length - 1 && !isGameOver) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStartTime(new Date());
    } else if (!isGameOver) {
      setQuizCompleted(true);
    }
  };

  const completeQuiz = async () => {
    const maxTotalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((totalPoints / maxTotalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    // Indiquer que le quiz est en cours de finalisation
    setIsCompletingQuiz(true);

    // Calculer le temps total passé
    const totalTimeSpent = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
    const livesUsed = 3 - lives; // Nombre de vies utilisées

    // Marquer le quiz comme terminé
    setQuizCompleted(true);

    // Sauvegarder la progression dans Firebase
    try {
      await saveQuizAttempt(
        quiz.id,
        totalPoints,
        maxTotalPoints,
        percentage,
        passed,
        totalTimeSpent,
        answers,
        livesUsed
      );

      // Mettre à jour les données de completion seulement après la sauvegarde réussie
      setCompletionData({
        totalPoints,
        percentage,
        passed,
      });

      // Afficher l'écran de completion seulement après que tout soit terminé
      setShowCompletionScreen(true);

    } catch (error) {
      showAlert(
        'Erreur de sauvegarde',
        'Votre progression n\'a pas pu être sauvegardée. Veuillez réessayer.'
      );

      // Même en cas d'erreur, afficher les résultats locaux
      setCompletionData({
        totalPoints,
        percentage,
        passed,
      });
      setShowCompletionScreen(true);
    } finally {
      // Indiquer que la finalisation est terminée
      setIsCompletingQuiz(false);
    }
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
        totalPoints: completionData.totalPoints.toString(),
        percentage: completionData.percentage.toString(),
        passed: completionData.passed.toString()
      }
    });
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRetry = () => {
    // Réinitialiser le quiz
    setCurrentQuestionIndex(0);
    setTotalPoints(0);
    setShowCompletionScreen(false);
    setShowFailureAnimation(false);
    setCompletionData({
      totalPoints: 0,
      percentage: 0,
      passed: false
    });
    // Les vies seront réinitialisées automatiquement par le hook useLives
  };

  const handleHomePress = () => {
    showConfirmAlert(
      'Quitter le quiz',
      'Êtes-vous sûr de vouloir quitter le quiz ? Votre progression sera perdue.',
      handleGoHome
    );
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <GlobalLoadingBar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Barre de progression et score en haut */}
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        {/* Bouton retour accueil */}
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: colors.border }]}
          onPress={handleHomePress}
        >
          <IconSymbol name="house.fill" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Nom du quiz */}
        <View style={styles.quizTitleContainer}>
          <ThemedText style={[styles.quizTitle, { color: colors.text }]} numberOfLines={1}>
            {quiz.title}
          </ThemedText>
        </View>

        {/* Barre de progression */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
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
          <ThemedText style={[styles.progressText, { color: colors.text }]}>
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </ThemedText>
        </View>

                {/* Système de vies */}
        <View style={[styles.livesContainer, { backgroundColor: colors.border }]}>
          {Array.from({ length: 3 }, (_, index) => {
            const isAlive = index < lives;
            return (
              <IconSymbol
                key={index}
                name={isAlive ? "heart.fill" : "heart"}
                size={24}
                color={isAlive ? colors.error : colors.text}
                style={{ marginRight: 3 }}
              />
            );
          })}
        </View>

        {/* Timer */}
        {timeRemaining !== undefined && (
          <View style={[styles.timerContainer, { backgroundColor: colors.border }]}>
            <IconSymbol name="clock" size={24} color={colors.tint} />
            <ThemedText style={[styles.timerText, { color: colors.text }]}>
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </ThemedText>
          </View>
        )}

        {/* Points actuels */}
        <View style={[styles.scoreContainer, { backgroundColor: colors.border }]}>
          <IconSymbol name="star.fill" size={24} color={colors.tint} />
          <ThemedText style={[styles.scoreText, { color: colors.text }]}>
            {totalPoints} points
          </ThemedText>
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

      {/* Indicateur de finalisation du quiz */}
      {isCompletingQuiz && (
        <View style={[styles.completingOverlay, { backgroundColor: colors.background }]}>
          <View style={styles.completingContainer}>
            <IconSymbol name="clock" size={48} color={colors.tint} />
            <ThemedText style={[styles.completingText, { color: colors.text }]}>
              Finalisation du quiz...
            </ThemedText>
            <ThemedText style={[styles.completingSubtext, { color: colors.text }]}>
              Veuillez patienter
            </ThemedText>
          </View>
        </View>
      )}

      {/* Animation d'échec */}
      <FailureAnimation
        visible={showFailureAnimation}
        onAnimationComplete={handleLivesDepleted}
      />

      {/* Écran de félicitations et récompense */}
      <QuizCompletionScreen
        visible={showCompletionScreen}
        totalPoints={completionData.totalPoints}
        percentage={completionData.percentage}
        passed={completionData.passed}
        quizTitle={quiz.title}
        quizId={quiz.id}
        onViewDetails={handleViewDetails}
        onGoHome={handleGoHome}
        onRetry={handleRetry}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  homeButton: {
    padding: 12,
    borderRadius: 10,
    marginRight: 16,
  },
  quizTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  progressContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  progressBar: {
    flex: 1,
    height: 18,
    borderRadius: 9,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 9,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 60,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 16,
  },
  livesText: {
    fontSize: 12,
    fontWeight: '500',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 16,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '700',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  completingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  completingContainer: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  completingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  completingSubtext: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.7,
    textAlign: 'center',
  },
}); 