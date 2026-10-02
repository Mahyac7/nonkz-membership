import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { colors, radius } from "../constants/theme";
import { user } from "../constants/data";
import ScreenHeader from "../components/ScreenHeader";

function Field({ label, value, onChangeText, placeholder, keyboardType }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const save = () => {
    Alert.alert("Tersimpan", "Profil berhasil diperbarui.", [
      { text: "OK", onPress: () => (router.canGoBack() ? router.back() : router.replace("/")) },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenHeader title="Edit Profil" />
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initial}</Text>
          </View>
          <Text style={styles.changePhoto}>Ubah foto</Text>
        </View>

        <View style={styles.card}>
          <Field label="Nama Lengkap" value={name} onChangeText={setName} placeholder="Nama kamu" />
          <Field
            label="Nomor HP"
            value={phone}
            onChangeText={setPhone}
            placeholder="08xxxxxxxxxx"
            keyboardType="phone-pad"
          />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="email@contoh.com"
            keyboardType="email-address"
          />
          <Field
            label="Tanggal Lahir"
            value={birth}
            onChangeText={setBirth}
            placeholder="DD/MM/YYYY"
          />
          <Field label="Jenis Kelamin" value={gender} onChangeText={setGender} placeholder="Pria / Wanita" />
        </View>

        <Pressable style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveText}>Simpan Perubahan</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  avatarWrap: { alignItems: "center", marginBottom: 20 },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.white, fontSize: 32, fontWeight: "800" },
  changePhoto: { color: colors.accentBlue, fontWeight: "700", fontSize: 13, marginTop: 10 },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: 16 },
  field: { marginBottom: 14 },
  label: { fontSize: 12, color: colors.textMuted, marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: colors.screen,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textDark,
  },
  saveBtn: {
    backgroundColor: colors.cardBlue,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: "center",
    marginTop: 18,
  },
  saveText: { color: colors.white, fontWeight: "800", fontSize: 15 },
});
