import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Modal component to create a new deck
function CreateDeckModal({ visible, onClose, onCreate }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (visible) {
      setTitle("");
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={26} color="#A25C30" />
          </TouchableOpacity>
          <Text style={styles.title}>Create New Deck</Text>
          <Text style={styles.label}>Deck Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter Deck Title..."
            placeholderTextColor="#A25C30"
            style={styles.input}
          />
          <TouchableOpacity
            style={[styles.createBtn, !title.trim() && { opacity: 0.65 }]}
            onPress={() => {
              onCreate(title);
              setTitle("");
            }}
            disabled={!title.trim()}
          >
            <Text style={styles.createBtnText}>Create & Add cards</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default CreateDeckModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 340,
    height: 260,
    borderRadius: 18,
    backgroundColor: "#FFFBF0",
    borderColor: "#FDEBA1",
    borderWidth: 3,
    padding: 16,
    alignItems: "stretch",
    justifyContent: "flex-start",
    position: "relative",
  },
  closeBtn: { position: "absolute", right: 10, top: 10, padding: 2 },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1A1D16",
    marginBottom: 12,
    marginTop: 6,
    textAlign: "center",
    width: "100%",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1A1D16",
    marginTop: 7,
    marginBottom: 4,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 7,
    color: "#A25C30",
    backgroundColor: "#F8F8F8",
    marginBottom: 10,
    marginTop: 4,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  createBtn: {
    backgroundColor: "#FF8927",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 7,
    marginBottom: 4,
  },
  createBtnText: {
    color: "#FFFBF0",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
