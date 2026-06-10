/**
 * Controller de recibos de sueldo.
 *
 * ⚠️ TEMPLATE: maneja el estado de UI (lista, cargando, error) y delega la
 * obtención/descarga en `recibosService`. El fetch real va en el service.
 */

import type { Recibo } from '@/models/types';
import { recibosService } from '@/services/recibos-service';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

export interface UseRecibosResult {
  recibos: Recibo[];
  cargando: boolean;
  error: string | null;
  verPdf: (recibo: Recibo) => void;
}

export function useRecibos(): UseRecibosResult {
  const router = useRouter();
  const [recibos, setRecibos] = useState<Recibo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let activo = true;
      setCargando(true);
      recibosService
        .listar()
        .then((data) => { if (activo) setRecibos(data); })
        .catch(() => { if (activo) setError('No se pudieron cargar los recibos.'); })
        .finally(() => { if (activo) setCargando(false); });
      return () => { activo = false; };
    }, [])
  );

  function verPdf(recibo: Recibo) {
    router.push({ pathname: '/recibo-pdf' as any, params: { id: recibo.id } });
  }

  return { recibos, cargando, error, verPdf };
}