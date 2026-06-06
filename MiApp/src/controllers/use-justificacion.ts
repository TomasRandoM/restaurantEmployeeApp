/**
 * Controller para subir una justificación de inasistencia.
 *
 * ⚠️ TEMPLATE: maneja solo el estado mínimo que la view necesita mostrar.
 * El date picker, la selección de archivo y la subida quedan como TODO.
 */

import { useState } from 'react';

import type { Justificacion } from '@/models/types';

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
  /** Envía la justificación. Hoy no hace nada: implementar. */
  enviar: () => void;
}

export function useJustificacion(): UseJustificacionResult {
  const [fecha] = useState<string | null>(null);
  const [archivoNombre] = useState<string | null>(null);
  const [enviando] = useState(false);
  const [error] = useState<string | null>(null);

  function seleccionarFecha() {
    // TODO: abrir un date picker y guardar la fecha elegida.
    console.log('TODO: seleccionar fecha');
  }

  function seleccionarArchivo() {
    // TODO: abrir expo-document-picker / image-picker y guardar el archivo.
    console.log('TODO: seleccionar archivo');
  }

  function enviar() {
    const justificacion: Partial<Justificacion> = {
      fecha: fecha ?? undefined,
      archivoNombre: archivoNombre ?? undefined,
    };
    // TODO: subir la justificación a la API.
    console.log('TODO: enviar justificación', justificacion);
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
