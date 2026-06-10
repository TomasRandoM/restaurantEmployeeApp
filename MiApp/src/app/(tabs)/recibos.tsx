import { useRecibos } from '@/controllers/use-recibos';
import { RecibosView } from '@/views/recibos-view';

export default function RecibosScreen() {
  const { recibos, cargando, error, verPdf } = useRecibos();
  return (
    <RecibosView
      recibos={recibos}
      onVerPdf={verPdf}
      loading={cargando}
      error={error}
    />
  );
}
