import { BadgeCard } from '@/components/BadgeCard';
import { ChallengeCard } from '@/components/ChallengeCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { spiritualChallenges } from '@/data/gamification';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'challenges' | 'fidelity'>('overview');

  const { userProgress, isLoading } = useUserProgress();

  // Utiliser les vraies données de progression ou des valeurs par défaut
  const progressData = userProgress || {
    totalPoints: 0,
    level: 1,
    streak: 0,
    completedQuizzes: [],
    fidelityScore: {
      prayerScore: 0,
      readingScore: 0,
      quizScore: 0,
      totalScore: 0,
      lastUpdated: new Date()
    }
  };

  // Utiliser des badges par défaut pour l'instant
  const unlockedBadges: any[] = [];
  const availableBadges: any[] = [];

  const renderOverview = () => (
    <View>
      {/* Statistiques générales */}
      <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Statistiques générales
        </ThemedText>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <MaterialIcons name="star" size={24} color={colors.secondary} />
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {progressData.totalPoints}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.text }]}>Points totaux</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <MaterialIcons name="trending-up" size={24} color={colors.primary} />
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {progressData.level}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.text }]}>Niveau</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <MaterialIcons name="local-fire-department" size={24} color={colors.warning} />
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {progressData.streak}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.text }]}>Jours consécutifs</ThemedText>
          </View>
          
          <View style={styles.statItem}>
            <MaterialIcons name="quiz" size={24} color={colors.success} />
            <ThemedText style={[styles.statValue, { color: colors.text }]}>
              {progressData.completedQuizzes.length}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: colors.text }]}>Quiz complétés</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Score de fidélité */}
      <ThemedView style={[styles.fidelityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Score de fidélité
        </ThemedText>
        
        <View style={styles.fidelityScore}>
          <View style={styles.fidelityMain}>
            <ThemedText style={[styles.fidelityTotal, { color: colors.primary }]}>
              {progressData.fidelityScore.totalScore}%
            </ThemedText>
            <ThemedText style={[styles.fidelityLabel, { color: colors.text }]}>
              Score global
            </ThemedText>
          </View>
          
          <View style={styles.fidelityBreakdown}>
            <View style={styles.fidelityItem}>
              <MaterialIcons name="schedule" size={16} color={colors.primary} />
              <ThemedText style={[styles.fidelityText, { color: colors.text }]}>
                Prière: {progressData.fidelityScore.prayerScore}%
              </ThemedText>
            </View>
            <View style={styles.fidelityItem}>
              <MaterialIcons name="menu-book" size={16} color={colors.secondary} />
              <ThemedText style={[styles.fidelityText, { color: colors.text }]}>
                Lecture: {progressData.fidelityScore.readingScore}%
              </ThemedText>
            </View>
            <View style={styles.fidelityItem}>
              <MaterialIcons name="quiz" size={16} color={colors.success} />
              <ThemedText style={[styles.fidelityText, { color: colors.text }]}>
                Quiz: {progressData.fidelityScore.quizScore}%
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      {/* Badges récents */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Badges récents
          </ThemedText>
          <TouchableOpacity onPress={() => setActiveTab('badges')}>
            <ThemedText style={[styles.seeAll, { color: colors.primary }]}>
              Voir tout
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        {unlockedBadges.slice(0, 2).map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={true}
          />
        ))}
      </ThemedView>

      {/* Défis actifs */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Défis actifs
          </ThemedText>
          <TouchableOpacity onPress={() => setActiveTab('challenges')}>
            <ThemedText style={[styles.seeAll, { color: colors.primary }]}>
              Voir tout
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        {spiritualChallenges.slice(0, 1).map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
          />
        ))}
      </ThemedView>
    </View>
  );

  const renderBadges = () => (
    <View>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Badges débloqués ({unlockedBadges.length})
        </ThemedText>
        {unlockedBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={true}
          />
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Badges disponibles ({availableBadges.length})
        </ThemedText>
        {availableBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={false}
            showProgress={true}
            progress={Math.random() * 100} // Simulation de progression
          />
        ))}
      </ThemedView>
    </View>
  );

  const renderChallenges = () => (
    <View>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Défis spirituels
        </ThemedText>
        {spiritualChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
          />
        ))}
      </ThemedView>
    </View>
  );

  const renderFidelity = () => (
    <View>
      <ThemedView style={[styles.fidelityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Score de fidélité détaillé
        </ThemedText>
        
        <View style={styles.fidelityDetailed}>
          <View style={styles.fidelityMain}>
            <ThemedText style={[styles.fidelityTotal, { color: colors.primary }]}>
              {progressData.fidelityScore.totalScore}%
            </ThemedText>
            <ThemedText style={[styles.fidelityLabel, { color: colors.text }]}>
              Score global de fidélité
            </ThemedText>
          </View>
          
          <View style={styles.fidelityBreakdown}>
            <View style={[styles.fidelityItem, { backgroundColor: `${colors.primary}10` }]}>
              <MaterialIcons name="schedule" size={20} color={colors.primary} />
              <View style={styles.fidelityItemInfo}>
                <ThemedText style={[styles.fidelityItemTitle, { color: colors.text }]}>
                  Prière quotidienne
                </ThemedText>
                <ThemedText style={[styles.fidelityItemScore, { color: colors.primary }]}>
                  {progressData.fidelityScore.prayerScore}%
                </ThemedText>
              </View>
            </View>
            <View style={[styles.fidelityItem, { backgroundColor: `${colors.secondary}10` }]}>
              <MaterialIcons name="menu-book" size={20} color={colors.secondary} />
              <View style={styles.fidelityItemInfo}>
                <ThemedText style={[styles.fidelityItemTitle, { color: colors.text }]}>
                  Lecture spirituelle
                </ThemedText>
                <ThemedText style={[styles.fidelityItemScore, { color: colors.secondary }]}>
                  {progressData.fidelityScore.readingScore}%
                </ThemedText>
              </View>
            </View>
            <View style={[styles.fidelityItem, { backgroundColor: `${colors.success}10` }]}>
              <MaterialIcons name="quiz" size={20} color={colors.success} />
              <View style={styles.fidelityItemInfo}>
                <ThemedText style={[styles.fidelityItemTitle, { color: colors.text }]}>
                  Participation aux quiz
                </ThemedText>
                <ThemedText style={[styles.fidelityItemScore, { color: colors.success }]}>
                  {progressData.fidelityScore.quizScore}%
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ThemedView>
    </View>
  );



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
      {/* Onglets */}
      <ThemedView style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('overview')}
        >
          <ThemedText style={[styles.tabText, { color: activeTab === 'overview' ? colors.background : colors.text }]}>
            Vue d'ensemble
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'badges' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('badges')}
        >
          <ThemedText style={[styles.tabText, { color: activeTab === 'badges' ? colors.background : colors.text }]}>
            Badges
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'challenges' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('challenges')}
        >
          <ThemedText style={[styles.tabText, { color: activeTab === 'challenges' ? colors.background : colors.text }]}>
            Défis
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'fidelity' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('fidelity')}
        >
          <ThemedText style={[styles.tabText, { color: activeTab === 'fidelity' ? colors.background : colors.text }]}>
            Fidélité
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Contenu des onglets */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'badges' && renderBadges()}
      {activeTab === 'challenges' && renderChallenges()}
      {activeTab === 'fidelity' && renderFidelity()}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 18,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    padding: 20,
    margin: 16,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  fidelityCard: {
    padding: 20,
    margin: 16,
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
  fidelityScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fidelityMain: {
    alignItems: 'center',
    marginRight: 24,
  },
  fidelityTotal: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  fidelityLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  fidelityBreakdown: {
    flex: 1,
  },
  fidelityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  fidelityText: {
    fontSize: 14,
    marginLeft: 8,
  },
  fidelityDetailed: {
    alignItems: 'center',
  },
  fidelityItemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  fidelityItemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  fidelityItemScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
}); 