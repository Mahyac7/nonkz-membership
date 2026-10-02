import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../../constants/theme";
import { orders, formatRupiah } from "../../constants/data";

const TABS = [
  { key: "semua", label: "Semua" },
  { key: "diproses", label: "Diproses" },
  { key: "selesai", label: "Selesai" },
];

const STATUS_STYLE = {
  selesai: { bg: "#E3F6EF", fg: colors.green, label: "Selesai" },
  diproses: { bg: "#FFF3D6", fg: "#B07D14", label: "Diproses" },
};

export default function OrderScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState("semua");

  const list = tab === "semua" ? orders : orders.filter((o) => o.status === tab);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
        <View style={styles.tabs}>
          {TABS.map((t) => (
            <Pressable
              key={t.key}
              style={[styles.tab, tab === t.key && styles.tabActive]}
              onPress={() => setTab(t.key)}
            >
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 90 }}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Belum ada pesanan di kategori ini</Text>
          </View>
        ) : (
          list.map((o) => {
            const s = STATUS_STYLE[o.status];
            return (
              <Pressable
                key={o.id}
                style={styles.card}
                onPress={() => router.push({ pathname: "/order-detail", params: { id: o.id } })}
              >
                <View style={styles.cardTop}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <View style={styles.outletIcon}>
                      <Ionicons name="cafe" size={16} color={colors.white} />
                    </View>
                    <View>
                      <Text style={styles.orderId}>{o.id}</Text>
                      <Text style={styles.orderDate}>{o.date}</Text>
                    </View>
                  </View>
                  <View style={[styles.badge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.badgeText, { color: s.fg }]}>{s.label}</Text>
                  </View>
                </View>

                <Text style={styles.outlet}>{o.outlet}</Text>
                <Text style={styles.itemsLine} numberOfLines={1}>
                  {o.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                </Text>

                <View style={styles.cardBottom}>
                  <Text style={styles.total}>{formatRupiah(o.total)}</Text>
                  <View style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>Lihat detail</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.accentBlue} />
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: colors.textDark },
  tabs: { flexDirection: "row", gap: 8, marginTop: 14 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.screen,
  },
  tabActive: { backgroundColor: colors.tabActive },
  tabText: { fontSize: 13, fontWeight: "600", color: colors.textMuted },
  tabTextActive: { color: colors.white },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  outletIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.cardBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  orderId: { fontSize: 13, fontWeight: "700", color: colors.textDark },
  orderDate: { fontSize: 11, color: colors.textMuted },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  badgeText: { fontSize: 11, fontWeight: "700" },
  outlet: { fontSize: 13, color: colors.textDark, fontWeight: "600", marginTop: 12 },
  itemsLine: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  total: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  detailBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  detailBtnText: { fontSize: 13, color: colors.accentBlue, fontWeight: "700" },
  empty: { alignItems: "center", marginTop: 80, gap: 12 },
  emptyText: { color: colors.textMuted, fontSize: 14 },
});
