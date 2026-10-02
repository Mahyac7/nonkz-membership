import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

export default function MembershipCard() {
  return (
    <LinearGradient
      colors={["#3A61E0", "#2342BE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.memberLeft}>
          <View style={styles.heartCircle}>
            <Ionicons name="heart" size={20} color={colors.white} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.memberLabel}>MEMBER</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.memberTier}>Classic</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.white} />
            </View>
          </View>
        </View>

        <Pressable style={styles.codeBtn}>
          <Ionicons name="qr-code-outline" size={16} color={colors.cardBlue} />
          <Text style={styles.codeBtnText}>Kode Member</Text>
        </Pressable>
      </View>

      {/* Points + coupon */}
      <View style={styles.pointsRow}>
        <View>
          <Text style={styles.pointsLabel}>Saldo poin</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            <View style={styles.coin}>
              <Ionicons name="pricetag" size={12} color={colors.white} />
            </View>
            <Text style={styles.pointsValue}>0</Text>
          </View>
        </View>

        <Pressable style={styles.couponPill}>
          <Ionicons name="ticket-outline" size={14} color={colors.white} />
          <Text style={styles.couponText}>3 kupon</Text>
        </Pressable>
      </View>

      {/* Progress */}
      <View style={styles.levelRow}>
        <Text style={styles.levelText}>Classic</Text>
        <Text style={styles.levelText}>Signature</Text>
      </View>
      <View style={styles.track}>
        <View style={styles.fill} />
      </View>
      <Text style={styles.progressNote}>Belanja Rp 800.000 lagi untuk naik level</Text>

      {/* Card number */}
      <View style={styles.numberRow}>
        <Text style={styles.cardNumber}>NKZ 8235 4860 208</Text>
        <View style={styles.brandMini}>
          <Ionicons name="add" size={12} color={colors.red} />
          <Text style={styles.brandMiniText}>Nonkz</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 18,
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  memberLeft: { flexDirection: "row", alignItems: "center" },
  heartCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  memberLabel: { color: colors.textLightMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  memberTier: { color: colors.white, fontSize: 20, fontWeight: "800" },
  codeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
  },
  codeBtnText: { color: colors.cardBlue, fontWeight: "700", fontSize: 13 },
  pointsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 18,
  },
  pointsLabel: { color: colors.textLightMuted, fontSize: 13 },
  coin: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  pointsValue: { color: colors.white, fontSize: 26, fontWeight: "800" },
  couponPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  couponText: { color: colors.white, fontWeight: "700", fontSize: 13 },
  levelRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  levelText: { color: colors.white, fontSize: 12, fontWeight: "600" },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginTop: 8,
    overflow: "hidden",
  },
  fill: { width: "28%", height: "100%", borderRadius: 3, backgroundColor: colors.gold },
  progressNote: { color: colors.textLightMuted, fontSize: 12, marginTop: 10 },
  numberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cardNumber: { color: colors.white, fontSize: 13, fontWeight: "600", letterSpacing: 1 },
  brandMini: { flexDirection: "row", alignItems: "center" },
  brandMiniText: { color: colors.white, fontWeight: "800", fontSize: 13 },
});
