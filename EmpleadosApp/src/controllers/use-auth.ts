/**
 * Controller de autenticación (capa "Controlador" del MVC).
 *
 * Maneja el ESTADO de UI (campos, cargando, error) y orquesta el flujo.
 * El acceso a datos vive en `authService` (capa Servicios). Acá no debería
 * haber `fetch` ni almacenamiento: solo llamadas al service.
 */

import { router } from 'expo-router';
import { useState } from 'react';

import { authService } from '@/services';

export interface UseAuthResult {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  /** Indica si hay un login en curso (para deshabilitar el botón, spinner, etc.). */
  cargando: boolean;
  /** Mensaje de error a mostrar en la UI, si lo hubiera. */
  error: string | null;
  /** Dispara el login (delega en authService). */
  enviar: () => void;
  checkSession: () => void;
}

export function useAuth(): UseAuthResult {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar() {
    setError(null);
    setCargando(true);
    try {
      const empleado = await authService.login({ email, password });
      router.replace('/home');
    } catch {
      setError('No se pudo iniciar sesión. Revisá tus datos.');
    } finally {
      setCargando(false);
    }
  }

  async function checkSession() {
    try {
      const empleado = await authService.obtenerSesion();
      if (empleado !== null) {
        router.replace('/home');
      }
    } catch {
    }
  }

  return { email, password, setEmail, setPassword, cargando, error, enviar, checkSession};
}
