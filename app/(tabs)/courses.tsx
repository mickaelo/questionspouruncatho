import { CourseCard } from '@/components/CourseCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { canAccessCourse, getCourseProgress } from '@/data/courses';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCourseData } from '@/hooks/useCourseData';
import { useUserProgress } from '@/hooks/useUserProgress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CoursesScreen() {
  const { user, isAuthenticated } = useAuth();
  const { userProgress } = useUserProgress();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  // Données utilisateur dynamiques
  const userLevel = userProgress?.level || 1;
  const userPoints = userProgress?.totalPoints || 0;
  const userQuizzes = userProgress?.completedQuizzes.length || 0;
  const userBadges = 3; // TODO: Récupérer depuis userProgress

  // Récupération dynamique des cours
  const { courses, isLoading } = useCourseData();

  return (
    <ScrollView 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
        }
      ]}
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 150 : 60, // Espace pour la barre de navigation
      }}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="school" size={32} color={colors.primary} />
          <View style={styles.headerText}>
            <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
              Parcours de Formation
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.text }]}>
              Parcourez votre cheminement spirituel
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Progression globale */}
      <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Votre Progression
        </ThemedText>
        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <MaterialIcons name="star" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <ThemedText style={[styles.statValue, { color: colors.text }]}>
                {userPoints}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: colors.text }]}>
                Points totaux
              </ThemedText>
            </View>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="quiz" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <ThemedText style={[styles.statValue, { color: colors.text }]}>
                {userQuizzes}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: colors.text }]}>
                Quiz complétés
              </ThemedText>
            </View>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="emoji-events" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <ThemedText style={[styles.statValue, { color: colors.text }]}>
                {userBadges}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: colors.text }]}>
                Badges débloqués
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.currentLevel}>
          <ThemedText style={[styles.currentLevelText, { color: colors.text }]}>
            Niveau actuel : <ThemedText style={[styles.levelHighlight, { color: colors.primary }]}>
              {userLevel}
            </ThemedText>
          </ThemedText>
        </View>
      </ThemedView>

      {/* Parcours de formation */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Parcours de Formation
        </ThemedText>
        <ThemedText style={[styles.sectionDescription, { color: colors.text }]}>
          Choisissez votre niveau de formation selon votre expérience spirituelle
        </ThemedText>
      </ThemedView>

      {/* Liste des parcours */}
      <View style={styles.levelsContainer}>
        {isLoading ? (
          <ThemedText style={{ color: colors.text, textAlign: 'center', marginVertical: 20 }}>Chargement des parcours...</ThemedText>
        ) : (
          // Trier les cours par niveau avant de les afficher
          courses
            .sort((a, b) => a.level - b.level) // Tri croissant par niveau
            .map((course) => {
            const courseLevel = course.level;
            const isUnlocked = canAccessCourse(userLevel, courseLevel);
            const progress = isUnlocked ? getCourseProgress(
              userPoints,
              userQuizzes,
              userBadges,
              course
            ) : undefined;

            return (
              <CourseCard
                key={course.id}
                course={course}
                userLevel={userLevel}
                userPoints={userPoints}
                userQuizzes={userQuizzes}
                userBadges={userBadges}
                isUnlocked={isUnlocked}
                progress={progress}
              />
            );
          })
        )}
      </View>

      {/* Informations supplémentaires */}
      <ThemedView style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <MaterialIcons name="info" size={24} color={colors.primary} />
        <View style={styles.infoContent}>
          <ThemedText type="subtitle" style={[styles.infoTitle, { color: colors.text }]}>
            Comment progresser ?
          </ThemedText>
          <ThemedText style={[styles.infoText, { color: colors.text }]}>
            Complétez des quiz, gagnez des points et débloquez des badges pour accéder aux parcours supérieurs. 
            Chaque niveau vous offre un contenu adapté à votre progression spirituelle.
          </ThemedText>
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
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
  progressCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
    marginTop: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
  },
  currentLevel: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  currentLevelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  levelHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  levelsContainer: {
    paddingHorizontal: 20,
  },
  infoCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
}); 