import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Level, LevelContent } from '@/types/quiz';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface LevelCardProps {
  level: Level | LevelContent;
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

export function LevelCard({ 
  level, 
  userLevel, 
  userPoints, 
  userQuizzes, 
  userBadges, 
  isUnlocked, 
  progress 
}: LevelCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    if (isUnlocked) {
      router.push(`/level/${level.id || (level as LevelContent).level}`);
    }
  };

  const isCurrentLevel = userLevel === (level.id || (level as LevelContent).level);
  const isCompleted = userLevel > (level.id || (level as LevelContent).level);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: colors.card,
          borderColor: isCurrentLevel ? level.color : colors.border,
          opacity: isUnlocked ? 1 : 0.6
        }
      ]}
      onPress={handlePress}
      disabled={!isUnlocked}
      activeOpacity={0.8}
    >
      {/* Header avec icône et titre */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${level.color}20` }]}>
          <ThemedText style={[styles.icon, { color: level.color }]}>
            {(level as LevelContent).icon || '📚'}
          </ThemedText>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
            {(level as LevelContent).title || level.name}
          </ThemedText>
          <ThemedText style={[styles.levelNumber, { color: level.color }]}>
            Niveau {level.id || (level as LevelContent).level}
          </ThemedText>
        </View>
        {isCompleted && (
          <MaterialIcons name="check-circle" size={24} color={level.color} />
        )}
        {isCurrentLevel && (
          <MaterialIcons name="play-circle-outline" size={24} color={level.color} />
        )}
      </View>

      {/* Description */}
      <ThemedText style={[styles.description, { color: colors.text }]}>
        {(level as LevelContent).description || level.description}
      </ThemedText>

      {/* Public cible */}
      <View style={styles.targetAudience}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Public cible :
        </ThemedText>
        <View style={styles.audienceList}>
          {(level as LevelContent).targetAudience?.map((audience, index) => (
            <View key={index} style={styles.audienceItem}>
              <MaterialIcons name="person" size={16} color={colors.primary} />
              <ThemedText style={[styles.audienceText, { color: colors.text }]}>
                {audience}
              </ThemedText>
            </View>
          )) || level.targetAudience?.map((audience, index) => (
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
          {(level as LevelContent).contentTypes?.slice(0, 3).map((content, index) => (
            <View key={index} style={styles.contentItem}>
              <MaterialIcons name="book" size={16} color={colors.primary} />
              <ThemedText style={[styles.contentText, { color: colors.text }]}>
                {content}
              </ThemedText>
            </View>
          )) || level.contentTypes?.slice(0, 3).map((content, index) => (
            <View key={index} style={styles.contentItem}>
              <MaterialIcons name="book" size={16} color={colors.primary} />
              <ThemedText style={[styles.contentText, { color: colors.text }]}>
                {content}
              </ThemedText>
            </View>
          ))}
          {((level as LevelContent).contentTypes?.length || level.contentTypes?.length || 0) > 3 && (
            <ThemedText style={[styles.moreContent, { color: colors.primary }]}>
              +{((level as LevelContent).contentTypes?.length || level.contentTypes?.length || 0) - 3} autres contenus
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
                  backgroundColor: level.color,
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
  levelNumber: {
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