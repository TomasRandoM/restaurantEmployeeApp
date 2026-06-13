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
  cargando: boolean;
  error: string | null;
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
    } catch (e) {
      console.warn('Error al iniciar sesión:', e);
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
