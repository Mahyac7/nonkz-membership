import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/theme";
import TopHeader from "../../components/TopHeader";
import MembershipCard from "../../components/MembershipCard";
import QuickActions from "../../components/QuickActions";
import PromoBanner from "../../components/PromoBanner";
import CompleteProfilePill from "../../components/CompleteProfilePill";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Blue gradient top section */}
        <LinearGradient
          colors={[colors.bgTop, colors.bgDeep]}
          style={[styles.topSection, { paddingTop: insets.top + 8 }]}
        >
          <TopHeader />

          <View style={styles.greeting}>
            <Text style={styles.greetSmall}>Selamat malam,</Text>
            <Text style={styles.greetName}>Halo</Text>
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
            <Pressable>
              <Text style={styles.seeAll}>Lihat semua</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionSub}>Klaim sekarang, pakai saat checkout</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingVertical: 14, paddingRight: 18 }}
          >
            {[
              { d: "20%", t: "Diskon Minuman", c: "#2F56D8" },
              { d: "Rp 10rb", t: "Cashback Poin", c: "#1BA784" },
              { d: "Buy 1", t: "Get 1 Free", c: "#E23744" },
            ].map((p, i) => (
              <View key={i} style={[styles.promoCard, { backgroundColor: p.c }]}>
                <Text style={styles.promoDiscount}>{p.d}</Text>
                <Text style={styles.promoTitle}>{p.t}</Text>
                <View style={styles.promoBtn}>
                  <Text style={styles.promoBtnText}>Klaim</Text>
                </View>
              </View>
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
