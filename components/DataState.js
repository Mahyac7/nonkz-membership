import { View, Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

export function LoadingState({ color = colors.cardBlue }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Ionicons name="cloud-offline-outline" size={44} color={colors.textMuted} />
      <Text style={styles.msg}>{message || "Gagal memuat data"}</Text>
      {onRetry ? (
        <Pressable style={styles.btn} onPress={onRetry}>
          <Text style={styles.btnText}>Coba lagi</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function EmptyState({ icon = "file-tray-outline", message }) {
  return (
    <View style={styles.center}>
      <Ionicons name={icon} size={44} color={colors.textMuted} />
      <Text style={styles.msg}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40, gap: 12, minHeight: 240 },
  msg: { color: colors.textMuted, fontSize: 14, textAlign: "center" },
  btn: {
    backgroundColor: colors.cardBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.pill,
  },
  btnText: { color: colors.white, fontWeight: "700", fontSize: 13 },
});
