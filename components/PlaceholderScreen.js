import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

export default function PlaceholderScreen({ title, icon }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={40} color={colors.accentBlue} />
        </View>
        <Text style={styles.msg}>Halaman {title}</Text>
        <Text style={styles.sub}>Konten segera hadir</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  header: { paddingHorizontal: 18, paddingBottom: 10 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: colors.textDark },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E4EBFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  msg: { fontSize: 17, fontWeight: "700", color: colors.textDark },
  sub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
});
