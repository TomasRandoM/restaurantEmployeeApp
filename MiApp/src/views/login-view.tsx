import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import { ScreenContainer } from '@/components/screen-container';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Radii, Shadows, Spacing } from '@/constants/theme';
import { useGradients } from '@/hooks/use-theme';

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
  const gradients = useGradients();

  return (
    <ScreenContainer center gap={Spacing.four}>
      <View style={styles.header}>
        <View style={styles.logoShadow}>
          <LinearGradient
            colors={gradients.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}>
            <Ionicons name="restaurant" size={36} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <ThemedText type="title" style={styles.title}>
          Bienvenido
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
          Iniciá sesión para continuar
        </ThemedText>
      </View>

      <Card style={styles.card}>
        <TextField
          label="Email"
          iconName="mail-outline"
          placeholder="tu@restaurante.com"
          value={email}
          onChangeText={onChangeEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextField
          label="Contraseña"
          iconName="lock-closed-outline"
          placeholder="••••••••"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          autoComplete="password"
        />

        {error ? (
          <View style={styles.error}>
            <Ionicons name="alert-circle" size={16} color="#D5453B" />
            <ThemedText type="small" themeColor="danger">
              {error}
            </ThemedText>
          </View>
        ) : null}

        <PrimaryButton label="Iniciar sesión" iconName="log-in-outline" onPress={onSubmit} loading={loading} />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoShadow: {
    borderRadius: Radii.xl,
    marginBottom: Spacing.two,
    ...Shadows.primary,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: Radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
  },
  subtitle: {
    textAlign: 'center',
  },
  card: {
    width: '100%',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
