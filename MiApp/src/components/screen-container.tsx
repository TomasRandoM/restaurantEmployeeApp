import { StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenContainerProps = {
  children: React.ReactNode;
  /** Centra el contenido verticalmente (útil para pantallas tipo login). */
  center?: boolean;
  /** Espacio entre hijos directos. */
  gap?: number;
  style?: ViewStyle;
};

/**
 * Contenedor base de toda pantalla: fondo temático + safe area + ancho máximo.
 * Mantiene la misma estética en light y dark sin esfuerzo.
 */
export function ScreenContainer({ children, center, gap = Spacing.three, style }: ScreenContainerProps) {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView
        style={[styles.safeArea, { gap }, center && styles.center, style]}>
        {children}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  center: {
    justifyContent: 'center',
  },
});
