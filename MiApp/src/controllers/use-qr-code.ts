/**
 * Controller para generar el código QR del empleado.
 *
 * ⚠️ TEMPLATE: no genera nada real todavía.
 * La generación del valor del QR y su refresco quedan como TODO.
 */

import { useState } from 'react';

import type { QrData } from '@/models/types';

export interface UseQrCodeResult {
  qr: QrData | null;
  generando: boolean;
  error: string | null;
  /** (Re)genera el código QR. Hoy no hace nada: implementar. */
  generar: () => void;
}

export function useQrCode(): UseQrCodeResult {
  const [qr] = useState<QrData | null>(null);
  const [generando] = useState(false);
  const [error] = useState<string | null>(null);

  function generar() {
    // TODO: generar el valor del QR (token del empleado) y, si aplica,
    // renderizarlo con una librería de QR. Acá solo se expone la firma.
    console.log('TODO: generar código QR');
  }

  return { qr, generando, error, generar };
}
