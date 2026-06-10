import { useReciboPdf } from '@/controllers/use-recibo-pdf';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ReciboPdfScreen() {
  const { cargando, error } = useReciboPdf();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {error ? <Text>{error}</Text> : cargando ? <ActivityIndicator size="large" /> : null}
    </View>
  );
}
