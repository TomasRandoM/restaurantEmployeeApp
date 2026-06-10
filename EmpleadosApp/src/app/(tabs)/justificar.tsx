import { useJustificacion } from '@/controllers/use-justificacion';
import { JustificarView } from '@/views/justificar-view';

/** Ruta "/justificar". Conecta el controller useJustificacion con la view. */
export default function JustificarScreen() {
  const {
    fecha,
    archivoNombre,
    tipo,
    observacion,
    mostrarPickerFecha,
    valorFecha,
    enviando,
    error,
    exito,
    seleccionarFecha,
    onCambiarFecha,
    seleccionarArchivo,
    cambiarTipo,
    cambiarObservacion,
    enviar,
  } = useJustificacion();

  return (
    <JustificarView
      fecha={fecha}
      archivoNombre={archivoNombre}
      tipo={tipo}
      observacion={observacion}
      mostrarPickerFecha={mostrarPickerFecha}
      valorFecha={valorFecha}
      onSeleccionarFecha={seleccionarFecha}
      onCambiarFecha={onCambiarFecha}
      onSeleccionarArchivo={seleccionarArchivo}
      onCambiarTipo={cambiarTipo}
      onCambiarObservacion={cambiarObservacion}
      onEnviar={enviar}
      enviando={enviando}
      error={error}
      exito={exito}
    />
  );
}
