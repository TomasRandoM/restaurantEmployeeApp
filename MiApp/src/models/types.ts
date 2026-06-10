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
}

/** Un recibo de sueldo de un mes determinado. */
export type Recibo = {
  id: string;
  mesPago: number;   // 1–12
  anioPago: number;  // ej: 2026
};

/** Tipo de comprobante adjunto a una justificación. */
export type TipoJustificacion = 'CERTIFICADO' | 'OTRO';

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
}

export interface AuthToken {
  accessToken: string;
}

export interface QRKey {
  qrKey: string
}
