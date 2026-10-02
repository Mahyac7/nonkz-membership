import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.screen },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="promo" />
        <Stack.Screen name="promo-detail" />
        <Stack.Screen name="tukar-poin" />
        <Stack.Screen name="voucher" />
        <Stack.Screen name="outlet" />
        <Stack.Screen name="referal" />
        <Stack.Screen name="kode-member" />
        <Stack.Screen name="order-detail" />
        <Stack.Screen name="notifikasi" />
        <Stack.Screen name="edit-profile" />
      </Stack>
    </SafeAreaProvider>
  );
}
