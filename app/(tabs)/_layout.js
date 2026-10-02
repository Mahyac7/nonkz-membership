import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../../constants/theme";

function FabButton() {
  return (
    <View style={styles.fab}>
      <Ionicons name="sparkles" size={22} color={colors.white} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: { paddingVertical: 6 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bag-handle" : "bag-handle-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="member"
        options={{
          title: "Member",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "card" : "card-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingBottom: 10,
    paddingTop: 6,
    borderTopWidth: 0,
    backgroundColor: colors.white,
    elevation: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    right: 18,
    bottom: 24,
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
