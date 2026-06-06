import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Variant = 'primary' | 'outline';

type PrimaryButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: Variant;
  /** Muestra un spinner y bloquea el botón. */
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

/**
 * Botón grande del prototipo. `primary` = relleno azul, `outline` = contorno.
 */
export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const theme = useTheme();
  const isOutline = variant === 'outline';
  const bloqueado = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={bloqueado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isOutline
          ? { backgroundColor: 'transparent', borderColor: theme.border, borderWidth: 1 }
          : { backgroundColor: theme.primary },
        pressed && styles.pressed,
        bloqueado && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isOutline ? theme.primary : theme.onPrimary} />
      ) : (
        <ThemedText
          type="default"
          style={[styles.label, { color: isOutline ? theme.text : theme.onPrimary }]}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
