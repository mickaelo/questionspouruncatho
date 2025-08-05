import { MaterialIcons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';
import { useColorScheme } from '../hooks/useColorScheme';

import { ThemedText } from './ThemedText';

const tabs = [
  {
    name: 'index',
    title: 'Accueil',
    icon: 'home',
  },
  {
    name: 'explore',
    title: 'Catégories',
    icon: 'category',
  },
  {
    name: 'levels',
    title: 'Niveaux',
    icon: 'star',
  },
  {
    name: 'progress',
    title: 'Progression',
    icon: 'trending-up',
  },
  {
    name: 'profile',
    title: 'Profil',
    icon: 'person',
  },
  {
    name: 'admin',
    title: 'Administration',
    icon: 'admin-panel-settings',
  },
  {
    name: 'login',
    title: 'Se connecter',
    icon: 'login',
  },
  {
    name: 'register',
    title: 'Créer un compte',
    icon: 'person-add',
  },
];

export function WebTabBar() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('index');
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user)
  if (Platform.OS !== 'web') {
    return null;
  }

  // Détecter l'onglet actif basé sur le pathname
  useEffect(() => {
    const currentTab = pathname.split('/').pop() || 'index';
    setActiveTab(currentTab);
  }, [pathname]);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    
    // Gestion spéciale pour les onglets d'authentification
    if (tabName === 'login') {
      router.push('/auth/login');
      return;
    }
    if (tabName === 'register') {
      router.push('/auth/register');
      return;
    }
    if (tabName === 'admin') {
      router.push('/admin');
      return;
    }
    
    // Navigation simple pour les autres onglets
    router.push(tabName === 'index' ? '/' : `/${tabName}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderRightColor: colors.border }]}>
      {/* Logo/Titre */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/priest-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <ThemedText style={[styles.logoText, { color: colors.primary }]}>
          Questions pour un catho
        </ThemedText>
        <ThemedText style={[styles.logoSubtext, { color: colors.text }]}>
          Formez-vous à la théologie catholique
        </ThemedText>
      </View>

      {/* Section Utilisateur */}
      {isAuthenticated && user && (
        <View style={[styles.userSection, { borderBottomColor: colors.border }]}>
          <View style={styles.userInfo}>
            <ThemedText style={[styles.userName, { color: colors.text }]}>
              {user.name || 'Utilisateur'}
            </ThemedText>
          </View>
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              logout();
              router.push('/');
            }}
          >
            <MaterialIcons name="logout" size={16} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Onglets */}
      <View style={styles.tabsContainer}>
        {tabs
          .filter(tab => {
            // Masquer les onglets de connexion si l'utilisateur est connecté
            if (isAuthenticated && (tab.name === 'login' || tab.name === 'register')) {
              return false;
            }
            // Afficher l'onglet admin seulement pour les utilisateurs admin
            if (tab.name === 'admin' && (!isAuthenticated || !user?.type?.includes('admin'))) {
              return false;
            }
            return true;
          })
          .map((tab) => (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handleTabPress(tab.name)}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === tab.name ? `${colors.primary}15` : 'transparent',
                }
              ]}
            >
              <MaterialIcons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.name ? colors.primary : colors.text}
              />
              <ThemedText 
                style={[
                  styles.tabLabel, 
                  { 
                    color: activeTab === tab.name ? colors.primary : colors.text 
                  }
                ]}
              >
                {tab.title}
              </ThemedText>
            </TouchableOpacity>
          ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <MaterialIcons name="settings" size={20} color={colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed' as any,
    left: 0,
    top: 0,
    bottom: 0,
    width: '12%',
    height: '100vh' as any,
    borderRightWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 1000,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 16,
  },
  logoImage: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  logoSubtext: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 12,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    width: '100%',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    position: 'relative',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    opacity: 0.7,
  },
  logoutButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tabsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    marginHorizontal: 8,
    minHeight: 50,
    width: '90%',
  },
  tabLabel: {
    fontSize: 14,
    marginLeft: 12,
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: 16,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
}); 