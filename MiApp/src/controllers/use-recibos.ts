/**
 * Controller de recibos de sueldo.
 *
 * ⚠️ TEMPLATE: maneja el estado de UI (lista, cargando, error) y delega la
 * obtención/descarga en `recibosService`. El fetch real va en el service.
 */

import { useEffect, useState } from 'react';

import type { Recibo } from '@/models/types';
import { recibosService } from '@/services';

export interface UseRecibosResult {
  recibos: Recibo[];
  cargando: boolean;
  error: string | null;
  /** Descarga/abre el PDF de un recibo (delega en recibosService). */
  descargar: (recibo: Recibo) => void;
}

export function useRecibos(): UseRecibosResult {
  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial de la lista al montar la pantalla.
  useEffect(() => {
    let activo = true;
    setCargando(true);
    recibosService
      .listar()
      .then((data) => {
        if (activo) setRecibos(data);
      })
      .catch(() => {
        if (activo) setError('No se pudieron cargar los recibos.');
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    // Evita actualizar estado si la pantalla se desmontó antes de responder.
    return () => {
      activo = false;
    };
  }, []);

  async function descargar(recibo: Recibo) {
    try {
      await recibosService.descargar(recibo);
    } catch {
      setError('No se pudo descargar el recibo.');
    }
  }

  return { recibos, cargando, error, descargar };
}
