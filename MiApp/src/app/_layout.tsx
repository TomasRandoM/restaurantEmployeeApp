import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

/**
 * Layout raíz: un Stack que separa el login (fuera de tabs) del área
 * autenticada (grupo `(tabs)`). La pantalla de QR se abre como modal.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="qr"
          options={{ presentation: 'modal', headerShown: true, title: 'Código QR' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
