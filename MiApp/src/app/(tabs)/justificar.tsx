import { useJustificacion } from '@/controllers/use-justificacion';
import { JustificarView } from '@/views/justificar-view';

/** Ruta "/justificar". Conecta el controller useJustificacion con la view. */
export default function JustificarScreen() {
  const {
    fecha,
    archivoNombre,
    enviando,
    error,
    seleccionarFecha,
    seleccionarArchivo,
    enviar,
  } = useJustificacion();

  return (
    <JustificarView
      fecha={fecha}
      archivoNombre={archivoNombre}
      onSeleccionarFecha={seleccionarFecha}
      onSeleccionarArchivo={seleccionarArchivo}
      onEnviar={enviar}
      enviando={enviando}
      error={error}
    />
  );
}
