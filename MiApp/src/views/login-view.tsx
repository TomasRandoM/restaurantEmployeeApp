import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type LoginViewProps = {
  email: string;
  password: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  error?: string | null;
};

/** Pantalla de login (solo presentación). */
export function LoginView({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  loading,
  error,
}: LoginViewProps) {
  return (
    <ScreenContainer center gap={Spacing.four}>
      <View style={styles.header}>
        <ThemedText type="title">Hola 👋</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Iniciá sesión para continuar
        </ThemedText>
      </View>

      <Card style={styles.card}>
        <TextField
          label="Email"
          placeholder="tu@restaurante.com"
          value={email}
          onChangeText={onChangeEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextField
          label="Contraseña"
          placeholder="••••••••"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          autoComplete="password"
        />
      </Card>

      {error ? (
        <ThemedText type="small" themeColor="danger">
          {error}
        </ThemedText>
      ) : null}

      <PrimaryButton label="Enviar" onPress={onSubmit} loading={loading} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
  },
  card: {
    gap: Spacing.three,
  },
});
