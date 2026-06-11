/**
 * DAO de justificaciones pendientes (capa "Modelo" del MVC).
 *
 * CRUD sobre la tabla `justificaciones_pendientes`. Devuelve y recibe
 * modelos (`JustificacionPendiente`); el SQL no sale de este archivo.
 */
import type { JustificacionPendiente } from '@/models/types';
import { getDatabase } from './database';

/** Fila cruda tal como la devuelve SQLite (snake_case, sin undefined). */
interface JustificacionPendienteRow {
  id: number;
  fecha: string;
  tipo_documentacion: string;
  observacion: string | null;
  archivo_uri: string | null;
  archivo_nombre: string | null;
  archivo_tipo: string | null;
  creada_en: string;
}

function aModelo(row: JustificacionPendienteRow): JustificacionPendiente {
  return {
    id: row.id,
    fecha: row.fecha,
    tipoDocumentacion: row.tipo_documentacion,
    observacion: row.observacion ?? undefined,
    archivoUri: row.archivo_uri ?? undefined,
    archivoNombre: row.archivo_nombre ?? undefined,
    archivoTipo: row.archivo_tipo ?? undefined,
    creadaEn: row.creada_en,
  };
}

export const justificacionesDao = {
  /** Inserta una pendiente y devuelve su id local. */
  async insertar(j: Omit<JustificacionPendiente, 'id'>): Promise<number> {
    const db = await getDatabase();
    const resultado = await db.runAsync(
      `INSERT INTO justificaciones_pendientes
        (fecha, tipo_documentacion, observacion, archivo_uri, archivo_nombre, archivo_tipo, creada_en)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        j.fecha,
        j.tipoDocumentacion,
        j.observacion ?? null,
        j.archivoUri ?? null,
        j.archivoNombre ?? null,
        j.archivoTipo ?? null,
        j.creadaEn,
      ],
    );
    return resultado.lastInsertRowId;
  },

  /** Todas las pendientes, de más vieja a más nueva (orden de reenvío). */
  async listar(): Promise<JustificacionPendiente[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<JustificacionPendienteRow>(
      'SELECT * FROM justificaciones_pendientes ORDER BY creada_en ASC',
    );
    return rows.map(aModelo);
  },

  /** Borra una pendiente (típicamente después de reenviarla con éxito). */
  async eliminar(id: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM justificaciones_pendientes WHERE id = ?', [id]);
  },
};
