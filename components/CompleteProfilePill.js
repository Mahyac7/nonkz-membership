import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

export default function CompleteProfilePill() {
  return (
    <View style={styles.wrap}>
      <Pressable style={styles.close}>
        <Ionicons name="close" size={14} color={colors.textMuted} />
      </Pressable>

      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name="person-circle" size={26} color={colors.gold} />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.title}>Lengkapi profil</Text>
            <View style={styles.pct}>
              <Text style={styles.pctText}>75%</Text>
            </View>
          </View>
          <Text style={styles.sub}>2 data lagi, dapat reward</Text>
        </View>

        <Pressable style={styles.arrow}>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.pillYellow,
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 16,
  },
  close: { position: "absolute", top: 10, right: 10, zIndex: 2 },
  row: { flexDirection: "row", alignItems: "center" },
  iconWrap: { alignItems: "center", justifyContent: "center" },
  title: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  pct: {
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  pctText: { color: colors.white, fontSize: 11, fontWeight: "800" },
  sub: { fontSize: 12, color: "#9A7B2E", marginTop: 3 },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
