import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../constants/theme";

function Cup({ color, bottom, left, height }) {
  return (
    <View style={[styles.cup, { backgroundColor: color, bottom, left, height }]}>
      <View style={styles.cupFoam} />
    </View>
  );
}

function Tag({ text, top, right }) {
  return (
    <View style={[styles.tag, { top, right }]}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

export default function PromoBanner() {
  return (
    <LinearGradient
      colors={["#7A3B9E", "#4B2167"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {/* brand chip */}
      <View style={styles.brandChip}>
        <View style={styles.brandDot}>
          <Ionicons name="cafe" size={12} color={colors.white} />
        </View>
        <Text style={styles.brandChipText}>Nordu</Text>
      </View>

      {/* headline */}
      <View style={styles.headline}>
        <Text style={styles.newMenu}>New Menu</Text>
        <Text style={styles.title}>Ube Series</Text>
        <Text style={styles.subtitle}>Meet Your New Favorite Purple</Text>
      </View>

      {/* decorative cups */}
      <Cup color="#9B6FD1" bottom={0} left={210} height={70} />
      <Cup color="#B48BE0" bottom={0} left={252} height={95} />
      <Cup color="#8E63C8" bottom={0} left={296} height={110} />

      {/* floating tags */}
      <Tag text="Dirty Ube" top={34} right={120} />
      <Tag text="Strawberry Ube Latte" top={28} right={14} />
      <Tag text="Ube Latte" top={78} right={16} />
      <Tag text="Coconut Ube Cloud" top={118} right={14} />
      <Tag text="Matcha Ube" top={118} right={118} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 185,
    borderRadius: radius.lg,
    marginTop: 20,
    overflow: "hidden",
    padding: 16,
  },
  brandChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  brandDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  brandChipText: { fontWeight: "800", color: colors.textDark, fontSize: 13 },
  headline: { marginTop: 16 },
  newMenu: {
    color: colors.white,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "600",
    opacity: 0.95,
  },
  title: { color: colors.white, fontSize: 34, fontWeight: "900", marginTop: 2 },
  subtitle: { color: "rgba(255,255,255,0.85)", fontSize: 11, marginTop: 4, letterSpacing: 0.5 },
  cup: {
    position: "absolute",
    width: 34,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0.9,
  },
  cupFoam: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tag: {
    position: "absolute",
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  tagText: { color: colors.white, fontSize: 8, fontWeight: "700" },
});
