import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedText } from './ThemedText';

interface VerticalTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const tabs = [
  {
    name: 'index',
    title: 'Accueil',
    icon: 'home',
  },
  {
    name: 'explore',
    title: 'Catégories',
    icon: 'grid-on',
  },
  {
    name: 'progress',
    title: 'Progression',
    icon: 'bar-chart',
  },
  {
    name: 'profile',
    title: 'Profil',
    icon: 'person',
  },
];

export function VerticalTabBar({ activeTab, onTabPress }: VerticalTabBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';

  if (!isWeb) {
    return null; // Only show on web
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderRightColor: colors.border }]}>
      {/* Logo/Titre */}
      <View style={styles.logoContainer}>
        <MaterialIcons name="church" size={32} color={colors.primary} />
        <ThemedText style={[styles.logoText, { color: colors.primary }]}>
          QC
        </ThemedText>
      </View>

      {/* Onglets */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === tab.name ? `${colors.primary}15` : 'transparent',
                borderLeftColor: activeTab === tab.name ? colors.primary : 'transparent',
              }
            ]}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={tab.icon as any}
              size={24}
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
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 80,
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
    ...(Platform.OS === 'web' && {
      position: 'fixed' as any,
      height: '100vh' as any,
    }),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 16,
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  tabsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    marginHorizontal: 8,
    borderLeftWidth: 3,
    minHeight: 56,
    width: 64,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 12,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
}); 