import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import { getNotifications } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import ScreenHeader from "../components/ScreenHeader";
import { LoadingState, ErrorState, EmptyState } from "../components/DataState";

export default function NotifikasiScreen() {
  const { user } = useAuth();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!user) return;
    setError("");
    try {
      setNotifs(await getNotifications(user.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.root}>
      <ScreenHeader title="Notifikasi" />
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => { setLoading(true); load(); }} />
        ) : notifs.length === 0 ? (
          <EmptyState icon="notifications-outline" message="Tidak ada notifikasi" />
        ) : (
          notifs.map((n) => (
            <View key={n.id} style={[styles.card, n.unread && styles.unread]}>
              <View style={[styles.icon, { backgroundColor: n.color }]}>
                <Ionicons name={n.icon} size={18} color={colors.white} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{n.title}</Text>
                  {n.unread && <View style={styles.dot} />}
                </View>
                <Text style={styles.body}>{n.body}</Text>
                <Text style={styles.time}>{n.time}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
  },
  unread: { backgroundColor: "#F3F6FF" },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 14, fontWeight: "800", color: colors.textDark },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.red },
  body: { fontSize: 12, color: colors.textMuted, marginTop: 4, lineHeight: 18 },
  time: { fontSize: 11, color: colors.accentBlue, marginTop: 6, fontWeight: "600" },
});
