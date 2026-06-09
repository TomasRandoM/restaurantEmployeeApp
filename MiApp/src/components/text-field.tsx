import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps, useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type TextFieldProps = TextInputProps & {
  /** Etiqueta opcional encima del campo. */
  label?: string;
  /** Ícono opcional a la izquierda del input. */
  iconName?: IoniconName;
};

/** Input de texto con estética temática (light/dark), ícono y foco resaltado. */
export function TextField({ label, iconName, style, multiline, ...rest }: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <ThemedText type="smallBold" themeColor="textSecondary">
          {label}
        </ThemedText>
      ) : null}
      <View
        style={[
          styles.field,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: focused ? theme.primary : theme.border,
            borderWidth: focused ? 2 : 1,
          },
        ]}>
        {iconName ? (
          <Ionicons
            name={iconName}
            size={20}
            color={focused ? theme.primary : theme.textSecondary}
          />
        ) : null}
        <TextInput
          multiline={multiline}
          placeholderTextColor={theme.textSecondary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, { color: theme.text }, style]}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 52,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // Quita el contorno por defecto del input en web.
    outlineStyle: 'none' as never,
  },
});
