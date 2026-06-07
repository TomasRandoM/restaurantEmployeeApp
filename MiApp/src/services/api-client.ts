/**
 * Cliente HTTP base (capa "Servicios" del MVC + Servicios).
 *
 * ⚠️ TEMPLATE: acá se centraliza TODO lo relacionado a la red para no
 * repetir `fetch` en cada service. Ustedes completan la URL real, los
 * headers de autenticación y el manejo de errores.
 *
 * Idea de la capa de servicios: es el ÚNICO lugar que conoce de dónde
 * vienen los datos (API, almacenamiento, file system...). Ni la view ni
 * el controller deberían saber que existe `fetch`.
 */

// TODO: reemplazar por la URL real de su API.
// Recomendado leerla de una variable de entorno (app.config / expo-constants).
export const API_BASE_URL = 'https://api.tu-restaurante.example';

/** Error normalizado que los services pueden propagar a los controllers. */
export class ApiError extends Error {
  constructor(
    message: string,
    /** Código HTTP, si corresponde. */
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Wrapper genérico sobre `fetch`. Los services lo usan así:
 *
 *   const recibos = await apiRequest<Recibo[]>('/recibos');
 *   await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(cred) });
 *
 * TODO (ustedes): agregar el header Authorization con el token de sesión,
 * timeout, reintentos, etc. según necesiten.
 */
export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  // TODO: implementar la llamada real. Esqueleto de referencia:
  //
  // const res = await fetch(`${API_BASE_URL}${path}`, {
  //   ...options,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // Authorization: `Bearer ${await authService.obtenerToken()}`,
  //     ...options?.headers,
  //   },
  // });
  // if (!res.ok) {
  //   throw new ApiError(`Error ${res.status} en ${path}`, res.status);
  // }
  // return (await res.json()) as T;

  throw new ApiError(`TODO: implementar apiRequest para ${path}`);
}
