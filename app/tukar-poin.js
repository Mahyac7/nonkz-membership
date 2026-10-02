import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import { getRewards, redeemReward } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import ScreenHeader from "../components/ScreenHeader";
import { LoadingState, ErrorState } from "../components/DataState";

export default function TukarPoinScreen() {
  const { user, profile, refreshProfile } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);

  const points = profile?.points ?? 0;

  const load = useCallback(async () => {
    setError("");
    try {
      setRewards(await getRewards());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const redeem = async (r) => {
    if (points < r.cost) {
      Alert.alert("Poin kurang", `Butuh ${r.cost} poin untuk menukar ${r.name}.`);
      return;
    }
    setBusy(r.id);
    try {
      await redeemReward(user.id, r, points);
      await refreshProfile();
      Alert.alert("Berhasil", `Kamu menukar ${r.cost} poin dengan ${r.name}.`);
    } catch (e) {
      Alert.alert("Gagal", e.message || "Terjadi kesalahan.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <View style={styles.root}>
      <ScreenHeader
        title="Tukar Poin"
        subtitle={`Saldo: ${points.toLocaleString("id-ID")} poin`}
        right={
          <View style={styles.pointPill}>
            <Ionicons name="pricetag" size={13} color={colors.white} />
            <Text style={styles.pointPillText}>{points.toLocaleString("id-ID")}</Text>
          </View>
        }
      />

      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => { setLoading(true); load(); }} />
        ) : (
          <View style={styles.grid}>
            {rewards.map((r) => {
              const enough = points >= r.cost;
              return (
                <View key={r.id} style={styles.card}>
                  <View style={styles.iconWrap}>
                    <Ionicons name={r.icon} size={26} color={colors.cardBlue} />
                  </View>
                  <Text style={styles.name} numberOfLines={2}>
                    {r.name}
                  </Text>
                  <View style={styles.costRow}>
                    <Ionicons name="pricetag" size={12} color={colors.gold} />
                    <Text style={styles.cost}>{r.cost.toLocaleString("id-ID")}</Text>
                  </View>
                  <Pressable
                    style={[styles.btn, (!enough || busy === r.id) && styles.btnDisabled]}
                    onPress={() => redeem(r)}
                    disabled={!enough || busy === r.id}
                  >
                    <Text style={[styles.btnText, !enough && styles.btnTextDisabled]}>
                      {busy === r.id ? "..." : enough ? "Tukar" : "Kurang"}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  pointPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
  pointPillText: { color: colors.white, fontWeight: "800", fontSize: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: "#E4EBFF",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
    marginTop: 10,
    minHeight: 34,
  },
  costRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  cost: { fontSize: 14, fontWeight: "800", color: colors.textDark },
  btn: {
    marginTop: 10,
    backgroundColor: colors.cardBlue,
    paddingVertical: 8,
    borderRadius: radius.pill,
    width: "100%",
    alignItems: "center",
  },
  btnDisabled: { backgroundColor: colors.divider },
  btnText: { color: colors.white, fontWeight: "700", fontSize: 13 },
  btnTextDisabled: { color: colors.textMuted },
});
