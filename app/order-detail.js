import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { colors, radius } from "../constants/theme";
import { orders, formatRupiah } from "../constants/data";
import ScreenHeader from "../components/ScreenHeader";

const STATUS_STYLE = {
  selesai: { bg: "#E3F6EF", fg: colors.green, label: "Selesai" },
  diproses: { bg: "#FFF3D6", fg: "#B07D14", label: "Diproses" },
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id === id) || orders[0];
  const s = STATUS_STYLE[order.status];
  const subtotal = order.items.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <View style={styles.root}>
      <ScreenHeader title="Detail Pesanan" subtitle={order.id} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.statusCard}>
          <View style={[styles.statusIcon, { backgroundColor: s.fg }]}>
            <Ionicons
              name={order.status === "selesai" ? "checkmark" : "time"}
              size={22}
              color={colors.white}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.statusLabel}>{s.label}</Text>
            <Text style={styles.statusDate}>{order.date}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="storefront-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>{order.outlet}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="receipt-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>{order.id}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Item Pesanan</Text>
        <View style={styles.card}>
          {order.items.map((it, i) => (
            <View
              key={i}
              style={[styles.itemRow, i < order.items.length - 1 && styles.itemBorder]}
            >
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{it.qty}x</Text>
              </View>
              <Text style={styles.itemName}>{it.name}</Text>
              <Text style={styles.itemPrice}>{formatRupiah(it.price * it.qty)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Subtotal</Text>
            <Text style={styles.sumValue}>{formatRupiah(subtotal)}</Text>
          </View>
          <View style={styles.sumRow}>
            <Text style={styles.sumLabel}>Biaya layanan</Text>
            <Text style={styles.sumValue}>{formatRupiah(order.total - subtotal)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.sumRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatRupiah(order.total)}</Text>
          </View>
          <View style={styles.pointRow}>
            <Ionicons name="pricetag" size={14} color={colors.gold} />
            <Text style={styles.pointText}>
              +{Math.round(order.total / 1000)} poin dari pesanan ini
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 14,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  statusLabel: { fontSize: 16, fontWeight: "800", color: colors.textDark },
  statusDate: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: 16, marginBottom: 14 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 5 },
  infoText: { fontSize: 13, color: colors.textDark },
  sectionTitle: { fontSize: 15, fontWeight: "800", color: colors.textDark, marginBottom: 10 },
  itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  itemBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  qtyBox: {
    backgroundColor: "#E4EBFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 10,
  },
  qtyText: { color: colors.cardBlue, fontWeight: "800", fontSize: 12 },
  itemName: { flex: 1, fontSize: 13, color: colors.textDark },
  itemPrice: { fontSize: 13, fontWeight: "700", color: colors.textDark },
  sumRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  sumLabel: { fontSize: 13, color: colors.textMuted },
  sumValue: { fontSize: 13, color: colors.textDark, fontWeight: "600" },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: 8 },
  totalLabel: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  totalValue: { fontSize: 16, fontWeight: "900", color: colors.cardBlue },
  pointRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  pointText: { fontSize: 12, color: colors.textMuted, fontWeight: "600" },
});
