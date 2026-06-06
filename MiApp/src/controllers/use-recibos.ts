/**
 * Controller de recibos de sueldo.
 *
 * ⚠️ TEMPLATE: devuelve datos MOCK para poblar la UI.
 * Reemplazar por la carga real (fetch) e implementar la descarga.
 */

import { useState } from 'react';

import { recibosMock } from '@/models/mock';
import type { Recibo } from '@/models/types';

export interface UseRecibosResult {
  recibos: Recibo[];
  cargando: boolean;
  error: string | null;
  /** Descarga/abre el PDF de un recibo. Hoy no hace nada: implementar. */
  descargar: (recibo: Recibo) => void;
}

export function useRecibos(): UseRecibosResult {
  // TODO: reemplazar el mock por la carga real desde la API.
  const [recibos] = useState<Recibo[]>(recibosMock);
  const [cargando] = useState(false);
  const [error] = useState<string | null>(null);

  function descargar(recibo: Recibo) {
    // TODO: descargar el PDF (expo-file-system / Linking) y abrirlo o compartirlo.
    console.log('TODO: descargar recibo', recibo.id);
  }

  return { recibos, cargando, error, descargar };
}
