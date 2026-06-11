/**
 * Servicio del código QR de identificación del empleado.
 */

import { QRKey, type QrData } from '@/models/types';
import { apiRequest } from './api-client';
import * as SecureStore from 'expo-secure-store';
import { authService } from './auth-service'

export const qrService = {
  /** Pide/genera el valor a codificar en el QR del empleado. */
  async generar(): Promise<QrData> {
    const key = await this.getQRKey()
    const employeeId = await authService.obtenerEmpleadoId();
    return { valor: key + "," + employeeId, };
  },

  async updateQRKey(empleadoId: string): Promise<boolean> {
    const res = await apiRequest<QRKey>(`/api/v1/qr/${empleadoId}`, {
      method: "GET",
    })
    await SecureStore.setItemAsync("QRKEY", res.qrKey)
    return true;
  },

  async getQRKey(): Promise<string|null> {
    return await SecureStore.getItemAsync("QRKEY")  
  }
};
