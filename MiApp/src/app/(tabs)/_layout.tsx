import Ionicons from '@expo/vector-icons/Ionicons';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import React from 'react';

/**
 * Tabs nativas del área autenticada: Inicio · Recibos · Justificar.
 *
 * En SDK 54 `Label` e `Icon` son componentes sueltos (hijos del Trigger).
 * Usamos `VectorIcon` con Ionicons para tener un ícono cross-platform
 * (iOS / Android / web) sin depender de imágenes.
 */
export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label>Inicio</Label>
        <Icon src={<VectorIcon family={Ionicons} name="home" />} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="recibos">
        <Label>Recibos</Label>
        <Icon src={<VectorIcon family={Ionicons} name="receipt" />} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="justificar">
        <Label>Justificar</Label>
        <Icon src={<VectorIcon family={Ionicons} name="cloud-upload" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
