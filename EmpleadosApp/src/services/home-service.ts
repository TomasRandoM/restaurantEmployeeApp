import { authService } from './index'

export const homeService = {
  async obtenerNombre(): Promise<string> {
    const name = await authService.obtenerEmpleadoName()
    if (name !== null) {
        return name;
    } else {
        return ""
    }
  },
};