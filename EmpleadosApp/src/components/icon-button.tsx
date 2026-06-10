import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { Pressable, StyleSheet, type GestureResponderEvent } from 'react-native';

import { Radii } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type IconButtonProps = {
  /** Ícono a mostrar. Por defecto una descarga. */
  iconName?: IoniconName;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
  size?: number;
};

/** Botón circular con un ícono. Usado para descargar recibos. */
export function IconButton({
  iconName = 'download-outline',
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
          backgroundColor: theme.primary,
        },
        pressed && styles.pressed,
      ]}>
      <Ionicons name={iconName} size={Math.round(size * 0.46)} color={theme.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
