import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import { getOutlets } from "../lib/api";
import ScreenHeader from "../components/ScreenHeader";
import { LoadingState, ErrorState, EmptyState } from "../components/DataState";

export default function OutletScreen() {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      setOutlets(await getOutlets());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.root}>
      <ScreenHeader title="Outlet" subtitle={`${outlets.length} outlet terdekat`} />
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => { setLoading(true); load(); }} />
        ) : outlets.length === 0 ? (
          <EmptyState icon="storefront-outline" message="Belum ada outlet" />
        ) : (
          outlets.map((o) => (
          <View key={o.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.pin}>
                <Ionicons name="location" size={20} color={colors.white} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name}>{o.name}</Text>
                <Text style={styles.addr}>{o.address}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.meta}>
                <Ionicons name="navigate-outline" size={14} color={colors.textMuted} />
                <Text style={styles.metaText}>{o.distance}</Text>
              </View>
              <View style={styles.meta}>
                <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                <Text style={styles.metaText}>{o.hours}</Text>
              </View>
              <View style={[styles.statusPill, { backgroundColor: o.open ? "#E3F6EF" : "#FDE7E9" }]}>
                <Text style={[styles.statusText, { color: o.open ? colors.green : colors.red }]}>
                  {o.open ? "Buka" : "Tutup"}
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.dirBtn}
              onPress={() => Alert.alert("Rute", `Membuka rute ke ${o.name}.`)}
            >
              <Ionicons name="navigate" size={16} color={colors.cardBlue} />
              <Text style={styles.dirText}>Lihat Rute</Text>
            </Pressable>
          </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: 14, marginBottom: 14 },
  row: { flexDirection: "row", alignItems: "center" },
  pin: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.cardBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 15, fontWeight: "800", color: colors.textDark },
  addr: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 12 },
  meta: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: colors.textMuted },
  statusPill: { marginLeft: "auto", paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  statusText: { fontSize: 11, fontWeight: "700" },
  dirBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: "#E4EBFF",
  },
  dirText: { color: colors.cardBlue, fontWeight: "700", fontSize: 13 },
});
