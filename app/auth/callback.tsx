import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AuthCallback() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // Cette page est utilisée pour gérer la redirection OAuth
    // L'authentification est gérée par expo-auth-session automatiquement
    // On redirige simplement vers la page principale après un court délai
    
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.tint} />
      <ThemedText style={{ marginTop: 16, fontSize: 16 }}>
        Authentification en cours...
      </ThemedText>
      <ThemedText style={{ marginTop: 8, fontSize: 14, opacity: 0.7 }}>
        Redirection automatique...
      </ThemedText>
    </ThemedView>
  );
} 