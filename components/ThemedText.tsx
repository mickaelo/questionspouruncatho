import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'scripture' | 'prayer';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'scripture' ? styles.scripture : undefined,
        type === 'prayer' ? styles.prayer : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '400',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System',
    letterSpacing: 0.3,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#8B4513',
    fontFamily: 'System',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  scripture: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'System',
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#8B4513',
  },
  prayer: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'System',
    fontWeight: '500',
    color: '#DAA520',
    textAlign: 'center',
  },
});
