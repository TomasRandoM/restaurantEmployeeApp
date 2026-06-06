import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { IconButton } from '@/components/icon-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Recibo } from '@/models/types';

type ReciboRowProps = {
  recibo: Recibo;
  onDescargar: (recibo: Recibo) => void;
};

/** Fila de la lista de recibos: período + botón circular de descarga. */
export function ReciboRow({ recibo, onDescargar }: ReciboRowProps) {
  return (
    <View style={styles.row}>
      <Card style={styles.periodo}>
        <ThemedText type="subtitle" style={styles.periodoText} numberOfLines={1}>
          {recibo.periodo}
        </ThemedText>
      </Card>
      <IconButton
        accessibilityLabel={`Descargar recibo de ${recibo.periodo}`}
        onPress={() => onDescargar(recibo)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  periodo: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 64,
  },
  periodoText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
