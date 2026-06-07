/**
 * Servicio de recibos de sueldo.
 *
 * ⚠️ TEMPLATE: expone la carga y la descarga de recibos. Hoy `listar`
 * devuelve el mock para poblar la UI; reemplazar por el fetch real.
 */

import { recibosMock } from '@/models/mock';
import type { Recibo } from '@/models/types';

export const recibosService = {
  /** Trae los recibos del empleado autenticado. */
  async listar(): Promise<Recibo[]> {
    // TODO: reemplazar el mock por la llamada real:
    // return apiRequest<Recibo[]>('/recibos');
    return recibosMock;
  },

  /** Descarga (y abre/comparte) el PDF de un recibo. */
  async descargar(recibo: Recibo): Promise<void> {
    // TODO: descargar el archivo desde `recibo.archivoUrl` con
    // expo-file-system y abrirlo/compartirlo (expo-sharing / Linking).
    console.log('TODO: descargar recibo', recibo.id);
  },
};
