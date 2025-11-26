import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

function DeleteUserModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Delete User</Text>
          <Text style={styles.bodyText}>
            Are you sure you want to permanently delete this user? This action cannot be undone.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DeleteUserModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#FFFBF0",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    padding: 20,
    width: 370,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: "#1A1D16",
    marginBottom: 12,
    textAlign: "center",
  },
  bodyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#1A1D16",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginRight: 10,
  },
  cancelText: {
    fontFamily: "Poppins_400Regular",
    color: "#1A1D16",
    fontSize: 14,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#E53935",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  deleteText: {
    fontFamily: "Poppins_500Medium",
    color: "#fff",
    fontSize: 14,
  },
});
