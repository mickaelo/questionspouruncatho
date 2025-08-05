import { ChallengeCard } from '@/components/ChallengeCard';
import { QuizCard } from '@/components/QuizCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { sampleQuizzes, sampleSpiritualChallenges } from '@/data/gamification';
import { getLevelById, getLevelContentById } from '@/data/levels';
import { getQuizzesByLevel } from '@/data/questions';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LevelDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';

  const levelId = parseInt(id as string);
  const levelContent = getLevelContentById(levelId);
  const level = getLevelById(levelId);

  if (!levelContent || !level) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={styles.errorContainer}>
          <MaterialIcons name="error" size={48} color={colors.error} />
          <ThemedText type="title" style={[styles.errorTitle, { color: colors.text }]}>
            Niveau non trouvé
          </ThemedText>
          <ThemedText style={[styles.errorText, { color: colors.text }]}>
            Le niveau demandé n'existe pas.
          </ThemedText>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.background} />
            <ThemedText style={[styles.backButtonText, { color: colors.background }]}>
              Retour
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  }

  // Check if user is admin
  const isAdmin = isAuthenticated && user?.type?.includes('admin');
  
  // Get user level (default to 1 if not available)
  const userLevel = 1; // TODO: Get from user progress
  
  // Filtrer les quiz et défis pour ce niveau
  const levelQuizzes = getQuizzesByLevel(levelId, userLevel, isAdmin);
  const levelChallenges = sampleSpiritualChallenges.filter(challenge => 
    challenge.title.toLowerCase().includes(levelContent.title.toLowerCase())
  );

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
          <View style={[styles.levelIcon, { backgroundColor: `${levelContent.color}20` }]}>
            <ThemedText style={[styles.icon, { color: levelContent.color }]}>
              {levelContent.icon}
            </ThemedText>
          </View>
          <View style={styles.headerText}>
            <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
              {levelContent.title}
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.text }]}>
              Niveau {levelContent.level}
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Description du niveau */}
      <ThemedView style={[styles.descriptionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText style={[styles.description, { color: colors.text }]}>
          {levelContent.description}
        </ThemedText>
      </ThemedView>

      {/* Public cible */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Public cible
        </ThemedText>
        <View style={styles.audienceList}>
          {levelContent.targetAudience.map((audience, index) => (
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
          {levelContent.contentTypes.map((content, index) => (
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
          Quiz disponibles ({levelQuizzes.length})
        </ThemedText>
        {levelQuizzes.length > 0 ? (
          <View style={styles.quizList}>
            {levelQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
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
          Défis spirituels ({levelChallenges.length})
        </ThemedText>
        {levelChallenges.length > 0 ? (
          <View style={styles.challengeList}>
            {levelChallenges.map((challenge) => (
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

      {/* Prérequis */}
      {levelContent.prerequisites.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Prérequis
          </ThemedText>
          <View style={styles.prerequisitesList}>
            {levelContent.prerequisites.map((prerequisite, index) => (
              <View key={index} style={styles.prerequisiteItem}>
                <MaterialIcons name="check-circle" size={20} color={colors.success} />
                <ThemedText style={[styles.prerequisiteText, { color: colors.text }]}>
                  {prerequisite}
                </ThemedText>
              </View>
            ))}
          </View>
        </ThemedView>
      )}

      {/* Actions */}
      <ThemedView style={styles.section}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)/levels')}
          >
            <MaterialIcons name="school" size={20} color={colors.background} />
            <ThemedText style={[styles.actionButtonText, { color: colors.background }]}>
              Voir tous les niveaux
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
  levelIcon: {
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
}); 