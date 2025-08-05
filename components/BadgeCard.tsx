import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { getRarityColor } from '../data/gamification';
import { useColorScheme } from '../hooks/useColorScheme';
import { Badge } from '../types/quiz';
import { ThemedText } from './ThemedText';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  onPress?: () => void;
  showProgress?: boolean;
  progress?: number;
}

export function BadgeCard({ badge, isUnlocked, onPress, showProgress = false, progress = 0 }: BadgeCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const rarityColor = getRarityColor(badge.rarity);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isUnlocked ? rarityColor : colors.border,
          opacity: isUnlocked ? 1 : 0.6,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: isUnlocked ? `${rarityColor}20` : `${colors.border}20` }]}>
          <MaterialIcons
            name={badge.icon as any}
            size={24}
            color={isUnlocked ? rarityColor : colors.text}
          />
        </View>
        <View style={styles.rarityBadge}>
          <ThemedText style={[styles.rarityText, { color: colors.background }]}>
            {badge.rarity.toUpperCase()}
          </ThemedText>
        </View>
      </View>

      <View style={styles.content}>
        <ThemedText type="subtitle" style={[styles.name, { color: colors.text }]}>
          {badge.name}
        </ThemedText>
        <ThemedText style={[styles.description, { color: colors.text }]}>
          {badge.description}
        </ThemedText>

        {showProgress && !isUnlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: rarityColor 
                  }
                ]} 
              />
            </View>
            <ThemedText style={[styles.progressText, { color: colors.text }]}>
              {Math.round(progress)}%
            </ThemedText>
          </View>
        )}

        {isUnlocked && (
          <View style={styles.unlockedContainer}>
            <MaterialIcons name="check-circle" size={16} color={colors.success} />
            <ThemedText style={[styles.unlockedText, { color: colors.success }]}>
              Débloqué
            </ThemedText>
          </View>
        )}

        <View style={styles.rewardContainer}>
          <MaterialIcons name="star" size={16} color={colors.secondary} />
          <ThemedText style={[styles.rewardText, { color: colors.text }]}>
            +{badge.pointsReward} points
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 12,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rarityBadge: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  unlockedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  unlockedText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
}); 