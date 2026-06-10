import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { homeService } from '@/services/home-service';
import { authService } from '@/services';

export interface UseHomeResult {
  nombre: string;
  cargando: boolean;
  cerrarSesion: () => void;
}

export function useHome(): UseHomeResult {
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarNombre() {
      try {
        const name = await homeService.obtenerNombre();
        setNombre(name);
      } finally {
        setCargando(false);
      }
    }
    cargarNombre();
  }, []);

  async function cerrarSesion() {
    await authService.logout();
    router.replace('/');
  }

  return { nombre, cargando, cerrarSesion };
}
