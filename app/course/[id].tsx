import { ChallengeCard } from '@/components/ChallengeCard';
import { GlobalLoadingBar } from '@/components/GlobalLoadingBar';
import { QuizCard } from '@/components/QuizCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { spiritualChallenges } from '@/data/gamification';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCourseData } from '@/hooks/useCourseData';
import { useQuizData } from '@/hooks/useQuizData';
import { Course, Quiz } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';
  const { getCourse } = useCourseData();
  const { getQuizzesByCourse } = useQuizData();
  const [course, setCourse] = useState<Course | null>(null);
  // Vérifier que l'ID est valide
  const courseId = id as string | undefined;
  // État pour les quiz du niveau
  const [courseQuizzes, setCourseQuizzes] = useState<Quiz[]>([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(true);

  // Check if user is admin
  const isAdmin = isAuthenticated && user?.type?.includes('admin');
  
  // Get user course (default to 1 if not available)
  const userLevel = 1; // TODO: Get from user progress

  // Charger les quiz du niveau depuis Firebase
  useEffect(() => {
    const loadCourseQuizzes = async () => {
      if (!courseId) {
        setCourseQuizzes([]);
        setIsLoadingQuizzes(false);
        return;
      }

      try {
        const courseData = await getCourse(courseId);
        setCourse(courseData);
        setIsLoadingQuizzes(true);
        const quizzes = await getQuizzesByCourse(courseId);
        setCourseQuizzes(quizzes || []);
      } catch (error) {
        console.error('Erreur lors du chargement des quiz du niveau:', error);
        setCourseQuizzes([]);
      } finally {
        setIsLoadingQuizzes(false);
      }
    };

    loadCourseQuizzes();
  }, [courseId, getCourse, getQuizzesByCourse]);

  // Filtrer les défis pour ce niveau
  const courseChallenges = spiritualChallenges.filter(challenge => 
    challenge.title.toLowerCase().includes(course?.title?.toLowerCase() || '')
  );

  if (!course) {
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
      
        }
      ]}
    >
      {/* Header avec retour */}
      <ThemedView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          {/* <View style={[styles.courseIcon, { backgroundColor: `${course.color}20` }]}>
            <ThemedText style={[styles.icon, { color: course.color }]}>
              {course.icon}
            </ThemedText>
          </View> */}
          <View style={styles.headerText}>
            <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
              {course.title}
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.text }]}>
              Niveau {course.level}
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Description du niveau */}
      <ThemedView style={[styles.descriptionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText style={[styles.description, { color: colors.text }]}>
          {course.description}
        </ThemedText>
      </ThemedView>

      {/* Public cible */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Public cible
        </ThemedText>
        <View style={styles.audienceList}>
          {course.targetAudience.map((audience, index) => (
            <View key={index} style={styles.audienceItem}>
              <MaterialIcons name="person" size={20} color={colors.primary} />
              <ThemedText style={[styles.audienceText, { color: colors.text }]}>
                {audience}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Contenus du niveau */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Contenus de formation
        </ThemedText>
        <View style={styles.contentList}>
          {course.contentTypes.map((content, index) => (
            <View key={index} style={styles.contentItem}>
              <MaterialIcons name="book" size={20} color={colors.primary} />
              <ThemedText style={[styles.contentText, { color: colors.text }]}>
                {content}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Quiz du niveau */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Quiz disponibles ({courseQuizzes.length})
        </ThemedText>
        {isLoadingQuizzes ? (
          <ThemedView style={[styles.loadingState, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="hourglass-empty" size={48} color={colors.secondary} />
            <ThemedText style={[styles.loadingText, { color: colors.secondary }]}>
              Chargement des quiz...
            </ThemedText>
          </ThemedView>
        ) : courseQuizzes.length > 0 ? (
          <View style={styles.quizList}>
            {courseQuizzes.map((quiz: Quiz) => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                onPress={() => router.push({
                  pathname: '/quiz/[id]',
                  params: { id: quiz.id }
                })}
              />
            ))}
          </View>
        ) : (
          <ThemedView style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="quiz" size={48} color={colors.text} style={{ opacity: 0.5 }} />
            <ThemedText style={[styles.emptyText, { color: colors.text }]}>
              Aucun quiz disponible pour ce niveau
            </ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: colors.text }]}>
              Les quiz seront ajoutés prochainement
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* Défis spirituels */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Défis spirituels ({courseChallenges.length})
        </ThemedText>
        {courseChallenges.length > 0 ? (
          <View style={styles.challengeList}>
            {courseChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        ) : (
          <ThemedView style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="emoji-events" size={48} color={colors.text} style={{ opacity: 0.5 }} />
            <ThemedText style={[styles.emptyText, { color: colors.text }]}>
              Aucun défi disponible pour ce niveau
            </ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: colors.text }]}>
              Les défis seront ajoutés prochainement
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>


      {/* Actions */}
      <ThemedView style={styles.section}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)/courses')}
          >
            <MaterialIcons name="school" size={20} color={colors.background} />
            <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
              Voir tous les parcours
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <MaterialIcons name="explore" size={20} color={colors.primary} />
            <ThemedText style={[styles.actionButtonText, { color: colors.primary }]}>
              Explorer les catégories
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  courseIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  descriptionCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  audienceList: {
    gap: 12,
  },
  audienceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  audienceText: {
    fontSize: 16,
  },
  contentList: {
    gap: 12,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contentText: {
    fontSize: 16,
    flex: 1,
  },
  quizList: {
    gap: 16,
  },
  challengeList: {
    gap: 16,
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
  prerequisitesList: {
    gap: 12,
  },
  prerequisiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prerequisiteText: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadingState: {
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
}); 