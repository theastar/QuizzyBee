import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../context/AuthStore";

function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFBF0" }} contentContainerStyle={styles.container}>

        <View style={styles.profileBox}>
          {/* Hexagon Avatar */}
          <View style={styles.hexagonAvatar}>
            <MaterialCommunityIcons name="hexagon" size={170} color="#FA9F40" style={styles.hexagonBg} />
            <Text style={styles.avatarLetter}>
              {user?.name ? user.name[0].toUpperCase() : "S"}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || "Student"}</Text>
          <Text style={styles.email}>{user?.email || "student@example.com"}</Text>
          <Text style={styles.id}>ID: {user?.studentId || "N/A"}</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push("/edit-profile")}
          >
            <Feather name="edit-2" size={18} color="#1A1D16" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push("/app-settings")}
          >
            <Ionicons name="settings-outline" size={18} color="#1A1D16" />
            <Text style={styles.editText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#E53935" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>About Me</Text>
          {!user?.course && !user?.year && !user?.bio ? (
            <Text style={styles.defaultText}>
              No info yet. Tap 'Edit Profile' to add.
            </Text>
          ) : (
            <>
              {user?.course && (
                <>
                  <Text style={styles.label}>Course / Department</Text>
                  <Text style={styles.value}>{user.course}</Text>
                </>
              )}
              {user?.year && (
                <>
                  <Text style={styles.label}>Year Level / Section</Text>
                  <Text style={styles.value}>{user.year}</Text>
                </>
              )}
              {user?.bio && (
                <>
                  <Text style={styles.label}>Bio</Text>
                  <Text style={styles.value}>{user.bio}</Text>
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  container: {
    alignItems: "center",
    padding: 16,
    paddingBottom: 40,
  },
  profileBox: {
    marginTop: 28,
    width: "100%",
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#FFFBF0",
    borderColor: "#FDEBA1",
    borderWidth: 2,
    padding: 50,
    marginBottom: 20,
  },
  hexagonAvatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 120,
    marginBottom: 10,
    position: "relative",
  },
  hexagonBg: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  avatarLetter: {
    color: "#fff",
    fontSize: 90,
    fontWeight: "bold",
    fontFamily: "Poppins_600SemiBold",
    zIndex: 1,
    top: 29,
    position: "absolute",
    left: 8,
    right: 0,
    textAlign: 'center',
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: "#1A1D16",
    marginBottom: 4,
    marginTop: 50,
  },
  email: {
    fontFamily: "Poppins_400Regular",
    color: "#A25C30",
    fontSize: 15,
    textDecorationLine: "underline",
    textDecorationColor: "#A25C30",
  },
  id: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#A25C30",
    marginBottom: 16,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9ED",
    padding: 8,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FDEBA1",
  },
  settingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9ED",
    padding: 8,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FDEBA1",
  },
  editText: {
    color: "#1A1D16",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    marginLeft: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E53935",
    backgroundColor: "#fff0",
    padding: 8,
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
  },
  logoutText: {
    color: "#E53935",
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    marginLeft: 8,
  },
  aboutBox: {
    width: "100%",
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    backgroundColor: "#FFFBF0",
    padding: 30,
  },
  aboutTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: "#1A1D16",
    marginBottom: 12,
  },
  defaultText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#A25C30",
    fontStyle: "italic",
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#A25C30",
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#1A1D16",
  },
});
