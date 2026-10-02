import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, radius } from "../constants/theme";
import { user } from "../constants/data";

export default function TopHeader() {
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.avatar} onPress={() => router.push("/(tabs)/profile")}>
        <Text style={styles.avatarText}>{user.initial}</Text>
      </Pressable>

      <View style={styles.brand}>
        <Ionicons name="add" size={18} color={colors.red} />
        <Text style={styles.brandText}>Nonkz</Text>
        <View style={styles.brandDrop} />
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.iconBtn} onPress={() => router.push("/notifikasi")}>
          <Ionicons name="notifications-outline" size={20} color={colors.white} />
          <View style={styles.badge} />
        </Pressable>
        <Pressable style={styles.iconBtn} onPress={() => router.push("/(tabs)/profile")}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.white, fontWeight: "700", fontSize: 16 },
  brand: { flexDirection: "row", alignItems: "center" },
  brandText: { color: colors.white, fontWeight: "800", fontSize: 20, letterSpacing: 0.2 },
  brandDrop: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
    marginLeft: 2,
    marginTop: 6,
  },
  actions: { flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
  },
});
