import { SSOButton } from '@/components/SSOButton';
import { SuccessToast } from '@/components/SuccessToast';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RegisterErrorModal } from '@/components/RegisterErrorModal';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const {
    loginWithGoogle,
    loginWithFacebook,
    registerWithEmail,
    isLoading,
    error,
    clearError,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSSORegister = async (provider: string) => {
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
        setSuccessMessage('Compte créé avec succès ! Redirection...');
        setShowSuccessToast(true);
        
        // Redirection automatique après un court délai
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500);
      } else {
        setErrorMessage(result.error || 'Erreur lors de la création du compte');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Une erreur inattendue s\'est produite');
      setShowErrorModal(true);
    }
  };

  const handleEmailRegister = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Veuillez remplir tous les champs');
      setShowErrorModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      setShowErrorModal(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères');
      setShowErrorModal(true);
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Veuillez accepter les conditions d\'utilisation');
      setShowErrorModal(true);
      return;
    }

    try {
      const result = await registerWithEmail({
        name,
        email,
        password,
        confirmPassword,
        acceptTerms,
      });
      
      if (result.success) {
        // Afficher la notification de succès
        setSuccessMessage('Compte créé avec succès ! Redirection...');
        setShowSuccessToast(true);
        
        // Redirection automatique après un court délai
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500);
      } else {
        setErrorMessage(result.error || 'Erreur lors de la création du compte');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Une erreur inattendue s\'est produite');
      setShowErrorModal(true);
    }
  };

  const handleRetryRegistration = () => {
    setShowErrorModal(false);
    setErrorMessage('');
    // Optionnel : vider les champs pour permettre une nouvelle tentative
    if (errorMessage.includes('email-already-in-use') || errorMessage.includes('déjà utilisée')) {
      setEmail('');
    }
  };

  const handleDismissError = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const handleGoToLogin = () => {
    setShowErrorModal(false);
    setErrorMessage('');
    router.push('/auth/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <ThemedText type="title" style={[styles.title, { color: colors.primary }]}>
          Créer un compte
        </ThemedText>
        
        <ThemedText style={[styles.subtitle, { color: colors.text }]}>
          Rejoignez la communauté pour votre formation théologique
        </ThemedText>
      </View>

      {/* SSO Buttons */}
      <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Inscription rapide
        </ThemedText>
        
        <SSOButton
          provider="google"
          onPress={() => handleSSORegister('google')}
          loading={isLoading}
          disabled={isLoading}
        />
        
        <SSOButton
          provider="facebook"
          onPress={() => handleSSORegister('facebook')}
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

      {/* Email Register Form */}
      <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
          Inscription par email
        </ThemedText>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Nom complet"
            placeholderTextColor={colors.text + '80'}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
        
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
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={colors.text + '80'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
        
        {/* Terms and Conditions */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <MaterialIcons
            name={acceptTerms ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={acceptTerms ? colors.primary : colors.text}
          />
          <ThemedText style={[styles.termsText, { color: colors.text }]}>
            J'accepte les{' '}
            <ThemedText style={[styles.termsLink, { color: colors.primary }]}>
              conditions d'utilisation
            </ThemedText>
            {' '}et la{' '}
            <ThemedText style={[styles.termsLink, { color: colors.primary }]}>
              politique de confidentialité
            </ThemedText>
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.registerButton, { backgroundColor: colors.primary }]}
          onPress={handleEmailRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ThemedText style={[styles.registerButtonText, { color: colors.background }]}>
              Création du compte...
            </ThemedText>
          ) : (
            <ThemedText style={[styles.registerButtonText, { color: colors.background }]}>
              Créer un compte
            </ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <ThemedText style={[styles.loginText, { color: colors.text }]}>
          Déjà un compte ?
        </ThemedText>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <ThemedText style={[styles.loginLink, { color: colors.primary }]}>
            Se connecter
          </ThemedText>
        </TouchableOpacity>
      </View>
      </ScrollView>

      {/* Register Error Modal */}
      <RegisterErrorModal
        visible={showErrorModal}
        error={errorMessage}
        onRetry={handleRetryRegistration}
        onDismiss={handleDismissError}
        onGoToLogin={handleGoToLogin}
      />
    </View>
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
  registerButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  loginText: {
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 