import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../../constants/theme";
import { useAuth } from "../../lib/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      // Navigation handled by root layout on session change.
    } catch (e) {
      setError(mapAuthError(e?.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LinearGradient colors={[colors.bgTop, colors.bgDeep]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 50 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandWrap}>
            <View style={styles.logoCircle}>
              <Ionicons name="add" size={28} color={colors.red} />
            </View>
            <Text style={styles.brand}>Nonkz</Text>
            <Text style={styles.tagline}>Membership</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Masuk</Text>
            <Text style={styles.subtitle}>Selamat datang kembali!</Text>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={colors.red} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="email@contoh.com"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passRow}>
              <TextInput
                style={styles.passInput}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPass}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPass((s) => !s)} hitSlop={10}>
                <Ionicons
                  name={showPass ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>

            <Pressable
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.btnText}>Masuk</Text>
              )}
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Belum punya akun? </Text>
              <Pressable onPress={() => router.replace("/(auth)/register")}>
                <Text style={styles.link}>Daftar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

function mapAuthError(msg = "") {
  if (/invalid login credentials/i.test(msg)) return "Email atau password salah.";
  if (/email not confirmed/i.test(msg))
    return "Email belum dikonfirmasi. Cek inbox kamu, atau matikan 'Confirm email' di Supabase.";
  return msg || "Terjadi kesalahan. Coba lagi.";
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  brandWrap: { alignItems: "center", marginBottom: 30 },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { color: colors.white, fontSize: 30, fontWeight: "900", marginTop: 12 },
  tagline: { color: colors.textLightMuted, fontSize: 14, marginTop: 2 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 22,
  },
  title: { fontSize: 24, fontWeight: "800", color: colors.textDark },
  subtitle: { fontSize: 14, color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FDE7E9",
    borderRadius: radius.sm,
    padding: 10,
    marginBottom: 12,
  },
  errorText: { color: colors.red, fontSize: 12, flex: 1 },
  label: { fontSize: 12, color: colors.textMuted, fontWeight: "600", marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: colors.screen,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: colors.textDark,
  },
  passRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.screen,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
  },
  passInput: { flex: 1, paddingVertical: 13, fontSize: 14, color: colors.textDark },
  btn: {
    backgroundColor: colors.cardBlue,
    borderRadius: radius.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 22,
  },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: colors.white, fontWeight: "800", fontSize: 15 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 18 },
  footerText: { color: colors.textMuted, fontSize: 13 },
  link: { color: colors.cardBlue, fontSize: 13, fontWeight: "800" },
});
