import { recibosService } from '@/services/recibos-service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export interface UseReciboPdfResult {
  cargando: boolean;
  error: string | null;
}

export function useReciboPdf(): UseReciboPdfResult {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID de recibo no encontrado.');
      setCargando(false);
      return;
    }
    recibosService
      .descargarYCompartir(id)
      .then(() => router.back())
      .catch(() => setError('No se pudo descargar el recibo.'))
      .finally(() => setCargando(false));
  }, [id]);

  return { cargando, error };
}
