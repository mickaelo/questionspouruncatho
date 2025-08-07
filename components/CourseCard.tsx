import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Course, CourseContent } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface CourseCardProps {
  course: Course | CourseContent;
  userLevel: number;
  userPoints: number;
  userQuizzes: number;
  userBadges: number;
  isUnlocked: boolean;
  progress?: {
    pointsProgress: number;
    quizzesProgress: number;
    badgesProgress: number;
    overallProgress: number;
  };
}

export function CourseCard({
  course,
  userLevel,
  userPoints,
  userQuizzes,
  userBadges,
  isUnlocked,
  progress
}: CourseCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Vérification de sécurité
  if (!course) {
    return null;
  }

  const handlePress = () => {
    if (isUnlocked) {
      router.push(`/course/${course.id}`);
    }
  };

  // Utiliser level pour CourseContent et id pour Course
  const courseLevel = (course as any).level || course.id;
  const isCurrentCourse = userLevel === courseLevel;
  const isCompleted = userLevel > courseLevel;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: isCurrentCourse ? course.color : colors.border,
          opacity: isUnlocked ? 1 : 0.6
        }
      ]}
      onPress={handlePress}
      disabled={!isUnlocked}
      activeOpacity={0.8}
    >
      {/* Header avec icône et titre */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${course.color}20` }]}>
          <ThemedText style={[styles.icon, { color: course.color }]}>
            {(course as CourseContent).icon || '📚'}
          </ThemedText>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
            {(course as CourseContent).title || course.title}
          </ThemedText>
          <ThemedText style={[styles.courseNumber, { color: course.color }]}>
            Niveau {courseLevel}
          </ThemedText>
        </View>
        {isCompleted && (
          <MaterialIcons name="check-circle" size={24} color={course.color} />
        )}
        {isCurrentCourse && (
          <MaterialIcons name="play-circle-outline" size={24} color={course.color} />
        )}
      </View>

      {/* Description */}
      <ThemedText style={[styles.description, { color: colors.text }]}>
        {(course as CourseContent).description || course.description}
      </ThemedText>

      {/* Public cible */}
      <View style={styles.targetAudience}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Public cible :
        </ThemedText>
        <View style={styles.audienceList}>
          {(course as CourseContent).targetAudience?.map((audience, index) => (
            <View key={index} style={styles.audienceItem}>
              <MaterialIcons name="person" size={16} color={colors.primary} />
              <ThemedText style={[styles.audienceText, { color: colors.text }]}>
                {audience}
              </ThemedText>
            </View>
          )) || course.targetAudience?.map((audience, index) => (
            <View key={index} style={styles.audienceItem}>
              <MaterialIcons name="person" size={16} color={colors.primary} />
              <ThemedText style={[styles.audienceText, { color: colors.text }]}>
                {audience}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Contenus types */}
      <View style={styles.contentTypes}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Contenus :
        </ThemedText>
        <View style={styles.contentList}>
          {(course as CourseContent).contentTypes?.slice(0, 3).map((content, index) => (
            <View key={index} style={styles.contentItem}>
              <MaterialIcons name="book" size={16} color={colors.primary} />
              <ThemedText style={[styles.contentText, { color: colors.text }]}>
                {content}
              </ThemedText>
            </View>
          )) || course.contentTypes?.slice(0, 3).map((content, index) => (
            <View key={index} style={styles.contentItem}>
              <MaterialIcons name="book" size={16} color={colors.primary} />
              <ThemedText style={[styles.contentText, { color: colors.text }]}>
                {content}
              </ThemedText>
            </View>
          ))}
          {((course as CourseContent).contentTypes?.length || course.contentTypes?.length || 0) > 3 && (
            <ThemedText style={[styles.moreContent, { color: colors.primary }]}>
              +{((course as CourseContent).contentTypes?.length || course.contentTypes?.length || 0) - 3} autres contenus
            </ThemedText>
          )}
        </View>
      </View>

      {/* Barre de progression */}
      {progress && isUnlocked && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <ThemedText style={[styles.progressText, { color: colors.text }]}>
              Progression : {Math.round(progress.overallProgress)}%
            </ThemedText>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: course.color,
                  width: `${progress.overallProgress}%`
                }
              ]}
            />
          </View>
          <View style={styles.progressDetails}>
            <View style={styles.progressItem}>
              <MaterialIcons name="star" size={16} color={colors.primary} />
              <ThemedText style={[styles.progressDetailText, { color: colors.text }]}>
                Points : {Math.round(progress.pointsProgress)}%
              </ThemedText>
            </View>
            <View style={styles.progressItem}>
              <MaterialIcons name="quiz" size={16} color={colors.primary} />
              <ThemedText style={[styles.progressDetailText, { color: colors.text }]}>
                Quiz : {Math.round(progress.quizzesProgress)}%
              </ThemedText>
            </View>
            <View style={styles.progressItem}>
              <MaterialIcons name="emoji-events" size={16} color={colors.primary} />
              <ThemedText style={[styles.progressDetailText, { color: colors.text }]}>
                Badges : {Math.round(progress.badgesProgress)}%
              </ThemedText>
            </View>
          </View>
        </View>
      )}

      {/* Statut */}
      {!isUnlocked && (
        <View style={styles.lockedStatus}>
          <MaterialIcons name="lock" size={20} color={colors.text} />
          <ThemedText style={[styles.lockedText, { color: colors.text }]}>
            Niveau {userLevel} requis
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  courseNumber: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  targetAudience: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  audienceList: {
    gap: 4,
  },
  audienceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  audienceText: {
    fontSize: 14,
  },
  contentTypes: {
    marginBottom: 16,
  },
  contentList: {
    gap: 4,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contentText: {
    fontSize: 14,
  },
  moreContent: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressDetailText: {
    fontSize: 12,
  },
  lockedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  lockedText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 