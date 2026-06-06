/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  // En RN 0.81 useColorScheme devuelve 'light' | 'dark' | null; default a 'light'.
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return Colors[theme];
}
