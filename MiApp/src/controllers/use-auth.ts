/**
 * Controller de autenticación (capa "Controlador" del MVC).
 *
 * ⚠️ TEMPLATE: la lógica real la implementan ustedes.
 * Acá solo está la FIRMA que consume la LoginView. El estado/validación,
 * la llamada a la API, el guardado de sesión, etc. quedan como TODO.
 */

import { useState } from 'react';

import type { Credenciales } from '@/models/types';

export interface UseAuthResult {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  /** Indica si hay un login en curso (para deshabilitar el botón, spinner, etc.). */
  cargando: boolean;
  /** Mensaje de error a mostrar en la UI, si lo hubiera. */
  error: string | null;
  /** Dispara el login. Hoy no hace nada: implementar. */
  enviar: () => void;
}

export function useAuth(): UseAuthResult {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando] = useState(false);
  const [error] = useState<string | null>(null);

  function enviar() {
    const credenciales: Credenciales = { email, password };
    // TODO: validar credenciales, llamar a la API, guardar sesión y
    // navegar al área autenticada (router.replace('/(tabs)')).
    console.log('TODO: implementar login', credenciales);
  }

  return { email, password, setEmail, setPassword, cargando, error, enviar };
}
