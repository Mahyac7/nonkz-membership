import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";

const NOTIFS = [
  {
    id: "n1",
    icon: "pricetags",
    color: colors.red,
    title: "Promo Ube Series!",
    body: "Beli 1 gratis 1 untuk semua menu Ube Series. Berlaku sampai 20 Okt.",
    time: "2 jam lalu",
    unread: true,
  },
  {
    id: "n2",
    icon: "pricetag",
    color: colors.gold,
    title: "Poin bertambah",
    body: "Kamu mendapat +78 poin dari transaksi di Nonkz Senayan.",
    time: "1 hari lalu",
    unread: true,
  },
  {
    id: "n3",
    icon: "gift",
    color: colors.purple,
    title: "Bonus referal masuk",
    body: "Teman kamu bergabung! +250 poin ditambahkan ke saldo.",
    time: "3 hari lalu",
    unread: false,
  },
  {
    id: "n4",
    icon: "heart",
    color: colors.cardBlue,
    title: "Selamat datang di Nonkz!",
    body: "Lengkapi profil kamu untuk mendapatkan reward spesial.",
    time: "5 hari lalu",
    unread: false,
  },
];

export default function NotifikasiScreen() {
  return (
    <View style={styles.root}>
      <ScreenHeader title="Notifikasi" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {NOTIFS.map((n) => (
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
        ))}
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
