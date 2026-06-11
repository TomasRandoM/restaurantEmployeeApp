/**
 * Servicio de autenticación.
 *
 * Define las operaciones de login, sesión y logout. El controller `use-auth`
 * solo llama a estas funciones.
 */

import type { AuthToken, Credenciales, Empleado } from "@/models/types";
import * as SecureStore from "expo-secure-store";
import { ApiError, apiRequest } from "./api-client";
import { qrService } from "./qr-service";
import { justificacionesService } from "./justificaciones-service";

export const authService = {
  async login(credenciales: Credenciales): Promise<Empleado> {
    try {
      const token = await apiRequest<AuthToken>("/login", {
        method: "POST",
        body: JSON.stringify(credenciales),
        headers: { "Content-Type": "application/json" },
      });
      await SecureStore.setItemAsync("EMPLEADO_TOKEN", token.accessToken);

      const empleado = await apiRequest<Empleado>(
        `/api/v1/empleado/email/${credenciales.email}`,
        { method: "GET" },
      );
      await SecureStore.setItemAsync("EMPLEADO_NAME", empleado.nombre);
      await SecureStore.setItemAsync("EMPLEADO_ID", empleado.id);
      await SecureStore.setItemAsync("EMPLEADO_EMAIL", credenciales.email);
      await qrService.updateQRKey(empleado.id);
      justificacionesService.reenviarPendientes();
      return empleado;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          throw new ApiError("Usuario o contraseña incorrectos", 401);
        }
        throw error;
      }
      throw new ApiError("No se pudo conectar con el servidor");
    }
  },

  async obtenerToken(): Promise<string | null> {
    return SecureStore.getItemAsync("EMPLEADO_TOKEN");
  },

  async obtenerEmpleadoId(): Promise<string | null> {
    return SecureStore.getItemAsync("EMPLEADO_ID");
  },

  async obtenerEmpleadoName(): Promise<string | null> {
    return SecureStore.getItemAsync("EMPLEADO_NAME");
  },

  async obtenerSesion(): Promise<Empleado | null> {
    const res = await SecureStore.getItemAsync("EMPLEADO_TOKEN");
    if (res != null) {
      const empleadoId = await SecureStore.getItemAsync("EMPLEADO_ID");
      if (empleadoId != null) {
        try {
          await qrService.updateQRKey(empleadoId);
          justificacionesService.reenviarPendientes();
          const name = await SecureStore.getItemAsync("EMPLEADO_NAME");
          const id = await SecureStore.getItemAsync("EMPLEADO_ID");
          if (id !== null && name !== null) {
            const empleado: Empleado = { id, nombre: name };
            return empleado;
          }
        } catch (error) {
          if (error instanceof ApiError && error.status === 403) {
            await this.logout();
            return null;
          }
        }
      }
      return null;
    } else {
      return null;
    }
  },

  /** Cierra la sesión y limpia el almacenamiento. */
  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync("EMPLEADO_NAME");
    await SecureStore.deleteItemAsync("EMPLEADO_TOKEN");
    await SecureStore.deleteItemAsync("EMPLEADO_EMAIL");
    await SecureStore.deleteItemAsync("EMPLEADO_ID");
  },
};
