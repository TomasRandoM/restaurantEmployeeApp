/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    // --- superficies / bordes ---
    card: '#FFFFFF',
    border: '#E3E4E8',
    separator: '#ECECEF',
    icon: '#60646C',
    // --- acento de marca (los botones azules del prototipo) ---
    primary: '#3C7DF7',
    primarySoft: '#E4EEFE',
    onPrimary: '#FFFFFF',
    // --- estados ---
    success: '#1E9E63',
    successSoft: '#DCF3E7',
    warning: '#C98A1A',
    warningSoft: '#FBEFD6',
    danger: '#D5453B',
    dangerSoft: '#FBE0DE',
  },
  dark: {
    text: '#ECEDEE',
    background: '#000000',
    backgroundElement: '#1C1D20',
    backgroundSelected: '#2E3135',
    textSecondary: '#9BA1A6',
    // --- superficies / bordes ---
    card: '#17181B',
    border: '#2C2E33',
    separator: '#242629',
    icon: '#9BA1A6',
    // --- acento de marca (los botones azules del prototipo) ---
    primary: '#5B9CFF',
    primarySoft: '#16243B',
    onPrimary: '#0B1220',
    // --- estados ---
    success: '#39C684',
    successSoft: '#16301F',
    warning: '#E6B045',
    warningSoft: '#332714',
    danger: '#F26157',
    dangerSoft: '#34191A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Degradés celeste→azul de marca. Se usan en headers (hero) y botones primarios
 * para darle un look más vistoso sin perder la coherencia con `Colors`.
 */
export const Gradients = {
  light: {
    primary: ['#4DA3FF', '#2E6BF0'] as const,
    hero: ['#5BA8FF', '#2E6BF0'] as const,
  },
  dark: {
    primary: ['#3C7DF7', '#5B9CFF'] as const,
    hero: ['#1F3F73', '#2E6BF0'] as const,
  },
} as const;

export type GradientName = keyof typeof Gradients.light & keyof typeof Gradients.dark;

/** Sombras suaves reutilizables (cross-platform). */
export const Shadows = {
  sm: Platform.select({
    ios: { shadowColor: '#0B1220', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
    android: { elevation: 2 },
    web: { boxShadow: '0 3px 10px rgba(11,18,32,0.08)' },
    default: {},
  }),
  md: Platform.select({
    ios: { shadowColor: '#0B1220', shadowOpacity: 0.1, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
    android: { elevation: 4 },
    web: { boxShadow: '0 8px 22px rgba(11,18,32,0.1)' },
    default: {},
  }),
  primary: Platform.select({
    ios: { shadowColor: '#2E6BF0', shadowOpacity: 0.35, shadowRadius: 14, shadowOffset: { width: 0, height: 8 } },
    android: { elevation: 6 },
    web: { boxShadow: '0 8px 20px rgba(46,107,240,0.35)' },
    default: {},
  }),
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Radios de borde reutilizables. */
export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
