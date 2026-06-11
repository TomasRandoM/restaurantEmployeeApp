/**
 * Controller para generar el código QR del empleado.
 *
 * Maneja el estado de UI y delega la generación del valor del QR en `qrService`.
 */

import { useState } from 'react';

import type { QrData } from '@/models/types';
import { qrService } from '@/services';

export interface UseQrCodeResult {
  qr: QrData | null;
  generando: boolean;
  error: string | null;
  /** (Re)genera el código QR (delega en qrService). */
  generar: () => void;
}

export function useQrCode(): UseQrCodeResult {
  const [qr, setQr] = useState<QrData | null>(null);
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generar() {
    setError(null);
    setGenerando(true);
    try {
      setQr(await qrService.generar());
    } catch {
      setError('No se pudo generar el código QR.');
    } finally {
      setGenerando(false);
    }
  }

  return { qr, generando, error, generar };
}
