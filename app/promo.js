import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, radius } from "../constants/theme";
import { promos } from "../constants/data";
import ScreenHeader from "../components/ScreenHeader";

export default function PromoScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScreenHeader title="Promo" subtitle="Semua promo yang tersedia" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {promos.map((p) => (
          <Pressable
            key={p.id}
            style={styles.card}
            onPress={() => router.push({ pathname: "/promo-detail", params: { id: p.id } })}
          >
            <View style={[styles.badge, { backgroundColor: p.color }]}>
              <Text style={styles.badgeText}>{p.discount}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.title}>{p.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {p.desc}
              </Text>
              <Text style={styles.expiry}>Berlaku s/d {p.expiry}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: colors.white, fontSize: 15, fontWeight: "900", textAlign: "center" },
  title: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  desc: { fontSize: 12, color: colors.textMuted, marginTop: 3 },
  expiry: { fontSize: 11, color: colors.accentBlue, marginTop: 6, fontWeight: "600" },
});
