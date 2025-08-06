import { BadgeCard } from '@/components/BadgeCard';
import { ChallengeCard } from '@/components/ChallengeCard';
import { CORSErrorModal } from '@/components/CORSErrorModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { sampleUserProfile, spiritualChallenges } from '@/data/gamification';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserProgress } from '@/hooks/useUserProgress';
import { showAlert, showConfirmAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const { user, isAuthenticated, logout, loginWithGoogle } = useAuth();
  const { userProgress, isLoading } = useUserProgress();
  const [showCORSError, setShowCORSError] = useState(false);
  const [corsErrorMessage, setCorsErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'challenges' | 'fidelity'>('overview');

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

  const formatDate = (date: Date | any) => {
    // Vérifier si date est un objet Date valide
    if (date instanceof Date) {
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Si c'est un timestamp Firebase ou une chaîne, essayer de le convertir
    if (date && (typeof date === 'number' || typeof date === 'string')) {
      try {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          return dateObj.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      } catch (error) {
        console.warn('Erreur lors de la conversion de la date:', error);
      }
    }
    
    // Fallback si la date n'est pas valide
    return 'Date inconnue';
  };

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
        paddingBottom: Platform.OS === 'android' ? 150 : 60, // Encore plus d'espace pour s'assurer que le bouton déconnexion soit visible
      }}
    >
      {/* Profil utilisateur */}
      <ThemedView style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.profileHeader}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.avatarContainer, { backgroundColor: `${colors.primary}20` }]}>
              <ThemedText style={styles.avatar}>
                {user?.name?.charAt(0) || sampleUserProfile.avatar}
              </ThemedText>
            </View>
          )}
          <View style={styles.profileInfo}>
            <ThemedText type="subtitle" style={[styles.profileName, { color: colors.text }]}>
              {user?.name || sampleUserProfile.name}
            </ThemedText>
            {user?.provider === 'anonymous' ? (
              <ThemedText style={[styles.profileEmail, { color: colors.secondary }]}>
                Mode visiteur
              </ThemedText>
            ) : (
              <ThemedText style={[styles.profileEmail, { color: colors.text }]}>
                {user?.email || sampleUserProfile.email}
              </ThemedText>
            )}
            <ThemedText style={[styles.profileJoinDate, { color: colors.text }]}>
              {user?.provider === 'anonymous' ? 'Session temporaire' : `Membre depuis ${formatDate(user?.createdAt || sampleUserProfile.joinDate)}`}
            </ThemedText>
            {user?.provider && user.provider !== 'email' && user.provider !== 'anonymous' && (
              <View style={styles.providerBadge}>
                <MaterialIcons 
                  name={user.provider === 'google' ? 'g-translate' : 
                        user.provider === 'facebook' ? 'facebook' :
                        user.provider === 'apple' ? 'apple' :
                        'account-circle'} 
                  size={16} 
                  color={colors.primary} 
                />
                <ThemedText style={[styles.providerText, { color: colors.primary }]}>
                  {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
                </ThemedText>
              </View>
            )}
            {user?.provider === 'anonymous' && (
              <View style={styles.anonymousBadge}>
                <MaterialIcons 
                  name="visibility" 
                  size={16} 
                  color={colors.secondary} 
                />
                <ThemedText style={[styles.anonymousText, { color: colors.secondary }]}>
                  Visiteur
                </ThemedText>
              </View>
            )}
          </View>
        </View>

        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <MaterialIcons name="star" size={20} color={colors.secondary} />
            <ThemedText style={[styles.profileStatValue, { color: colors.text }]}>
              {sampleUserProfile.totalPoints}
            </ThemedText>
            <ThemedText style={[styles.profileStatLabel, { color: colors.text }]}>Points</ThemedText>
          </View>
          <View style={styles.profileStat}>
            <MaterialIcons name="trending-up" size={20} color={colors.primary} />
            <ThemedText style={[styles.profileStatValue, { color: colors.text }]}>
              {sampleUserProfile.level}
            </ThemedText>
            <ThemedText style={[styles.profileStatLabel, { color: colors.text }]}>Niveau</ThemedText>
          </View>
          <View style={styles.profileStat}>
            <MaterialIcons name="local-fire-department" size={20} color={colors.warning} />
            <ThemedText style={[styles.profileStatValue, { color: colors.text }]}>
              {sampleUserProfile.currentStreak}
            </ThemedText>
            <ThemedText style={[styles.profileStatLabel, { color: colors.text }]}>Jours</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Mode familial */}
      {/* familyMode is removed, so this section is removed */}

      {/* Section Progression */}
      <ThemedView style={styles.section}>
        {/* Onglets de progression */}
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

        {/* Contenu des onglets de progression */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'badges' && renderBadges()}
        {activeTab === 'challenges' && renderChallenges()}
        {activeTab === 'fidelity' && renderFidelity()}
      </ThemedView>

      {/* Actions rapides */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Actions rapides
        </ThemedText>

        <View style={styles.actionsList}>
          {/* Bouton de connexion pour utilisateurs anonymes */}
          {user?.provider === 'anonymous' && (
            <TouchableOpacity
              style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/auth/login' as any)}
            >
              <View style={styles.actionInfo}>
                <MaterialIcons name="login" size={20} color={colors.primary} />
                <View style={styles.actionText}>
                  <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                    Se connecter
                  </ThemedText>
                  <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                    Créer un compte ou se connecter pour sauvegarder vos progrès
                  </ThemedText>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.text} />
            </TouchableOpacity>
          )}

          {/* Lien vers les paramètres */}
          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/settings' as any)}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="settings" size={20} color={colors.primary} />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Paramètres
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Gérer les paramètres de l'application et votre compte
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.text} />
          </TouchableOpacity>

          {/* Bouton de test Google OAuth */}
          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={async () => {
              try {
                const result = await loginWithGoogle();
                if (result.success) {
                  showAlert('Succès', 'Test Google OAuth réussi !');
                } else {
                  showAlert('Erreur', result.error || 'Erreur lors du test');
                }
              } catch (error) {
                showAlert('Erreur', 'Erreur lors du test d\'authentification');
              }
            }}
          >
            <View style={styles.actionInfo}>
              <MaterialIcons name="g-translate" size={20} color="#4285F4" />
              <View style={styles.actionText}>
                <ThemedText style={[styles.actionTitle, { color: colors.text }]}>
                  Test Google OAuth
                </ThemedText>
                <ThemedText style={[styles.actionDescription, { color: colors.text }]}>
                  Tester l'authentification Google
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#4285F4" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Déconnexion */}
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={() => {
            showConfirmAlert(
              'Déconnexion',
              'Êtes-vous sûr de vouloir vous déconnecter ?',
              async () => {
                try {
                  await logout();
                  router.replace('/auth/login');
                } catch (error) {
                  console.error('❌ Erreur lors de la déconnexion:', error);
                  showAlert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
                }
              }
            );
          }}
        >
          <MaterialIcons name="logout" size={20} color={colors.background} />
          <ThemedText style={[styles.logoutText, { color: colors.background }]}>
            Se déconnecter
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Modal d'erreur CORS */}
      <CORSErrorModal
        visible={showCORSError}
        onClose={() => setShowCORSError(false)}
        errorMessage={corsErrorMessage}
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
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  profileJoinDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  profileStatLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
  actionsList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  providerText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  anonymousBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: '#FFE0E0', // Light red background for anonymous badge
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  anonymousText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
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
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.8,
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
    marginTop: 16,
  },
  fidelityMain: {
    alignItems: 'center',
    marginBottom: 12,
  },
  fidelityTotal: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  fidelityLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  fidelityBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fidelityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F0F0F0', // Light grey background for breakdown items
  },
  fidelityItemInfo: {
    marginLeft: 8,
  },
  fidelityItemTitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  fidelityItemScore: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  fidelityText: {
    fontSize: 12,
    opacity: 0.8,
  },
  fidelityDetailed: {
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: '#E0E0E0', // Light grey background for tabs
    borderRadius: 12,
    paddingVertical: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
}); 