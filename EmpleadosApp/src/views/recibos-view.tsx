import { ReciboRow } from '@/components/recibo-row';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Recibo } from '@/models/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, StyleSheet, View } from 'react-native';

export type RecibosViewProps = {
  recibos: Recibo[];
  onVerPdf: (recibo: Recibo) => void;
  loading?: boolean;
  error?: string | null;
};

export function RecibosView({ recibos, onVerPdf, loading, error }: RecibosViewProps) {
  const theme = useTheme();
  return (
    <ScreenContainer gap={Spacing.three}>
      <View style={styles.header}>
        <ThemedText type="title">Recibos</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {recibos.length > 0
            ? `${recibos.length} ${recibos.length === 1 ? 'recibo disponible' : 'recibos disponibles'}`
            : 'Tus recibos de sueldo'}
        </ThemedText>
      </View>
      {error ? (
        <ThemedText type="small" themeColor="danger">
          {error}
        </ThemedText>
      ) : null}
      <FlatList
        data={recibos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReciboRow recibo={item} onVerPdf={onVerPdf} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={[styles.emptyIcon, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="receipt-outline" size={40} color={theme.textSecondary} />
            </View>
            <ThemedText type="default" themeColor="textSecondary" style={styles.emptyText}>
              {loading ? 'Cargando…' : 'No hay recibos disponibles.'}
            </ThemedText>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { gap: Spacing.one },
  list: { gap: Spacing.three, paddingTop: Spacing.two },
  empty: { alignItems: 'center', gap: Spacing.three, paddingTop: Spacing.six },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { textAlign: 'center' },
});