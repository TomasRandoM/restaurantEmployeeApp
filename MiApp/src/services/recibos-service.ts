/**
 * Servicio de recibos de sueldo.
 *
 * ⚠️ TEMPLATE: expone la carga y la descarga de recibos. Hoy `listar`
 * devuelve el mock para poblar la UI; reemplazar por el fetch real.
 */

import type { Recibo } from '@/models/types';
import { apiRequest } from '@/services/api-client';

type ReciboApi = {
  id: string;
  mesPago: number;
  fechaDePago: string; // "2026-03-31T21:00:00.000-03:00"
};

type RecibosPage = {
  content: ReciboApi[];
};

export const recibosService = {
  async listar(): Promise<Recibo[]> {
    const page = await apiRequest<RecibosPage>('/api/v1/reciboDeSueldo/mis-recibos');
    return page.content.map((r) => ({
      id: r.id,
      mesPago: r.mesPago,
      anioPago: new Date(r.fechaDePago).getFullYear(),
    }));
  },
};
