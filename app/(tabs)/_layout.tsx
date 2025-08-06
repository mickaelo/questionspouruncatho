import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { WebTabBar } from '@/components/WebTabBar';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuth();

  // // Protection d'authentification pour Android
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated && Platform.OS === 'android') {
  //     console.log('📱 Android: Redirection vers la connexion depuis les tabs');
  //     router.replace('/auth/login');
  //   }
  // }, [isAuthenticated, isLoading]);

  // // Si pas encore chargé ou pas connecté sur Android, ne pas afficher les tabs
  // if (Platform.OS === 'android' && (isLoading || !isAuthenticated)) {
  //   return null;
  // }

  return (
    <>
      {/* Barre de navigation personnalisée pour le web */}
      {isWeb && <WebTabBar />}
      
      {isWeb ? (
        <View style={{ position: 'absolute', left: '15%', right: 0, top: 0, bottom: 0 }}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: colors.primary,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: {
                // Masquer la barre de navigation par défaut sur le web
                display: 'none',
              },
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Accueil',
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons 
                    name="home" 
                    size={24} 
                    color={color} 
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Catégories',
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons 
                    name="category" 
                    size={24} 
                    color={color} 
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="levels"
              options={{
                title: 'Parcours',
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons 
                    name="star" 
                    size={24} 
                    color={color} 
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profil',
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons 
                    name="person" 
                    size={24} 
                    color={color} 
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Paramètres',
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons 
                    name="settings" 
                    size={24} 
                    color={color} 
                  />
                ),
              }}
            />
          </Tabs>
        </View>
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.OS === 'ios' ? {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 88,
              paddingBottom: 20,
            } : {
              // Configuration pour Android - barre dans la safe area en bas
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              elevation: 8,
              height: 60 + insets.bottom, // Hauteur + safe area bottom
              paddingBottom: insets.bottom, // Padding pour la safe area
              paddingTop: 8,
              // Positionner dans la safe area en bas
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            },
            tabBarLabelStyle: Platform.OS === 'android' ? {
              fontSize: 12,
              fontWeight: '500',
            } : undefined,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Accueil',
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons 
                  name="home" 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Catégories',
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons 
                  name="category" 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="levels"
            options={{
              title: 'Parcours',
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons 
                  name="star" 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profil',
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons 
                  name="person" 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Paramètres',
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons 
                  name="settings" 
                  size={24} 
                  color={color} 
                />
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
}
