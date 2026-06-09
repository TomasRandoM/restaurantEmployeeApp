/**
 * Controller para subir una justificación de inasistencia.
 *
 * Maneja el estado de UI y los selectores (fecha/archivo, que son APIs del
 * dispositivo y por eso viven en el controller). El envío a la API se delega
 * en `justificacionesService`.
 */

import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

import { type TipoJustificacion } from '@/models/types';
import { justificacionesService } from '@/services';

export interface UseJustificacionResult {
  /** Fecha seleccionada (ISO yyyy-mm-dd) o null si todavía no se eligió. */
  fecha: string | null;
  /** Nombre del archivo elegido o null. */
  archivoNombre: string | null;
  tipo: TipoJustificacion;
  observacion: string;
  /** Si el date picker está visible (la view lo renderiza). */
  mostrarPickerFecha: boolean;
  /** Valor `Date` que usa el date picker mientras está abierto. */
  valorFecha: Date;
  enviando: boolean;
  error: string | null;
  /** Abre el selector de fecha. */
  seleccionarFecha: () => void;
  /** Handler del onChange del DateTimePicker. */
  onCambiarFecha: (event: DateTimePickerEvent, date?: Date) => void;
  /** Abre el selector de archivo (expo-document-picker). */
  seleccionarArchivo: () => void;
  cambiarTipo: (tipo: TipoJustificacion) => void;
  cambiarObservacion: (text: string) => void;
  /** Envía la justificación (delega en justificacionesService). */
  enviar: () => void;
}

/** Formatea un Date a dd/MM/yyyy (formato que acepta Spring sin @DateTimeFormat). */
function aFechaISO(date: Date): string {
  const año = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${dia}/${mes}/${año}`;
}

export function useJustificacion(): UseJustificacionResult {
  const [fecha, setFecha] = useState<string | null>(null);
  const [valorFecha, setValorFecha] = useState<Date>(new Date());
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [archivoUri, setArchivoUri] = useState<string | null>(null);
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null);
  const [archivoTipo, setArchivoTipo] = useState<string | null>(null);
  const [tipo, setTipo] = useState<TipoJustificacion>('CERTIFICADO');
  const [observacion, setObservacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function seleccionarFecha() {
    setMostrarPickerFecha(true);
  }

  function onCambiarFecha(event: DateTimePickerEvent, date?: Date) {
    // En Android el picker es un diálogo modal: se cierra solo. Lo ocultamos
    // siempre para que el estado refleje que ya no está abierto.
    setMostrarPickerFecha(false);
    if (event.type === 'dismissed' || !date) {
      return;
    }
    setValorFecha(date);
    setFecha(aFechaISO(date));
  }

  async function seleccionarArchivo() {
    const resultado = await DocumentPicker.getDocumentAsync({
      // Comprobantes típicos: imágenes o PDF.
      type: ['image/*', 'application/pdf'],
      copyToCacheDirectory: true,
    });
    if (resultado.canceled) {
      return;
    }
    const archivo = resultado.assets[0];
    setArchivoUri(archivo.uri);
    setArchivoNombre(archivo.name);
    setArchivoTipo(archivo.mimeType ?? null);
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
        tipoDocumentacion: tipo,
        observacion: observacion || undefined,
        archivoUri: archivoUri ?? undefined,
        archivoNombre: archivoNombre ?? undefined,
        archivoTipo: archivoTipo ?? undefined,
      });
      // TODO: mostrar feedback de éxito y/o volver atrás.
    } catch (e) {
      console.error('[enviar justificacion]', e);
      setError('No se pudo enviar la justificación.');
    } finally {
      setEnviando(false);
    }
  }

  return {
    fecha,
    archivoNombre,
    tipo,
    observacion,
    mostrarPickerFecha,
    valorFecha,
    enviando,
    error,
    seleccionarFecha,
    onCambiarFecha,
    seleccionarArchivo,
    cambiarTipo: setTipo,
    cambiarObservacion: setObservacion,
    enviar,
  };
}
