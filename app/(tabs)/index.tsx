
import { ChurchIcon } from '@/components/ChurchIcon';
import { FootprintIcon } from '@/components/FootprintIcon';
import { GlobalLoadingBar } from '@/components/GlobalLoadingBar';
import { PilgrimIcon } from '@/components/PilgrimIcon';
import { QuizCard } from '@/components/QuizCard';
import { useQuizDataContext } from '@/components/QuizDataProvider';
import { QuizSelectionModal } from '@/components/QuizSelectionModal';
import { QuizTooltip } from '@/components/QuizTooltip';
import { SpiritualPathHint } from '@/components/SpiritualPathHint';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useHelpSystem } from '@/contexts/HelpSystemContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import { courseService } from '@/services/courseService';
import { quizService } from '@/services/quizService';
import { UserProgressService } from '@/services/userProgressService';
import { Course, Quiz } from '@/types/quiz';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, isAuthenticated } = useAuth();
  const { userProgress, isLoading: userProgressLoading, error: userProgressError } = useUserProgress();
  const { getAvailableQuizzes, isLoading: quizLoading, error: quizError } = useQuizDataContext();
  const helpSystem = useHelpSystem();
  // Check if user is admin
  const isAdmin = isAuthenticated && user?.type?.includes('admin');

  // Get user level from progress or default to 1
  const userLevel = userProgress?.level || 1;

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';

  // État pour les quiz disponibles
  const [availableQuizzes, setAvailableQuizzes] = React.useState<Quiz[]>([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // États pour les cours
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = React.useState(false);
  const [coursesLoaded, setCoursesLoaded] = React.useState(false);

  // État pour les quiz du parcours
  const [courseQuizzes, setCourseQuizzes] = React.useState<Quiz[]>([]);
  const [isLoadingCourseQuizzes, setIsLoadingCourseQuizzes] = React.useState(false);
  const [courseQuizzesLoaded, setCourseQuizzesLoaded] = React.useState(false);

  // Quiz populaires
  const [popularQuizzes, setPopularQuizzes] = React.useState<any[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = React.useState(false);
  const [popularQuizzesLoaded, setPopularQuizzesLoaded] = React.useState(false);

  // Quiz disponibles
  const [availableQuizzesLoaded, setAvailableQuizzesLoaded] = React.useState(false);



  // Modal de sélection de quiz
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedStep, setSelectedStep] = React.useState<number>(1);
  const [selectedElementType, setSelectedElementType] = React.useState<'church' | 'pilgrim' | 'footprint'>('church');

  // États pour les hints du chemin spirituel
  const [activeHints, setActiveHints] = React.useState<{
    pilgrim?: boolean;
    footprint?: { [key: number]: boolean };
    church?: boolean;
  }>({ pilgrim: true });

  // États pour les tooltips de quiz
  const [activeTooltips, setActiveTooltips] = React.useState<{
    pilgrim?: boolean;
    footprint?: { [key: number]: boolean };
    church?: boolean;
  }>({ pilgrim: true });

  // Animations de pulsation pour les SVG
  const pilgrimPulse = useRef(new Animated.Value(1)).current;
  const footprintPulses = useRef([1, 2, 3, 4, 5].map(() => new Animated.Value(1))).current;
  const churchPulse = useRef(new Animated.Value(1)).current;

  // Fonctions d'animation de pulsation
  const startPulse = (animatedValue: Animated.Value) => {
    Animated.loop(
      Animated.sequence([

        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulse = (animatedValue: Animated.Value) => {
    animatedValue.stopAnimation(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // Effet pour gérer les animations de pulsation
  useEffect(() => {
    // Pèlerin
    if (activeTooltips.pilgrim) {
      startPulse(pilgrimPulse);
    } else {
      stopPulse(pilgrimPulse);
    }

    // Empreintes
    [1, 2, 3, 4, 5].forEach((index) => {
      if (activeTooltips.footprint?.[index]) {
        startPulse(footprintPulses[index - 1]);
      } else {
        stopPulse(footprintPulses[index - 1]);
      }
    });

    // Église
    if (activeTooltips.church) {
      startPulse(churchPulse);
    } else {
      stopPulse(churchPulse);
    }
  }, [activeTooltips, pilgrimPulse, footprintPulses, churchPulse, startPulse, stopPulse]);

  // Log de débogage
  console.log('🏠 HomeScreen rendu:', {
    isAuthenticated,
    userLevel,
    colorScheme,
    isWeb,
    userProgressLoading,
    loadingStates: {
      courses: isLoadingCourses,
      availableQuizzes: isLoadingQuizzes,
      courseQuizzes: isLoadingCourseQuizzes,
      popularQuizzes: isLoadingPopular
    },
    dataCounts: {
      courses: courses.length,
      availableQuizzes: availableQuizzes.length,
      courseQuizzes: courseQuizzes.length,
      popularQuizzes: popularQuizzes.length
    },
    hasError
  });

  // Charger les cours depuis Firebase (une seule fois)
  useEffect(() => {
    if (coursesLoaded) {
      console.log('🔄 Cours déjà chargés, skip du chargement');
      return;
    }

    const loadCourses = async () => {
      setIsLoadingCourses(true);
      try {
        const allCourses = await courseService.getAllCourses();
        setCourses(allCourses);
        setCoursesLoaded(true);
        console.log('✅ Cours chargés depuis Firebase (première fois):', {
          count: allCourses.length,
          courses: allCourses.map(c => ({ id: c.id, title: c.title }))
        });
      } catch (error) {
        console.error('❌ Erreur lors du chargement des cours:', error);
        setCourses([]);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, [coursesLoaded]);

  // Charger les quiz disponibles depuis Firebase (optimisé)
  const [lastUserLevel, setLastUserLevel] = React.useState(0);
  
  useEffect(() => {
    // Ne charger que si le niveau a changé ou si pas encore chargé
    if (availableQuizzesLoaded && userLevel === lastUserLevel) {
      console.log('🔄 Quiz disponibles déjà chargés pour ce niveau, skip');
      return;
    }

    const loadAvailableQuizzes = async () => {
      setIsLoadingQuizzes(true);
      setHasError(false);
      try {
        const quizzes = await quizService.getAvailableQuizzes(userLevel);
        setAvailableQuizzes(quizzes);
        setAvailableQuizzesLoaded(true);
        setLastUserLevel(userLevel);
        console.log('✅ Quiz disponibles chargés depuis Firebase pour niveau', userLevel, ':', quizzes.length);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des quiz:', error);
        setHasError(true);
        setAvailableQuizzes([]);
      } finally {
        setIsLoadingQuizzes(false);
      }
    };

    loadAvailableQuizzes();
  }, [userLevel, availableQuizzesLoaded, lastUserLevel]);

  // Charger les quiz populaires depuis Firebase (une seule fois)
  useEffect(() => {
    if (popularQuizzesLoaded) {
      console.log('🔄 Quiz populaires déjà chargés, skip');
      return;
    }

    const fetchPopularQuizzes = async () => {
      setIsLoadingPopular(true);
      try {
        const popular = await UserProgressService.getMostPopularQuizzes(3);
        console.log('🔥 Quiz populaires (IDs):', popular);
        
        // Récupérer les quiz complets depuis Firebase
        const quizPromises = popular.map(async ({ quizId }) => {
          try {
            const quiz = await quizService.getQuiz(quizId);
            return quiz;
          } catch (error) {
            console.error(`❌ Erreur lors du chargement du quiz populaire ${quizId}:`, error);
            return null;
          }
        });
        
        const quizzes = (await Promise.all(quizPromises)).filter(Boolean);
        setPopularQuizzes(quizzes);
        setPopularQuizzesLoaded(true);
        console.log('✅ Quiz populaires chargés depuis Firebase (première fois):', {
          count: quizzes.length,
          titles: quizzes.map(q => q?.title)
        });
      } catch (error) {
        console.error('❌ Erreur lors du chargement des quiz populaires:', error);
        setPopularQuizzes([]);
      } finally {
        setIsLoadingPopular(false);
      }
    };
    
    fetchPopularQuizzes();
  }, [popularQuizzesLoaded]);

  const handleQuizPress = (quiz: Quiz) => {
    router.push({
      pathname: '/quiz/[id]',
      params: { id: quiz.id }
    });
  };

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Débutant';
    if (level < 10) return 'Initié';
    if (level < 15) return 'Adepte';
    if (level < 20) return 'Expert';
    return 'Maître Théologien';
  };

  // Association des éléments avec des quiz spécifiques du parcours
  const getElementQuizId = (elementType: 'church' | 'pilgrim' | 'footprint', index: number): string => {
    // Mapper les éléments SVG sur les quiz du parcours
    // Premier quiz = pilgrim, quiz intermédiaires = footprints, dernier quiz = church
    
    if (courseQuizzes.length === 0) {
      return `${elementType}-${index}`;
    }

    if (elementType === 'pilgrim') {
      // Le pèlerin correspond au premier quiz du parcours
      return courseQuizzes[0]?.id || 'pilgrim-1';
    } 
    else if (elementType === 'church') {
      // L'église correspond au dernier quiz du parcours
      return courseQuizzes[courseQuizzes.length - 1]?.id || 'church-1';
    } 
    else if (elementType === 'footprint') {
      // Les empreintes correspondent aux quiz intermédiaires (à partir du deuxième, sans le dernier)
      // index 1 -> quiz[1] (deuxième quiz), index 2 -> quiz[2], etc.
      // On exclut le premier quiz (pilgrim) et le dernier quiz (church)
      const quizIndex = index; // index 1-5 pour les footprints correspond à quiz[1] à quiz[5]
      if (quizIndex < courseQuizzes.length - 1) { // S'assurer qu'on ne prend pas le dernier
        return courseQuizzes[quizIndex]?.id || `footprint-${index}`;
      }
      return `footprint-${index}`;
    }

    return `${elementType}-${index}`;
  };

  // Fonction pour vérifier si un quiz est complété
  const isQuizCompleted = (elementType: 'church' | 'pilgrim' | 'footprint', index: number): boolean => {
    const quizId = getElementQuizId(elementType, index);
    return progress.completedQuizzes.includes(quizId);
  };

  // Fonction pour obtenir la couleur selon l'état du quiz
  const getElementColor = (elementType: 'church' | 'pilgrim' | 'footprint', index: number): string => {
    const isCompleted = isQuizCompleted(elementType, index);
    if (isCompleted) {
      return colors.primary; // Coloré si complété
    }
    // Couleur par défaut selon le type d'élément
    return elementType === 'church' || elementType === 'pilgrim' ? colors.primary : colors.text;
  };

  // Fonction pour obtenir la couleur de bordure
  const getBorderColor = (elementType: 'church' | 'pilgrim' | 'footprint', index: number, pulse?: Animated.Value): string => {
    const isCompleted = isQuizCompleted(elementType, index);
    if (isCompleted) {
      return colors.primary; // Bordure colorée si complété
    }
    if (pulse) {
      return colors.success;
    }
    return colors.border; // Bordure grise si non complété
  };

  // Fonction pour obtenir la couleur de fond
  const getBackgroundColor = (elementType: 'church' | 'pilgrim' | 'footprint', index: number): string => {
    const isCompleted = isQuizCompleted(elementType, index);
    if (isCompleted) {
      return `${colors.primary}20`; // Fond légèrement coloré si complété
    }
    return colorScheme === 'dark' ? '#2c2c2c' : '#f5f5f5'; // Fond grisé adapté au thème
  };

  const showPilgrimHelp = () => {
    setActiveHints(prev => ({ ...prev, pilgrim: true }));
    setTimeout(() => {
      setActiveHints(prev => ({ ...prev, pilgrim: false }));
    }, 2500);
  };

  const showFootprintHelp = (index: number) => {
    setActiveHints(prev => ({
      ...prev,
      footprint: { ...prev.footprint, [index]: true }
    }));
    setTimeout(() => {
      setActiveHints(prev => ({
        ...prev,
        footprint: { ...prev.footprint, [index]: false }
      }));
    }, 2000);
  };

  const showChurchHelp = () => {
    setActiveHints(prev => ({ ...prev, church: true }));
    setTimeout(() => {
      setActiveHints(prev => ({ ...prev, church: false }));
    }, 2000);
  };

  const handleStepPress = (stepNumber: number, elementType: 'church' | 'pilgrim' | 'footprint') => {
    // Fermer toutes les autres tooltips
    setActiveTooltips({});

    // Afficher la tooltip pour cet élément
    if (elementType === 'pilgrim') {
      setActiveTooltips(prev => ({ ...prev, pilgrim: true }));
    } else if (elementType === 'footprint') {
      const footprintIndex = stepNumber - 1;
      setActiveTooltips(prev => ({
        ...prev,
        footprint: { [footprintIndex]: true }
      }));
    } else if (elementType === 'church') {
      setActiveTooltips(prev => ({ ...prev, church: true }));
    }
  };

  const handleQuizAccess = (stepNumber: number, elementType: 'church' | 'pilgrim' | 'footprint') => {
    const quizId = getElementQuizId(elementType, stepNumber === 1 && elementType === 'pilgrim' ? 1 : stepNumber === 7 ? 1 : stepNumber - 1);
    
    // Chercher d'abord dans les quiz du parcours
    let associatedQuiz = courseQuizzes.find(quiz => quiz.id === quizId);
    
    // Si pas trouvé, chercher dans tous les quiz disponibles
    if (!associatedQuiz) {
      associatedQuiz = availableQuizzes.find(quiz => quiz.id === quizId);
    }

    // Fermer la tooltip
    setActiveTooltips({});

    if (associatedQuiz) {
      // Si un quiz est associé, l'ouvrir directement
      router.push({
        pathname: '/quiz/[id]',
        params: { id: associatedQuiz.id }
      });
    } else {
      // Sinon, ouvrir la modal de sélection
      setSelectedStep(stepNumber);
      setSelectedElementType(elementType);
      setModalVisible(true);
    }
  };

  const closeTooltip = () => {
    setActiveTooltips({});
  };

  // Récupérer le nom du cours de niveau 1 depuis Firebase
  const getFirstCourseName = (): string => {
    const level1Course = courses.find(course => course.level === 1);
    return level1Course?.title || 'Chemin spirituel';
  };

  // Récupérer les quiz du cours de niveau 1 depuis Firebase
  const getCourseQuizzes = async (): Promise<Quiz[]> => {
    try {
      // Récupérer le cours de niveau 1 spécifiquement
      const level1Course = courses.find(course => course.level === 1);
      if (!level1Course) {
        console.log('⚠️ Aucun cours de niveau 1 trouvé');
        return [];
      }
      
      console.log('🎯 Cours de niveau 1 sélectionné:', {
        id: level1Course.id,
        title: level1Course.title,
        level: level1Course.level
      });
      
      // Récupérer les quiz depuis Firebase
      const courseQuizzes = await quizService.getQuizzesByCourse(level1Course.id.toString());
      console.log('🔥 Quiz du cours niveau 1 récupérés depuis Firebase:', {
        courseTitle: level1Course.title,
        quizCount: courseQuizzes.length,
        quizTitles: courseQuizzes.map(q => q.title)
      });
      return courseQuizzes;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des quiz du parcours niveau 1:', error);
      return [];
    }
  };

  // Charger les quiz du parcours depuis Firebase (optimisé)
  useEffect(() => {
    const loadCourseQuizzes = async () => {
      if (courses.length === 0) {
        console.log('⏳ En attente des cours pour charger les quiz du parcours...');
        return;
      }

      if (courseQuizzesLoaded) {
        console.log('🔄 Quiz du parcours déjà chargés, skip');
        return;
      }

      setIsLoadingCourseQuizzes(true);
      try {
        const quizzes = await getCourseQuizzes();
        setCourseQuizzes(quizzes);
        setCourseQuizzesLoaded(true);
        console.log('✅ Quiz du parcours chargés depuis Firebase (première fois):', {
          count: quizzes.length,
          hasEnoughForMapping: quizzes.length >= 7,
          quizTitles: quizzes.map(q => q.title)
        });
      } catch (error) {
        console.error('❌ Erreur lors du chargement des quiz du parcours:', error);
        setCourseQuizzes([]);
      } finally {
        setIsLoadingCourseQuizzes(false);
      }
    };

    loadCourseQuizzes();
  }, [courses, courseQuizzesLoaded]); // Dépend des cours chargés et du statut de chargement

  // Fonction helper pour obtenir le style de courbe
  const getCurveElementStyle = (index: number) => {
    const styleMap: Record<number, any> = {
      0: styles.curveElement0,
      1: styles.curveElement1,
      2: styles.curveElement2,
      3: styles.curveElement3,
      4: styles.curveElement4,
      5: styles.curveElement5,
      6: styles.curveElement6,
    };
    return [styles.curveElement, styleMap[index] || styles.curveElement0];
  };

  const getQuizTitle = (elementType: 'church' | 'pilgrim' | 'footprint', stepNumber: number): string => {
    const quizId = getElementQuizId(elementType, stepNumber === 1 && elementType === 'pilgrim' ? 1 : stepNumber === 7 ? 1 : stepNumber - 1);
    
    // Chercher d'abord dans les quiz du parcours
    const courseQuiz = courseQuizzes.find(quiz => quiz.id === quizId);
    if (courseQuiz) {
      return courseQuiz.title;
    }

    // Puis dans tous les quiz disponibles
    const availableQuiz = availableQuizzes.find(quiz => quiz.id === quizId);
    if (availableQuiz) {
      return availableQuiz.title;
    }

    const firstCourseName = getFirstCourseName();
    
    // Titre par défaut selon le type d'élément
    switch (elementType) {
      case 'pilgrim':
        return 'Quiz du Pèlerin - Début du parcours';
      case 'footprint':
        const footprintIndex = stepNumber - 1;
        return `Quiz Étape ${footprintIndex} - ${firstCourseName}`;
      case 'church':
        return 'Quiz de l\'Église - Destination finale';
      default:
        return 'Quiz spirituel';
    }
  };

  // Données par défaut si userProgress n'est pas encore chargé
  const defaultProgress = {
    totalPoints: 0,
    level: 1,
    streak: 0,
    completedQuizzes: [] as string[]
  };

  const progress = userProgress || defaultProgress;
  const insets = useSafeAreaInsets();
  
  // Log de débogage pour les quiz du parcours (uniquement quand les quiz sont chargés)
  useEffect(() => {
    if (courseQuizzes.length > 0) {
      console.log('🏃‍♂️ Quiz du parcours:', {
        courseName: getFirstCourseName(),
        courseQuizzesCount: courseQuizzes.length,
        isLoading: isLoadingCourseQuizzes,
        courseQuizzes: courseQuizzes.map(q => ({ id: q.id, title: q.title })),
        pilgrimQuiz: `Quiz 0: ${courseQuizzes[0]?.title || 'Non défini'}`,
        footprintQuizzes: [1, 2, 3, 4, 5].map(index => 
          `Footprint ${index}: ${courseQuizzes[index]?.title || 'Non défini'}`
        ),
        churchQuiz: `Quiz ${courseQuizzes.length - 1}: ${courseQuizzes[courseQuizzes.length - 1]?.title || 'Non défini'}`
      });
    }
  }, [courseQuizzes, isLoadingCourseQuizzes]);
  
  console.log('📚 Available quizzes:', availableQuizzes.length)
  
  // Afficher un état de chargement seulement pour le premier chargement
  const isFirstTimeLoading = (isLoadingCourses && !coursesLoaded) || 
                           (isLoadingQuizzes && !availableQuizzesLoaded && userLevel > 0) ||
                           userProgressLoading;
  
  if (isFirstTimeLoading) {
    return (
      <GlobalLoadingBar />
    );
  }
  
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'android' ? insets.top + 16 : 16,
          // Ajouter un padding à droite sur le web pour compenser la largeur du menu de gauche
          paddingRight: Platform.OS === 'web' ? '15%' : 0,
          paddingLeft: Platform.OS === 'web' ? '15%' : 0,
        }
      ]}
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 150 : 60, // Espace pour la barre de navigation
      }}
    >
      {/* Layout en deux colonnes sur le web uniquement */}
      {isWeb ? (
        <View style={styles.webLayout}>
          {/* Colonne de gauche - Quiz */}
          <View style={styles.leftColumn}>
            {/* Section Quiz disponibles */}
            {/* <ThemedView style={styles.section}>
              {availableQuizzes.length > 0 ? (
                availableQuizzes.map((quiz: Quiz, index: number) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onPress={handleQuizPress}
                    completed={progress.completedQuizzes.includes(quiz.id)}
                    score={progress.completedQuizzes.includes(quiz.id) ? 100 : undefined}
                    index={index}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <IconSymbol name="questionmark.circle" size={48} color={colors.text} />
                  <ThemedText style={[styles.emptyText, { color: colors.text }]}>
                    Aucun quiz disponible pour votre niveau
                  </ThemedText>
                </View>
              )}
            </ThemedView> */}

            {/* Section des Églises espacées verticalement */}
            <ThemedView style={styles.churchSection}>
              <ThemedView style={[styles.titleContainer, { backgroundColor: `${colors.primary}08` }]}>
                <ThemedText type="title" style={[styles.spiritualPathTitle, { color: colors.primary }]}>
                  🌟 {getFirstCourseName()} 🌟
                </ThemedText>
                <ThemedText style={[styles.spiritualPathSubtitle, { color: colors.text }]}>
                  📿 Suivez le chemin de votre parcours spirituel 📿
                </ThemedText>
                <ThemedView style={[styles.decorativeLine, { backgroundColor: colors.primary }]} />
              </ThemedView>
              {/* Pèlerin au début */}
              <TouchableOpacity
                style={getCurveElementStyle(0)}
                onPress={() => handleStepPress(1, 'pilgrim')}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.circleButton, {
                  borderColor: getBorderColor('pilgrim', 1, activeTooltips.pilgrim ? pilgrimPulse : undefined),
                  backgroundColor: getBackgroundColor('pilgrim', 1),
                  transform: [{ scale: pilgrimPulse }]
                }]}>
                  <View style={styles.pilgrimContainer}>
                    <PilgrimIcon
                      width={28}
                      height={45}
                      color={getElementColor('pilgrim', 1)}
                    />
                  </View>
                  {activeHints.pilgrim && (
                    <SpiritualPathHint
                      message="Début !"
                      type="info"
                      elementType="pilgrim"
                      visible={activeHints.pilgrim}
                      autoHide={false}
                    />
                  )}
                  {activeTooltips.pilgrim && (
                    <QuizTooltip
                      visible={activeTooltips.pilgrim}
                      quizTitle={getQuizTitle('pilgrim', 1)}
                      elementType="pilgrim"
                      onAccess={() => handleQuizAccess(1, 'pilgrim')}
                      onClose={closeTooltip}
                      isCompleted={isQuizCompleted('pilgrim', 1)}
                    />
                  )}
                </Animated.View>
              </TouchableOpacity>

              {/* 5 Empreintes */}
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                  key={`footprint-${index}`}
                  style={getCurveElementStyle(index)}
                  onPress={() => handleStepPress(index + 1, 'footprint')}
                  activeOpacity={0.7}
                >
                  <Animated.View style={[styles.circleButton, {
                    borderColor: getBorderColor('footprint', index, activeTooltips.footprint?.[index] ? footprintPulses[index - 1] : undefined),
                    backgroundColor: getBackgroundColor('footprint', index),
                    transform: [{ scale: footprintPulses[index - 1] }]
                  }]}>
                    <View style={[styles.footprintContainer, { transform: [{ rotate: '180deg' }] }]}>
                      <FootprintIcon
                        width={20}
                        height={28}
                        color={getElementColor('footprint', index)}
                        isLeft={index % 2 === 0}
                      />
                      <FootprintIcon
                        width={20}
                        height={28}
                        color={getElementColor('footprint', index)}
                        isLeft={index % 2 === 1}
                      />
                    </View>
                    {activeHints.footprint?.[index] && (
                      <SpiritualPathHint
                        message={`Étape ${index} du chemin. Continuez votre progression !`}
                        type="tip"
                        elementType="footprint"
                        visible={activeHints.footprint[index]}
                        autoHide={true}
                        autoHideDelay={2000}
                      />
                    )}
                    {activeTooltips.footprint?.[index] && (
                      <QuizTooltip
                        visible={activeTooltips.footprint[index]}
                        quizTitle={getQuizTitle('footprint', index + 1)}
                        elementType="footprint"
                        onAccess={() => handleQuizAccess(index + 1, 'footprint')}
                        onClose={closeTooltip}
                        isCompleted={isQuizCompleted('footprint', index)}
                      />
                    )}
                  </Animated.View>
                </TouchableOpacity>
              ))}

              {/* Église à la fin */}
              <TouchableOpacity
                style={getCurveElementStyle(6)}
                onPress={() => handleStepPress(7, 'church')}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.circleButton, {
                  borderColor: getBorderColor('church', 1, activeTooltips.church ? churchPulse : undefined),
                  backgroundColor: getBackgroundColor('church', 1),
                  transform: [{ scale: churchPulse }]
                }]}>
                  <View style={styles.churchContainer}>
                    <ChurchIcon
                      width={55}
                      height={55}
                      color={getElementColor('church', 1)}
                    />
                  </View>
                  {activeHints.church && (
                    <SpiritualPathHint
                      message="Destination atteinte ! Approfondissez vos connaissances."
                      type="success"
                      elementType="church"
                      visible={activeHints.church}
                      autoHide={true}
                      autoHideDelay={2000}
                    />
                  )}
                  {activeTooltips.church && (
                    <QuizTooltip
                      visible={activeTooltips.church}
                      quizTitle={getQuizTitle('church', 7)}
                      elementType="church"
                      onAccess={() => handleQuizAccess(7, 'church')}
                      onClose={closeTooltip}
                      isCompleted={isQuizCompleted('church', 1)}
                    />
                  )}
                </Animated.View>
              </TouchableOpacity>
            </ThemedView>
          </View>

          {/* Colonne de droite - Progression (uniquement sur le web) */}
          <View style={styles.rightColumn}>
            <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <ThemedText type="subtitle" style={[styles.progressCardTitle, { color: colors.text }]}>
                Votre progression
              </ThemedText>

              <View style={styles.userInfo}>
                <ThemedText style={[styles.level, { color: colors.primary }]}>
                  {getLevelTitle(progress.level)} - Niveau {progress.level}
                </ThemedText>

                {/* Barre de progression vers le prochain niveau */}
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${Math.min((progress.totalPoints % 1000) / 10, 100)}%`,
                          backgroundColor: colors.primary
                        }
                      ]}
                    />
                  </View>
                  <ThemedText style={[styles.progressText, { color: colors.text }]}>
                    {progress.totalPoints % 1000}/1000 points vers le niveau {progress.level + 1}
                  </ThemedText>
                </View>
              </View>
            </ThemedView>

            {/* Section Défis quotidiens */}
            <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 }]}>
              <ThemedText type="subtitle" style={[styles.progressCardTitle, { color: colors.text }]}>
                Défi du jour
              </ThemedText>

              <TouchableOpacity
                style={[styles.dailyChallenge, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push('/explore')}
              >
                <View style={styles.challengeContent}>
                  <IconSymbol name="target" size={24} color={colors.primary} />
                  <View style={styles.challengeText}>
                    <ThemedText type="subtitle" style={{ color: colors.text }}>Quiz sur les Saints</ThemedText>
                    <ThemedText style={[styles.challengeDescription, { color: colors.text }]}>
                      Testez vos connaissances sur les saints de l'Église catholique
                    </ThemedText>
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.primary} />
              </TouchableOpacity>
            </ThemedView>

            {/* Section Quiz populaires */}
            <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 }]}>
              <ThemedText type="subtitle" style={[styles.progressCardTitle, { color: colors.text }]}>Quiz populaires</ThemedText>
              {isLoadingPopular ? (
                <ThemedText style={{ color: colors.text, textAlign: 'center', marginVertical: 20 }}>Chargement...</ThemedText>
              ) : (
                popularQuizzes.map((quiz) => (
                  <TouchableOpacity
                    key={quiz.id}
                    style={[styles.popularQuiz]}
                    onPress={() => handleQuizPress(quiz)}
                  >
                    <View style={styles.quizInfo}>
                      <ThemedText type="subtitle" style={[{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }, { color: colors.text }]}>
                        <IconSymbol name="star.fill" size={16} color="#FFD700" style={{ marginRight: 8 }} />{quiz.title}
                      </ThemedText>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colors.primary} />
                  </TouchableOpacity>
                ))
              )}
            </ThemedView>
          </View>
        </View>
      ) : (
        /* Layout mobile - Structure originale */
        <View>
          {/* Header avec progression utilisateur (mobile uniquement) */}
          <ThemedView style={[
            styles.header,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              marginTop: Platform.OS === 'android' ? 0 : 16, // Pas de marge en haut sur Android
            }
          ]}>
            <View style={styles.userInfo}>
              <ThemedText style={[styles.level, { color: colors.primary }]}>
                {getLevelTitle(progress.level)} - Niveau {progress.level}
              </ThemedText>

              {/* Barre de progression vers le prochain niveau */}
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${Math.min((progress.totalPoints % 1000) / 10, 100)}%`,
                        backgroundColor: colors.primary
                      }
                    ]}
                  />
                </View>
                <ThemedText style={[styles.progressText, { color: colors.text }]}>
                  {progress.totalPoints % 1000}/1000 points vers le niveau {progress.level + 1}
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          {/* Section Quiz disponibles */}
          <ThemedView style={styles.section}>
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz: Quiz, index: number) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onPress={handleQuizPress}
                  completed={progress.completedQuizzes.includes(quiz.id)}
                  score={progress.completedQuizzes.includes(quiz.id) ? 85 : undefined}
                  index={index}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <IconSymbol name="questionmark.circle" size={48} color={colors.text} />
                <ThemedText style={[styles.emptyText, { color: colors.text }]}>
                  Aucun quiz disponible pour votre niveau
                </ThemedText>
              </View>
            )}
          </ThemedView>

          {/* Section des Églises espacées verticalement */}
          <ThemedView style={styles.churchSection}>
            <ThemedView style={[styles.titleContainer, { backgroundColor: `${colors.primary}08` }]}>
              <ThemedText type="title" style={[styles.spiritualPathTitle, { color: colors.primary }]}>
                🌟 {getFirstCourseName()} 🌟
              </ThemedText>
              <ThemedText style={[styles.spiritualPathSubtitle, { color: colors.text }]}>
                📿 Suivez le chemin de votre parcours spirituel 📿
              </ThemedText>
              <ThemedView style={[styles.decorativeLine, { backgroundColor: colors.primary }]} />
            </ThemedView>
            {/* Pèlerin au début */}
            <TouchableOpacity
              style={getCurveElementStyle(0)}
              onPress={() => handleStepPress(1, 'pilgrim')}
              activeOpacity={0.7}
            >
              <Animated.View style={[styles.circleButton, {
                borderColor: getBorderColor('pilgrim', 1, activeTooltips.pilgrim ? pilgrimPulse : undefined),
                backgroundColor: getBackgroundColor('pilgrim', 1),
                transform: [{ scale: pilgrimPulse }]
              }]}>
                <View style={styles.pilgrimContainer}>
                  <PilgrimIcon
                    width={28}
                    height={45}
                    color={getElementColor('pilgrim', 1)}
                  />
                </View>
                {activeHints.pilgrim && (
                  <SpiritualPathHint
                    message="Début du pèlerinage !"
                    type="info"
                    elementType="pilgrim"
                    visible={activeHints.pilgrim}
                    autoHide={true}
                    autoHideDelay={2500}
                  />
                )}
                {activeTooltips.pilgrim && (
                  <QuizTooltip
                    visible={activeTooltips.pilgrim}
                    quizTitle={getQuizTitle('pilgrim', 1)}
                    elementType="pilgrim"
                    onAccess={() => handleQuizAccess(1, 'pilgrim')}
                    onClose={closeTooltip}
                    isCompleted={isQuizCompleted('pilgrim', 1)}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>

            {/* 5 Empreintes */}
            {[1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity
                key={`footprint-${index}`}
                style={getCurveElementStyle(index)}
                onPress={() => handleStepPress(index + 1, 'footprint')}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.circleButton, {
                  borderColor: getBorderColor('footprint', index, activeTooltips.footprint?.[index] ? footprintPulses[index - 1] : undefined),
                  backgroundColor: getBackgroundColor('footprint', index),
                  transform: [{ scale: footprintPulses[index - 1] }]
                }]}>
                  <View style={[styles.footprintContainer, { transform: [{ rotate: '180deg' }] }]}>
                    <FootprintIcon
                      width={20}
                      height={28}
                      color={getElementColor('footprint', index)}
                      isLeft={index % 2 === 0}
                    />
                    <FootprintIcon
                      width={20}
                      height={28}
                      color={getElementColor('footprint', index)}
                      isLeft={index % 2 === 1}
                    />
                  </View>
                  {activeHints.footprint?.[index] && (
                    <SpiritualPathHint
                      message={`Étape ${index}`}
                      type="tip"
                      elementType="footprint"
                      visible={activeHints.footprint[index]}
                      autoHide={true}
                      autoHideDelay={2000}
                    />
                  )}
                  {activeTooltips.footprint?.[index] && (
                    <QuizTooltip
                      visible={activeTooltips.footprint[index]}
                      quizTitle={getQuizTitle('footprint', index + 1)}
                      elementType="footprint"
                      onAccess={() => handleQuizAccess(index + 1, 'footprint')}
                      onClose={closeTooltip}
                      isCompleted={isQuizCompleted('footprint', index)}
                    />
                  )}
                </Animated.View>
              </TouchableOpacity>
            ))}

            {/* Église à la fin */}
            <TouchableOpacity
              style={getCurveElementStyle(6)}
              onPress={() => handleStepPress(7, 'church')}
              activeOpacity={0.7}
            >
              <Animated.View style={[styles.circleButton, {
                borderColor: getBorderColor('church', 1, activeTooltips.church ? churchPulse : undefined),
                backgroundColor: getBackgroundColor('church', 1),
                transform: [{ scale: churchPulse }]
              }]}>
                <View style={styles.churchContainer}>
                  <ChurchIcon
                    width={55}
                    height={55}
                    color={getElementColor('church', 1)}
                  />
                </View>
                {activeHints.church && (
                  <SpiritualPathHint
                    message="Destination !"
                    type="success"
                    elementType="church"
                    visible={activeHints.church}
                    autoHide={true}
                    autoHideDelay={2000}
                  />
                )}
                {activeTooltips.church && (
                  <QuizTooltip
                    visible={activeTooltips.church}
                    quizTitle={getQuizTitle('church', 7)}
                    elementType="church"
                    onAccess={() => handleQuizAccess(7, 'church')}
                    onClose={closeTooltip}
                    isCompleted={isQuizCompleted('church', 1)}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          </ThemedView>

          {/* Section Défis quotidiens */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>Défi du jour</ThemedText>
            <TouchableOpacity
              style={[styles.dailyChallenge, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/explore')}
            >
              <View style={styles.challengeContent}>
                <IconSymbol name="target" size={24} color={colors.primary} />
                <View style={styles.challengeText}>
                  <ThemedText type="subtitle" style={{ color: colors.text }}>Quiz sur les Saints</ThemedText>
                  <ThemedText style={[styles.challengeDescription, { color: colors.text }]}>Testez vos connaissances sur les saints de l'Église catholique</ThemedText>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.primary} />
            </TouchableOpacity>
          </ThemedView>

          {/* Section Quiz populaires */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>Quiz populaires</ThemedText>
            {isLoadingPopular ? (
              <ThemedText style={{ color: colors.text, textAlign: 'center', marginVertical: 20 }}>Chargement...</ThemedText>
            ) : (
              popularQuizzes.map((quiz) => (
                <TouchableOpacity
                  key={quiz.id}
                  style={[styles.popularQuiz, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleQuizPress(quiz)}
                >
                  <View style={styles.quizInfo}>
                    <ThemedText type="subtitle" style={[{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }, { color: colors.text }]}>
                      {quiz.title}
                    </ThemedText>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={colors.primary} />
                </TouchableOpacity>
              ))
            )}
          </ThemedView>
        </View>
      )}

      {/* Modal de sélection de quiz */}
      <QuizSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        stepNumber={selectedStep}
        elementType={selectedElementType}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeader: {
    padding: 20,
    paddingTop: 40,
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    margin: Platform.OS === 'android' ? 0 : 16, // Pas de marge sur Android
    marginTop: Platform.OS === 'android' ? 0 : 0, // En haut de l'écran sur Android
    borderRadius: Platform.OS === 'android' ? 0 : 16, // Pas de border radius sur Android
    borderWidth: Platform.OS === 'android' ? 0 : 1, // Pas de bordure sur Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  userInfo: {
    marginBottom: 16,
  },
  greeting: {
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  dailyChallenge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  challengeText: {
    marginLeft: 12,
    flex: 1,
  },
  challengeDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  progressCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  progressCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBarContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.8,
  },
  loadingSubtext: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.7,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  welcomeContainer: {
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    opacity: 0.8,
  },
  webLayout: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    flex: 2,
    paddingRight: 16,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 16,
  },
  popularQuiz: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 193, 7, 0.1)', // Fond doré subtil
    borderColor: 'rgba(255, 193, 7, 0.3)', // Bordure dorée
  },
  popularQuizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  popularIcon: {
    marginRight: 8,
  },
  quizInfo: {
    flex: 1,
    marginRight: 12,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  quizMetaText: {
    fontSize: 12,
  },
  churchSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  churchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  pilgrimContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  stepButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  // Styles pour la courbe spirituelle
  curveElement: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  // Positions spécifiques pour chaque élément de la courbe (forme de S)
  curveElement0: {
    marginLeft: 0, // Pèlerin au centre
    transform: [{ rotate: '0deg' }],
  },
  curveElement1: {
    marginLeft: -35, // Première empreinte à gauche
    transform: [{ rotate: '-5deg' }],
  },
  curveElement2: {
    marginLeft: -60, // Deuxième empreinte plus à gauche (point le plus à gauche)
    transform: [{ rotate: '-10deg' }],
  },
  curveElement3: {
    marginLeft: -45, // Troisième empreinte revient légèrement vers le centre
    transform: [{ rotate: '-5deg' }],
  },
  curveElement4: {
    marginLeft: 0, // Quatrième empreinte au centre (point de croisement)
    transform: [{ rotate: '0deg' }],
  },
  curveElement5: {
    marginLeft: 45, // Cinquième empreinte vers la droite (point le plus à droite)
    transform: [{ rotate: '10deg' }],
  },
  curveElement6: {
    marginLeft: 20, // Église légèrement à droite du centre
    transform: [{ rotate: '5deg' }],
  },
  // Styles pour le titre attractif
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spiritualPathTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  spiritualPathSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
    lineHeight: 18,
    marginBottom: 12,
  },
  decorativeLine: {
    width: 60,
    height: 3,
    borderRadius: 2,
    opacity: 0.6,
  },
  circleButton: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  stepNumber: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footprintContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: 4,
  },

});

