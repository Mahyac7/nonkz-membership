import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, radius } from "../constants/theme";
import { quickActions } from "../constants/data";

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      {quickActions.map((a) => (
        <Pressable
          key={a.key}
          style={styles.item}
          onPress={() => router.push(a.route)}
          android_ripple={{ color: "rgba(0,0,0,0.05)", borderless: true }}
        >
          <View style={[styles.iconWrap, { backgroundColor: a.color }]}>
            <Ionicons name={a.icon} size={22} color={colors.white} />
          </View>
          <Text style={styles.label}>{a.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginTop: -24,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  item: { alignItems: "center", flex: 1 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { fontSize: 11, color: colors.textDark, marginTop: 8, fontWeight: "600" },
});
