import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, Pressable } from 'react-native';

// Main Tabs Layout for bottom navigation
function TabsLayout() {
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
            style={({ pressed }) => [
              props.style,
              { opacity: 1 },
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="beehive-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quizzybee"
        options={{
          title: "Quiz",
          tabBarIcon: ({ color, size }) => (
            <View style={{ transform: [{ rotate: '30deg' }] }}>
              <MaterialCommunityIcons name="hexagon-multiple-outline" size={26} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;
