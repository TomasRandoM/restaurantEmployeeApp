import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { QrData } from '@/models/types';

export type QrViewProps = {
  qr: QrData | null;
  generando?: boolean;
  onGenerar: () => void;
};

/** Pantalla de generación de QR. El recuadro es un placeholder visual. */
export function QrView({ qr, generando, onGenerar }: QrViewProps) {
  const theme = useTheme();

  return (
    <ScreenContainer center gap={Spacing.four}>
      <View style={styles.header}>
        <ThemedText type="title">Tu código QR</ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          Mostralo en el local para registrar tu ingreso.
        </ThemedText>
      </View>

      <Card style={styles.qrCard}>
        {/* TODO: reemplazar este placeholder por un QR real (p.ej. react-native-qrcode-svg). */}
        <View style={[styles.qrPlaceholder, { borderColor: theme.border }]}>
          <ThemedText type="subtitle" themeColor="textSecondary">
            {qr ? 'QR' : '—'}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {qr ? qr.valor : 'Todavía no generaste un código.'}
        </ThemedText>
      </Card>

      <PrimaryButton
        label={qr ? 'Regenerar código' : 'Generar código QR'}
        onPress={onGenerar}
        loading={generando}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  subtitle: {
    textAlign: 'center',
  },
  qrCard: {
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
