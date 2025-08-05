import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

interface RegisterErrorModalProps {
  visible: boolean;
  error: string;
  onRetry: () => void;
  onDismiss: () => void;
  onGoToLogin?: () => void;
}

export function RegisterErrorModal({ visible, error, onRetry, onDismiss, onGoToLogin }: RegisterErrorModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getErrorIcon = () => {
    if (error.includes('email-already-in-use') || error.includes('déjà utilisée')) {
      return 'email';
    } else if (error.includes('mot de passe') || error.includes('password')) {
      return 'lock';
    } else if (error.includes('réseau') || error.includes('network')) {
      return 'wifi-off';
    }
    return 'error';
  };

  const getErrorTitle = () => {
    if (error.includes('email-already-in-use') || error.includes('déjà utilisée')) {
      return 'Email déjà utilisé';
    } else if (error.includes('mot de passe') || error.includes('password')) {
      return 'Problème avec le mot de passe';
    } else if (error.includes('réseau') || error.includes('network')) {
      return 'Erreur de connexion';
    }
    return 'Erreur d\'inscription';
  };

  const getErrorDescription = () => {
    if (error.includes('email-already-in-use') || error.includes('déjà utilisée')) {
      return 'Cette adresse email est déjà utilisée par un autre compte. Vous pouvez soit vous connecter avec cet email, soit utiliser une autre adresse email pour créer un nouveau compte.';
    } else if (error.includes('mot de passe') || error.includes('password')) {
      return 'Le mot de passe ne respecte pas les exigences de sécurité. Il doit contenir au moins 6 caractères.';
    } else if (error.includes('réseau') || error.includes('network')) {
      return 'Vérifiez votre connexion internet et réessayez.';
    }
    return error;
  };

  const handleRetry = () => {
    onRetry();
  };

  const handleDismiss = () => {
    onDismiss();
  };

  const handleGoToLogin = () => {
    if (onGoToLogin) {
      onGoToLogin();
    } else {
      Alert.alert('Redirection', 'Vous allez être redirigé vers la page de connexion');
    }
  };

  const handleHelp = () => {
    Alert.alert(
      'Aide - Inscription',
      'Pour résoudre ce problème :\n\n1. Vérifiez que l\'email n\'est pas déjà utilisé\n2. Assurez-vous que le mot de passe fait au moins 6 caractères\n3. Vérifiez votre connexion internet\n4. Si le problème persiste, essayez de vous connecter avec cet email',
      [{ text: 'OK' }]
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.errorCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MaterialIcons
            name={getErrorIcon() as any}
            size={48}
            color={colors.error}
            style={styles.icon}
          />
          
          <Text style={[styles.title, { color: colors.text }]}>
            {getErrorTitle()}
          </Text>
          
          <Text style={[styles.description, { color: colors.secondary }]}>
            {getErrorDescription()}
          </Text>
          
          <View style={styles.buttonContainer}>
            {error.includes('email-already-in-use') || error.includes('déjà utilisée') ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton, { backgroundColor: colors.primary }]}
                  onPress={handleGoToLogin}
                >
                  <Text style={[styles.buttonText, { color: colors.background }]}>
                    Se connecter
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton, { borderColor: colors.border }]}
                  onPress={handleRetry}
                >
                  <Text style={[styles.buttonText, { color: colors.text }]}>
                    Utiliser un autre email
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton, { backgroundColor: colors.primary }]}
                  onPress={handleRetry}
                >
                  <Text style={[styles.buttonText, { color: colors.background }]}>
                    Réessayer
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton, { borderColor: colors.border }]}
                  onPress={handleHelp}
                >
                  <Text style={[styles.buttonText, { color: colors.text }]}>
                    Aide
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={handleDismiss}
          >
            <Text style={[styles.dismissText, { color: colors.secondary }]}>
              Fermer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorCard: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  primaryButton: {
    borderWidth: 0,
  },
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dismissButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dismissText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
}); 