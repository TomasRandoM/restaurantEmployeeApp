/**
 * Modelos del dominio (capa "Modelo" del MVC).
 *
 * Acá solo viven los TIPOS de datos. La obtención/persistencia real
 * (API, base de datos, etc.) la implementan ustedes en los controllers.
 */

/** Credenciales que se envían en el login. */
export interface Credenciales {
  email: string;
  password: string;
}

/** Empleado autenticado. */
export interface Empleado {
  id: string;
  nombre: string;
  email: string;
  puesto: string;
}

/** Un recibo de sueldo de un mes determinado. */
export interface Recibo {
  id: string;
  /** Mes en texto, p.ej. "JUNIO 2026". */
  periodo: string;
  /** Año y mes numéricos, útiles para ordenar. */
  anio: number;
  mes: number;
  /** URL/URI del PDF a descargar (vacío en el template). */
  archivoUrl?: string;
}

/** Justificación de inasistencia que el empleado sube. */
export interface Justificacion {
  id: string;
  /** Fecha de la inasistencia (ISO yyyy-mm-dd). */
  fecha: string;
  /** Nombre del archivo adjunto, si ya se seleccionó uno. */
  archivoNombre?: string;
}

/** Datos para generar el código QR de identificación del empleado. */
export interface QrData {
  /** Contenido que se codifica en el QR. */
  valor: string;
  /** Momento de generación (ISO), por si el QR expira. */
  generadoEn: string;
}
