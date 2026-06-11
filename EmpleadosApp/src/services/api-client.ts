/**
 * Cliente HTTP base (capa "Servicios" del MVC + Servicios).
 *
 * Acá se centraliza todo lo relacionado a la red para no repetir `fetch`
 * en cada service.
 *
 * Idea de la capa de servicios: es el ÚNICO lugar que conoce de dónde
 * vienen los datos (API, almacenamiento, file system...). Ni la view ni
 * el controller deberían saber que existe `fetch`.
 */
import * as FileSystem from 'expo-file-system/legacy';
import { authService } from "./auth-service";
// Lee la URL de la API desde el .env. En Expo SDK 54 las variables expuestas
// al cliente DEBEN tener el prefijo EXPO_PUBLIC_ y accederse con dot notation
// (no bracket notation ni destructuring). Quedan embebidas en build time, así
// que NO son secretas: nunca metas tokens/keys acá.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/** Error normalizado que los services pueden propagar a los controllers. */
export class ApiError extends Error {
  constructor(
    message: string,
    /** Código HTTP, si corresponde. */
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
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
/**
 * Descarga un archivo binario desde la API al sistema de archivos del dispositivo.
 * Centraliza la URL base y el header de auth igual que `apiRequest`.
 */
export async function apiDownload(
  path: string,
  destino: string,
): Promise<string> {
  const uri = `${API_BASE_URL}${path}`;
  const { uri: archivoLocal, status } = await FileSystem.downloadAsync(uri, destino, {
    headers: { Authorization: `Bearer ${await authService.obtenerToken()}` },
  });
  if (status < 200 || status >= 300) {
    throw new ApiError(`Error ${status} al descargar ${path}`, status);
  }
  return archivoLocal;
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  let res: Response
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${await authService.obtenerToken()}`,
        ...options?.headers,
      },
    });
  } catch (e) {
    throw new ApiError("No hay conexión a internet", 0);
  } finally {
    clearTimeout(timeout);
  }
  if (!res.ok) {
    throw new ApiError(`Error ${res.status} en ${path}`, res.status);
  }
  return (await res.json()) as T;
}
