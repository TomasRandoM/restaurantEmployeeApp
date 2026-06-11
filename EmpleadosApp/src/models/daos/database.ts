/**
 * Conexión a la base SQLite local (capa "Modelo" del MVC: DAOs).
 *
 * Singleton: la primera llamada abre la base y crea las tablas; las
 * siguientes reutilizan la misma conexión. Los DAOs son el ÚNICO lugar
 * que conoce SQL; los services les piden/entregan modelos.
 */
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

async function crearTablas(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS justificaciones_pendientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha TEXT NOT NULL,
      tipo_documentacion TEXT NOT NULL,
      observacion TEXT,
      archivo_uri TEXT,
      archivo_nombre TEXT,
      archivo_tipo TEXT,
      creada_en TEXT NOT NULL
    );
  `);
}

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('empleados.db');
    await crearTablas(db);
  }
  return db;
}
