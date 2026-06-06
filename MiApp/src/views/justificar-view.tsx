import { StyleSheet, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type JustificarViewProps = {
  fecha: string | null;
  archivoNombre: string | null;
  onSeleccionarFecha: () => void;
  onSeleccionarArchivo: () => void;
  onEnviar: () => void;
  enviando?: boolean;
  error?: string | null;
};

/** Pantalla para subir una justificación de inasistencia. */
export function JustificarView({
  fecha,
  archivoNombre,
  onSeleccionarFecha,
  onSeleccionarArchivo,
  onEnviar,
  enviando,
  error,
}: JustificarViewProps) {
  const listo = Boolean(fecha && archivoNombre);

  return (
    <ScreenContainer gap={Spacing.four}>
      <ThemedText type="title">Justificación</ThemedText>

      <View style={styles.fields}>
        <PrimaryButton
          variant="outline"
          label={fecha ? `Fecha: ${fecha}` : 'Seleccionar la fecha…'}
          onPress={onSeleccionarFecha}
        />
        <PrimaryButton
          variant="outline"
          label={archivoNombre ? `Archivo: ${archivoNombre}` : 'Subir archivo'}
          onPress={onSeleccionarArchivo}
        />
      </View>

      {error ? (
        <ThemedText type="small" themeColor="danger">
          {error}
        </ThemedText>
      ) : null}

      <PrimaryButton
        label="Enviar justificación"
        onPress={onEnviar}
        loading={enviando}
        disabled={!listo}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: Spacing.three,
  },
});
