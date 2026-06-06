import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { IconBadge } from '@/components/icon-badge';
import { PrimaryButton } from '@/components/primary-button';
import { ScreenContainer } from '@/components/screen-container';
import { ThemedText } from '@/components/themed-text';
import { Radii, Shadows, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type JustificarViewProps = {
  fecha: string | null;
  archivoNombre: string | null;
  onSeleccionarFecha: () => void;
  onSeleccionarArchivo: () => void;
  onEnviar: () => void;
  enviando?: boolean;
  error?: string | null;
};

type SelectorCardProps = {
  iconName: IoniconName;
  label: string;
  value: string | null;
  placeholder: string;
  onPress: () => void;
};

/** Selector presionable que cambia de estilo cuando ya hay un valor cargado. */
function SelectorCard({ iconName, label, value, placeholder, onPress }: SelectorCardProps) {
  const theme = useTheme();
  const done = Boolean(value);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.selector,
        {
          backgroundColor: theme.card,
          borderColor: done ? theme.success : theme.border,
        },
        pressed && styles.pressed,
      ]}>
      <IconBadge
        name={iconName}
        size={48}
        color={done ? theme.success : theme.primary}
        background={done ? theme.successSoft : theme.primarySoft}
      />
      <View style={styles.selectorTexts}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          {label}
        </ThemedText>
        <ThemedText type="default" style={styles.selectorValue} numberOfLines={1}>
          {value ?? placeholder}
        </ThemedText>
      </View>
      <Ionicons
        name={done ? 'checkmark-circle' : 'add-circle-outline'}
        size={24}
        color={done ? theme.success : theme.textSecondary}
      />
    </Pressable>
  );
}

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
      <View style={styles.header}>
        <ThemedText type="title">Justificación</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Cargá la fecha y el comprobante de tu inasistencia.
        </ThemedText>
      </View>

      <View style={styles.fields}>
        <SelectorCard
          iconName="calendar-outline"
          label="Fecha"
          value={fecha}
          placeholder="Seleccionar la fecha"
          onPress={onSeleccionarFecha}
        />
        <SelectorCard
          iconName="document-attach-outline"
          label="Comprobante"
          value={archivoNombre}
          placeholder="Subir archivo"
          onPress={onSeleccionarArchivo}
        />
      </View>

      {error ? (
        <View style={styles.error}>
          <Ionicons name="alert-circle" size={16} color="#D5453B" />
          <ThemedText type="small" themeColor="danger">
            {error}
          </ThemedText>
        </View>
      ) : null}

      <PrimaryButton
        label="Enviar justificación"
        iconName="send"
        onPress={onEnviar}
        loading={enviando}
        disabled={!listo}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
  },
  fields: {
    gap: Spacing.three,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radii.lg,
    borderWidth: 1,
    ...Shadows.sm,
  },
  selectorTexts: {
    flex: 1,
    gap: Spacing.half,
  },
  selectorValue: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
