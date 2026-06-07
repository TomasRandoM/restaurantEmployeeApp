/**
 * Controller de autenticación (capa "Controlador" del MVC).
 *
 * ⚠️ TEMPLATE: maneja el ESTADO de UI (campos, cargando, error) y orquesta
 * el flujo. El acceso a datos real vive en `authService` (capa Servicios).
 * Acá no debería haber `fetch` ni almacenamiento: solo llamadas al service.
 */

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
      await authService.guardarSesion(empleado);
      // TODO: navegar al área autenticada (p. ej. exponiendo un callback
      // onLoginOk o un flag de éxito que la screen observe).
    } catch {
      // TODO: distinguir el tipo de error (credenciales / red) para el mensaje.
      setError('No se pudo iniciar sesión. Revisá tus datos.');
    } finally {
      setCargando(false);
    }
  }

  return { email, password, setEmail, setPassword, cargando, error, enviar };
}
