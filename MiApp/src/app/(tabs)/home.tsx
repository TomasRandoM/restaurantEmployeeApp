import { router } from 'expo-router';

import { empleadoMock } from '@/models/mock';
import { HomeView } from '@/views/home-view';

/** Ruta "/home" → menú principal. Solo navega; sin lógica de negocio. */
export default function HomeScreen() {
  return (
    <HomeView
      nombre={empleadoMock.nombre}
      onGenerarQr={() => router.push('/qr')}
      onRecibos={() => router.push('/recibos')}
      onJustificar={() => router.push('/justificar')}
    />
  );
}
