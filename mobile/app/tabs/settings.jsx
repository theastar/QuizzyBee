import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import EditProfileModal from "../../components/EditProfileModal";
import SettingsModal from "../../components/SettingsModal";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function SettingsScreen() {
  const router = useRouter();
  const [editVisible, setEditVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [profile, setProfile] = useState({
    name: "Student",
    email: "student@example.com",
    id: "2023341289",
    course: "",
    year: "",
    bio: "",
  });

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFBF0" }} contentContainerStyle={styles.container}>
      <View style={styles.profileBox}>
        {/* Hexagon Avatar */}
        <View style={styles.hexagonAvatar}>
          <MaterialCommunityIcons name="hexagon" size={170} color="#FA9F40" style={styles.hexagonBg} />
          <Text style={styles.avatarLetter}>
            {profile.name ? profile.name[0].toUpperCase() : "S"}
          </Text>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.id}>ID: {profile.id}</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditVisible(true)}>
          <Feather name="edit-2" size={18} color="#1A1D16" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsBtn} onPress={() => setSettingsVisible(true)}>
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
        {!profile.course && !profile.year && !profile.bio ? (
          <Text style={styles.defaultText}>
            No info yet. Tap 'Edit Profile' to add.
          </Text>
        ) : (
          <>
            {profile.course && (
              <>
                <Text style={styles.label}>Course / Department</Text>
                <Text style={styles.value}>{profile.course}</Text>
              </>
            )}
            {profile.year && (
              <>
                <Text style={styles.label}>Year Level / Section</Text>
                <Text style={styles.value}>{profile.year}</Text>
              </>
            )}
            {profile.bio && (
              <>
                <Text style={styles.label}>Bio</Text>
                <Text style={styles.value}>{profile.bio}</Text>
              </>
            )}
          </>
        )}
      </View>

      <EditProfileModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        profile={profile}
        setProfile={setProfile}
      />
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </ScrollView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 16 },
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
    marginBottom: 5,
  },
  aboutTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A1D16",
    marginBottom: 10,
  },
  defaultText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    fontStyle: "italic",
    color: "#A25C30",
    marginTop: 16,
    textAlign: "center",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    marginTop: 14,
    color: "#A25C30",
  },
  value: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    marginTop: 2,
    color: "#1A1D16",
  },
});
