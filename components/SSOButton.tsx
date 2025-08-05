import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedText } from './ThemedText';

interface SSOButtonProps {
  provider: 'google' | 'facebook';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const providerConfig = {
  google: {
    name: 'Google',
    icon: 'g-translate',
    color: '#4285F4',
    backgroundColor: '#FFFFFF',
    textColor: '#757575',
  },
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    backgroundColor: '#1877F2',
    textColor: '#FFFFFF',
  }
};

export function SSOButton({ provider, onPress, loading = false, disabled = false }: SSOButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const config = providerConfig[provider];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: colors.border,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={config.textColor} />
      ) : (
        <>
          <MaterialIcons
            name={config.icon as any}
            size={20}
            color={config.textColor}
            style={styles.icon}
          />
          <ThemedText style={[styles.text, { color: config.textColor }]}>
            Continuer avec {config.name}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
    minHeight: 48,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 