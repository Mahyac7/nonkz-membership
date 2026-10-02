import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import { getVouchers } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import ScreenHeader from "../components/ScreenHeader";
import { LoadingState, ErrorState, EmptyState } from "../components/DataState";

export default function VoucherScreen() {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!user) return;
    setError("");
    try {
      setVouchers(await getVouchers(user.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const activeCount = vouchers.filter((v) => v.status === "active").length;

  return (
    <View style={styles.root}>
      <ScreenHeader title="Voucher Saya" subtitle={`${activeCount} voucher aktif`} />
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => { setLoading(true); load(); }} />
        ) : vouchers.length === 0 ? (
          <EmptyState icon="ticket-outline" message="Belum ada voucher" />
        ) : (
          vouchers.map((v) => {
          const used = v.status === "used";
          return (
            <View key={v.id} style={[styles.ticket, used && styles.ticketUsed]}>
              <View style={[styles.left, { backgroundColor: v.color }]}>
                <Ionicons name="ticket" size={26} color={colors.white} />
                <View style={[styles.notchTop]} />
                <View style={[styles.notchBottom]} />
              </View>
              <View style={styles.right}>
                <Text style={[styles.title, used && styles.dim]}>{v.title}</Text>
                <Text style={styles.desc}>{v.desc}</Text>
                <Text style={styles.expiry}>Berlaku s/d {v.expiry}</Text>
              </View>
              <Pressable
                style={[styles.useBtn, used && styles.useBtnDisabled]}
                disabled={used}
                onPress={() => Alert.alert("Voucher dipakai", `${v.title} siap digunakan saat checkout.`)}
              >
                <Text style={[styles.useText, used && styles.useTextDim]}>
                  {used ? "Terpakai" : "Pakai"}
                </Text>
              </Pressable>
            </View>
          );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  ticket: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginBottom: 14,
    overflow: "hidden",
  },
  ticketUsed: { opacity: 0.6 },
  left: {
    width: 70,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notchTop: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.screen,
  },
  notchBottom: {
    position: "absolute",
    bottom: -8,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.screen,
  },
  right: { flex: 1, paddingHorizontal: 14 },
  title: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  dim: { color: colors.textMuted },
  desc: { fontSize: 12, color: colors.textMuted, marginTop: 3 },
  expiry: { fontSize: 11, color: colors.accentBlue, marginTop: 6, fontWeight: "600" },
  useBtn: {
    backgroundColor: colors.cardBlue,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
    marginRight: 12,
  },
  useBtnDisabled: { backgroundColor: colors.divider },
  useText: { color: colors.white, fontWeight: "700", fontSize: 13 },
  useTextDim: { color: colors.textMuted },
});
