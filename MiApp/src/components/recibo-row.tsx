import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { IconBadge } from '@/components/icon-badge';
import { IconButton } from '@/components/icon-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Recibo } from '@/models/types';

type ReciboRowProps = {
  recibo: Recibo;
  onDescargar: (recibo: Recibo) => void;
};

/** Tarjeta de un recibo: ícono + período + botón de descarga. */
export function ReciboRow({ recibo, onDescargar }: ReciboRowProps) {
  return (
    <Card style={styles.card}>
      <IconBadge name="document-text-outline" size={48} />

      <View style={styles.info}>
        <ThemedText type="default" style={styles.periodo} numberOfLines={1}>
          {recibo.periodo}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Recibo de sueldo
        </ThemedText>
      </View>

      <IconButton
        accessibilityLabel={`Descargar recibo de ${recibo.periodo}`}
        onPress={() => onDescargar(recibo)}
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
