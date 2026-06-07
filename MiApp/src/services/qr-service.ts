/**
 * Servicio del código QR de identificación del empleado.
 *
 * ⚠️ TEMPLATE: expone la generación del valor del QR. Obtener el token
 * real (y su expiración) queda como TODO.
 */

import type { QrData } from '@/models/types';

export const qrService = {
  /** Pide/genera el valor a codificar en el QR del empleado. */
  async generar(): Promise<QrData> {
    // TODO: pedir un token de corta duración a la API:
    // return apiRequest<QrData>('/qr/token', { method: 'POST' });
    console.log('TODO: generar código QR');
    return { valor: '', generadoEn: new Date().toISOString() };
  },
};
