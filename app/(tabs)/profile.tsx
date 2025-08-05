import { CORSErrorModal } from '@/components/CORSErrorModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { sampleUserProfile } from '@/data/gamification';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const { user, isAuthenticated, logout, loginWithGoogle } = useAuth();
  const [notifications, setNotifications] = useState(sampleUserProfile.preferences.notifications);
  const [sound, setSound] = useState(sampleUserProfile.preferences.sound);
  const [hapticFeedback, setHapticFeedback] = useState(sampleUserProfile.preferences.hapticFeedback);
  const [familyMode, setFamilyMode] = useState(sampleUserProfile.familyMode);
  const [showCORSError, setShowCORSError] = useState(false);
  const [corsErrorMessage, setCorsErrorMessage] = useState('');

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
            <ThemedText style={[styles.profileEmail, { color: colors.text }]}>
              {user?.email || sampleUserProfile.email}
            </ThemedText>
            <ThemedText style={[styles.profileJoinDate, { color: colors.text }]}>
              Membre depuis {formatDate(user?.createdAt || sampleUserProfile.joinDate)}
            </ThemedText>
            {user?.provider && user.provider !== 'email' && (
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
                  Connecté avec {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
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
      {familyMode && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
            Mode familial
          </ThemedText>
          
          <View style={styles.familyMembers}>
            {sampleUserProfile.childrenProfiles?.map((child) => (
              <TouchableOpacity
                key={child.id}
                style={[styles.familyMemberCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push(`/child-profile/${child.id}`)}
              >
                <View style={[styles.childAvatar, { backgroundColor: `${colors.secondary}20` }]}>
                  <ThemedText style={styles.childAvatarText}>{child.avatar}</ThemedText>
                </View>
                <View style={styles.childInfo}>
                  <ThemedText type="subtitle" style={[styles.childName, { color: colors.text }]}>
                    {child.name}
                  </ThemedText>
                  <ThemedText style={[styles.childAge, { color: colors.text }]}>
                    {child.age} ans • Niveau {child.level}
                  </ThemedText>
                  <ThemedText style={[styles.childPoints, { color: colors.secondary }]}>
                    {child.totalPoints} points
                  </ThemedText>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.addChildButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/add-child')}
          >
            <MaterialIcons name="add" size={20} color={colors.background} />
            <ThemedText style={[styles.addChildText, { color: colors.background }]}>
              Ajouter un enfant
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {/* Paramètres de l'application */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Paramètres de l'application
        </ThemedText>

        <View style={styles.settingsList}>
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications" size={20} color={colors.primary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Notifications
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Recevoir des rappels pour les quiz et défis
                </ThemedText>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="volume-up" size={20} color={colors.secondary} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Sons
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Activer les effets sonores
                </ThemedText>
              </View>
            </View>
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: colors.border, true: colors.secondary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="vibration" size={20} color={colors.warning} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Retour haptique
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Vibrations lors des interactions
                </ThemedText>
              </View>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={setHapticFeedback}
              trackColor={{ false: colors.border, true: colors.warning }}
              thumbColor={colors.background}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="family-restroom" size={20} color={colors.success} />
              <View style={styles.settingText}>
                <ThemedText style={[styles.settingTitle, { color: colors.text }]}>
                  Mode familial
                </ThemedText>
                <ThemedText style={[styles.settingDescription, { color: colors.text }]}>
                  Gérer les profils des enfants
                </ThemedText>
              </View>
            </View>
            <Switch
              value={familyMode}
              onValueChange={setFamilyMode}
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.background}
            />
          </View>
        </View>
      </ThemedView>

      {/* Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Actions
        </ThemedText>

        <View style={styles.actionsList}>
          {/* Bouton de test Google OAuth */}
          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={async () => {
              try {
                const result = await loginWithGoogle();
                if (result.success) {
                  Alert.alert('Succès', 'Authentification Google réussie !');
                } else {
                  // Vérifier si c'est une erreur CORS
                  if (result.error && result.error.includes('CORS')) {
                    setCorsErrorMessage(result.error);
                    setShowCORSError(true);
                  } else {
                    Alert.alert('Erreur', result.error || 'Échec de l\'authentification');
                  }
                }
              } catch (error) {
                Alert.alert('Erreur', 'Erreur lors du test d\'authentification');
              }
            }}
          >
            <MaterialIcons name="g-translate" size={20} color="#4285F4" />
            <ThemedText style={[styles.actionText, { color: colors.text }]}>
              Test Google OAuth
            </ThemedText>
            <MaterialIcons name="chevron-right" size={20} color="#4285F4" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/edit-profile')}
          >
            <MaterialIcons name="edit" size={20} color={colors.primary} />
            <ThemedText style={[styles.actionText, { color: colors.text }]}>
              Modifier le profil
            </ThemedText>
            <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/export-data')}
          >
            <MaterialIcons name="download" size={20} color={colors.secondary} />
            <ThemedText style={[styles.actionText, { color: colors.text }]}>
              Exporter mes données
            </ThemedText>
            <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/help-support')}
          >
            <MaterialIcons name="help" size={20} color={colors.warning} />
            <ThemedText style={[styles.actionText, { color: colors.text }]}>
              Aide et support
            </ThemedText>
            <MaterialIcons name="chevron-right" size={20} color={colors.warning} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/about')}
          >
            <MaterialIcons name="info" size={20} color={colors.success} />
            <ThemedText style={[styles.actionText, { color: colors.text }]}>
              À propos de l'application
            </ThemedText>
            <MaterialIcons name="chevron-right" size={20} color={colors.success} />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Déconnexion */}
      <ThemedView style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={() => {
            Alert.alert(
              'Déconnexion',
              'Êtes-vous sûr de vouloir vous déconnecter ?',
              [
                { text: 'Annuler', style: 'cancel' },
                { 
                  text: 'Se déconnecter', 
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await logout();
                      console.log('✅ Déconnexion réussie');
                      router.replace('/auth/login');
                    } catch (error) {
                      console.error('❌ Erreur lors de la déconnexion:', error);
                      Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
                    }
                  }
                }
              ]
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
  },
  familyMembers: {
    gap: 12,
    marginBottom: 16,
  },
  familyMemberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  childAvatarText: {
    fontSize: 24,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    marginBottom: 2,
  },
  childAge: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  childPoints: {
    fontSize: 12,
    fontWeight: '600',
  },
  addChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  addChildText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.8,
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
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
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
}); 