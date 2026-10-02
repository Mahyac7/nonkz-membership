import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../../constants/theme";
import { user, tierBenefits, pointHistory, formatRupiah } from "../../constants/data";

export default function MemberScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: 90 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[colors.bgTop, colors.bgDeep]}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <Text style={styles.headerTitle}>Membership</Text>

        {/* Tier card */}
        <View style={styles.tierCard}>
          <View style={styles.tierRow}>
            <View style={styles.heart}>
              <Ionicons name="heart" size={22} color={colors.white} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.tierLabel}>MEMBER TIER</Text>
              <Text style={styles.tierName}>{user.tier}</Text>
            </View>
            <Pressable style={styles.qrBtn} onPress={() => router.push("/kode-member")}>
              <Ionicons name="qr-code" size={22} color={colors.cardBlue} />
            </Pressable>
          </View>

          <View style={styles.levelRow}>
            <Text style={styles.levelText}>{user.tier}</Text>
            <Text style={styles.levelText}>{user.nextTier}</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${user.tierProgress * 100}%` }]} />
          </View>
          <Text style={styles.progressNote}>
            Belanja {formatRupiah(user.spendToNextLevel)} lagi untuk naik ke {user.nextTier}
          </Text>
          <Text style={styles.cardNo}>{user.cardNumber}</Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Points balance */}
        <Pressable style={styles.pointsCard} onPress={() => router.push("/tukar-poin")}>
          <View style={styles.coin}>
            <Ionicons name="pricetag" size={18} color={colors.white} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.pointsLabel}>Saldo poin kamu</Text>
            <Text style={styles.pointsValue}>{user.points.toLocaleString("id-ID")} poin</Text>
          </View>
          <View style={styles.tukarBtn}>
            <Text style={styles.tukarBtnText}>Tukar</Text>
          </View>
        </Pressable>

        {/* Benefits */}
        <Text style={styles.sectionTitle}>Benefit {user.tier}</Text>
        <View style={styles.card}>
          {tierBenefits[user.tier].map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={18} color={colors.green} />
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Benefit {user.nextTier} (naik level)</Text>
        <View style={styles.card}>
          {tierBenefits[user.nextTier].map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Ionicons name="star" size={16} color={colors.gold} />
              <Text style={[styles.benefitText, { color: colors.textMuted }]}>{b}</Text>
            </View>
          ))}
        </View>

        {/* Point history */}
        <Text style={styles.sectionTitle}>Riwayat Poin</Text>
        <View style={styles.card}>
          {pointHistory.map((h, i) => (
            <View
              key={h.id}
              style={[
                styles.histRow,
                i < pointHistory.length - 1 && styles.histBorder,
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.histLabel}>{h.label}</Text>
                <Text style={styles.histDate}>{h.date}</Text>
              </View>
              <Text style={[styles.histAmt, { color: h.amount > 0 ? colors.green : colors.red }]}>
                {h.amount > 0 ? "+" : ""}
                {h.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  header: { paddingHorizontal: 18, paddingBottom: 40 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: colors.white },
  tierCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 16,
  },
  tierRow: { flexDirection: "row", alignItems: "center" },
  heart: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  tierLabel: { color: colors.textLightMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  tierName: { color: colors.white, fontSize: 22, fontWeight: "800" },
  qrBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  levelRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 },
  levelText: { color: colors.white, fontSize: 12, fontWeight: "600" },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginTop: 8,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 3, backgroundColor: colors.gold },
  progressNote: { color: colors.textLightMuted, fontSize: 12, marginTop: 10 },
  cardNo: { color: colors.white, fontSize: 13, fontWeight: "600", letterSpacing: 1, marginTop: 10 },
  body: { paddingHorizontal: 16, marginTop: -24 },
  pointsCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  coin: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsLabel: { fontSize: 12, color: colors.textMuted },
  pointsValue: { fontSize: 20, fontWeight: "800", color: colors.textDark, marginTop: 2 },
  tukarBtn: {
    backgroundColor: colors.cardBlue,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
  },
  tukarBtnText: { color: colors.white, fontWeight: "700", fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: colors.textDark, marginTop: 22, marginBottom: 10 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: 16 },
  benefitRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 7 },
  benefitText: { fontSize: 13, color: colors.textDark, flex: 1 },
  histRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  histBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  histLabel: { fontSize: 13, color: colors.textDark, fontWeight: "600" },
  histDate: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  histAmt: { fontSize: 15, fontWeight: "800" },
});
