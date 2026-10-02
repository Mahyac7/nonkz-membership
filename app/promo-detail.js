import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { colors, radius } from "../constants/theme";
import { getPromos } from "../lib/api";
import ScreenHeader from "../components/ScreenHeader";
import { LoadingState } from "../components/DataState";

export default function PromoDetailScreen() {
  const { id } = useLocalSearchParams();
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    getPromos()
      .then((list) => setPromo(list.find((p) => p.id === id) || list[0] || null))
      .catch(() => setPromo(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !promo) {
    return (
      <View style={styles.root}>
        <ScreenHeader title="Detail Promo" />
        <LoadingState />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScreenHeader title="Detail Promo" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <LinearGradient
          colors={[promo.color, "#1b2d6b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroDiscount}>{promo.discount}</Text>
          <Text style={styles.heroTitle}>{promo.title}</Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.desc}>{promo.desc}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>Berlaku sampai {promo.expiry}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>
              Kode promo: <Text style={styles.code}>{promo.code}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Syarat & Ketentuan</Text>
          {[
            "Berlaku untuk member Nonkz aktif.",
            "Tidak dapat digabung dengan promo lain.",
            "Satu kode berlaku untuk satu transaksi.",
            "Nonkz berhak mengubah ketentuan sewaktu-waktu.",
          ].map((t, i) => (
            <View key={i} style={styles.tncRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tncText}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.claimBtn, claimed && styles.claimedBtn]}
          onPress={() => setClaimed(true)}
          disabled={claimed}
        >
          <Ionicons
            name={claimed ? "checkmark-circle" : "ticket-outline"}
            size={18}
            color={colors.white}
          />
          <Text style={styles.claimText}>{claimed ? "Promo Diklaim" : "Klaim Promo"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  hero: { borderRadius: radius.lg, padding: 24, alignItems: "center", marginBottom: 16 },
  heroDiscount: { color: colors.white, fontSize: 44, fontWeight: "900" },
  heroTitle: { color: colors.white, fontSize: 16, fontWeight: "600", marginTop: 4 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: 16, marginBottom: 14 },
  sectionTitle: { fontSize: 15, fontWeight: "800", color: colors.textDark, marginBottom: 8 },
  desc: { fontSize: 13, color: colors.textMuted, lineHeight: 20 },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: 14 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 5 },
  infoText: { fontSize: 13, color: colors.textDark },
  code: { fontWeight: "800", color: colors.cardBlue },
  tncRow: { flexDirection: "row", gap: 8, paddingVertical: 4 },
  bullet: { color: colors.textMuted, fontSize: 13 },
  tncText: { flex: 1, fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  claimBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.cardBlue,
    paddingVertical: 15,
    borderRadius: radius.pill,
  },
  claimedBtn: { backgroundColor: colors.green },
  claimText: { color: colors.white, fontWeight: "800", fontSize: 15 },
});
