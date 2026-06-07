/**
 * Datos MOCK para que la interfaz se vea poblada en el template.
 *
 * Los consume la capa de SERVICIOS (src/services) como "backend falso".
 * Ustedes reemplazan eso por datos reales (fetch a la API) dentro de los
 * services. Nada de esto es lógica de negocio: son solo ejemplos para maquetar.
 */

import type { Empleado, Recibo } from '@/models/types';

export const empleadoMock: Empleado = {
  id: 'emp-001',
  nombre: 'Camila Fernández',
  email: 'camila@restaurante.com',
  puesto: 'Moza',
};

export const recibosMock: Recibo[] = [
  { id: 'rec-2026-06', periodo: 'JUNIO 2026', anio: 2026, mes: 6 },
  { id: 'rec-2026-05', periodo: 'MAYO 2026', anio: 2026, mes: 5 },
  { id: 'rec-2026-04', periodo: 'ABRIL 2026', anio: 2026, mes: 4 },
  { id: 'rec-2026-03', periodo: 'MARZO 2026', anio: 2026, mes: 3 },
  { id: 'rec-2026-02', periodo: 'FEBRERO 2026', anio: 2026, mes: 2 },
  { id: 'rec-2026-01', periodo: 'ENERO 2026', anio: 2026, mes: 1 },
];
