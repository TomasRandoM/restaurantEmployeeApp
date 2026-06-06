import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Radii } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type IconBadgeProps = {
  name: IoniconName;
  /** Tamaño del contenedor cuadrado. */
  size?: number;
  /** Color del ícono. Por defecto el primario. */
  color?: string;
  /** Fondo del badge. Por defecto `primarySoft`. */
  background?: string;
  /** `pill` = círculo, `rounded` = cuadrado con esquinas. */
  shape?: 'pill' | 'rounded';
  style?: ViewStyle;
};

/** Ícono dentro de una superficie suave coloreada. Reutilizado en tarjetas y filas. */
export function IconBadge({
  name,
  size = 48,
  color,
  background,
  shape = 'rounded',
  style,
}: IconBadgeProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: shape === 'pill' ? Radii.pill : Radii.md,
          backgroundColor: background ?? theme.primarySoft,
        },
        style,
      ]}>
      <Ionicons name={name} size={Math.round(size * 0.5)} color={color ?? theme.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
