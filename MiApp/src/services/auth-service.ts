/**
 * Servicio de autenticación.
 *
 * ⚠️ TEMPLATE: define QUÉ operaciones existen (login, sesión, logout) con
 * sus firmas async. El CÓMO (API real, guardado seguro de la sesión) queda
 * como TODO. El controller `use-auth` solo llama a estas funciones.
 */

import { empleadoMock } from '@/models/mock';
import type { Credenciales, Empleado } from '@/models/types';

export const authService = {
  /**
   * Autentica al usuario y devuelve el empleado logueado.
   * Lanza un error (idealmente ApiError) si las credenciales son inválidas.
   */
  async login(credenciales: Credenciales): Promise<Empleado> {
    // TODO: validar y llamar a la API. Ejemplo de referencia:
    // return apiRequest<Empleado>('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credenciales),
    // });
    console.log('TODO: login real', credenciales);
    return empleadoMock; // placeholder para que el template funcione
  },

  /** Persiste la sesión (token / empleado) en el dispositivo. */
  async guardarSesion(empleado: Empleado): Promise<void> {
    // TODO: guardar con expo-secure-store / AsyncStorage.
    console.log('TODO: guardar sesión', empleado.id);
  },

  /** Recupera la sesión guardada, o null si no hay nadie logueado. */
  async obtenerSesion(): Promise<Empleado | null> {
    // TODO: leer la sesión persistida y validarla.
    return null;
  },

  /** Cierra la sesión y limpia el almacenamiento. */
  async logout(): Promise<void> {
    // TODO: limpiar el token guardado y, si aplica, avisar a la API.
    console.log('TODO: logout');
  },
};
