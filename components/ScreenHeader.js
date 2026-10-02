import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

export default function ScreenHeader({ title, subtitle, right }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.bgTop, colors.bgDeep]}
      style={[styles.wrap, { paddingTop: insets.top + 8 }]}
    >
      <View style={styles.row}>
        <Pressable
          style={styles.back}
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {right ? <View>{right}</View> : <View style={{ width: 40 }} />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 16,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  row: { flexDirection: "row", alignItems: "center" },
  back: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: { color: colors.white, fontSize: 19, fontWeight: "800" },
  subtitle: { color: colors.textLightMuted, fontSize: 12, marginTop: 2 },
});
