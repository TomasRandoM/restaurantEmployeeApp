/**
 * Servicio de recibos de sueldo.
 */

import type { Recibo } from '@/models/types';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { apiDownload, apiRequest } from '@/services/api-client';

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

  async descargarYCompartir(id: string): Promise<void> {
    const destino = `${FileSystem.cacheDirectory!}recibo-${id}.pdf`;
    const archivoLocal = await apiDownload(`/api/v1/reciboDeSueldo/pdf/${id}`, destino);
    await Sharing.shareAsync(archivoLocal, {
      mimeType: 'application/pdf',
      dialogTitle: 'Abrir recibo',
    });
  },
};
