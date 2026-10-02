import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../../constants/theme";
import { useAuth } from "../../lib/AuthContext";

const MENU = [
  { icon: "person-outline", label: "Edit Profil", route: "/edit-profile", color: colors.cardBlue },
  { icon: "qr-code-outline", label: "Kode Member", route: "/kode-member", color: colors.purple },
  { icon: "ticket-outline", label: "Voucher Saya", route: "/voucher", color: colors.green },
  { icon: "gift-outline", label: "Tukar Poin", route: "/tukar-poin", color: colors.gold },
  { icon: "storefront-outline", label: "Outlet", route: "/outlet", color: colors.red },
  { icon: "person-add-outline", label: "Referal", route: "/referal", color: colors.accentBlue },
  { icon: "notifications-outline", label: "Notifikasi", route: "/notifikasi", color: colors.orange },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const user = profile ?? {
    name: "Member",
    initial: "M",
    phone: "",
    tier: "Classic",
    points: 0,
    coupons: 0,
    joined: "-",
  };

  const logout = () =>
    Alert.alert("Keluar", "Yakin ingin keluar dari akun?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: () => signOut() },
    ]);

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
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initial}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
            <View style={styles.tierPill}>
              <Ionicons name="heart" size={11} color={colors.white} />
              <Text style={styles.tierPillText}>Member {user.tier}</Text>
            </View>
          </View>
          <Pressable style={styles.editBtn} onPress={() => router.push("/edit-profile")}>
            <Ionicons name="create-outline" size={18} color={colors.white} />
          </Pressable>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Stats */}
        <View style={styles.statsCard}>
          <Pressable style={styles.stat} onPress={() => router.push("/tukar-poin")}>
            <Text style={styles.statValue}>{user.points.toLocaleString("id-ID")}</Text>
            <Text style={styles.statLabel}>Poin</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <Pressable style={styles.stat} onPress={() => router.push("/voucher")}>
            <Text style={styles.statValue}>{user.coupons}</Text>
            <Text style={styles.statLabel}>Voucher</Text>
          </Pressable>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.joined}</Text>
            <Text style={styles.statLabel}>Bergabung</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU.map((m, i) => (
            <Pressable
              key={m.label}
              style={[styles.menuRow, i < MENU.length - 1 && styles.menuBorder]}
              onPress={() => router.push(m.route)}
            >
              <View style={[styles.menuIcon, { backgroundColor: m.color + "22" }]}>
                <Ionicons name={m.icon} size={18} color={m.color} />
              </View>
              <Text style={styles.menuLabel}>{m.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logout} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.red} />
          <Text style={styles.logoutText}>Keluar</Text>
        </Pressable>

        <Text style={styles.version}>Nonkz Membership v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  header: { paddingHorizontal: 18, paddingBottom: 44 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: colors.white },
  profileRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.white, fontWeight: "800", fontSize: 26 },
  name: { color: colors.white, fontSize: 20, fontWeight: "800" },
  phone: { color: colors.textLightMuted, fontSize: 13, marginTop: 2 },
  tierPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: 6,
  },
  tierPillText: { color: colors.white, fontSize: 11, fontWeight: "700" },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: { paddingHorizontal: 16, marginTop: -28 },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 18,
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, backgroundColor: colors.divider },
  statValue: { fontSize: 17, fontWeight: "800", color: colors.textDark },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 3 },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuLabel: { flex: 1, fontSize: 14, color: colors.textDark, fontWeight: "600" },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 15,
    marginTop: 16,
  },
  logoutText: { color: colors.red, fontWeight: "700", fontSize: 14 },
  version: { textAlign: "center", color: colors.textMuted, fontSize: 12, marginTop: 18 },
});
