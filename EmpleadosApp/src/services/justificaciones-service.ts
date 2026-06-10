/**
 * Servicio de justificaciones de inasistencia.
 *
 * ⚠️ TEMPLATE: expone el envío de una justificación. La subida real del
 * archivo (multipart) queda como TODO.
 */

import type { Justificacion } from '@/models/types';
import { apiRequest } from './api-client';
import { authService } from './auth-service';

/** Datos que el controller junta antes de enviar (aún sin id del backend). */
export interface NuevaJustificacion {
  /** Fecha de la inasistencia (ISO yyyy-mm-dd). */
  fecha: string;
  observacion?: string;
  tipoDocumentacion: string;
  /** URI local del archivo elegido por el usuario, si adjuntó uno. */
  archivoUri?: string;
  /** Nombre del archivo elegido, para mostrar y enviar. */
  archivoNombre?: string;
  /** MIME type del archivo (requerido por Android/OkHttp para armar el part). */
  archivoTipo?: string;
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
    await apiRequest<Justificacion>('/api/v1/justificacion/crearUsuario', { method: "POST", body: form });
  },
};
