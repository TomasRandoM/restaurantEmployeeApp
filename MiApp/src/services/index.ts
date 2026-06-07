/**
 * Capa de SERVICIOS (acceso a datos / lógica de negocio).
 *
 * Punto único de importación: los controllers hacen
 *   import { authService, recibosService } from '@/services';
 *
 * Regla de la capa: nada de React acá. Solo funciones async que hablan
 * con la API / el almacenamiento / el dispositivo y devuelven modelos.
 */

export * from './api-client';
export * from './auth-service';
export * from './recibos-service';
export * from './justificaciones-service';
export * from './qr-service';
