import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { type ComponentProps } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radii, Shadows, Spacing } from '@/constants/theme';
import { useGradients, useTheme } from '@/hooks/use-theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];
type Variant = 'primary' | 'outline';

type PrimaryButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: Variant;
  /** Ícono opcional a la izquierda del texto. */
  iconName?: IoniconName;
  /** Muestra un spinner y bloquea el botón. */
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

/**
 * Botón grande. `primary` = relleno con degradé celeste→azul, `outline` = contorno.
 */
export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  iconName,
  loading = false,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const theme = useTheme();
  const gradients = useGradients();
  const isOutline = variant === 'outline';
  const bloqueado = disabled || loading;
  const fgColor = isOutline ? theme.text : theme.onPrimary;

  const content = loading ? (
    <ActivityIndicator color={isOutline ? theme.primary : theme.onPrimary} />
  ) : (
    <View style={styles.content}>
      {iconName ? <Ionicons name={iconName} size={20} color={fgColor} /> : null}
      <ThemedText type="default" style={[styles.label, { color: fgColor }]}>
        {label}
      </ThemedText>
    </View>
  );

  if (isOutline) {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={bloqueado}
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          styles.outline,
          { borderColor: theme.border, backgroundColor: theme.card },
          pressed && styles.pressed,
          bloqueado && styles.disabled,
          style,
        ]}>
        {content}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={bloqueado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.shadow,
        pressed && styles.pressed,
        bloqueado && styles.disabled,
        style,
      ]}>
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.base}>
        {content}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  outline: {
    borderWidth: 1,
  },
  shadow: {
    borderRadius: Radii.md,
    ...Shadows.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  label: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
