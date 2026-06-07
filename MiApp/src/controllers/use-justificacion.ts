/**
 * Controller para subir una justificación de inasistencia.
 *
 * ⚠️ TEMPLATE: maneja el estado de UI y los selectores (fecha/archivo, que
 * son APIs del dispositivo y por eso viven en el controller). El envío a la
 * API se delega en `justificacionesService`.
 */

import { useState } from 'react';

import { justificacionesService } from '@/services';

export interface UseJustificacionResult {
  /** Fecha seleccionada (ISO yyyy-mm-dd) o null si todavía no se eligió. */
  fecha: string | null;
  /** Nombre del archivo elegido o null. */
  archivoNombre: string | null;
  enviando: boolean;
  error: string | null;
  /** Abre el selector de fecha. Hoy no hace nada: implementar. */
  seleccionarFecha: () => void;
  /** Abre el selector de archivo. Hoy no hace nada: implementar. */
  seleccionarArchivo: () => void;
  /** Envía la justificación (delega en justificacionesService). */
  enviar: () => void;
}

export function useJustificacion(): UseJustificacionResult {
  const [fecha, setFecha] = useState<string | null>(null);
  const [archivoUri, setArchivoUri] = useState<string | null>(null);
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function seleccionarFecha() {
    // TODO: abrir un date picker y guardar la fecha elegida con setFecha(...).
    console.log('TODO: seleccionar fecha');
  }

  function seleccionarArchivo() {
    // TODO: abrir expo-document-picker / image-picker y guardar el resultado
    // con setArchivoUri(...) y setArchivoNombre(...).
    console.log('TODO: seleccionar archivo');
  }

  async function enviar() {
    if (!fecha) {
      setError('Elegí una fecha.');
      return;
    }
    setError(null);
    setEnviando(true);
    try {
      await justificacionesService.enviar({
        fecha,
        archivoUri: archivoUri ?? undefined,
        archivoNombre: archivoNombre ?? undefined,
      });
      // TODO: mostrar feedback de éxito y/o volver atrás.
    } catch {
      setError('No se pudo enviar la justificación.');
    } finally {
      setEnviando(false);
    }
  }

  return {
    fecha,
    archivoNombre,
    enviando,
    error,
    seleccionarFecha,
    seleccionarArchivo,
    enviar,
  };
}
