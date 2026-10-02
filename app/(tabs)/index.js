import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "../../constants/theme";
import { getPromos } from "../../lib/api";
import { useAuth } from "../../lib/AuthContext";
import TopHeader from "../../components/TopHeader";
import MembershipCard from "../../components/MembershipCard";
import QuickActions from "../../components/QuickActions";
import PromoBanner from "../../components/PromoBanner";
import CompleteProfilePill from "../../components/CompleteProfilePill";

function greetingText() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi,";
  if (h < 15) return "Selamat siang,";
  if (h < 19) return "Selamat sore,";
  return "Selamat malam,";
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, refreshProfile } = useAuth();
  const [promos, setPromos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await getPromos();
      setPromos(data);
    } catch (e) {
      setPromos([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([load(), refreshProfile()]);
    setRefreshing(false);
  }, [load, refreshProfile]);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.white} />
        }
      >
        {/* Blue gradient top section */}
        <LinearGradient
          colors={[colors.bgTop, colors.bgDeep]}
          style={[styles.topSection, { paddingTop: insets.top + 8 }]}
        >
          <TopHeader />

          <View style={styles.greeting}>
            <Text style={styles.greetSmall}>{greetingText()}</Text>
            <Text style={styles.greetName}>{profile?.name ?? "Member"}</Text>
          </View>

          <View style={{ paddingHorizontal: 18 }}>
            <MembershipCard />
          </View>

          <View style={{ height: 28 }} />
        </LinearGradient>

        {/* White content */}
        <View style={styles.content}>
          <QuickActions />
          <PromoBanner />
          <CompleteProfilePill />

          {/* Promo buat kamu section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promo buat kamu</Text>
            <Pressable onPress={() => router.push("/promo")}>
              <Text style={styles.seeAll}>Lihat semua</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionSub}>Klaim sekarang, pakai saat checkout</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingVertical: 14, paddingRight: 18 }}
          >
            {promos.map((p) => (
              <Pressable
                key={p.id}
                style={[styles.promoCard, { backgroundColor: p.color }]}
                onPress={() => router.push({ pathname: "/promo-detail", params: { id: p.id } })}
              >
                <Text style={styles.promoDiscount}>{p.discount}</Text>
                <Text style={styles.promoTitle}>{p.title}</Text>
                <View style={styles.promoBtn}>
                  <Text style={styles.promoBtnText}>Klaim</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  topSection: { paddingBottom: 4 },
  greeting: { paddingHorizontal: 18, marginTop: 14 },
  greetSmall: { color: colors.textLightMuted, fontSize: 14 },
  greetName: { color: colors.white, fontSize: 26, fontWeight: "800", marginTop: 2 },
  content: {
    backgroundColor: colors.screen,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    marginTop: -22,
    paddingHorizontal: 18,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: colors.textDark },
  seeAll: { fontSize: 13, color: colors.accentBlue, fontWeight: "700" },
  sectionSub: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  promoCard: {
    width: 150,
    height: 110,
    borderRadius: 18,
    padding: 14,
    justifyContent: "space-between",
  },
  promoDiscount: { color: colors.white, fontSize: 24, fontWeight: "900" },
  promoTitle: { color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: "600" },
  promoBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
  },
  promoBtnText: { color: colors.white, fontSize: 12, fontWeight: "700" },
});
