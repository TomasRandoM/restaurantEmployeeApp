import { Pressable, StyleSheet, Text, type GestureResponderEvent } from 'react-native';

import { Radii } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IconButtonProps = {
  /**
   * Glifo a mostrar. Por defecto una flecha de descarga (↓).
   * TODO: si quieren, reemplazar por un ícono real (@expo/vector-icons / expo-symbols).
   */
  glyph?: string;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  size?: number;
};

/** Botón circular con un glifo. Usado para el botón de descarga de recibos. */
export function IconButton({
  glyph = '↓',
  onPress,
  accessibilityLabel,
  size = 48,
}: IconButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          backgroundColor: theme.primarySoft,
          borderColor: theme.border,
        },
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.glyph, { color: theme.primary }]}>{glyph}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
  },
  pressed: {
    opacity: 0.7,
  },
});
