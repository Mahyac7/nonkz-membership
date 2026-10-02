import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Share } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";

const CODE = "NONKZ-HALO88";

export default function ReferalScreen() {
  const share = async () => {
    try {
      await Share.share({
        message: `Yuk gabung Nonkz Membership! Pakai kode referal ${CODE} dan dapatkan bonus poin. 🎉`,
      });
    } catch {
      Alert.alert("Kode referal", CODE);
    }
  };

  return (
    <View style={styles.root}>
      <ScreenHeader title="Referal" subtitle="Ajak teman, dapat poin" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <LinearGradient
          colors={[colors.bgTop, colors.bgDeep]}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="gift" size={40} color={colors.gold} />
          <Text style={styles.heroTitle}>Dapatkan 250 Poin</Text>
          <Text style={styles.heroDesc}>
            Setiap teman yang bergabung & transaksi pertama pakai kode kamu.
          </Text>

          <View style={styles.codeBox}>
            <Text style={styles.code}>{CODE}</Text>
            <Pressable onPress={() => Alert.alert("Disalin", `Kode ${CODE} disalin.`)}>
              <Ionicons name="copy-outline" size={20} color={colors.white} />
            </Pressable>
          </View>
        </LinearGradient>

        <Pressable style={styles.shareBtn} onPress={share}>
          <Ionicons name="share-social" size={18} color={colors.white} />
          <Text style={styles.shareText}>Bagikan Kode Referal</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Cara kerja</Text>
        <View style={styles.card}>
          {[
            { icon: "share-social-outline", t: "Bagikan kode referal ke teman kamu." },
            { icon: "person-add-outline", t: "Teman daftar & masukkan kode saat registrasi." },
            { icon: "cart-outline", t: "Teman melakukan transaksi pertama." },
            { icon: "pricetag-outline", t: "Kamu & teman dapat bonus poin!" },
          ].map((s, i) => (
            <View key={i} style={[styles.stepRow, i < 3 && styles.stepBorder]}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Ionicons name={s.icon} size={20} color={colors.cardBlue} />
              <Text style={styles.stepText}>{s.t}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Teman yang diajak</Text>
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Bergabung</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>1.000</Text>
            <Text style={styles.statLabel}>Poin diperoleh</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  hero: { borderRadius: radius.lg, padding: 24, alignItems: "center" },
  heroTitle: { color: colors.white, fontSize: 22, fontWeight: "900", marginTop: 10 },
  heroDesc: {
    color: colors.textLightMuted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderStyle: "dashed",
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 18,
  },
  code: { color: colors.white, fontSize: 18, fontWeight: "800", letterSpacing: 1 },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.cardBlue,
    paddingVertical: 15,
    borderRadius: radius.pill,
    marginTop: 16,
  },
  shareText: { color: colors.white, fontWeight: "800", fontSize: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: colors.textDark, marginTop: 22, marginBottom: 10 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: 16 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 },
  stepBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.cardBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: { color: colors.white, fontSize: 12, fontWeight: "800" },
  stepText: { flex: 1, fontSize: 13, color: colors.textDark },
  statsCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 20,
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, backgroundColor: colors.divider },
  statValue: { fontSize: 22, fontWeight: "900", color: colors.cardBlue },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
});
