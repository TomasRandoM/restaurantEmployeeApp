import { FlatList, StyleSheet } from 'react-native';

import { ReciboRow } from '@/components/recibo-row';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Recibo } from '@/models/types';

export type RecibosViewProps = {
  recibos: Recibo[];
  onDescargar: (recibo: Recibo) => void;
  loading?: boolean;
  error?: string | null;
};

/** Listado de recibos de sueldo por período. */
export function RecibosView({ recibos, onDescargar, loading, error }: RecibosViewProps) {
  return (
    <ScreenContainer>
      <ThemedText type="title">Recibos</ThemedText>

      {error ? (
        <ThemedText type="small" themeColor="danger">
          {error}
        </ThemedText>
      ) : null}

      <FlatList
        data={recibos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReciboRow recibo={item} onDescargar={onDescargar} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedText type="default" themeColor="textSecondary">
            {loading ? 'Cargando…' : 'No hay recibos disponibles.'}
          </ThemedText>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.three,
    paddingTop: Spacing.three,
  },
});
