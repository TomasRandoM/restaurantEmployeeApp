/**
 * Servicio de justificaciones de inasistencia.
 *
 * ⚠️ TEMPLATE: expone el envío de una justificación. La subida real del
 * archivo (multipart) queda como TODO.
 */

import type { Justificacion } from '@/models/types';

/** Datos que el controller junta antes de enviar (aún sin id del backend). */
export interface NuevaJustificacion {
  /** Fecha de la inasistencia (ISO yyyy-mm-dd). */
  fecha: string;
  /** URI local del archivo elegido por el usuario, si adjuntó uno. */
  archivoUri?: string;
  /** Nombre del archivo elegido, para mostrar y enviar. */
  archivoNombre?: string;
}

export const justificacionesService = {
  /** Sube la justificación (con su adjunto) y devuelve la creada. */
  async enviar(input: NuevaJustificacion): Promise<Justificacion> {
    // TODO: armar un FormData con el archivo y subirlo:
    // const form = new FormData();
    // form.append('fecha', input.fecha);
    // if (input.archivoUri) form.append('archivo', { uri: input.archivoUri, name: input.archivoNombre } as any);
    // return apiRequest<Justificacion>('/justificaciones', { method: 'POST', body: form });
    console.log('TODO: enviar justificación', input);
    return { id: 'temp', fecha: input.fecha, archivoNombre: input.archivoNombre };
  },
};
