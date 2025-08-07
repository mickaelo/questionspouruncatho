import { Alert, Platform } from 'react-native';

/**
 * Affiche une alerte adaptée à la plateforme
 * @param title - Titre de l'alerte
 * @param message - Message de l'alerte
 * @param buttons - Boutons optionnels (uniquement pour mobile)
 */
export function showAlert(
  title: string,
  message: string,
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>
) {
  if (Platform.OS === 'web') {
    // Sur le web, utiliser window.alert
    window.alert(`${title}\n\n${message}`);
  } else {
    // Sur mobile, utiliser Alert.alert
    if (buttons && buttons.length > 0) {
      Alert.alert(title, message, buttons);
    } else {
      Alert.alert(title, message);
    }
  }
}

/**
 * Affiche une alerte de confirmation avec des boutons
 * @param title - Titre de l'alerte
 * @param message - Message de l'alerte
 * @param onConfirm - Fonction appelée si l'utilisateur confirme
 * @param onCancel - Fonction appelée si l'utilisateur annule
 */
export function showConfirmAlert(
  title: string,
  message: string,
  onConfirm?: () => void,
  onCancel?: () => void
) {
  if (Platform.OS === 'web') {
    // Sur le web, utiliser window.confirm
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && onConfirm) {
      onConfirm();
    } else if (!confirmed && onCancel) {
      onCancel();
    }
  } else {
    // Sur mobile, utiliser Alert.alert avec des boutons
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Annuler',
          style: 'cancel',
          onPress: onCancel,
        },
        {
          text: 'Confirmer',
          style: 'destructive',
          onPress: onConfirm,
        },
      ]
    );
  }
}

const alertPolyfill = (title: string, description: string, options: any, extra: any) => {
  const result = window.confirm([title, description].filter(Boolean).join('\n'))

  if (result) {
    const confirmOption = options.find(({ style }: { style: string }) => style !== 'cancel')
    confirmOption && confirmOption.onPress()
  } else {
    const cancelOption = options.find(({ style }: { style: string }) => style === 'cancel')
    cancelOption && cancelOption.onPress()
  }
}

export const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert