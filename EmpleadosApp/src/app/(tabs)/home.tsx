import { router } from 'expo-router';

import { HomeView } from '@/views/home-view';
import { useHome } from '@/controllers/use-home';

/** Ruta "/home" → menú principal. Solo navega; sin lógica de negocio. */
export default function HomeScreen() {
  const { nombre } = useHome()
  return (
    <HomeView
      nombre={nombre}
      onGenerarQr={() => router.push('/qr')}
      onRecibos={() => router.push('/recibos')}
      onJustificar={() => router.push('/justificar')}
    />
  );
}
