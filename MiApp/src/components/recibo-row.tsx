import { Card } from '@/components/card';
import { IconBadge } from '@/components/icon-badge';
import { IconButton } from '@/components/icon-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Recibo } from '@/models/types';
import { StyleSheet, View } from 'react-native';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

type ReciboRowProps = {
  recibo: Recibo;
  onVerPdf: (recibo: Recibo) => void;
};

export function ReciboRow({ recibo, onVerPdf }: ReciboRowProps) {
  const mes = MESES[(recibo.mesPago - 1) % 12];
  const label = `${mes} ${recibo.anioPago}`;

  return (
    <Card style={styles.card}>
      <IconBadge name="document-text-outline" size={48} />
      <View style={styles.info}>
        <ThemedText type="default" style={styles.periodo} numberOfLines={1}>
          {label}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Recibo de sueldo
        </ThemedText>
      </View>
      <IconButton
        accessibilityLabel={`Ver recibo de ${label}`}
        onPress={() => onVerPdf(recibo)}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  info: {
    flex: 1,
    gap: Spacing.half,
  },
  periodo: {
    fontWeight: '700',
    fontSize: 17,
  },
});