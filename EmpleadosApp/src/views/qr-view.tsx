import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/card";
import { Hero } from "@/components/hero";
import { PrimaryButton } from "@/components/primary-button";
import { ScreenContainer } from "@/components/screen-container";
import { ThemedText } from "@/components/themed-text";
import { Radii, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { QrData } from "@/models/types";
import QRCode from "react-native-qrcode-svg";

export type QrViewProps = {
  qr: QrData | null;
  generando?: boolean;
  onGenerar: () => void;
};

/** Pantalla de generación de QR. El recuadro es un placeholder visual. */
export function QrView({ qr, generando, onGenerar }: QrViewProps) {
  const theme = useTheme();

  return (
    <ScreenContainer gap={Spacing.four}>
      <Hero center>
        <Ionicons name="qr-code-outline" size={32} color="#FFFFFF" />
        <ThemedText type="subtitle" style={styles.heroTitle}>
          Tu código QR
        </ThemedText>
        <ThemedText type="default" style={styles.heroSubtitle}>
          Mostralo en el local para registrar tu ingreso
        </ThemedText>
      </Hero>

      <View style={styles.center}>
        <Card style={styles.qrCard}>
          <View
            style={[
              styles.qrPlaceholder,
              { backgroundColor: theme.backgroundElement },
            ]}
          >
            {qr?.valor ? (
              <QRCode size={220} value={qr.valor} quietZone={16}/>
            ) : (
              <Ionicons
                name={qr ? "qr-code" : "qr-code-outline"}
                size={120}
                color={qr ? theme.text : theme.textSecondary}
              />
            )}
          </View>
          <View style={styles.qrMeta}>
            <Ionicons
              name={qr ? "checkmark-circle" : "time-outline"}
              size={16}
              color={qr ? theme.success : theme.textSecondary}
            />
            <ThemedText type="small" themeColor="textSecondary">
              {qr ? '' : "Todavía no generaste un código."}
            </ThemedText>
          </View>
        </Card>
      </View>

      <PrimaryButton
        label={qr ? "Regenerar código" : "Generar código QR"}
        iconName="refresh"
        onPress={onGenerar}
        loading={generando}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  center: {
    alignItems: "center",
  },
  qrCard: {
    alignItems: "center",
    gap: Spacing.three,
    padding: Spacing.four,
  },
  qrPlaceholder: {
    width: 240,
    height: 240,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  qrMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
  },
});
