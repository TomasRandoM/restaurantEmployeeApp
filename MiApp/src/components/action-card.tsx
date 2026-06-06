import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { Pressable, StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { IconBadge } from '@/components/icon-badge';
import { ThemedText } from '@/components/themed-text';
import { Radii, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type ActionCardProps = {
  title: string;
  subtitle?: string;
  iconName: IoniconName;
  onPress?: (event: GestureResponderEvent) => void;
  /** `tile` = vertical (para grilla); `row` = horizontal con chevron. */
  variant?: 'tile' | 'row';
  /** Color de acento del badge (ícono). Por defecto el primario. */
  tint?: string;
  tintSoft?: string;
};

/** Tarjeta presionable con ícono, título y subtítulo. Base del dashboard de Inicio. */
export function ActionCard({
  title,
  subtitle,
  iconName,
  onPress,
  variant = 'tile',
  tint,
  tintSoft,
}: ActionCardProps) {
  const theme = useTheme();
  const isRow = variant === 'row';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        isRow ? styles.row : styles.tile,
        pressed && styles.pressed,
      ]}>
      <IconBadge
        name={iconName}
        size={isRow ? 48 : 52}
        color={tint ?? theme.primary}
        background={tintSoft ?? theme.primarySoft}
      />

      <View style={[styles.texts, isRow && styles.textsRow]}>
        <ThemedText type="default" style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>

      {isRow ? (
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    ...Shadows.sm,
  },
  tile: {
    flex: 1,
    gap: Spacing.three,
    minHeight: 132,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  texts: {
    gap: Spacing.half,
  },
  textsRow: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
