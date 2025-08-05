import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { SpiritualChallenge } from '../types/quiz';
import { ThemedText } from './ThemedText';

interface ChallengeCardProps {
  challenge: SpiritualChallenge;
  onPress?: () => void;
}

export function ChallengeCard({ challenge, onPress }: ChallengeCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'prayer': return 'prayer_times';
      case 'reading': return 'menu_book';
      case 'quiz': return 'quiz';
      case 'reflection': return 'edit_note';
      default: return 'emoji_events';
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'prayer': return colors.primary;
      case 'reading': return colors.secondary;
      case 'quiz': return colors.success;
      case 'reflection': return colors.warning;
      default: return colors.text;
    }
  };

  const calculateProgress = () => {
    const totalRequirements = challenge.requirements.length;
    const completedRequirements = challenge.requirements.filter(req => req.current >= req.target).length;
    return (completedRequirements / totalRequirements) * 100;
  };

  const progress = calculateProgress();
  const isCompleted = progress >= 100;
  const daysLeft = Math.ceil((challenge.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isCompleted ? colors.success : colors.border,
          borderWidth: isCompleted ? 2 : 1,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${getChallengeColor(challenge.type)}20` }]}>
          <MaterialIcons
            name={getChallengeIcon(challenge.type) as any}
            size={24}
            color={getChallengeColor(challenge.type)}
          />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
            {challenge.title}
          </ThemedText>
          <View style={styles.metaInfo}>
            <MaterialIcons name="schedule" size={14} color={colors.text} />
            <ThemedText style={[styles.metaText, { color: colors.text }]}>
              {daysLeft > 0 ? `${daysLeft} jours restants` : 'Terminé'}
            </ThemedText>
          </View>
        </View>
        {isCompleted && (
          <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
            <MaterialIcons name="check" size={16} color={colors.background} />
          </View>
        )}
      </View>

      <ThemedText style={[styles.description, { color: colors.text }]}>
        {challenge.description}
      </ThemedText>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <ThemedText style={[styles.progressLabel, { color: colors.text }]}>
            Progression
          </ThemedText>
          <ThemedText style={[styles.progressPercent, { color: colors.text }]}>
            {Math.round(progress)}%
          </ThemedText>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progress}%`,
                backgroundColor: isCompleted ? colors.success : getChallengeColor(challenge.type)
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.requirements}>
        {challenge.requirements.map((req, index) => (
          <View key={index} style={styles.requirement}>
            <MaterialIcons 
              name={req.current >= req.target ? 'check-circle' : 'radio-button-unchecked'} 
              size={16} 
              color={req.current >= req.target ? colors.success : colors.text} 
            />
            <ThemedText style={[styles.requirementText, { color: colors.text }]}>
              {req.current}/{req.target} {getRequirementLabel(req.type)}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={[styles.rewardSection, { backgroundColor: `${colors.secondary}10` }]}>
        <MaterialIcons name="emoji_events" size={20} color={colors.secondary} />
        <View style={styles.rewardInfo}>
          <ThemedText style={[styles.rewardTitle, { color: colors.text }]}>
            Récompense
          </ThemedText>
          <ThemedText style={[styles.rewardPoints, { color: colors.secondary }]}>
            +{challenge.reward.points} points
          </ThemedText>
          {challenge.reward.title && (
            <ThemedText style={[styles.rewardBadge, { color: colors.text }]}>
              {challenge.reward.title}
            </ThemedText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getRequirementLabel = (type: string): string => {
  switch (type) {
    case 'prayer_count': return 'prières';
    case 'reading_minutes': return 'minutes de lecture';
    case 'quiz_completed': return 'quiz complétés';
    case 'reflection_words': return 'mots de réflexion';
    default: return '';
  }
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 16,
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  requirements: {
    marginBottom: 16,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    marginLeft: 8,
  },
  rewardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  rewardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  rewardTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  rewardBadge: {
    fontSize: 12,
    opacity: 0.8,
  },
}); 