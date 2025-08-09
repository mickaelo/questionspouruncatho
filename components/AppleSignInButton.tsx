import * as AppleAuthentication from 'expo-apple-authentication';
import React from 'react';
import { Platform } from 'react-native';

interface AppleSignInButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export function AppleSignInButton({ 
  onPress, 
  loading = false, 
  disabled = false,
  style 
}: AppleSignInButtonProps) {
  // Apple Sign-In n'est disponible que sur iOS 13+ et macOS 10.15+
  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={8}
      style={[
        {
          width: '100%',
          height: 48,
          marginVertical: 8,
          opacity: disabled || loading ? 0.6 : 1,
        },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    />
  );
}
