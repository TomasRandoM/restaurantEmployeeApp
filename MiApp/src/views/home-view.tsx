import { StyleSheet, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type HomeViewProps = {
  /** Nombre del empleado para el saludo (opcional). */
  nombre?: string;
  onGenerarQr: () => void;
  onRecibos: () => void;
  onJustificar: () => void;
};

/** Menú principal con los 3 accesos del prototipo. */
export function HomeView({ nombre, onGenerarQr, onRecibos, onJustificar }: HomeViewProps) {
  return (
    <ScreenContainer gap={Spacing.four}>
      <View style={styles.header}>
        <ThemedText type="default" themeColor="textSecondary">
          Hola{nombre ? `, ${nombre}` : ''} 👋
        </ThemedText>
        <ThemedText type="title">Inicio</ThemedText>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Generar código QR" onPress={onGenerarQr} />
        <PrimaryButton label="Recibos de sueldo" onPress={onRecibos} />
        <PrimaryButton label="Subir justificación de inasistencia" onPress={onJustificar} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
  },
  actions: {
    gap: Spacing.three,
  },
});
