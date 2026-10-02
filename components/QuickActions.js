import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

const ACTIONS = [
  { key: "promo", label: "Promo", icon: "pricetags", color: colors.red },
  { key: "tukar", label: "Tukar Poin", icon: "gift", color: colors.gold },
  { key: "voucher", label: "Voucher", icon: "checkbox", color: colors.purple },
  { key: "outlet", label: "Outlet", icon: "storefront", color: colors.green },
  { key: "referal", label: "Referal", icon: "person-add", color: colors.accentBlue },
];

export default function QuickActions() {
  return (
    <View style={styles.card}>
      {ACTIONS.map((a) => (
        <Pressable key={a.key} style={styles.item}>
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
