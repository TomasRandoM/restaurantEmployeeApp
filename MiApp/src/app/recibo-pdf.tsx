import { API_BASE_URL, authService } from '@/services';
import * as FileSystem from 'expo-file-system/legacy';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ReciboPdfScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        console.log('no hay id');
        return;
    }
    (async () => {
        try {
        console.log('obteniendo token...');
        const token = await authService.obtenerToken();
        console.log('token:', token);

        const uri = `${API_BASE_URL}/api/v1/reciboDeSueldo/pdf/${id}`;
        console.log('descargando:', uri);

        const destino = `${FileSystem.cacheDirectory!}recibo-${id}.pdf`;
        const { uri: archivoLocal } = await FileSystem.downloadAsync(uri, destino, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('descargado en:', archivoLocal);

        await Sharing.shareAsync(archivoLocal, {
            mimeType: 'application/pdf',
            dialogTitle: 'Abrir recibo',
        });
        } catch (e) {
        console.log('error:', e);
        setError('No se pudo descargar el recibo.');
        }
    })();
    }, [id]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {error ? <Text>{error}</Text> : <ActivityIndicator size="large" />}
    </View>
  );
}