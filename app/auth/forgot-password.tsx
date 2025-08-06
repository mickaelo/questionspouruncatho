import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { showAlert } from '@/utils/alert';

export default function ForgotPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      showAlert('Erreur', 'Veuillez saisir votre adresse email');
      return;
    }

    setIsLoading(true);
    
    // Simulation de l'envoi d'email de récupération
    setTimeout(() => {
      setIsLoading(false);
      showAlert(
        'Email envoyé',
        'Si un compte existe avec cette adresse email, vous recevrez un lien de récupération.'
      );
      router.back();
    }, 2000);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
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
          Mot de passe oublié
        </ThemedText>
        
        <ThemedText style={[styles.subtitle, { color: colors.text }]}>
          Entrez votre adresse email pour recevoir un lien de récupération
        </ThemedText>
      </View>

      {/* Reset Form */}
      <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholder="Adresse email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.primary }]}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ThemedText style={[styles.resetButtonText, { color: colors.background }]}>
              Envoi en cours...
            </ThemedText>
          ) : (
            <ThemedText style={[styles.resetButtonText, { color: colors.background }]}>
              Envoyer le lien de récupération
            </ThemedText>
          )}
        </TouchableOpacity>
        
        <ThemedText style={[styles.infoText, { color: colors.text }]}>
          Un email contenant un lien de récupération sera envoyé à cette adresse si un compte existe.
        </ThemedText>
      </ThemedView>

      {/* Back to Login */}
      <View style={styles.backToLoginContainer}>
        <ThemedText style={[styles.backToLoginText, { color: colors.text }]}>
          Vous vous souvenez de votre mot de passe ?
        </ThemedText>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <ThemedText style={[styles.backToLoginLink, { color: colors.primary }]}>
            Retour à la connexion
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
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
    paddingHorizontal: 20,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  resetButton: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  backToLoginText: {
    fontSize: 14,
    marginBottom: 8,
  },
  backToLoginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 