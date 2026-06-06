import { useRecibos } from '@/controllers/use-recibos';
import { RecibosView } from '@/views/recibos-view';

/** Ruta "/recibos". Conecta el controller useRecibos con la view. */
export default function RecibosScreen() {
  const { recibos, cargando, error, descargar } = useRecibos();

  return (
    <RecibosView recibos={recibos} onDescargar={descargar} loading={cargando} error={error} />
  );
}
