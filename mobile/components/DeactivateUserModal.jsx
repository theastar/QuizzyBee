import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

function DeactivateUserModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Deactivate User</Text>
          <Text style={styles.bodyText}>
            Are you sure you want to deactivate this user? They will not be able to access their account.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deactivateBtn} onPress={onConfirm}>
              <Text style={styles.deactivateText}>Deactivate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DeactivateUserModal;

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
  deactivateBtn: {
    flex: 1,
    backgroundColor: "#F59E0B",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  deactivateText: {
    fontFamily: "Poppins_500Medium",
    color: "#fff",
    fontSize: 14,
  },
});
