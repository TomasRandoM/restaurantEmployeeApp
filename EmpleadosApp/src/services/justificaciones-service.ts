/**
 * Servicio de justificaciones de inasistencia.
 */

import * as FileSystem from 'expo-file-system/legacy';
import type { Justificacion } from '@/models/types';
import { ApiError, apiRequest } from './api-client';
import { authService } from './auth-service';
import { justificacionesDao } from '@/models/daos/justificaciones-dao';
/** Datos que el controller junta antes de enviar */
export interface NuevaJustificacion {
  /** Fecha de la inasistencia (ISO yyyy-mm-dd). */
  fecha: string;
  observacion?: string;
  tipoDocumentacion: string;
  /** URI local del archivo elegido por el usuario. */
  archivoUri?: string;
  /** Nombre del archivo  */
  archivoNombre?: string;
  /** MIME type del archivo  */
  archivoTipo?: string;
}

async function persistirArchivo(input: NuevaJustificacion): Promise<string | undefined> {
  if (!input.archivoUri) return undefined;
  const dir = `${FileSystem.documentDirectory}justificaciones-pendientes/`;
  await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  const destino = `${dir}${Date.now()}-${input.archivoNombre ?? 'archivo'}`;
  await FileSystem.copyAsync({ from: input.archivoUri, to: destino });
  return destino;
}

/** Guarda la justificación en SQLite para subirla cuando haya conexión. */
async function guardarJustificacionSQL(input: NuevaJustificacion): Promise<void> {
  const archivoUri = await persistirArchivo(input);
  await justificacionesDao.insertar({
    fecha: input.fecha,
    tipoDocumentacion: input.tipoDocumentacion,
    observacion: input.observacion,
    archivoUri,
    archivoNombre: input.archivoNombre,
    archivoTipo: input.archivoTipo,
    creadaEn: new Date().toISOString(),
  });
}

function inferirMime(nombre?: string, uri?: string): string {
  const ref = (nombre ?? uri ?? '').toLowerCase();
  if (ref.endsWith('.pdf')) return 'application/pdf';
  if (ref.endsWith('.png')) return 'image/png';
  if (ref.endsWith('.jpg') || ref.endsWith('.jpeg')) return 'image/jpeg';
  if (ref.endsWith('.webp')) return 'image/webp';
  if (ref.endsWith('.heic')) return 'image/heic';
  return 'application/octet-stream';
}

function reordenarFecha(fecha: string): string {
  const [dia, mes, año] = fecha.split('/');
  return `${mes}/${dia}/${año}`;
}

export const justificacionesService = {
  async enviar(input: NuevaJustificacion): Promise<void> {
    const form = new FormData();
    form.append("fecha", reordenarFecha(input.fecha));
    if (input.archivoUri) {
      form.append("archivo", {
        uri: input.archivoUri,
        name: input.archivoNombre ?? 'archivo',
        type: input.archivoTipo ?? inferirMime(input.archivoNombre, input.archivoUri),
      } as any);
    }
    const employeeId = await authService.obtenerEmpleadoId();
    if (employeeId !== null) form.append("employeeId", employeeId);
    if (input.observacion != null) form.append("observacion", input.observacion);
    form.append("tipoDocumentacion", input.tipoDocumentacion);
    try {
      await apiRequest<Justificacion>('/api/v1/justificacion/crearUsuario', { method: "POST", body: form });
    }
    catch (e) {
      if (e instanceof ApiError && e.status === 0) {
        await guardarJustificacionSQL(input)
      }
      else {
        throw e;
      }
    }
  },

  async reenviarPendientes(): Promise<void> {
    const pendientes = await justificacionesDao.listar();
    for (const p of pendientes) {
      const form = new FormData();
      form.append("fecha", reordenarFecha(p.fecha));
      if (p.archivoUri) {
        form.append("archivo", {
          uri: p.archivoUri,
          name: p.archivoNombre ?? 'archivo',
          type: p.archivoTipo ?? inferirMime(p.archivoNombre, p.archivoUri),
        } as any);
      }
      const employeeId = await authService.obtenerEmpleadoId();
      if (employeeId !== null) form.append("employeeId", employeeId);
      if (p.observacion != null) form.append("observacion", p.observacion);
      form.append("tipoDocumentacion", p.tipoDocumentacion);
      try {
        await apiRequest<Justificacion>('/api/v1/justificacion/crearUsuario', { method: "POST", body: form });
        await justificacionesDao.eliminar(p.id);
        if (p.archivoUri) {
          await FileSystem.deleteAsync(p.archivoUri, { idempotent: true });
        }
      }
      catch (e) {
        if (e instanceof ApiError && e.status === 0) {
          break;
        }
   
        if (e instanceof ApiError && (e.status === 400 || e.status === 403)) {
          await justificacionesDao.eliminar(p.id);
          if (p.archivoUri) {
            await FileSystem.deleteAsync(p.archivoUri, { idempotent: true });
          }
          continue;
        }
        continue;
      }
    }
  },
};


