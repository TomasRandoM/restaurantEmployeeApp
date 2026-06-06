import { StyleSheet, View } from 'react-native';

import { ActionCard } from '@/components/action-card';
import { Hero } from '@/components/hero';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HomeViewProps = {
  /** Nombre del empleado para el saludo (opcional). */
  nombre?: string;
  onGenerarQr: () => void;
  onRecibos: () => void;
  onJustificar: () => void;
};

/** Fecha de hoy en formato "Sábado, 6 de junio", con la inicial en mayúscula. */
function fechaDeHoy(): string {
  try {
    const texto = new Date().toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  } catch {
    return '';
  }
}

/** Dashboard principal: saludo destacado + accesos como tarjetas. */
export function HomeView({ nombre, onGenerarQr, onRecibos, onJustificar }: HomeViewProps) {
  const theme = useTheme();

  return (
    <ScreenContainer gap={Spacing.four}>
      <Hero>
        <ThemedText type="small" style={styles.heroEyebrow}>
          {fechaDeHoy()}
        </ThemedText>
        <ThemedText type="subtitle" style={styles.heroTitle}>
          Hola{nombre ? `, ${nombre}` : ''} 👋
        </ThemedText>
        <ThemedText type="default" style={styles.heroSubtitle}>
          ¿Listo para tu turno?
        </ThemedText>
      </Hero>

      <View style={styles.section}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          Accesos rápidos
        </ThemedText>

        <View style={styles.grid}>
          <ActionCard
            variant="tile"
            iconName="qr-code"
            title="Generar QR"
            subtitle="Registrá tu ingreso"
            tint={theme.primary}
            tintSoft={theme.primarySoft}
            onPress={onGenerarQr}
          />
          <ActionCard
            variant="tile"
            iconName="receipt"
            title="Recibos"
            subtitle="Tus recibos de sueldo"
            tint={theme.success}
            tintSoft={theme.successSoft}
            onPress={onRecibos}
          />
        </View>

        <ActionCard
          variant="row"
          iconName="cloud-upload"
          title="Justificar inasistencia"
          subtitle="Subí tu comprobante"
          tint={theme.warning}
          tintSoft={theme.warningSoft}
          onPress={onJustificar}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroEyebrow: {
    color: 'rgba(255,255,255,0.85)',
  },
  heroTitle: {
    color: '#FFFFFF',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
  },
  section: {
    gap: Spacing.three,
  },
  grid: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
});
