import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useAuthStore } from "../context/AuthStore";

const BackButton = ({ fallbackRoute }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const handleBack = () => {
    // If a fallback route is provided, use it
    if (fallbackRoute) {
      router.push(fallbackRoute);
      return;
    }

    // Define logical back navigation based on current path
    // This ensures consistent navigation regardless of history
    const backRoutes = {
      // Auth routes - always go back to splash
      '/login': '/',
      '/signup': '/',
      '/forgotpass': '/login',

      // User routes
      '/edit-profile': '/tabs/settings',
      '/app-settings': '/tabs/settings',

      // Dashboard routes
      '/dashboard/notes': '/tabs/home',
      '/dashboard/flashcards': '/tabs/home',
      '/dashboard/pomodoro': '/tabs/home',
      '/dashboard/calendar': '/tabs/home',

      // Quiz routes
      '/startquiz': '/tabs/home',

      // Admin routes
      '/admin/settings': '/admin/dashboard',
      '/admin/users': '/admin/dashboard',
    };

    // Use the defined logical route
    if (backRoutes[pathname]) {
      router.push(backRoutes[pathname]);
    } else {
      // Fallback to appropriate home based on role
      if (user?.role === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/tabs/home');
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="#1A1D16" />
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
    marginTop: 20,
  },
  backText: {
    marginLeft: 5,
    color: "#1A1D16",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
