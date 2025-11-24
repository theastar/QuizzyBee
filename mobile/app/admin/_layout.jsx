import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, Pressable } from "react-native";

// Admin Tabs Layout
export default function AdminTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E17203",
        tabBarInactiveTintColor: "#A25C30",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
          marginTop: 0,
          fontFamily: "Poppins_500Medium",
        },
        tabBarStyle: {
          backgroundColor: "#FFFBF0",
          borderTopWidth: 2,
          borderTopColor: "#FDEBA1",
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={null}
            style={({ pressed }) => [props.style, { opacity: 1 }]}
          />
        ),
      }}
    >

      {/* DASHBOARD TAB */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
      />

      {/* USER MANAGEMENT TAB */}
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />

      {/* SETTINGS TAB */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
