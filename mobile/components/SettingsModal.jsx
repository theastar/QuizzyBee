import React, { useState } from "react";
import { Modal, View, Text, Switch, TouchableOpacity, StyleSheet, Pressable,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Modal for app settings
function SettingsModal({ visible, onClose }) {
  const [notif, setNotif] = useState(true);
  const [pomodoro, setPomodoro] = useState("Medium (25/5)");
  const pomodoroOptions = [
    "Short (15/5)",
    "Medium (25/5)",
    "Long (50/10)",
  ];
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={26} color="#A25C30" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Notifications</Text>
            <Switch
              value={notif}
              onValueChange={setNotif}
              trackColor={{ false: "#E5E5E5", true: "#E17203" }}
              thumbColor="#FFFBF0"
              ios_backgroundColor="#E5E5E5"
            />
          </View>
          <Text style={styles.sectionTitle}>Pomodoro</Text>
          <Pressable
            style={styles.pomodoroSelect}
            onPress={() => setShowDropdown((v) => !v)}
          >
            <Text style={styles.pomodoroText}>{pomodoro}</Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={22}
              color="#A25C30"
              style={{ marginLeft: 6 }}
            />
          </Pressable>
          {showDropdown && (
            <View style={styles.dropdownBox}>
              {pomodoroOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setPomodoro(option);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.sectionTitle}>About the App</Text>
          <View style={styles.aboutBox}>
            <Text style={styles.aboutText}>
              <Text style={styles.aboutBold}>QuizzyBee</Text>
              {" "} (2025) by Althea Navales and Rogin Lagrosas — your ultimate study companion:{" "}
              <Text style={{ fontStyle: "italic" }}>
                Learn Smarter, Quiz Faster, Bee Better.
              </Text>{" "}
              🐝
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SettingsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    borderRadius: 18,
    backgroundColor: "#FFFBF0",
    borderColor: "#FDEBA1",
    borderWidth: 3,
    padding: 20,
  },
  headerRow: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginBottom: 6,
    minHeight: 36,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontWeight: "500",
    fontSize: 18,
    color: "#1A1D16",
    width: "100%",
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 2,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A1D16",
    marginVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#FDEBA1",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  pomodoroSelect: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FDEBA1",
    backgroundColor: "#FFFBF0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    marginTop: 4,
    width: "100%",
    justifyContent: "space-between",
  },
  pomodoroText: {
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    flex: 1,
  },
  dropdownBox: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    marginTop: -6,
    marginBottom: 16,
  },
  dropdownItem: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FDEBA1",
  },
  dropdownText: {
    color: "#A25C30",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  aboutBox: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    padding: 10,
    marginTop: 6,
  },
  aboutText: {
    color: "#A25C30",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "justify",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  aboutBold: {
    fontFamily: "Poppins_600SemiBold",
    fontWeight: "bold",
    color: "#A25C30",
  },
});
