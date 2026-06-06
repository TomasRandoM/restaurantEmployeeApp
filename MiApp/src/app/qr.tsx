import { useQrCode } from '@/controllers/use-qr-code';
import { QrView } from '@/views/qr-view';

/** Ruta "/qr" (modal). Conecta el controller useQrCode con la view. */
export default function QrScreen() {
  const { qr, generando, generar } = useQrCode();

  return <QrView qr={qr} generando={generando} onGenerar={generar} />;
}
