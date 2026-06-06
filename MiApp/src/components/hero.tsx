import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Radii, Shadows, Spacing } from '@/constants/theme';
import { useGradients } from '@/hooks/use-theme';

type HeroProps = {
  children: React.ReactNode;
  /** Centra el contenido (útil en QR / login). */
  center?: boolean;
  style?: ViewStyle;
};

/**
 * Banner con degradé celeste→azul y esquinas redondeadas.
 * Es la cabecera "premium" que abre varias pantallas.
 */
export function Hero({ children, center, style }: HeroProps) {
  const gradients = useGradients();

  return (
    <View style={[styles.shadow, style]}>
      <LinearGradient
        colors={gradients.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, center && styles.center]}>
        {/* Brillo decorativo en la esquina superior derecha */}
        <View style={styles.glow} pointerEvents="none" />
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: Radii.xl,
    ...Shadows.primary,
  },
  hero: {
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
    gap: Spacing.two,
    overflow: 'hidden',
  },
  center: {
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
});
