import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Initialiser Firebase
import '@/config/firebase';

import { GlobalLoadingBar } from '@/components/GlobalLoadingBar';
import { QuizDataProvider } from '@/components/QuizDataProvider';
import { LoadingBarProvider } from '@/contexts/LoadingBarContext';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Redirection automatique vers la connexion sur Android si non connecté
  useEffect(() => {
    if (!isLoading && !isAuthenticated && Platform.OS === 'android') {
      console.log('📱 Android: Utilisateur non connecté, redirection vers la page de connexion');
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isLoading]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LoadingBarProvider>
          <QuizDataProvider>
            <GlobalLoadingBar />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="quiz" options={{ headerShown: false }} />
              <Stack.Screen name="quiz-result" options={{ headerShown: false }} />
              <Stack.Screen name="category" options={{ headerShown: false }} />
              <Stack.Screen name="level" options={{ headerShown: false }} />
              <Stack.Screen name="admin" options={{ headerShown: false }} />
              <Stack.Screen name="admin/quiz-management" options={{ headerShown: false }} />
              <Stack.Screen name="admin/quiz-edit/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </QuizDataProvider>
        </LoadingBarProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
