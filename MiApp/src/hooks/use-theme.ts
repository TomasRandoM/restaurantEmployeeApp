/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, Gradients } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/** Devuelve el esquema activo, con default a 'light' (RN 0.81 puede dar null). */
export function useScheme(): 'light' | 'dark' {
  const scheme = useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  return Colors[useScheme()];
}

/** Paleta de degradés del esquema activo (celeste/azul). */
export function useGradients() {
  return Gradients[useScheme()];
}
