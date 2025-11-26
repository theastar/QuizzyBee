import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AdminTabsLayout() {
  return (
    <SafeAreaProvider>
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
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: "Users",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
