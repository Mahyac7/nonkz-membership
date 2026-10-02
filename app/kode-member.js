import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import { user } from "../constants/data";
import ScreenHeader from "../components/ScreenHeader";

// Simple deterministic faux-QR grid built from the member id (no extra deps).
function QrGrid({ seed, size = 21 }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells = [];
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    cells.push((h >> 6) & 1);
  }
  return (
    <View style={[styles.qr, { width: 220, height: 220 }]}>
      {Array.from({ length: size }).map((_, r) => (
        <View key={r} style={{ flexDirection: "row", flex: 1 }}>
          {Array.from({ length: size }).map((__, c) => {
            const i = r * size + c;
            // Finder patterns at 3 corners
            const corner =
              (r < 7 && c < 7) ||
              (r < 7 && c >= size - 7) ||
              (r >= size - 7 && c < 7);
            const on = corner
              ? (r % 6 === 0 || c % 6 === 0 || (r > 1 && r < 5 && c > 1 && c < 5))
              : cells[i];
            return (
              <View
                key={c}
                style={{ flex: 1, backgroundColor: on ? colors.textDark : colors.white }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function KodeMemberScreen() {
  return (
    <View style={styles.root}>
      <ScreenHeader title="Kode Member" />
      <View style={styles.body}>
        <View style={styles.card}>
          <View style={styles.heart}>
            <Ionicons name="heart" size={22} color={colors.white} />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.tierPill}>
            <Text style={styles.tierPillText}>Member {user.tier}</Text>
          </View>

          <View style={styles.qrWrap}>
            <QrGrid seed={user.memberId} />
          </View>

          <Text style={styles.barLabel}>Nomor Kartu</Text>
          <Text style={styles.cardNo}>{user.cardNumber}</Text>

          <Text style={styles.hint}>
            Tunjukkan kode ini ke kasir untuk mengumpulkan poin & klaim promo.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  body: { flex: 1, padding: 20, justifyContent: "center" },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  heart: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 20, fontWeight: "800", color: colors.textDark, marginTop: 12 },
  tierPill: {
    backgroundColor: "#E4EBFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: 6,
  },
  tierPillText: { color: colors.cardBlue, fontSize: 12, fontWeight: "700" },
  qrWrap: {
    marginTop: 20,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  qr: { flexDirection: "column", backgroundColor: colors.white },
  barLabel: { fontSize: 12, color: colors.textMuted, marginTop: 18 },
  cardNo: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textDark,
    letterSpacing: 2,
    marginTop: 4,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
});
