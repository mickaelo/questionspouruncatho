import { SSOButton } from '@/components/SSOButton';
import { SuccessToast } from '@/components/SuccessToast';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { showAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { showLoading, hideLoading } = useLoadingBarContext();
  const {
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    skipLogin,
    isLoading,
    error,
    clearError,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Gérer l'affichage du loading bar global
  useEffect(() => {
    if (isLoading) {
      showLoading({ duration: 2000 });
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  const handleSSOLogin = async (provider: string) => {
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await loginWithGoogle();
          break;
        case 'facebook':
          result = await loginWithFacebook();
          break;
        default:
          return;
      }

      if (result.success) {
        // Afficher la notification de succès
        setSuccessMessage('Connexion réussie ! Redirection...');
        setShowSuccessToast(true);
        
        // Redirection automatique après un court délai
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500);
      } else {
        showAlert('Erreur', result.error || 'Erreur de connexion');
      }
    } catch (error) {
      showAlert('Erreur', 'Une erreur inattendue s\'est produite');
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      showAlert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await loginWithEmail({ email, password });
      
      if (result.success) {
        // Afficher la notification de succès
        setSuccessMessage('Connexion réussie ! Redirection...');
        setShowSuccessToast(true);
        
        // Redirection automatique après un court délai
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500);
      } else {
        showAlert('Erreur', result.error || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      showAlert('Erreur', 'Une erreur inattendue s\'est produite');
    }
  };

  const handleSkipLogin = async () => {
    try {
      // Utiliser la fonction skipLogin du hook useAuth
      const result = await skipLogin();
      if (result.success) {
        // Afficher la notification de succès
        setSuccessMessage('Mode visiteur activé ! Redirection...');
        setShowSuccessToast(true);
        
        // Redirection automatique après un court délai
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Erreur lors du passage en mode visiteur:', error);
      showAlert('Erreur', 'Impossible d\'activer le mode visiteur');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Success Toast */}
      <SuccessToast
        visible={showSuccessToast}
        message={successMessage}
        onHide={() => setShowSuccessToast(false)}
        duration={2000}
      />
      
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
      {/* Header */}
      <View style={styles.header}>
        {Platform.OS !== 'android' && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
        
        <View style={styles.logoContainer}>
          <MaterialIcons name="school" size={48} color={colors.primary} />
        </View>
        
        <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
          {Platform.OS === 'android' ? 'Bienvenue ! 👋' : 'Connexion'}
        </ThemedText>
        
        <ThemedText style={[styles.subtitle, { color: colors.text }]}>
          {Platform.OS === 'android' 
            ? 'Connectez-vous pour accéder à votre formation catholique'
            : 'Connectez-vous pour continuer votre formation'
          }
        </ThemedText>

        {/* Skip Login Option */}
        <TouchableOpacity
          style={[styles.skipButton, { borderColor: colors.border }]}
          onPress={handleSkipLogin}
        >
          <MaterialIcons name="visibility" size={16} color={colors.secondary} style={styles.skipIcon} />
          <ThemedText style={[styles.skipText, { color: colors.secondary }]}>
            Explorer sans compte
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* SSO Buttons */}
      <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Connexion rapide
        </ThemedText>
        
        <SSOButton
          provider="google"
          onPress={() => handleSSOLogin('google')}
          loading={isLoading}
          disabled={isLoading}
        />
        
        <SSOButton
          provider="facebook"
          onPress={() => handleSSOLogin('facebook')}
          loading={isLoading}
          disabled={isLoading}
        />
      </ThemedView>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <ThemedText style={[styles.dividerText, { color: colors.text }]}>
          ou
        </ThemedText>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      {/* Email Login Form */}
      <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Connexion par email
        </ThemedText>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Mot de passe"
            placeholderTextColor={colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.primary }]}
          onPress={handleEmailLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ThemedText style={[styles.loginButtonText, { color: colors.background }]}>
              Connexion...
            </ThemedText>
          ) : (
            <ThemedText style={[styles.loginButtonText, { color: colors.background }]}>
              Se connecter
            </ThemedText>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => router.push('/auth/forgot-password')}
        >
          <ThemedText style={[styles.forgotPasswordText, { color: colors.primary }]}>
            Mot de passe oublié ?
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <ThemedText style={[styles.registerText, { color: colors.text }]}>
          Pas encore de compte ?
        </ThemedText>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <ThemedText style={[styles.registerLink, { color: colors.primary }]}>
            Créer un compte
          </ThemedText>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: -12,
    top: -8,
    padding: 8,
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 44,
    fontSize: 16,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    marginRight: 4,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  skipIcon: {
    marginRight: 6,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '500',
  },
}); 